import React from 'react';
import { View, Dimensions, Text } from 'react-native';

const { width, height } = Dimensions.get('window');

const getRandom = (min: number, max: number) => Math.random() * (max - min) + min;
const getRandomInt = (min: number, max: number) => Math.floor(getRandom(min, max));

const cols = 5;
const rows = 8;
const NUM_PARTICLES = cols * rows; // fewer for performance

const ParticleBackground = () => {
  return (
    <View
      style={{
        position: 'absolute',
        width,
        height,
        zIndex: -1,
        flexWrap: 'wrap',
      }}
    >
      {Array.from({ length: NUM_PARTICLES }).map((_, i) => {
        const col = i % cols;
        const row = Math.floor(i / cols);

        // scatter within each grid cell
        const x = (col * width) / cols + getRandom(0, width / cols - 30);
        const y = (row * height) / rows + getRandom(0, height / rows - 30);
        const fontSize = getRandom(12, 22);
        const opacity = getRandom(0.3, 0.8);

        return (
          <Text
            key={i}
            style={{
              position: 'absolute',
              left: x,
              top: y,
              fontSize,
              color: 'rgba(14, 165, 233, 0.3)', // brighter visibility
              fontWeight: '600',
              opacity,
              fontFamily: 'Nunito-Regular',
            }}
          >
            {getRandomInt(1, 100)}
          </Text>
        );
      })}
    </View>
  );
};

export default React.memo(ParticleBackground);
