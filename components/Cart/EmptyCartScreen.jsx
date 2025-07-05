// components/Cart/EmptyCartScreen.jsx

import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

const { width } = Dimensions.get('window');

export default function EmptyCart() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>My Cart</Text>

      <Image
        source={require('@/assets/mobile_images/cart/empty_cart.png')}
        style={styles.image}
        resizeMode="contain"
      />

      <Text style={styles.title}>Your cart is empty!</Text>
      <Text style={styles.subtitle}>
        Explore and add items to the cart to show here...
      </Text>

      <TouchableOpacity
        style={styles.exploreBtn}
        onPress={() => router.push('/(tabs)')}
        activeOpacity={0.8}
      >
        <Ionicons name="search-outline" size={18} color="#FFF" style={{ marginRight: 6 }} />
        <Text style={styles.exploreBtnText}>Explore</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  heading: {
    fontSize: 22,
    fontWeight: '700',
    color: '#222',
    marginBottom: 8,
  },
  image: {
    width: width * 0.6,
    height: width * 0.6,
    marginBottom: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 24,
    textAlign: 'center',
  },
  exploreBtn: {
    flexDirection: 'row',
    backgroundColor: '#FF5722',
    paddingHorizontal: 28,
    paddingVertical: 12,
    borderRadius: 24,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
  exploreBtnText: {
    color: '#FFF',
    fontSize: 15,
    fontWeight: '600',
  },
});
