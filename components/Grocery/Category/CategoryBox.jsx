import React, { useRef } from 'react';
import { Animated, Image, StyleSheet, Text, Pressable } from 'react-native';

export default function CategoryBox({ image, label, onPress, width }) {
  const imageSize = width * 0.9;
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.95,
      useNativeDriver: true,
      speed: 20,
      bounciness: 10,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      useNativeDriver: true,
      speed: 20,
      bounciness: 10,
    }).start();
  };

  return (
    <Pressable
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      style={{ width }}
    >
      <Animated.View style={[styles.container, { transform: [{ scale: scaleAnim }] }]}>
        <Image
          source={image}
          style={[styles.image, { width: imageSize, height: imageSize, borderRadius: 12 }]}
        />
        <Text style={styles.label} numberOfLines={2}>
          {label}
        </Text>
      </Animated.View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginVertical: 6,
  },
  image: {
    resizeMode: 'cover',
  },
  label: {
    fontSize: 12,
    fontWeight: '600',
    textAlign: 'center',
    color: '#222',
    marginTop: 4,
  },
});
