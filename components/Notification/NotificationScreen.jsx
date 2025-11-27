import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  RefreshControl,
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import SafeAreaWrapper from '@/components/Common/SafeAreaWrapper';

const mockNotifications = [
  {
    id: '1',
    title: 'Order Successful',
    message: 'Order #SP-20223900 has been placed successfully.',
    time: '10:35 AM',
    type: 'success',
    isRead: false,
    dateGroup: 'Today',
  },
  {
    id: '2',
    title: '20% Discount',
    message: 'Share with friends and save on your next order.',
    time: '9:22 AM',
    type: 'offer',
    isRead: false,
    dateGroup: 'Today',
  },
  {
    id: '3',
    title: 'Order on the Way',
    message: 'Your driver is en route.',
    time: 'Yesterday, 7:18 PM',
    type: 'delivery',
    isRead: true,
    dateGroup: 'Earlier',
  },
];

const NotificationItem = ({ item }) => {
  const iconMap = {
    success: { name: 'checkmark-circle', color: '#4CAF50', bg: '#E8F5E9' },
    offer: { name: 'gift', color: '#FFC107', bg: '#FFF8E1' },
    delivery: { name: 'bicycle', color: '#2196F3', bg: '#E3F2FD' },
    default: { name: 'notifications', color: '#9E9E9E', bg: '#F5F5F5' },
  };

  const { name, color, bg } = iconMap[item.type] || iconMap.default;

  return (
    <View style={[styles.notificationCard, item.isRead && styles.readBg]}>
      <View style={[styles.iconCircle, { backgroundColor: bg }]}>
        <Ionicons name={name} size={20} color={color} />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.message}>{item.message}</Text>
        <Text style={styles.time}>{item.time}</Text>
      </View>
      {!item.isRead && (
        <View style={styles.dotWrapper}>
          <View style={styles.unreadDot} />
        </View>
      )}
    </View>
  );
};

const NotificationScreen = () => {
  const router = useRouter();
  const [notifications, setNotifications] = useState(mockNotifications);
  const [refreshing, setRefreshing] = useState(false);

  const grouped = notifications.reduce((acc, item) => {
    acc[item.dateGroup] = acc[item.dateGroup] || [];
    acc[item.dateGroup].push(item);
    return acc;
  }, {});

  const onRefresh = () => {
    setRefreshing(true);
    // Simulated refresh delay
    setTimeout(() => setRefreshing(false), 1000);
  };

  return (
    <SafeAreaWrapper style={{ flex: 1 }}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Notifications</Text>
      </View>

      <ScrollView
        style={styles.container}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        contentContainerStyle={{ paddingBottom: 20 }}
      >
        {Object.keys(grouped).length === 0 ? (
          <Text style={styles.emptyText}>No notifications yet.</Text>
        ) : (
          Object.keys(grouped).map((section) => (
            <View key={section}>
              <Text style={styles.sectionTitle}>{section}</Text>
              {grouped[section].map((item) => (
                <NotificationItem key={item.id} item={item} />
              ))}
            </View>
          ))
        )}
      </ScrollView>
    </SafeAreaWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomColor: '#EEE',
    borderBottomWidth: 1,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginLeft: 12,
    color: '#333',
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '600',
    backgroundColor: '#F6F6F6',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    color: '#555',
    marginTop: 16,
    marginBottom: 8,
  },
  notificationCard: {
    flexDirection: 'row',
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 14,
    marginBottom: 10,
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
  },
  readBg: {
    backgroundColor: '#F8F8F8',
  },
  iconCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontWeight: '600',
    fontSize: 15,
    color: '#333',
  },
  message: {
    fontSize: 13,
    color: '#666',
    marginTop: 2,
  },
  time: {
    fontSize: 11,
    color: '#AAA',
    marginTop: 2,
  },
  dotWrapper: {
    paddingLeft: 8,
  },
  unreadDot: {
    width: 8,
    height: 8,
    backgroundColor: '#FF3D00',
    borderRadius: 4,
  },
  emptyText: {
    textAlign: 'center',
    color: '#999',
    marginTop: 60,
    fontSize: 14,
  },
});

export default NotificationScreen;
