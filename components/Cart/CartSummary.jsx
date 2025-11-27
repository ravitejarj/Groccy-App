import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export default function CartSummary({ itemTotal, deliveryFee = 25, showCheckout, onCheckout }) {
  const tax = showCheckout ? 25 : 0;
  const total = itemTotal + deliveryFee + tax;

  return (
    <>
      {/* 🧍 Address Section */}
      <View style={styles.addressBox}>
        <Text style={styles.sectionTitle}>Delivering To</Text>
        <Text style={styles.addressLabel}>Address</Text>
        <Text style={styles.addressValue}>101 S Burbank Drive 36117</Text>
        <Text style={styles.addressLabel}>Phone</Text>
        <Text style={styles.addressValue}>+1 98765 43210</Text>
        <TouchableOpacity style={styles.changeBtn}>
          <Text style={styles.changeBtnText}>Change</Text>
        </TouchableOpacity>
      </View>

      {/* 💰 Summary Section */}
      <View style={styles.summaryBox}>
        <View style={styles.row}>
          <Text style={styles.label}>Item Total</Text>
          <Text style={styles.value}>${itemTotal.toFixed(2)}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Delivery</Text>
          <Text style={styles.value}>${deliveryFee.toFixed(2)}</Text>
        </View>
        {showCheckout && (
          <View style={styles.row}>
            <Text style={styles.label}>Tax</Text>
            <Text style={styles.value}>${tax.toFixed(2)}</Text>
          </View>
        )}
        <View style={styles.separator} />
        <View style={styles.row}>
          <Text style={styles.totalLabel}>Total</Text>
          <Text style={styles.totalValue}>${total.toFixed(2)}</Text>
        </View>
      </View>

      {/* 🧾 Checkout Button */}
      <TouchableOpacity style={styles.checkoutBtn} onPress={onCheckout}>
        <Text style={styles.checkoutText}>{showCheckout ? 'Confirm Order' : 'Checkout'}</Text>
      </TouchableOpacity>
    </>
  );
}

const styles = StyleSheet.create({
  addressBox: {
    backgroundColor: '#FFF',
    borderRadius: 12,
    marginHorizontal: 16,
    marginTop: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 1,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#222',
    marginBottom: 12,
  },
  addressLabel: {
    fontSize: 13,
    color: '#666',
    marginBottom: 2,
  },
  addressValue: {
    fontSize: 15,
    fontWeight: '500',
    color: '#333',
    marginBottom: 8,
  },
  changeBtn: {
    borderWidth: 1,
    borderColor: '#FF5722',
    borderRadius: 20,
    paddingVertical: 6,
    paddingHorizontal: 16,
    alignSelf: 'flex-start',
    marginTop: 4,
  },
  changeBtnText: {
    color: '#FF5722',
    fontWeight: '600',
  },
  summaryBox: {
    backgroundColor: '#FFF',
    borderRadius: 12,
    marginHorizontal: 16,
    marginTop: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 1,
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
  value: {
    fontSize: 14,
    color: '#333',
    fontWeight: '500',
  },
  separator: {
    borderTopWidth: 1,
    borderTopColor: '#EEE',
    marginVertical: 6,
  },
  totalLabel: {
    fontSize: 16,
    fontWeight: '700',
    color: '#222',
  },
  totalValue: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FF5722',
  },
  checkoutBtn: {
    backgroundColor: '#FF5722',
    margin: 16,
    borderRadius: 24,
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 4,
  },
  checkoutText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600',
  },
});
