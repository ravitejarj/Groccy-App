import React from 'react';
import { View, StyleSheet, Text as RNText, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useCart } from '@/components/Cart/CartContext';
import { useRouter } from 'expo-router';
import ProductSearchBar from '../Category/ProductSearchBar';
import SearchDropdown from '../Category/SearchDropdown';

export default function SubcategoryHeader({
  searchQuery,
  setSearchQuery,
  dropdownResults,
  vendorId,
  clearSearch,
}) {
  const { cartItems } = useCart();
  const router = useRouter();

  return (
    <>
      <View style={styles.headerContainer}>
        <View style={styles.searchWrapper}>
          <ProductSearchBar
            searchText={searchQuery}
            onSearchTextChange={setSearchQuery}
          />
        </View>

        <TouchableOpacity style={styles.cartButton} onPress={() => router.push('/cart')}>
          <Ionicons name="cart-outline" size={32} color="#333" />
          {cartItems.length > 0 && (
            <View style={styles.cartBadge}>
              <RNText style={styles.cartBadgeText}>{cartItems.length}</RNText>
            </View>
          )}
        </TouchableOpacity>
      </View>

      {searchQuery && dropdownResults?.length > 0 && (
        <SearchDropdown
          data={dropdownResults}
          vendorId={vendorId}
          onClose={clearSearch}
        />
      )}
    </>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
    paddingBottom: 6,
  },
  searchWrapper: {
    flex: 1,
    marginRight: 10,
    height: 48,
    justifyContent: 'center',
  },
  cartButton: {
    height: 48,
    width: 48,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 6,
  },
  cartBadge: {
    position: 'absolute',
    top: -4,
    right: -4,
    backgroundColor: '#FF5722',
    borderRadius: 8,
    minWidth: 16,
    height: 16,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 4,
  },
  cartBadgeText: {
    color: '#FFF',
    fontSize: 10,
    fontWeight: 'bold',
  },
});
