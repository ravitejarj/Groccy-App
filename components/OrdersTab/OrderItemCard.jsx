import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function OrderItemCard({ item }) {
  return (
    <View style={styles.card}>
      <View style={styles.left}>
        <View>
          <Text style={styles.name}>{item.name}</Text>
          <Text style={styles.price}>${item.price.toFixed(2)}</Text>
        </View>
      </View>
      <View style={styles.right}>
        <View style={styles.quantityBadge}>
          <Text style={styles.quantityText}>×{item.quantity}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 1,
  },
  left: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  right: {
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  name: {
    fontSize: 14,
    fontWeight: '600',
    color: '#222',
  },
  price: {
    fontSize: 13,
    fontWeight: '500',
    color: '#666',
    marginTop: 2,
  },
  quantityBadge: {
    backgroundColor: '#FF5722',
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  quantityText: {
    color: '#FFF',
    fontSize: 13,
    fontWeight: '600',
  },
});
