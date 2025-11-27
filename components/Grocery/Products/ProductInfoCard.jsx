import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

export default function ProductInfoCard({
  name,
  description,
  price,
  weight,
  stock,
  categoryName,
  subcategoryName,
  vendorName,
  vendorLogo,
}) {
  return (
    <View style={styles.card}>
      <View style={styles.infoTopRow}>
        <View style={{ flex: 1 }}>
          <Text style={styles.name}>{name}</Text>
          <Text style={styles.subText}>{weight}</Text>

          <View style={{ flexDirection: 'row', gap: 6, marginTop: 6 }}>
            {subcategoryName && <Text style={styles.badge}>{subcategoryName}</Text>}
            {categoryName && <Text style={styles.badge}>{categoryName}</Text>}
          </View>

          {vendorName && (
            <View style={styles.vendorRow}>
              {vendorLogo && (
                <Image source={{ uri: vendorLogo }} style={styles.vendorLogo} />
              )}
              <Text style={styles.vendor}>Sold by: {vendorName}</Text>
            </View>
          )}
        </View>

        <View style={[styles.stockChip, stock === 0 && styles.stockOut]}>
          <Text style={[styles.stockText, stock === 0 && styles.stockTextOut]}>
            {stock === 0 ? 'Out of Stock' : 'In stock'}
          </Text>
        </View>
      </View>

      <Text style={styles.price}>${price?.toFixed(2)}</Text>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Product Description</Text>
        <Text style={styles.description}>
          {description || 'No description available.'}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFF8F6',
    margin: 16,
    padding: 16,
    borderRadius: 16,
  },
  infoTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  name: { fontSize: 20, fontWeight: '800', color: '#222' },
  subText: { fontSize: 13, color: '#666', marginTop: 4 },
  badge: {
    backgroundColor: '#E6F4E8',
    fontSize: 11,
    color: '#333',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
  },
  vendorRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 6,
  },
  vendorLogo: {
    width: 20,
    height: 20,
    borderRadius: 10,
    marginRight: 6,
    backgroundColor: '#EEE',
  },
  vendor: {
    fontSize: 13,
    color: '#666',
  },
  stockChip: {
    borderWidth: 1,
    borderColor: '#DDD',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
    alignSelf: 'flex-start',
  },
  stockOut: {
    backgroundColor: '#F2F2F2',
  },
  stockText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#333',
  },
  stockTextOut: {
    color: '#999',
  },
  price: {
    fontSize: 22,
    fontWeight: '700',
    color: '#FF5722',
    marginVertical: 12,
  },
  section: {
    borderTopWidth: 1,
    borderColor: '#F1F1F1',
    paddingTop: 16,
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: '600',
    marginBottom: 6,
    color: '#333',
  },
  description: {
    fontSize: 14,
    color: '#444',
    lineHeight: 20,
  },
});
