import React from 'react';
import { View } from 'react-native';
import { Stack } from 'expo-router';
import BottomTabBar from '@/components/Navigation/BottomTabBar';

export default function TabLayout() {
  return (
    <View style={{ flex: 1, backgroundColor: '#F6F6F6' }}>
      <Stack screenOptions={{ headerShown: false }}>
        {/* Home Tab */}
        <Stack.Screen name="index" options={{ gestureEnabled: false }} />
        <Stack.Screen name="explore" options={{ gestureEnabled: false }} />

        {/* Orders Tab */}
        <Stack.Screen name="orders" options={{ gestureEnabled: false }} />

        {/* Cart Tab */}
        <Stack.Screen name="cart" options={{ gestureEnabled: false }} />

        {/* Profile Tab */}
        <Stack.Screen name="profile" options={{ gestureEnabled: false }} />
      </Stack>
      <BottomTabBar />
    </View>
  );
}
