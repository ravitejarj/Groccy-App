import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Animated,
} from 'react-native';
import * as Haptics from 'expo-haptics';

export default function VerticalTabItem({ item, selected, onPress }) {
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const translateYAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.spring(scaleAnim, {
      toValue: selected ? 1.05 : 1,
      useNativeDriver: true,
    }).start();

    Animated.spring(translateYAnim, {
      toValue: selected ? -4 : 0,
      useNativeDriver: true,
    }).start();
  }, [selected]);

  const handlePress = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    onPress();
  };

  return (
    <TouchableOpacity onPress={handlePress} activeOpacity={0.9} style={styles.wrapper}>
      <Animated.View
        style={[
          styles.content,
          {
            transform: [
              { scale: scaleAnim },
              { translateY: translateYAnim },
            ],
          },
        ]}
      >
        <Image
          source={{ uri: item.images?.[0] || 'https://via.placeholder.com/80' }}
          style={[styles.image, { opacity: selected ? 1 : 0.6 }]}
          resizeMode="center"
        />
        <Text style={[styles.label, selected && styles.activeLabel]} numberOfLines={2}>
          {item.name.charAt(0).toUpperCase() + item.name.slice(1)}
        </Text>
        {selected && <View style={styles.rightIndicator} />}
      </Animated.View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    alignItems: 'center',
    marginBottom: 16,
    width: '100%',
    paddingVertical: 6,
  },
  content: {
    width: '100%',
    alignItems: 'center',
    paddingRight: 12,
    position: 'relative',
  },
  image: {
    width: 32,
    height: 32,
    marginBottom: 4,
  },
  label: {
    fontSize: 10,
    color: '#999',
    textAlign: 'center',
    maxWidth: 60,
  },
  activeLabel: {
    color: '#FF5722',
    fontWeight: '600',
  },
  rightIndicator: {
    position: 'absolute',
    right: 4,
    top: 6,
    bottom: 6,
    width: 3,
    backgroundColor: '#FF5722',
    borderTopLeftRadius: 4,
    borderBottomLeftRadius: 4,
  },
});
