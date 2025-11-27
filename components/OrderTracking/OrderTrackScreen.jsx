import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import SafeAreaWrapper from '@/components/Common/SafeAreaWrapper';
import BottomTabBar from '@/components/Navigation/BottomTabBar';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

import OrderTimeline from './OrderTimeline';
import OrderDeliveryCard from './OrderDeliveryCard';
import OrderSummaryCard from './OrderSummaryCard';

const API_URL = 'http://192.168.1.150:5000/api';

export default function OrderTrackScreen() {
  const router = useRouter();
  const { orderId } = useLocalSearchParams();
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
        console.error('❌ Failed to load order:', err.message);
      } finally {
        setLoading(false);
      }
    };

    if (orderId) fetchOrder();
  }, [orderId]);

  if (loading) {
    return (
      <SafeAreaWrapper style={styles.safeArea}>
        <ActivityIndicator size="large" color="#FF5722" />
      </SafeAreaWrapper>
    );
  }

  if (!order) {
    return (
      <SafeAreaWrapper style={styles.safeArea}>
        <Text style={{ textAlign: 'center', color: '#999' }}>Order not found.</Text>
      </SafeAreaWrapper>
    );
  }

  return (
    <SafeAreaWrapper style={styles.safeArea}>
      {/* Header */}
      <View style={styles.headerRow}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <Ionicons name="chevron-back" size={24} color="#222" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Track Order</Text>
        <Text style={styles.etaText}>🕒 ETA: 12:30 PM</Text>
      </View>

      {/* Sticky Map */}
      <View style={styles.mapPreview}>
        <Text style={{ color: '#777' }}>🗺️ Map preview will be shown here</Text>
      </View>

      {/* Scrollable Info */}
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <OrderTimeline />
        <OrderDeliveryCard />
        <OrderSummaryCard order={order} />
        <View style={{ height: 100 }} />
      </ScrollView>

      {/* Bottom Nav */}
      <View style={styles.bottomNav}>
        <BottomTabBar />
      </View>
    </SafeAreaWrapper>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#FAFAFA' },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#FFF',
    borderBottomWidth: 0.5,
    borderBottomColor: '#DDD',
  },
  backBtn: { marginRight: 8 },
  headerTitle: { fontSize: 18, fontWeight: '600', color: '#222', flex: 1 },
  etaText: { fontSize: 13, color: '#FF5722', fontWeight: '600' },

  mapPreview: {
    height: 150,
    borderRadius: 16,
    backgroundColor: '#EAF0EC',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 16,
    marginTop: 10,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    elevation: 2,
  },

  scrollContent: {
    paddingBottom: 120,
  },

  bottomNav: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(255,255,255,0.95)',
    borderTopWidth: 0.5,
    borderTopColor: '#DDD',
  },
});
