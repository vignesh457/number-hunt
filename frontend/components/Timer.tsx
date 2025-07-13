import React, { useEffect, useRef } from 'react';
import { Animated, StyleSheet, View } from 'react-native';

export default function Timer() {
  const duration = 10000; // 10 seconds
  const progress = useRef(new Animated.Value(1)).current; // 1 means 100%

  useEffect(() => {
    Animated.timing(progress, {
      toValue: 0,
      duration: duration,
      useNativeDriver: false,
    }).start();
  }, []);

  const width = progress.interpolate({
    inputRange: [0, 1],
    outputRange: ['0%', '100%'],
  });

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.progress, { width }]} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 10,
    width: '100%',
    backgroundColor: '#ddd',
    borderRadius: 5,
    overflow: 'hidden',
  },
  progress: {
    height: '100%',
    backgroundColor: '#3b82f6',
  },
});
