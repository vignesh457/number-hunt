import React, { useEffect, useState } from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import { useAppSelector } from "@/redux/hook";
import { socket } from "@/utils/socket";
import Grid from "@/components/Grid-gpt";

export default function GameScreen() {
  const { roomCode, players } = useAppSelector((s) => s.game);
  const userId = useAppSelector((s) => s.user.id);

  const myPlayer = players.find((p) => p.id === userId);
  const opponent = players.find((p) => p.id !== userId);

  const [isMyTurn, setIsMyTurn] = useState(myPlayer?.isHost);
  const [round, setRound] = useState(1);
  const [targetNumber, setTargetNumber] = useState<number | null>(null);
  const [myPoints, setMyPoints] = useState(0);
  const [opponentPoints, setOpponentPoints] = useState(0);

  // 🔑 Listen for turn, number to find, etc.
  useEffect(() => {
    socket.on("number_selected", ({ targetNumber, targetPlayer }) => {
      if (targetPlayer === userId) {
        setTargetNumber(targetNumber);
        console.log(`Target number: ${targetNumber} to ${myPlayer?.name}`);
      }
    });

    socket.on("add_points", ({ playerId, points }) => {
      console.log(`Points added: ${points} by ${playerId === userId ? "you" : "opponent"} (${playerId})`);
      if (playerId === userId) {
        setMyPoints((prev) => prev + points);
      } else {
        setOpponentPoints((prev) => prev + points);
      }
      // switch turn
      setIsMyTurn(playerId === userId);
      console.log(`isMyTurn: ${isMyTurn} (${userId})`);
      setTargetNumber(null);
      setRound((prev) => prev + 1);
    });

    return () => {
      socket.off("number_selected");
      socket.off("add_points");
    };
  }, [userId]);

  const pickNumber = (number: number) => {
    // if (!isMyTurn) return;
    console.log(`Picked number: ${number} by ${myPlayer?.name}`);
    socket.emit("select_number", { roomCode, number });
  };

  const handleNumberFound = (points: number) => {
    // if (isMyTurn) return; // you should not find a number on your turn
    console.log(`Found number: ${targetNumber} by ${myPlayer?.name}`);
    socket.emit("number_found", { roomCode, points, userId });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.round}>Round: {round} / 5</Text>

      <View style={styles.scores}>
        <View style={styles.scoreBox}>
          <Text>{myPlayer?.name || "Me"}</Text>
          <Text>Score: {myPoints}</Text>
        </View>
        <View style={styles.scoreBox}>
          <Text>{opponent?.name || "Opponent"}</Text>
          <Text>Score: {opponentPoints}</Text>
        </View>
      </View>

      {isMyTurn && (
        <View>
          <Text style={styles.info}>It's your turn to select a number!</Text>
          <Button title="Pick 42" onPress={() => pickNumber(42)} />
          {/* Replace with your number picker UI */}
        </View>
      )}

      {!isMyTurn && targetNumber && (
        <Grid
          targetNumber={targetNumber}
          onNumberFound={handleNumberFound}
        />
      )}

      {!isMyTurn && !targetNumber && (
        <Text style={styles.info}>Waiting for opponent to choose...</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, justifyContent: "center" },
  round: { fontSize: 20, marginBottom: 16 },
  scores: { flexDirection: "row", justifyContent: "space-around", marginBottom: 24 },
  scoreBox: { alignItems: "center" },
  info: { fontSize: 18, textAlign: "center", marginVertical: 16 },
});
