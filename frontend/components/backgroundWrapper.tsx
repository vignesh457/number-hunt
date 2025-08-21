import React from 'react';
import ParticleBg from './ParticleBg';
import { SafeAreaView } from 'react-native-safe-area-context';

type Props = {
  children: React.ReactNode;
  className?: string;
};

export default function BackgroundWrapper({ children, className }: Props) {
  return (
    <SafeAreaView className={`flex-1 items-center justify-start bg-[#001428] ${className}`}>
      <ParticleBg/>
      {children}
    </SafeAreaView>
  );
}
// 113F67 1B3C53