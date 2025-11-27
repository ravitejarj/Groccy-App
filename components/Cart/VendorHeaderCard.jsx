// components/Cart/VendorHeaderCard.jsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function VendorHeaderCard({ name, address }) {
  return (
    <View style={styles.card}>
      <View style={styles.row}>
        <Ionicons name="storefront" size={18} color="#FF5722" style={styles.icon} />
        <Text style={styles.name}>{name}</Text>
      </View>

      {address && (
        <View style={styles.row}>
          <Ionicons name="location-outline" size={16} color="#888" style={styles.icon} />
          <Text style={styles.address}>{address}</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#D0F4DE',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    marginHorizontal: 4,
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 2,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  icon: {
    marginRight: 6,
  },
  name: {
    fontSize: 16,
    fontWeight: '700',
    color: '#222',
  },
  address: {
    fontSize: 13,
    color: '#666',
  },
});
