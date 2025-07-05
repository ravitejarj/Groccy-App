import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { View, Text, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function AddToCartFooter({
  quantity,
  increment,
  decrement,
  stock,
  cartCount,
  isLoading,
}) {
  const router = useRouter();
  const isInCart = quantity > 0;
  const showViewCart = cartCount > 0;

  return (
    <View style={styles.footerWrapper}>
      <SafeAreaView edges={['bottom']} style={styles.footer}>
        {showViewCart && (
          <TouchableOpacity
            style={styles.viewCartButton}
            onPress={() => router.push('/(tabs)/cart')}
          >
            <Ionicons name="cart" size={16} color="#FF5722" style={styles.iconLeft} />
            <Text style={styles.viewCartText}>View Cart</Text>
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{cartCount}</Text>
            </View>
          </TouchableOpacity>
        )}

        {!isInCart ? (
          <TouchableOpacity
            onPress={increment}
            style={[styles.cartButton, stock === 0 && styles.disabled]}
            disabled={stock === 0 || isLoading}
          >
            {isLoading ? (
              <ActivityIndicator color="#FFF" />
            ) : (
              <>
                <Ionicons name="cart" size={16} color="#FFF" style={styles.cartIcon} />
                <Text style={styles.cartButtonText}>
                  {stock === 0 ? 'Out of Stock' : 'Add to Cart'}
                </Text>
              </>
            )}
          </TouchableOpacity>
        ) : (
          <View style={styles.stepper}>
            <TouchableOpacity
              onPress={decrement}
              style={styles.stepBtn}
              disabled={isLoading}
            >
              <Text style={styles.stepText}>−</Text>
            </TouchableOpacity>
            <Text style={styles.qtyText}>{quantity}</Text>
            <TouchableOpacity
              onPress={increment}
              style={styles.stepBtn}
              disabled={isLoading}
            >
              <Text style={styles.stepText}>+</Text>
            </TouchableOpacity>
          </View>
        )}
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  footer: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderColor: '#EAEAEA',
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 12, // ✅ fills safe area at bottom
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowRadius: 2,
    shadowOffset: { width: 0, height: -1 },
    elevation: 10,
    zIndex: 20,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  viewCartButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF3ED',
    borderColor: '#FF5722',
    borderWidth: 1,
    borderRadius: 28,
    paddingVertical: 12,
    paddingHorizontal: 20,
    height: 52,
    minWidth: 130,
    justifyContent: 'center',
    marginRight: 8,
  },
  iconLeft: {
    marginRight: 6,
  },
  viewCartText: {
    color: '#FF5722',
    fontWeight: '600',
    fontSize: 14,
  },
  badge: {
    backgroundColor: '#FF5722',
    borderRadius: 10,
    paddingHorizontal: 6,
    paddingVertical: 1,
    marginLeft: 6,
    minWidth: 18,
    alignItems: 'center',
  },
  badgeText: {
    color: '#FFF',
    fontWeight: '700',
    fontSize: 11,
  },
  cartButton: {
    flexDirection: 'row',
    backgroundColor: '#FF5722',
    borderRadius: 28,
    paddingVertical: 14,
    paddingHorizontal: 24,
    alignItems: 'center',
    justifyContent: 'center',
    height: 52,
    flex: 1,
  },
  cartIcon: {
    marginRight: 8,
  },
  cartButtonText: {
    color: '#FFF',
    fontWeight: '700',
    fontSize: 14,
  },
  disabled: {
    backgroundColor: '#CCC',
  },
  stepper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FF5722',
    borderRadius: 28,
    height: 52,
    paddingHorizontal: 24,
    flex: 1,
    marginLeft: 8,
  },
  stepBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FF5722',
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepText: {
    color: '#FFF',
    fontSize: 22,
    fontWeight: '700',
  },
  qtyText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
    minWidth: 24,
  },
  footerWrapper: {
    position: 'absolute',
    bottom: -4,
    left: 0,
    right: 0,
    backgroundColor: '#FFF',
  },
});
