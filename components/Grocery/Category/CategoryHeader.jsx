import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useCart } from '@/components/Cart/CartContext';
import SearchBar from '@/components/Home/SearchBar';

export default function CategoryHeader({ searchQuery, setSearchQuery }) {
  const { cartItems } = useCart();
  const router = useRouter();

  return (
    <>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingHorizontal: 20,
          marginTop: 8,
        }}
      >
        {/* 🔙 Pastel Back Button */}
        <TouchableOpacity
          onPress={() => router.back()}
          style={{
            backgroundColor: 'transparent',
            borderWidth: 1,
            borderColor: '#CCC',
            padding: 8,
            borderRadius: 20,
            shadowColor: '#000',
            shadowOpacity: 0.03,
            shadowRadius: 4,
            shadowOffset: { width: 0, height: 2 },
            elevation: 2,
          }}
        >
          <Ionicons name="arrow-back" size={22} color="#222" />
        </TouchableOpacity>

        {/* 🛒 Cart Icon */}
        <TouchableOpacity onPress={() => router.push('/cart')}>
          <View>
            <Ionicons name="cart-outline" size={34} color="#222" />
            {cartItems.length > 0 && (
              <View
                style={{
                  position: 'absolute',
                  right: -6,
                  top: -4,
                  backgroundColor: 'red',
                  borderRadius: 10,
                  paddingHorizontal: 5,
                  paddingVertical: 1,
                }}
              >
                <Text style={{ color: '#fff', fontSize: 10, fontWeight: 'bold' }}>
                  {cartItems.length}
                </Text>
              </View>
            )}
          </View>
        </TouchableOpacity>
      </View>

      <View style={{ marginTop: 12, marginBottom: -8 }}>
        <SearchBar
          searchText={searchQuery}
          onSearchTextChange={setSearchQuery}
          rotatingTexts={['vegetables', 'rice', 'masalas', 'toor dal', 'atta', 'ghee']}
          customStyle={{ height: 52, borderRadius: 28, paddingHorizontal: 16 }}
        />
      </View>
    </>
  );
}
