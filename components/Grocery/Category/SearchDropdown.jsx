import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import { useRouter } from 'expo-router';

export default function SearchDropdown({ data, vendorId, onClose }) {
  const router = useRouter();

  const handleSelect = (productId) => {
    router.push(`/product/${productId}?vendorId=${vendorId}`);
    if (onClose) onClose(); // Close dropdown on select
  };

  return (
    <View style={styles.dropdown}>
      <FlatList
        data={data}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.item} onPress={() => handleSelect(item._id)}>
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.price}>${item.price?.toFixed(2)}</Text>
          </TouchableOpacity>
        )}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  dropdown: {
    backgroundColor: '#fff',
    marginHorizontal: 16,
    marginTop: 8,
    borderRadius: 10,
    paddingVertical: 8,
    paddingHorizontal: 12,
    elevation: 4,
    zIndex: 10,
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
  },
  name: {
    fontSize: 14,
    color: '#333',
    flex: 1,
  },
  price: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FF5722',
    marginLeft: 10,
  },
  separator: {
    height: 1,
    backgroundColor: '#eee',
  },
});
