import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function OrderSummaryCard({ itemTotal, deliveryFee, total, cartCount, showEstimate = false }) {
  const tax = 0;
  const deliveryOriginal = 5.99;
  const isFree = deliveryFee === 0;

  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Order Summary</Text>

      <View style={styles.row}>
        <Text style={styles.label}>
          Subtotal <Text style={styles.dim}>({cartCount} items)</Text>
        </Text>
        <Text style={styles.value}>${itemTotal.toFixed(2)}</Text>
      </View>

      <View style={styles.row}>
        <Text style={styles.label}>Taxes</Text>
        <Text style={styles.value}>${tax.toFixed(2)}</Text>
      </View>

      {/* 🔁 Conditional delivery fee */}
      {showEstimate ? (
        <View style={styles.row}>
          <Text style={styles.label}>Delivery Fee</Text>
          <Text style={styles.value}>Estimated at checkout</Text>
        </View>
      ) : (
        <View style={styles.row}>
          <Text style={styles.label}>Delivery Fee</Text>
          <View style={styles.deliveryFee}>
            {isFree ? (
              <>
                <Text style={styles.strike}>${deliveryOriginal.toFixed(2)}</Text>
                <View style={styles.badge}>
                  <Text style={styles.badgeText}>FREE</Text>
                </View>
              </>
            ) : (
              <Text style={styles.value}>${deliveryFee.toFixed(2)}</Text>
            )}
          </View>
        </View>
      )}

      <View style={styles.separator} />

      <View style={styles.row}>
        <Text style={styles.totalLabel}>Total</Text>
        <Text style={styles.totalValue}>${total.toFixed(2)}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    backgroundColor: '#FFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#222',
    marginBottom: 12,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  label: {
    fontSize: 14,
    color: '#666',
  },
  dim: {
    fontSize: 13,
    color: '#999',
  },
  value: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
  },
  deliveryFee: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  strike: {
    textDecorationLine: 'line-through',
    fontSize: 14,
    color: '#999',
    marginRight: 8,
  },
  badge: {
    backgroundColor: '#4CAF50',
    borderRadius: 4,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  badgeText: {
    color: '#FFF',
    fontSize: 12,
    fontWeight: '600',
  },
  separator: {
    borderTopWidth: 1,
    borderTopColor: '#EEE',
    marginVertical: 10,
  },
  totalLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#222',
  },
  totalValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FF5722',
  },
});
