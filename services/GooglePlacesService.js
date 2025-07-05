import { GOOGLE_MAPS_API_KEY } from '@/constants/EnvConfig';
import axios from 'axios';

// Get address suggestions from Google Places
export const getPlaceSuggestions = async (input) => {
  try {
    const res = await axios.get(
      'https://maps.googleapis.com/maps/api/place/autocomplete/json',
      {
        params: {
          input,
          key: GOOGLE_MAPS_API_KEY,
          components: 'country:us',
        },
      }
    );
    return res.data.predictions || [];
  } catch (err) {
    console.error('Autocomplete error:', err);
    return [];
  }
};

// Get full location details from place ID
export const getPlaceDetails = async (placeId) => {
  try {
    const res = await axios.get(
      'https://maps.googleapis.com/maps/api/place/details/json',
      {
        params: {
          place_id: placeId,
          key: GOOGLE_MAPS_API_KEY,
        },
      }
    );

    const result = res.data.result;
    const components = result.address_components;

    const getComponent = (type) =>
      components.find((c) => c.types.includes(type))?.long_name || '';

    return {
      lat: result.geometry.location.lat,
      lng: result.geometry.location.lng,
      city:
        getComponent('locality') ||
        getComponent('sublocality') ||
        getComponent('administrative_area_level_2'),
      state: getComponent('administrative_area_level_1'),
      zipCode: getComponent('postal_code'),
    };
  } catch (err) {
    console.error('Place details error:', err);
    return null;
  }
};
