import { useRouter } from 'expo-router';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function CartCheckoutBar({ total }) {
  const router = useRouter();

  return (
    <View style={styles.stickyFooter}>
      <Text style={styles.totalText}>Subtotal: ${total.toFixed(2)}</Text>
      <TouchableOpacity style={styles.checkoutBtn} onPress={() => router.push('/checkout_screen')}>
        <Text style={styles.checkoutText}>Checkout</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  stickyFooter: {
    position: 'absolute',
    bottom: 70,
    left: 16,
    right: 16,
    zIndex: 999,
    backgroundColor: '#FFF',
    borderRadius: 30,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 18,
    paddingHorizontal: 20,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 10,
    elevation: 4,
  },
  totalText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  checkoutBtn: {
    backgroundColor: '#FF5722',
    paddingHorizontal: 36,
    paddingVertical: 14,
    borderRadius: 24,
  },
  checkoutText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '700',
  },
});
