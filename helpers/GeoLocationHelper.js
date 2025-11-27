import * as Location from 'expo-location';

/**
 * Fetches current location with high accuracy and permission handling.
 * Returns { latitude, longitude } or throws an error.
 */
export const getAccurateCurrentLocation = async () => {
  const { status } = await Location.requestForegroundPermissionsAsync();
  if (status !== 'granted') {
    throw new Error('Location permission denied');
  }

  try {
    const location = await Location.getCurrentPositionAsync({
      accuracy: Location.Accuracy.High,
      maximumAge: 10000,
      timeout: 10000,
    });

    const { latitude, longitude } = location.coords;
    return { latitude, longitude };
  } catch (err) {
    console.warn('High accuracy location failed:', err.message);

    const fallback = await Location.getLastKnownPositionAsync();
    if (fallback) {
      const { latitude, longitude } = fallback.coords;
      return { latitude, longitude };
    } else {
      throw new Error('Unable to fetch location');
    }
  }
};

/**
 * Calculates distance in miles between two coordinates using Haversine formula.
 */
export const calculateDistanceInMiles = (lat1, lon1, lat2, lon2) => {
  const toRad = (value) => (value * Math.PI) / 180;
  const R = 3958.8;

  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);

  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
    Math.sin(dLon / 2) ** 2;

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return parseFloat((R * c).toFixed(1));
};
