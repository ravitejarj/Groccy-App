import { Stack } from 'expo-router';

export default function Layout() {
  return (
    <Stack initialRouteName="index">
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="splashscreen_1" options={{ headerShown: false }} />
      <Stack.Screen name="splashscreen_2" options={{ headerShown: false }} />
      <Stack.Screen name="splashscreen_3" options={{ headerShown: false }} />

      <Stack.Screen name="login" options={{ headerShown: false }} />
      <Stack.Screen name="verify_otp" options={{ headerShown: false }} />
      <Stack.Screen name="signup" options={{ headerShown: false }} />
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
    </Stack>
  );
}
