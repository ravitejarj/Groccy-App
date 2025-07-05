import SafeAreaWrapper from '@/components/Common/SafeAreaWrapper';
import { fetchOrdersTabData } from '@/services/OrderService';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

const OrdersScreen = () => {
  const [activeTab, setActiveTab] = useState('current');
  const [orders, setOrders] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const userId = await AsyncStorage.getItem('userId');
        if (!userId) return;
        const data = await fetchOrdersTabData(userId);
        setOrders(data);
      } catch (error) {
        console.error('❌ Error fetching orders tab data:', error);
      }
    };
    fetchOrders();
  }, []);

  const currentOrders = orders.filter(
    (o) => o.status !== 'delivered' && o.status !== 'cancelled'
  );
  const pastOrders = orders.filter(
    (o) => o.status === 'delivered' || o.status === 'cancelled'
  );
  const data = activeTab === 'current' ? currentOrders : pastOrders;

  const handleOrderPress = (order) => {
    const trackingStatuses = ['confirmed', 'on_the_way'];
    const destination = trackingStatuses.includes(order.status)
      ? '/order_track'
      : '/order_summary';

    router.push({
      pathname: destination,
      params: { orderId: order.orderId },
    });
  };

  const getStatusStyle = (status) => {
    switch (status) {
      case 'delivered':
        return {
          container: {
            backgroundColor: '#E8F5E9',
            borderColor: '#66D575',
            borderWidth: 1,
          },
          text: { color: '#4CAF50' },
        };
      case 'cancelled':
        return {
          container: {
            backgroundColor: '#FFEBEE',
            borderColor: '#FF3D00',
            borderWidth: 1,
          },
          text: { color: '#F44336' },
        };
      default:
        return {
          container: {
            backgroundColor: '#FFF8F6',
            borderColor: '#FFA500',
            borderWidth: 1,
          },
          text: { color: '#FFA500' },
        };
    }
  };

  const renderOrderItem = ({ item }) => {
    const statusStyle = getStatusStyle(item.status);
    const date = new Date(item.createdAt).toDateString();
    const firstItem = item.items?.[0];

    return (
      <TouchableOpacity
        style={styles.orderCard}
        onPress={() => handleOrderPress(item)}
      >
        {/* 🧹 Image removed from UI */}

        <View style={styles.orderInfo}>
          <View style={styles.orderHeader}>
            <View>
              <Text style={styles.storeName}>
                Order #{item.orderId.slice(-6)}
              </Text>
              <Text style={styles.productName}>
                {firstItem?.name || 'Multiple Items'}
              </Text>
            </View>
            <View style={[styles.statusContainer, statusStyle.container]}>
              <Text style={[styles.statusText, statusStyle.text]}>
                {item.status}
              </Text>
            </View>
          </View>

          <View style={styles.orderFooter}>
            <View style={styles.dateContainer}>
              <Ionicons name="calendar-outline" size={16} color="#666" />
              <Text style={styles.dateText}>{date}</Text>
            </View>
            <Text style={styles.priceText}>${item.total.toFixed(2)}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaWrapper style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>My Orders</Text>
      </View>

      <View style={styles.tabPillContainer}>
        <TouchableOpacity
          style={[
            styles.tabPill,
            activeTab === 'current' && styles.activeTabPill,
          ]}
          onPress={() => setActiveTab('current')}
        >
          <Text
            style={[
              styles.tabPillText,
              activeTab === 'current' && styles.activeTabPillText,
            ]}
          >
            Current Orders
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.tabPill,
            activeTab === 'past' && styles.activeTabPill,
          ]}
          onPress={() => setActiveTab('past')}
        >
          <Text
            style={[
              styles.tabPillText,
              activeTab === 'past' && styles.activeTabPillText,
            ]}
          >
            Past Orders
          </Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={data}
        renderItem={renderOrderItem}
        keyExtractor={(item) => item._id}
        contentContainerStyle={styles.ordersList}
        showsVerticalScrollIndicator={false}
        style={{ backgroundColor: '#F6F6F6' }}
      />
    </SafeAreaWrapper>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F6F6F6' },
  header: { padding: 16 },
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333',
    alignSelf: 'center',
  },
  tabPillContainer: {
    flexDirection: 'row',
    backgroundColor: '#F5F5F5',
    borderRadius: 100,
    marginHorizontal: 16,
    marginBottom: 16,
    marginTop: 8,
    alignSelf: 'center',
    padding: 4,
  },
  tabPill: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 100,
    backgroundColor: 'transparent',
  },
  activeTabPill: { backgroundColor: '#111' },
  tabPillText: { fontSize: 16, fontWeight: '400', color: '#111' },
  activeTabPillText: { color: '#FFF', fontWeight: '400' },
  ordersList: { padding: 16, paddingTop: 0 },
  orderCard: {
    flexDirection: 'row',
    backgroundColor: '#FFF',
    borderRadius: 12,
    marginBottom: 16,
    padding: 12,
  },
  // 🧹 Removed unused styles:
  // orderImageContainer: { ... },
  // imageContainer: { ... },
  // productImage: { ... },
  orderInfo: { flex: 1 },
  orderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  storeName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  productName: { fontSize: 14, color: '#666' },
  statusContainer: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 100,
  },
  statusText: { fontSize: 12, fontWeight: '500' },
  orderFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dateContainer: { flexDirection: 'row', alignItems: 'center' },
  dateText: { fontSize: 12, color: '#666', marginLeft: 4 },
  priceText: { fontSize: 16, fontWeight: '600', color: '#333' },
});

export default OrdersScreen;
