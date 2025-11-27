import { useRouter } from 'expo-router';
import { useEffect } from 'react';
import { View } from 'react-native';

export default function RedirectToSplash() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.replace('/splashscreen_1');
    }, 10);

    return () => clearTimeout(timer);
  }, []);

  return <View />;
}
