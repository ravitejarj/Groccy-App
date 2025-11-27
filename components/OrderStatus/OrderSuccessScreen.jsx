import SafeAreaWrapper from '@/components/Common/SafeAreaWrapper';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import axios from 'axios';
import { useLocalSearchParams, useRouter } from 'expo-router';
import LottieView from 'lottie-react-native';
import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  BackHandler,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

const API_URL = 'http://192.168.1.150:5000/api';

export default function OrderSuccessScreen() {
  const router = useRouter();
  const { orderId } = useLocalSearchParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const deliveryTime = '12:45 PM';

  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => true;
      const sub = BackHandler.addEventListener('hardwareBackPress', onBackPress);
      return () => sub.remove();
    }, [])
  );

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        const res = await axios.get(`${API_URL}/orders/by-order-id/${orderId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setOrder(res.data);
      } catch (err) {
        console.error('❌ Failed to load order:', err.message);
      } finally {
        setLoading(false);
      }
    };

    if (orderId) fetchOrder();
  }, [orderId]);

  const handleTrackOrder = () => {
    if (order?.orderId) {
      router.push({
        pathname: '/order_track',
        params: { orderId: order.orderId },
      });
    }
  };

  const handleGoHome = () => router.push('/(tabs)');

  if (loading) {
    return (
      <SafeAreaWrapper style={styles.safe}>
        <ActivityIndicator size="large" color="#FF5722" />
      </SafeAreaWrapper>
    );
  }

  if (!order) {
    return (
      <SafeAreaWrapper style={styles.safe}>
        <Text style={{ textAlign: 'center', color: '#999' }}>Order not found.</Text>
      </SafeAreaWrapper>
    );
  }

  const storeName = order.vendorId?.name || 'Store';
  const itemCount = order.items?.length || 0;
  const totalAmount = `$${order.total?.toFixed(2) || '0.00'}`;

  return (
    <SafeAreaWrapper style={styles.safe}>
      <View style={styles.container}>
        <View style={styles.lottieBox}>
          <View style={styles.circle}>
            <LottieView
              source={require('@/assets/mobile_images/animations/order_success.json')}
              autoPlay
              loop
              style={{ width: 150, height: 150 }}
            />
          </View>
        </View>

        <Text style={styles.title}>✅ Your Order is Confirmed!</Text>
        <Text style={styles.subText}>
          Order <Text style={styles.bold}>{order.orderId}</Text> from{' '}
          <Text style={styles.bold}>{storeName}</Text>
        </Text>

        <View style={styles.etaBox}>
          <Ionicons name="time-outline" size={14} color="#4CAF50" />
          <Text style={styles.etaText}> Estimated delivery by {deliveryTime}</Text>
        </View>

        <Text style={styles.orderSummary}>
          {itemCount} items • Total {totalAmount}
        </Text>

        <TouchableOpacity style={styles.primaryBtn} onPress={handleTrackOrder}>
          <Ionicons name="navigate" size={18} color="#FFF" style={{ marginRight: 8 }} />
          <Text style={styles.primaryBtnText}>Track My Order</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.secondaryBtn} onPress={handleGoHome}>
          <Ionicons name="home" size={18} color="#FF5722" style={{ marginRight: 8 }} />
          <Text style={styles.secondaryBtnText}>Go to Home</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaWrapper>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#FFF' },
  container: {
    flex: 1,
    padding: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  lottieBox: {
    marginBottom: 12,
  },
  circle: {
    backgroundColor: '#E6F4E6',
    padding: 24,
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#4CAF50',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 8,
    elevation: 4,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: '#333',
    textAlign: 'center',
    marginBottom: 6,
  },
  subText: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    lineHeight: 20,
  },
  bold: {
    fontWeight: '600',
    color: '#222',
  },
  etaBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E8F5E9',
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 20,
    marginTop: 10,
    marginBottom: 6,
  },
  etaText: {
    fontSize: 13,
    color: '#2E7D32',
    fontWeight: '500',
  },
  orderSummary: {
    fontSize: 13,
    color: '#777',
    marginBottom: 20,
  },
  primaryBtn: {
    flexDirection: 'row',
    backgroundColor: '#FF5722',
    borderRadius: 24,
    paddingVertical: 14,
    paddingHorizontal: 32,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#FF5722',
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 3,
    marginBottom: 12,
  },
  primaryBtnText: {
    color: '#FFF',
    fontSize: 15,
    fontWeight: '600',
  },
  secondaryBtn: {
    flexDirection: 'row',
    borderColor: '#FF5722',
    borderWidth: 1.5,
    borderRadius: 24,
    paddingVertical: 13,
    paddingHorizontal: 32,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  secondaryBtnText: {
    color: '#FF5722',
    fontSize: 15,
    fontWeight: '600',
  },
});
