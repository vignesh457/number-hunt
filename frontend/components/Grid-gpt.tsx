// src/components/Grid.tsx
import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

export default function Grid({ targetNumber, onNumberClick }: {
  targetNumber: number | null;
  onNumberClick: (points: number) => void;
}) {
  const [numbers, setNumbers] = useState<number[]>([]);

  useEffect(() => {
    const nums = Array.from({ length: 100 }, (_, i) => i + 1).sort(() => Math.random() - 0.5);
    setNumbers(nums);
  }, [targetNumber]);

  const handlePress = (num: number) => {
    onNumberClick(num);
  };

  return (
    <View style={styles.grid}>
      {numbers.map((num) => (
        <TouchableOpacity
          key={num}
          style={[styles.cell]}
          onPress={() => handlePress(num)}
        >
          <Text>{num}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    width: 300,
  },
  cell: {
    width: 30,
    height: 30,
    margin: 2,
    backgroundColor: "#ddd",
    alignItems: "center",
    justifyContent: "center",
  },
  highlight: {
    borderWidth: 1,
    borderColor: "red",
  },
});
