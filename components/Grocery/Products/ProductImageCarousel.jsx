import React, { useState } from 'react';
import {
  View,
  ScrollView,
  Animated,
  Text,
  Dimensions,
  StyleSheet,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

export default function ProductImageCarousel({ images = [] }) {
  const [fadeAnim] = useState(new Animated.Value(0));
  const [activeIndex, setActiveIndex] = useState(0);

  const onImageLoad = () => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 400,
      useNativeDriver: true,
    }).start();
  };

  const handleScroll = (e) => {
    const index = Math.round(e.nativeEvent.contentOffset.x / width);
    setActiveIndex(index);
  };

  return (
    <View style={styles.imageWrapper}>
      <ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
      >
        {images.length > 0 ? (
          images.map((img, idx) => (
            <Animated.Image
              key={idx}
              source={{ uri: img }}
              style={[styles.productImage, { opacity: fadeAnim }]}
              onLoad={onImageLoad}
              resizeMode="cover"
            />
          ))
        ) : (
          <Ionicons name="image-outline" size={80} color="#CCC" />
        )}
      </ScrollView>

      {images.length > 0 && (
        <View style={styles.imageCount}>
          <Text style={styles.imageCountText}>
            {activeIndex + 1} / {images.length}
          </Text>
        </View>
      )}

      {images.length > 1 && (
        <View style={styles.pagination}>
          {images.map((_, idx) => (
            <View
              key={idx}
              style={[styles.dot, idx === activeIndex && styles.dotActive]}
            />
          ))}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  imageWrapper: {
    width,
    height: width * 0.75,
    backgroundColor: '#FFF',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
    marginTop: 0,
  },
  productImage: {
    width,
    height: width * 0.75,
    borderRadius: 0, // Keep top edges flat
  },
  imageCount: {
    position: 'absolute',
    bottom: 12,
    right: 12,
    backgroundColor: '#0009',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 12,
  },
  imageCountText: {
    fontSize: 12,
    color: '#FFF',
  },
  pagination: {
    position: 'absolute',
    bottom: 12,
    alignSelf: 'center',
    flexDirection: 'row',
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#DDD',
    marginHorizontal: 3,
  },
  dotActive: {
    width: 20,
    backgroundColor: '#FF5722',
  },
});
