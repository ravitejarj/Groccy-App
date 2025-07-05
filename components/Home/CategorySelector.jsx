import React from 'react';
import {
  ScrollView,
  TouchableOpacity,
  Text,
  StyleSheet,
  View,
  Animated,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { CATEGORY_ACTIVE_COLORS } from '@/constants/Colors';

// Updated: each category includes a `storeType` used for filtering
const categories = [
  { id: 1, name: 'Grocery', storeType: 'grocery', icon: 'cart-outline', activeIcon: 'cart' },
  { id: 2, name: 'Restaurants', storeType: 'restaurant', icon: 'fast-food-outline', activeIcon: 'fast-food' },
  { id: 3, name: 'Stores', storeType: 'stores', icon: 'storefront-outline', activeIcon: 'storefront' },
  { id: 4, name: 'Pharmacy', storeType: 'pharmacy', icon: 'medical-outline', activeIcon: 'medical' },
  { id: 5, name: 'Electronics', storeType: 'electronics', icon: 'phone-portrait-outline', activeIcon: 'phone-portrait' },
  { id: 6, name: 'Fashion', storeType: 'fashion', icon: 'shirt-outline', activeIcon: 'shirt' },
];

const CategorySelector = ({ activeCategory, onSelectCategory }) => {
  return (
    <View style={styles.wrapper}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.tabBar}
      >
        {categories.map((category) => {
          const isActive = activeCategory === category.storeType;
          const activeColor = CATEGORY_ACTIVE_COLORS[category.storeType] || '#FF5722';

          return (
            <TouchableOpacity
              key={category.id}
              style={styles.item}
              onPress={() => onSelectCategory(category.storeType)}
              activeOpacity={0.8}
            >
              <Animated.View
                style={[
                  styles.iconCircle,
                  isActive && { backgroundColor: activeColor },
                ]}
              >
                <Ionicons
                  name={isActive ? category.activeIcon : category.icon}
                  size={20}
                  color={isActive ? '#fff' : '#555'}
                />
              </Animated.View>
              <Text style={[styles.label, isActive && { color: activeColor }]}>
                {category.name}
              </Text>
              {isActive && (
                <View
                  style={[styles.activeBar, { backgroundColor: activeColor }]}
                />
              )}
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    paddingVertical: 8,
    paddingTop: 0,
  },
  tabBar: {
    paddingHorizontal: 10,
  },
  item: {
    alignItems: 'center',
    marginRight: 14,
    width: 64,
    position: 'relative',
  },
  iconCircle: {
    backgroundColor: '#F0F0F0',
    borderRadius: 40,
    padding: 12,
    marginBottom: 6,
  },
  label: {
    fontSize: 13,
    color: '#555',
    textAlign: 'center',
  },
  activeBar: {
    position: 'absolute',
    bottom: -6,
    height: 3,
    width: 20,
    borderRadius: 2,
  },
});

export default CategorySelector;
