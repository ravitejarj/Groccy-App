import React from 'react';
import { View, StyleSheet, Platform } from 'react-native';
import { BlurView } from 'expo-blur';

export default function TabBarBackground() {
  if (Platform.OS === 'ios') {
    return <BlurView intensity={40} tint="light" style={StyleSheet.absoluteFill} />;
  }

  // Android fallback: semi-transparent white
  return <View style={styles.androidFallback} />;
}

const styles = StyleSheet.create({
  androidFallback: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
  },
});
