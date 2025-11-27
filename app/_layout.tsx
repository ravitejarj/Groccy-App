import { CartProvider } from '@/components/Cart/CartContext';
import { Stack } from 'expo-router';

export default function Layout() {
  return (
    <CartProvider>
      <Stack initialRouteName="index">
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="splashscreen_1" options={{ headerShown: false }} />
        <Stack.Screen name="splashscreen_2" options={{ headerShown: false }} />
        <Stack.Screen name="splashscreen_3" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" options={{ headerShown: false }} />
        <Stack.Screen name="address_form" options={{ headerShown: false }} />
        <Stack.Screen name="chat_support" options={{ headerShown: false }} />
        <Stack.Screen name="checkout_screen" options={{ headerShown: false }} />
        <Stack.Screen name="confirm_location_screen" options={{ headerShown: false }} />
        <Stack.Screen name="contact_us" options={{ headerShown: false }} />
        <Stack.Screen name="faq" options={{ headerShown: false }} />
        <Stack.Screen name="help" options={{ headerShown: false }} />
        <Stack.Screen name="notifications" options={{ headerShown: false }} />
        <Stack.Screen name="order_failed" options={{ headerShown: false }} />
        <Stack.Screen name="order_success" options={{ headerShown: false }} />
        <Stack.Screen name="order_summary" options={{ headerShown: false }} />
        <Stack.Screen name="order_track" options={{ headerShown: false }} />
        <Stack.Screen name="orders" options={{ headerShown: false }} />
        <Stack.Screen name="payment_methods" options={{ headerShown: false }} />
        <Stack.Screen name="profile_update" options={{ headerShown: false }} />
        <Stack.Screen name="set_location" options={{ headerShown: false }} />
        <Stack.Screen name="login" options={{ headerShown: false }} />
        <Stack.Screen name="verify_otp" options={{ headerShown: false }} />
        <Stack.Screen name="signup" options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
    </CartProvider>
  );
}
