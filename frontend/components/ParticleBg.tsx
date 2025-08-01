import React from 'react';
import { View, Dimensions, Text } from 'react-native';
import { MotiView } from 'moti';
import { Easing } from 'react-native-reanimated';


const { width, height } = Dimensions.get('window');

const getRandom = (min: number, max: number) => Math.random() * (max - min) + min;
const getRandomInt = (min: number, max: number) => Math.floor(getRandom(min, max));

const NUM_PARTICLES = 50;

const FloatingNumber = () => {
  const startX = getRandom(0, width - 30);
  const startY = getRandom(0, height - 30);
  const deltaX = getRandom(-80, 80);
  const deltaY = getRandom(-80, 80);
  const endX = startX + deltaX;
  const endY = startY + deltaY;

  const duration = getRandom(3000, 8000);
  const fontSize = getRandom(14, 24);

  return (
    <MotiView
      from={{
        translateX: startX,
        translateY: startY,
        opacity: 0.5,
      }}
      animate={{
        translateX: endX,
        translateY: endY,
        opacity: 0.8,
      }}
      transition={{
        type: 'timing',
        duration,
        loop: true,
        repeatReverse: true,
        easing: Easing.inOut(Easing.ease),
        delay: getRandom(0, 1500),
      }}
      style={{ position: 'absolute' }}
    >
      <Text style={{
        fontSize,
        color: 'rgba(14, 165, 233, 0.3)',
        fontWeight: 'bold',
      }}>
        {getRandomInt(1, 100)}
      </Text>
    </MotiView>
  );
};
function ParticleBackground() {
  return (
    <View style={{
      position: 'absolute',
      width,
      height,
      zIndex: -1,
    }}>
      {Array.from({ length: NUM_PARTICLES }).map((_, i) => (
        <FloatingNumber key={i} />
      ))}
    </View>
  );
}

export default React.memo(ParticleBackground);
