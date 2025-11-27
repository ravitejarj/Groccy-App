import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import OrderSummaryCard from '@/components/Checkout/OrderSummaryCard';
import SafeAreaWrapper from '@/components/Common/SafeAreaWrapper';

import CartCheckoutBar from './CartCheckoutBar';
import { useCart } from './CartContext';
import CartItem from './CartItem';
import EmptyCart from './EmptyCartScreen';
import VendorHeaderCard from './VendorHeaderCard';

import { calculateCartTotal } from './helpers/calculateCartTotal';
import { useCartScreenLogic } from './hooks/useCartScreenLogic';

export default function CartScreen() {
  const router = useRouter();
  const {
    cartItems,
    storeName,
    storeAddress,
    addToCart,
    decreaseQty,
    removeFromCart,
  } = useCart();

  const { handleAdd, handleRemove, handleDelete } = useCartScreenLogic({
    cartItems,
    addToCart,
    decreaseQty,
    removeFromCart,
  });

  const { itemTotal, total } = calculateCartTotal(cartItems, 0);

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
                deliveryFee={0}
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
