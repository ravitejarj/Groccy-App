import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Swipeable } from 'react-native-gesture-handler';
import { Ionicons } from '@expo/vector-icons';

export default function CartItem({ item, onAdd, onRemove, onDelete }) {
  const renderRightActions = () => (
    <TouchableOpacity style={styles.deleteButton} onPress={() => onDelete(item.productId)}>
      <Ionicons name="trash" size={20} color="#FFF" />
    </TouchableOpacity>
  );

  return (
    <Swipeable renderRightActions={renderRightActions}>
      <View style={styles.cartItem}>
        {/* 🖼️ Product Image */}
        <View style={styles.productImage}>
          <Image
            source={{
              uri:
                item.image ||
                'https://res.cloudinary.com/dh5liqius/image/upload/v1716406939/groccy/temp/dummy.png',
            }}
            style={styles.productImageStyle}
            resizeMode="cover"
          />
        </View>

        {/* 📄 Item Details */}
        <View style={styles.itemDetails}>
          <Text style={styles.itemName}>{item.name}</Text>
          <Text style={styles.itemMeta}>1kg pack</Text>
          <Text style={styles.itemPrice}>${item.price} × {item.quantity}</Text>
        </View>

        {/* ➕➖ Quantity Stepper */}
        <View style={styles.quantityControl}>
          <TouchableOpacity
            style={[styles.circleButton, styles.minusButton]}
            onPress={() => onRemove(item.productId)}
          >
            <Ionicons name="remove" size={18} color="#333" />
          </TouchableOpacity>

          <Text style={styles.quantityText}>{item.quantity}</Text>

          <TouchableOpacity
            style={[styles.circleButton, styles.plusButton]}
            onPress={() => onAdd(item.productId)}
          >
            <Ionicons name="add" size={18} color="#FFF" />
          </TouchableOpacity>
        </View>
      </View>
    </Swipeable>
  );
}

const styles = StyleSheet.create({
  cartItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    borderRadius: 16,
    marginBottom: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 1,
  },
  productImage: {
    width: 60,
    height: 60,
    borderRadius: 10,
    backgroundColor: '#FFF8F6',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
    overflow: 'hidden',
  },
  productImageStyle: {
    width: '100%',
    height: '100%',
  },
  itemDetails: {
    flex: 1,
    justifyContent: 'center',
  },
  itemName: {
    fontSize: 15,
    fontWeight: '600',
    color: '#222',
    marginBottom: 2,
  },
  itemMeta: {
    fontSize: 12,
    color: '#999',
    marginBottom: 2,
  },
  itemPrice: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
  },
  quantityControl: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  circleButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  minusButton: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#EEE',
  },
  plusButton: {
    backgroundColor: '#FF7A00',
    marginLeft: 8,
  },
  quantityText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    paddingHorizontal: 10,
  },
  deleteButton: {
    backgroundColor: '#F44336',
    justifyContent: 'center',
    alignItems: 'center',
    width: 56,
    height: '90%',
    borderRadius: 12,
    marginVertical: 6,
  },
});
