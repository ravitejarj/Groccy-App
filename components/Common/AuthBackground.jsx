import React from 'react';
import { ImageBackground, View, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import SafeAreaWrapper from './SafeAreaWrapper';
import { Ionicons } from '@expo/vector-icons';

const BG_IMAGE = require('@/assets/mobile_images/auth/Auth Background.png');

const { height, width } = Dimensions.get('window');
const IMAGE_HEIGHT = height * 0.25;
const CARD_HEIGHT = height * 0.75;
const CARD_MAX_WIDTH = 400;

const AuthBackground = ({ children, showBack, onBack }) => {
  return (
    <SafeAreaWrapper style={{ flex: 1, backgroundColor: '#FFEFD5' }}>
      <View style={styles.bgContainer}>
        <ImageBackground
          source={BG_IMAGE}
          style={styles.bg}
          resizeMode="cover"
        />
      </View>
      {showBack && (
        <TouchableOpacity style={styles.backBtn} onPress={onBack}>
          <Ionicons name="chevron-back" size={28} color="#333" />
        </TouchableOpacity>
      )}
      <View style={styles.cardWrapper}>
        <View style={styles.card}>
          {children}
        </View>
      </View>
    </SafeAreaWrapper>
  );
};

const styles = StyleSheet.create({
  bgContainer: {
    height: IMAGE_HEIGHT,
    width: '100%',
    backgroundColor: '#FFEFD5',
    position: 'absolute',
    top: 60,
  },
  bg: {
    width: '100%',
    height: '100%',
  },
  backBtn: {
    position: 'absolute',
    top: 50,
    left: 18,
    zIndex: 20,
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  cardWrapper: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: CARD_HEIGHT,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  card: {
    width: '100%',
    maxWidth: CARD_MAX_WIDTH,
    height: '105%',
    alignSelf: 'center',
    backgroundColor: '#fff',
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    paddingHorizontal: 24,
    paddingTop: 32,
    paddingBottom: 32,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.12,
    shadowRadius: 16,
    elevation: 8,
    position: 'relative',
  },
});

export default AuthBackground; 