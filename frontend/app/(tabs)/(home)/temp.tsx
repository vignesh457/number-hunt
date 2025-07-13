// src/screens/GameScreen.js
import Grid from '@/components/Grid';
import Timer from '@/components/Timer';
import React, { SetStateAction, useEffect, useState } from 'react';
import { Alert, Button, Text, View } from 'react-native';

// const socket = io('http://YOUR_SERVER_URL'); 
// navigation - params

export default function GameScreen() {
  // const { mode, roomCode, isHost } = route.params;
  const { mode, roomCode, isHost } = { mode: 'friend', roomCode: '1234', isHost: true };

  const [gridSize, setGridSize] = useState(10);
  const [rounds, setRounds] = useState(4);
  const [grid, setGrid] = useState([]);
  const [targetNumber, setTargetNumber] = useState(null);
  const [isMyTurn, setIsMyTurn] = useState(isHost);
  const [points, setPoints] = useState(10);
  const [myScore, setMyScore] = useState(0);

  useEffect(() => {
    // Connect & join room
    // if (mode === 'friend') {
    //   socket.emit('join_room', roomCode);
    // } else {
    //   socket.emit('find_match');
    // }

    // socket.on('number_selected', (num) => {
    //   setTargetNumber(num);
    //   setIsMyTurn(false);
    // });

    // socket.on('your_turn', () => {
    //   setIsMyTurn(true);
    // });

    // return () => socket.disconnect();
  }, []);

  useEffect(() => {
    generateGrid();
  }, [gridSize]);

  const generateGrid = () => {
    const nums : SetStateAction<never[]> = [];
    const total = gridSize * gridSize;
    while (nums.length < total) {
      const n = Math.floor(Math.random() * 100) + 1;
      // if (!nums.includes(n)) nums.push(n);
    }
    setGrid(nums);
  };

  const handleNumberPress = (num : number) => {
    if (num === targetNumber) {
      setMyScore(myScore + points);
      // socket.emit('number_found', points);
      nextTurn();
    } else {
      Alert.alert('Wrong number!');
    }
  };

  const nextTurn = () => {
    setIsMyTurn(true);
    const num = grid[Math.floor(Math.random() * grid.length)];
    setTargetNumber(null);
    // socket.emit('select_number', num);
  };

  const handleTimeEnd = () => {
    if (!isMyTurn && targetNumber) {
      nextTurn();
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <Text>Room: {roomCode}</Text>
      <Text>My Score: {myScore}</Text>

      {targetNumber && <Text>Find Number: {targetNumber}</Text>}

      <Timer
        start={10}
        onTick={(p: number) => setPoints(p)}
        onEnd={handleTimeEnd}
      />

      <Grid gridData={grid} onNumberPress={handleNumberPress} />

      {isMyTurn && (
        <Button
          title="Assign Number"
          onPress={() => {
            const num = grid[Math.floor(Math.random() * grid.length)];
            setTargetNumber(num);
            // socket.emit('select_number', num);
            setIsMyTurn(false);
          }}
        />
      )}
    </View>
  );
}
