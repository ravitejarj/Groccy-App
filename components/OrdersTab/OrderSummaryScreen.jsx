import SafeAreaWrapper from '@/components/Common/SafeAreaWrapper';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import AddressInfoCard from '@/components/Checkout/AddressInfoCard';
import PaymentInfoCard from '@/components/Checkout/PaymentInfoCard';
import OrderItemCard from './OrderItemCard';
import OrderTotalSummaryCard from './OrderTotalSummaryCard';

const API_URL = 'http://192.168.1.150:5000/api';

export default function OrderSummaryScreen() {
  const { orderId } = useLocalSearchParams();
  const router = useRouter();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        const res = await axios.get(`${API_URL}/orders/by-order-id/${orderId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setOrder(res.data);
      } catch (err) {
        console.error('❌ Failed to fetch order:', err.message);
      } finally {
        setLoading(false);
      }
    };

    if (orderId) fetchOrder();
  }, [orderId]);

  if (loading) {
    return (
      <SafeAreaWrapper style={styles.container}>
        <ActivityIndicator size="large" color="#FF5722" />
      </SafeAreaWrapper>
    );
  }

  if (!order) {
    return (
      <SafeAreaWrapper style={styles.container}>
        <Text style={{ textAlign: 'center', color: '#999' }}>Order not found.</Text>
      </SafeAreaWrapper>
    );
  }

  const itemTotal = order.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const deliveryFee = order.deliveryFee || 0;
  const taxes = order.taxes || 0;
  const total = itemTotal + deliveryFee + taxes;

  return (
    <SafeAreaWrapper style={styles.container}>
      {/* 🔙 Back Header */}
      <View style={styles.headerWrapper}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <Ionicons name="chevron-back" size={24} color="#222" />
        </TouchableOpacity>
        <View style={styles.headerTextBlock}>
          <Text style={styles.storeName}>{order.vendorId?.name}</Text>
          <Text style={styles.orderIdText}>Order #{order.orderId}</Text>
        </View>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false} style={{ backgroundColor: '#F6F6F6' }}>
        {/* 🧺 Items */}
        <View style={{ paddingHorizontal: 16, paddingTop: 12 }}>
          {order.items.map((item, idx) => (
            <OrderItemCard key={idx} item={item} />
          ))}
        </View>

        {/* 📍 Address */}
        <View style={{ marginTop: 16, marginBottom: -8 }}>
          <AddressInfoCard
            address={{
              street: order.street,
              apartment: order.apartment,
              city: order.city,
              state: order.state,
              zipCode: order.zipCode,
            }}
            user={{ name: order.vendorId?.name || 'Store', phone: '' }}
            onEditAddress={() => {}}
          />
        </View>

        {/* 💳 Card */}
        <View style={{ marginBottom: -8 }}>
          <PaymentInfoCard
            card={{ brand: 'Visa', last4: '1234' }}
            onEditCard={() => {}}
          />
        </View>

        {/* 💰 Total Summary */}
        <View style={{ marginTop: 8 }}>
          <OrderTotalSummaryCard
            itemTotal={itemTotal}
            deliveryFee={deliveryFee}
            tax={taxes}
            total={total}
          />
        </View>

        {/* 💬 Help Section */}
        <View style={styles.helpWrapper}>
          <Text style={styles.helpText}>Need help with this order?</Text>
          <TouchableOpacity onPress={() => router.push('/chat_support')}>
            <Text style={styles.helpLink}>💬 Chat with Support</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaWrapper>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F6F6F6' },
  headerWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 14,
    backgroundColor: '#FFF',
    borderBottomColor: '#EEE',
    borderBottomWidth: 1,
    shadowColor: '#000',
    shadowOpacity: 0.03,
    shadowRadius: 3,
    elevation: 2,
  },
  backBtn: {
    padding: 4,
  },
  headerTextBlock: {
    alignItems: 'center',
  },
  storeName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#222',
  },
  orderIdText: {
    fontSize: 14,
    color: '#888',
    marginTop: 2,
  },
  helpWrapper: {
    padding: 20,
    alignItems: 'center',
  },
  helpText: {
    fontSize: 14,
    color: '#777',
    marginBottom: 4,
  },
  helpLink: {
    fontSize: 15,
    color: '#FF5722',
    fontWeight: '600',
  },
});