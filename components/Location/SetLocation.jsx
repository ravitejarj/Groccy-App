import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import { getAccurateCurrentLocation } from '@/helpers/GeoLocationHelper';

const SetLocation = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handlePermission = async () => {
    setLoading(true);
    try {
      const { latitude, longitude } = await getAccurateCurrentLocation();
      router.push({
        pathname: '/ConfirmLocationScreen',
        params: {
          lat: latitude.toString(),
          lng: longitude.toString(),
        },
      });
    } catch (err) {
      Alert.alert('Location Error', err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Image
          source={require('@/assets/mobile_images/location/location_screen.png')}
          style={styles.image}
          resizeMode="contain"
        />
        <Text style={styles.title}>Let's Set Your Location</Text>
        <Text style={styles.description}>
          Tap below to allow location access and discover nearby Indian grocery stores.
        </Text>
        <TouchableOpacity
          style={styles.button}
          onPress={handlePermission}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.buttonText}>Allow Location</Text>
          )}
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  image: {
    width: '100%',
    height: 260,
    marginBottom: 40,
  },
  title: {
    fontSize: 36,
    fontWeight: '700',
    color: '#222',
    textAlign: 'center',
  },
  description: {
    fontSize: 14,
    color: '#555',
    textAlign: 'center',
    marginVertical: 16,
    paddingHorizontal: 20,
  },
  button: {
    backgroundColor: '#FF5722',
    paddingVertical: 14,
    paddingHorizontal: 30,
    borderRadius: 30,
    marginTop: 10,
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default SetLocation;
