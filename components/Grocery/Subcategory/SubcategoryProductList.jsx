import React from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator, Dimensions } from 'react-native';
import ProductCard from './ProductCard';

const PRODUCT_MARGIN = 8;
const NUM_COLUMNS = 2;
const PRODUCT_WIDTH = (Dimensions.get('window').width - 80 - PRODUCT_MARGIN * (NUM_COLUMNS + 1)) / NUM_COLUMNS;

export default function SubcategoryProductList({ products, loading, selectedSubcategory, showGrid, vendorId }) {
  if (!showGrid) return null;

  return (
    <View style={styles.container}>
      <Text style={styles.sectionHeader}>
        {selectedSubcategory?.name || ''}
      </Text>

      {loading ? (
        <ActivityIndicator size="large" color="#FF5722" style={{ marginTop: 40 }} />
      ) : products.length === 0 ? (
        <Text style={styles.emptyText}>No products found.</Text>
      ) : (
        <FlatList
          data={products}
          renderItem={({ item }) => (
            <ProductCard product={item} vendorId={vendorId} width={PRODUCT_WIDTH} />
          )}
          keyExtractor={(item) => item._id}
          numColumns={NUM_COLUMNS}
          columnWrapperStyle={styles.productRow}
          contentContainerStyle={styles.productList}
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  sectionHeader: {
    fontSize: 16,
    fontWeight: '600',
    marginTop: 12,
    marginBottom: 8,
    paddingHorizontal: 12,
  },
  productRow: {
    justifyContent: 'space-between',
    paddingHorizontal: 8,
    marginBottom: 12,
  },
  productList: {
    paddingTop: 12,
    paddingBottom: 40,
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 40,
    fontSize: 14,
    color: '#666',
  },
});
