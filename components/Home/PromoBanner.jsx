import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Animated,
  ImageBackground,
  FlatList,
} from 'react-native';

const { width } = Dimensions.get('window');
const BANNER_WIDTH = width; // Full width
const BANNERS = [
  {
    id: '1',
    titleText: 'Your Favorite Indian\nGroceries, Delivered Fast!',
    image: require('@/assets/mobile_images/home_page_banner/home_banner_1.png'),
    buttonText: 'Start Shopping',
    onPress: () => {},
  },
  {
    id: '2',
    titleText: 'We’re Just Getting Started –\nBe Part of the Journey',
    image: require('@/assets/mobile_images/home_page_banner/home_banner_1.png'),
    buttonText: 'Explore Now',
    onPress: () => {},
  },
  {
    id: '3',
    titleText: 'We Deliver What\nYou Miss From Home',
    image: require('@/assets/mobile_images/home_page_banner/home_banner_1.png'),
    buttonText: 'Browse Aisles',
    onPress: () => {},
  },
];

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

const PromoBanner = () => {
  const scrollX = useRef(new Animated.Value(0)).current;
  const flatListRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => {
        const nextIndex = (prev + 1) % BANNERS.length;
        flatListRef.current?.scrollToIndex({ index: nextIndex, animated: true });
        return nextIndex;
      });
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <View style={styles.container}>
      <AnimatedFlatList
        ref={flatListRef}
        data={BANNERS}
        keyExtractor={(item) => item.id}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          {
            useNativeDriver: true,
            listener: (event) => {
              const offsetX = event.nativeEvent.contentOffset.x;
              const index = Math.round(offsetX / BANNER_WIDTH);
              setCurrentIndex(index);
            },
          }
        )}
        renderItem={({ item }) => (
          <View style={styles.bannerCard}>
            <ImageBackground
              source={item.image}
              resizeMode="cover"
              style={styles.backgroundImage}
              imageStyle={styles.imageStyle}
            >
              <View style={styles.overlay} />
              <View style={styles.bannerContent}>
                <Text style={styles.titleText}>{item.titleText}</Text>
                <TouchableOpacity
                  style={styles.button}
                  activeOpacity={0.8}
                  onPress={item.onPress}
                >
                  <Text style={styles.buttonText}>{item.buttonText}</Text>
                </TouchableOpacity>
              </View>
            </ImageBackground>
          </View>
        )}
      />
      <View style={styles.dotsContainer}>
        {BANNERS.map((_, idx) => (
          <View
            key={idx}
            style={[styles.dot, currentIndex === idx && styles.activeDot]}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingBottom: 8,
  },
  bannerCard: {
    width: BANNER_WIDTH,
    height: 160,
    paddingHorizontal: 16,
  },
  backgroundImage: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  imageStyle: {
    borderRadius: 20,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.3)',
    borderRadius: 20,
  },
  bannerContent: {
    paddingHorizontal: 20,
    paddingVertical: 18,
  },
  titleText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 10,
    lineHeight: 24,
  },
  button: {
    backgroundColor: '#FFF',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 6,
    alignSelf: 'flex-start',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  buttonText: {
    color: '#FF5722',
    fontWeight: '600',
    fontSize: 14,
  },
  dotsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 14,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#FFD6B3',
    marginHorizontal: 6,
  },
  activeDot: {
    backgroundColor: '#FF5722',
  },
});

export default PromoBanner;
