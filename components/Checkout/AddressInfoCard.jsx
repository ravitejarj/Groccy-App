import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function DeliveryInfoCard({ address, user, onEditAddress }) {
  if (!address || !user) return null;

  return (
    <View style={styles.wrapper}>
      <Text style={styles.sectionTitle}>Delivery Info</Text>

      <TouchableOpacity onPress={onEditAddress} activeOpacity={0.8} style={styles.cardWrapper}>
        <View style={styles.card}>
          <View style={styles.rowBetween}>
            <Text style={styles.name}>{user.name}</Text>
            <Ionicons name="chevron-forward" size={20} color="#999" />
          </View>

          <Text style={styles.addressText}>
            {address.street}{address.apartment ? `, ${address.apartment}` : ''}
          </Text>
          <Text style={styles.addressText}>
            {address.city}, {address.state} {address.zipCode}
          </Text>

          <Text style={styles.phoneText}>{user.phone}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: 16,
    paddingHorizontal: 2,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#222',
    marginBottom: 8,
    marginLeft: 4,
  },
  cardWrapper: {},
  card: {
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 1,
  },
  rowBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  name: {
    fontSize: 16,
    fontWeight: '700',
    color: '#222',
  },
  addressText: {
    fontSize: 14,
    color: '#333',
    marginBottom: 4,
    lineHeight: 20,
  },
  phoneText: {
    fontSize: 14,
    color: '#555',
  },
});
