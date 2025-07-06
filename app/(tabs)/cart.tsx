import CartScreen from '@/components/Cart/CartScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import { Text } from 'react-native';

export default function Cart() {
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    AsyncStorage.getItem('userId').then((id) => {
      setUserId(id);
    });
  }, []);

  if (!userId) {
    return <Text>Please login to view your cart.</Text>;
  }

  return <CartScreen />;
}
