import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Alert, ScrollView, StyleSheet } from 'react-native';

import AddressInfoCard from './AddressInfoCard';
import FinalOrderSummaryCard from './FinalOrderSummaryCard';
import OrderSummaryCard from './OrderSummaryCard';
import PaymentInfoCard from './PaymentInfoCard';

import SafeAreaWrapper from '@/components/Common/SafeAreaWrapper';
import { getUserAddress, getUserDetails } from '@/services/AddressService';
import { getSavedCards } from '@/services/SavedCardService';
import { useCart } from '../Cart/CartContext';

const API_URL = 'http://192.168.1.150:5000/api';

export default function CheckoutScreen() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [address, setAddress] = useState(null);
  const [card, setCard] = useState(null);

  const { cartItems, loadCart, clearCart } = useCart();

  useEffect(() => {
    const fetchData = async () => {
      const userId = await AsyncStorage.getItem('userId');
      const token = await AsyncStorage.getItem('token');
      if (!userId || !token) return;

      const userData = await getUserDetails(userId, token);
      const addressData = await getUserAddress(userId, token);
      const cards = await getSavedCards(token);
      const defaultCard = cards.find((c) => c.isDefault);

      setUser({
        id: userId,
        name: `${userData.firstName} ${userData.lastName}`,
        phone: userData.phone
      });
      setAddress(addressData);
      setCard(defaultCard || null);

      await loadCart();
    };

    fetchData();
  }, []);

  const itemTotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const deliveryFee = 2.0;
  const taxes = 0.5;
  const total = itemTotal + deliveryFee + taxes;

  const handlePlaceOrder = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      if (!user?.id || !address) {
        Alert.alert("Missing Info", "User or address information is incomplete.");
        return;
      }

      const payload = {
        userId: user.id,
        vendorId: cartItems[0]?.vendorId,
        addressId: address._id,
        paymentMethod: "Card",
        cardLast4: card?.last4 || "",
        cardBrand: card?.brand || "",
      };

      const headers = { Authorization: `Bearer ${token}` };

      const response = await axios.post(`${API_URL}/orders/place`, payload, { headers });

      const orderId = response.data?.order?.orderId || response.data?.orderId;
      if (orderId) {
        await clearCart();
        router.push(`/order_success?orderId=${orderId}`);
      } else {
        throw new Error('Order ID missing in response');
      }
    } catch (error) {
      console.error('❌ Order failed:', error.message);
      router.push('/order_failed');
    }
  };


  return (
    <SafeAreaWrapper style={styles.safe}>
      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        <AddressInfoCard
          address={address}
          user={user}
          onEditAddress={() => router.push('/address_from')}
        />

        <PaymentInfoCard
          card={card}
          onEditCard={() => router.push('/payment_methods')}
        />

        <OrderSummaryCard
          itemTotal={itemTotal}
          deliveryFee={deliveryFee}
          total={total}
          cartCount={cartItems.length}
        />

        <FinalOrderSummaryCard
          total={total}
          onConfirm={handlePlaceOrder}
        />
      </ScrollView>
    </SafeAreaWrapper>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#F7FDF4',
  },
  container: {
    padding: 16,
    paddingBottom: 180,
  },
});
