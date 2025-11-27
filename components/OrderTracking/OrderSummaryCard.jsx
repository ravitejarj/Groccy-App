import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function OrderSummaryCard({ order }) {
  const fullAddress = [
    order.street,
    order.apartment,
    `${order.city}, ${order.state} ${order.zipCode}`,
  ]
    .filter(Boolean)
    .join(', ');

  return (
    <View style={styles.card}>
      <Text style={styles.row}>📍 Delivering to: <Text style={styles.bold}>{fullAddress}</Text></Text>
      <Text style={styles.row}>🏪 Store: <Text style={styles.bold}>{order.vendorId?.name || 'Store'}</Text></Text>
      <Text style={styles.row}>📦 {order.items?.length || 0} items • ${order.total?.toFixed(2) || '0.00'}</Text>
      <Text style={styles.row}>🧾 Order ID: <Text style={styles.bold}>{String(order.orderId)}</Text></Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFF',
    borderRadius: 16,
    padding: 16,
    marginHorizontal: 16,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    elevation: 2,
  },
  row: {
    fontSize: 13,
    color: '#333',
    marginBottom: 6,
  },
  bold: {
    fontWeight: '600',
    color: '#222',
  },
});
