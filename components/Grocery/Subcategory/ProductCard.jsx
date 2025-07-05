import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Animated,
} from 'react-native';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import Toast from 'react-native-toast-message';
import { useCart } from '@/components/Cart/CartContext';

const ProductCard = ({ product, vendorId, width = '48%' }) => {
  const router = useRouter();
  const { cartItems, loadCart, addToCart } = useCart();

  const [quantity, setQuantity] = useState(0);
  const [loading, setLoading] = useState(false);
  const scaleAnim = useRef(new Animated.Value(1)).current;

  // ✅ Keep quantity synced from context
  useEffect(() => {
    const match = cartItems.find(
      (item) =>
        item.productId === product._id &&
        item.vendorId === vendorId
    );
    setQuantity(match?.quantity || 0);
  }, [cartItems, product._id, vendorId]);

  const bump = () => {
    scaleAnim.setValue(1.1);
    Animated.spring(scaleAnim, {
      toValue: 1,
      friction: 3,
      useNativeDriver: true,
    }).start();
  };

  // ✅ Add product to cart and reload cart state
  const handleAddToCart = async () => {
    try {
      setLoading(true);
      await addToCart(product, vendorId);
      await loadCart(); // ✅ Ensures quantity sync
      bump();
    } catch (err) {
      console.error('🛒 Add to cart error:', err);
      Toast.show({ type: 'error', text1: 'Failed to add to cart' });
    } finally {
      setLoading(false);
    }
  };

  const increment = async () => {
    try {
      setLoading(true);
      await addToCart(product, vendorId);
      await loadCart(); // ✅ Sync after increment
      bump();
    } catch (err) {
      console.error('➕ Increment error:', err);
      Toast.show({ type: 'error', text1: 'Error increasing quantity' });
    } finally {
      setLoading(false);
    }
  };

  const decrement = async () => {
    try {
      if (quantity === 0) return;
      setLoading(true);
      const userId = await AsyncStorage.getItem('userId');
      const token = await AsyncStorage.getItem('token');
      const newQty = quantity - 1;

      await axios.put('http://192.168.1.150:5000/api/cart/update', {
        userId,
        vendorId,
        productId: product._id,
        quantity: newQty,
      }, {
        headers: { Authorization: `Bearer ${token}` },
      });

      await loadCart(); // ✅ Re-sync after decrement
    } catch (err) {
      console.error('➖ Decrement error:', err);
      Toast.show({ type: 'error', text1: 'Error decreasing quantity' });
    } finally {
      setLoading(false);
    }
  };

  const handlePress = () => {
    router.push(`/product/${product._id}?vendorId=${vendorId}`);
  };

  return (
    <View style={[styles.card, { width }]}>
      <TouchableOpacity onPress={handlePress} activeOpacity={0.8}>
        <View style={styles.imageWrapper}>
          <Image
            source={{ uri: product?.images?.[0] || 'https://res.cloudinary.com/dh5liqius/image/upload/v1716406939/groccy/temp/dummy.png' }}
            style={styles.image}
          />
          <View style={styles.overlay}>
            {quantity > 0 ? (
              <Animated.View style={[styles.stepperInline, { transform: [{ scale: scaleAnim }] }]}>
                <TouchableOpacity onPress={decrement} style={styles.stepBtnSmall} disabled={loading}>
                  <Text style={styles.stepText}>−</Text>
                </TouchableOpacity>
                <Text style={styles.qtyTextSmall}>{quantity}</Text>
                <TouchableOpacity onPress={increment} style={styles.stepBtnSmall} disabled={loading}>
                  <Text style={styles.stepText}>+</Text>
                </TouchableOpacity>
              </Animated.View>
            ) : (
              <TouchableOpacity
                style={styles.circleButton}
                onPress={handleAddToCart}
                disabled={loading}
              >
                {loading ? (
                  <ActivityIndicator color="#fff" size="small" />
                ) : (
                  <Text style={styles.plusText}>+</Text>
                )}
              </TouchableOpacity>
            )}
          </View>
        </View>
      </TouchableOpacity>

      <Text style={styles.name} numberOfLines={2}>{product.name}</Text>
      <Text style={styles.price}>${product.price.toFixed(2)}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 8,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
  },
  imageWrapper: {
    position: 'relative',
    borderRadius: 12,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: 130,
    resizeMode: 'cover',
  },
  overlay: {
    position: 'absolute',
    bottom: 6,
    right: 6,
    flexDirection: 'row',
    alignItems: 'center',
  },
  circleButton: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: '#FF5722',
    justifyContent: 'center',
    alignItems: 'center',
  },
  plusText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: -1,
  },
  stepperInline: {
    flexDirection: 'row',
    backgroundColor: '#FF5722',
    borderRadius: 20,
    paddingHorizontal: 4,
    alignItems: 'center',
    height: 34,
  },
  stepBtnSmall: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#FF5722',
    justifyContent: 'center',
    alignItems: 'center',
  },
  qtyTextSmall: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 14,
    marginHorizontal: 6,
  },
  stepText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  name: {
    fontSize: 13,
    fontWeight: '600',
    marginTop: 8,
    color: '#222',
  },
  price: {
    fontSize: 14,
    fontWeight: 'bold',
    marginTop: 4,
    color: '#444',
  },
});

export default ProductCard;
