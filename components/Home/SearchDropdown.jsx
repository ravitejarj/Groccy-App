import React from 'react';
import { View, TouchableOpacity, Text, Image, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const SearchDropdown = ({ searchText, filteredVendors, onVendorSelect }) => {
  if (!searchText || filteredVendors.length === 0) return null;

  return (
    <View style={styles.dropdown}>
      {filteredVendors.map((vendor) => (
        <TouchableOpacity
          key={vendor._id}
          style={styles.dropdownItem}
          onPress={() => onVendorSelect(vendor._id)}
        >
          {vendor.image ? (
            <Image source={{ uri: vendor.image }} style={styles.vendorImage} />
          ) : (
            <View style={styles.vendorIconPlaceholder}>
              <Ionicons name="storefront-outline" size={20} color="#666" />
            </View>
          )}
          <Text style={styles.vendorName}>{vendor.name}</Text>
          {vendor.distance && (
            <Text style={styles.vendorDistance}>{vendor.distance.toFixed(1)} mi</Text>
          )}
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  dropdown: {
    backgroundColor: '#fff',
    marginHorizontal: 16,
    marginTop: 8,
    borderRadius: 12,
    paddingVertical: 8,
    paddingHorizontal: 4,
    elevation: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
  },
  dropdownItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderBottomColor: '#eee',
    borderBottomWidth: 1,
  },
  vendorImage: {
    width: 32,
    height: 32,
    borderRadius: 6,
    marginRight: 12,
    backgroundColor: '#eee',
  },
  vendorIconPlaceholder: {
    width: 32,
    height: 32,
    borderRadius: 6,
    backgroundColor: '#f0f0f0',
    marginRight: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  vendorName: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  vendorDistance: {
    fontSize: 13,
    color: '#999',
    marginLeft: 12,
  },
});

export default SearchDropdown;
