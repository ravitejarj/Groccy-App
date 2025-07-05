import React, { useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

import SafeAreaWrapper from '../../components/Common/SafeAreaWrapper';
import CartItem from './CartItem';
import CartCheckoutBar from './CartCheckoutBar';
import OrderSummaryCard from '@/components/Checkout/OrderSummaryCard';
import EmptyCart from './EmptyCartScreen';
import { useCart } from './CartContext';
import VendorHeaderCard from './VendorHeaderCard';

export default function CartScreen() {
  const router = useRouter();
  const {
    cartItems,
    storeName,
    storeAddress,
    addToCart,
    decreaseQty,
    removeFromCart,
    loadCart,
  } = useCart();

  useEffect(() => {
    loadCart();
  }, []);

  const handleAdd = (id) => {
    const product = cartItems.find((item) => item.productId === id);
    if (product) {
      addToCart(product, product.vendorId);
    }
  };

  const handleRemove = (id) => {
    const product = cartItems.find((item) => item.productId === id);
    if (product) {
      if (product.quantity === 1) {
        removeFromCart(id, product.vendorId);
      } else {
        decreaseQty(id, product.quantity - 1, product.vendorId);
      }
    }
  };

  const handleDelete = (id) => {
    const product = cartItems.find((item) => item.productId === id);
    if (product) {
      removeFromCart(id, product.vendorId);
    }
  };

  const itemTotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const deliveryFee = 0;
  const total = itemTotal + deliveryFee;

  if (!cartItems || cartItems.length === 0) {
    return <EmptyCart />;
  }

  return (
    <SafeAreaWrapper style={styles.safe}>
      <View style={styles.container}>
        <View style={styles.headerRow}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
            <Ionicons name="arrow-back" size={24} color="#333" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>My Cart ({cartItems.length})</Text>
        </View>

        <FlatList
          data={cartItems}
          keyExtractor={(item) => item.productId}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listContent}
          ListHeaderComponent={
            <>
              {storeName !== '' && (
                <VendorHeaderCard name={storeName} address={storeAddress} />
              )}

              <View style={styles.section}>
                {cartItems.map((item) => (
                  <CartItem
                    key={item.productId}
                    item={item}
                    onAdd={handleAdd}
                    onRemove={handleRemove}
                    onDelete={handleDelete}
                  />
                ))}
              </View>

              <OrderSummaryCard
                itemTotal={itemTotal}
                deliveryFee={deliveryFee}
                total={total}
                cartCount={cartItems.length}
                showEstimate={true}
              />
            </>
          }
          ListFooterComponent={<View style={{ height: 120 }} />}
        />

        <CartCheckoutBar total={total} />
      </View>
    </SafeAreaWrapper>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#F7FDF4',
  },
  container: {
    flex: 1,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 8,
    backgroundColor: '#F7FDF4',
  },
  backBtn: {
    marginRight: 12,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#222',
  },
  section: {
    backgroundColor: '#FFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 1,
  },
  listContent: {
    padding: 16,
    paddingBottom: 220,
  },
});
