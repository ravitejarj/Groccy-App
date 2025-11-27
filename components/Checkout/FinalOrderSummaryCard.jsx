import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export default function FinalOrderSummaryCard({ total, onConfirm }) {
  return (
    <View style={styles.card}>
      <View style={styles.row}>
        <Text style={styles.label}>Grand Total</Text>
        <Text style={styles.total}>${total.toFixed(2)}</Text>
      </View>
      <TouchableOpacity style={styles.confirmButton} onPress={onConfirm}>
        <Text style={styles.buttonText}>Confirm Order</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFF',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 40,
    marginTop: 16,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 1,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#222',
  },
  total: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FF5722',
  },
  confirmButton: {
    backgroundColor: '#FF5722',
    paddingVertical: 14,
    borderRadius: 24,
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600',
  },
});
