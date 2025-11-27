import * as Location from 'expo-location';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useEffect, useRef, useState } from 'react';
import { Alert, SafeAreaView, StyleSheet, Text } from 'react-native';

import ConfirmLocationFooter from './ConfirmLocationFooter';
import LocationMap from './LocationMap';
import LocationSearchBar from './LocationSearchBar';

import { getAccurateCurrentLocation } from '@/helpers/GeoLocationHelper';
import { animateToLocation } from '@/helpers/MapCameraHelper';
import { getPlaceDetails } from '@/services/GooglePlacesService';
import { getNearbyVendors } from '@/services/NearbyVendorsService';

const ConfirmLocationScreen = () => {
  const router = useRouter();
  const { lat, lng } = useLocalSearchParams();
  const mapRef = useRef(null);

  const [region, setRegion] = useState({
    latitude: parseFloat(lat) || 37.7749,
    longitude: parseFloat(lng) || -122.4194,
    latitudeDelta: 0.002,
    longitudeDelta: 0.002,
  });

  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [checking, setChecking] = useState(false);
  const [fetchingLocation, setFetchingLocation] = useState(false);
  const [notServiceable, setNotServiceable] = useState(false);
  const [vendorCircle, setVendorCircle] = useState(null);

  useEffect(() => {
    reverseGeocode(region.latitude, region.longitude);
  }, [region]);

  const reverseGeocode = async (lat, lng) => {
    try {
      const geo = await Location.reverseGeocodeAsync({ latitude: lat, longitude: lng });
      const item = geo[0];
      const formatted = `${item.name || ''}, ${item.street || ''}, ${item.city || ''}, ${item.region || ''}`;
      setAddress(formatted);
      setCity(item.city || '');
    } catch {
      setAddress('Unknown location');
      setCity('');
    }
  };

  const handleConfirm = async () => {
    setChecking(true);
    setNotServiceable(false);
    setVendorCircle(null);

    try {
      const vendors = await getNearbyVendors(region.latitude, region.longitude);
      if (!vendors.length) {
        setNotServiceable(true);
        return;
      }

      setVendorCircle(vendors[0]);

      router.push({
        pathname: '/address_form',
        params: {
          lat: region.latitude.toString(),
          lng: region.longitude.toString(),
          address,
          city,
        },
      });
    } catch (err) {
      Alert.alert('Error', 'Something went wrong.');
    } finally {
      setChecking(false);
    }
  };

  const handleSuggestionSelect = async (placeId, description) => {
    const loc = await getPlaceDetails(placeId);
    if (loc) {
      setRegion({
        ...region,
        latitude: loc.lat,
        longitude: loc.lng,
      });
      setQuery(description);
      setSuggestions([]);
    }
  };

  const goToCurrentLocation = async () => {
    setFetchingLocation(true);
    try {
      const { latitude, longitude } = await getAccurateCurrentLocation();
      const newRegion = {
        latitude,
        longitude,
        latitudeDelta: 0.002,
        longitudeDelta: 0.002,
      };

      setRegion(newRegion);
      animateToLocation(mapRef, latitude, longitude);
    } catch (err) {
      Alert.alert('Location Error', err.message);
    } finally {
      setFetchingLocation(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Select Your Location</Text>

      <LocationSearchBar
        query={query}
        setQuery={setQuery}
        suggestions={suggestions}
        setSuggestions={setSuggestions}
        onSuggestionSelect={handleSuggestionSelect}
      />

      <LocationMap
        mapRef={mapRef}
        region={region}
        setRegion={setRegion}
        goToCurrentLocation={goToCurrentLocation}
        fetchingLocation={fetchingLocation}
        vendorCircle={vendorCircle}
        notServiceable={notServiceable}
      />

      <ConfirmLocationFooter
        address={address}
        city={city}
        onConfirm={handleConfirm}
        checking={checking}
        notServiceable={notServiceable}
      />
    </SafeAreaView>
  );
};

export default ConfirmLocationScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  header: {
    fontSize: 18,
    fontWeight: '600',
    marginTop: 10,
    marginBottom: 6,
    textAlign: 'center',
    color: '#000',
  },
});
