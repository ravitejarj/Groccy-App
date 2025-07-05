import React, { useEffect, useState } from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter, useLocalSearchParams } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

import SafeAreaWrapper from '@/components/Common/SafeAreaWrapper';
import ProductImageCarousel from './ProductImageCarousel';
import ProductInfoCard from './ProductInfoCard';
import AddToCartFooter from './AddToCartFooter';
import { useCart } from '@/components/Cart/CartContext';

const BASE_URL = 'http://192.168.1.150:5000';

export default function ProductDetailScreen() {
  const { productId, vendorId } = useLocalSearchParams();
  const router = useRouter();

  const { cartItems, loadCart, addToCart, decreaseQty } = useCart();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(0);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  const fetchProduct = async () => {
    try {
      const res = await axios.get(
        `${BASE_URL}/api/grocery/vendor/${vendorId}/product/${productId}`
      );
      setProduct(res.data.product || res.data);
    } catch (err) {
      console.error('❌ Product fetch error:', err.message);
    }
  };

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      await fetchProduct();
      setLoading(false);
    };
    load();
  }, [productId, vendorId]);

  useEffect(() => {
    const match = cartItems.find(
      (item) =>
        item.productId === productId &&
        item.vendorId === vendorId
    );
    setQuantity(match?.quantity || 0);
  }, [cartItems, productId, vendorId]);

  const increment = async () => {
    try {
      setUpdating(true);
      await addToCart(product, vendorId); // ✅ conflict-safe add
    } catch (err) {
      console.error('❌ Add to cart error:', err.message);
    } finally {
      setUpdating(false);
    }
  };

  const decrement = async () => {
    if (quantity === 0) return;

    try {
      setUpdating(true);
      const token = await AsyncStorage.getItem('token');
      const userId = await AsyncStorage.getItem('userId');

      const newQuantity = quantity - 1;

      await axios.put(
        `${BASE_URL}/api/cart/update`,
        {
          userId,
          vendorId,
          productId: product._id,
          quantity: newQuantity,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setQuantity(newQuantity);
      await loadCart();
    } catch (err) {
      console.error('❌ Decrement error:', err.message);
    } finally {
      setUpdating(false);
    }
  };

  if (loading) {
    return <ActivityIndicator size="large" color="#FF5722" style={{ marginTop: 100 }} />;
  }

  return (
    <SafeAreaWrapper style={styles.container}>
      <View>
        <ProductImageCarousel images={product.images || []} />
        <View style={styles.overlayHeader}>
          <TouchableOpacity onPress={() => router.back()} style={styles.iconBtn}>
            <Ionicons name="chevron-back" size={22} color="#FFF" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {}} style={styles.iconBtn}>
            <Ionicons name="share-social-outline" size={20} color="#FFF" />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView style={styles.scroll}>
        <ProductInfoCard
          name={product.name}
          description={product.description}
          price={product.price}
          stock={product.stock}
          weight={product.weight}
          categoryName={product.category?.name}
          subcategoryName={product.subcategory?.name}
          vendorName={product.vendor?.name}
          vendorLogo={product.vendor?.logo}
        />
      </ScrollView>

      <AddToCartFooter
        quantity={quantity}
        increment={increment}
        decrement={decrement}
        stock={product.stock}
        cartCount={cartItems.length}
        isLoading={updating}
      />
    </SafeAreaWrapper>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9F9F9',
  },
  scroll: {
    flex: 1,
  },
  overlayHeader: {
    position: 'absolute',
    top: 20,
    left: 16,
    right: 16,
    zIndex: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  iconBtn: {
    backgroundColor: '#0006',
    padding: 10,
    borderRadius: 22,
    shadowColor: '#000',
    shadowOpacity: 0.12,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 1 },
    elevation: 2,
  },
});
