import axios from 'axios';

const API_URL = 'http://192.168.1.150:5000/api'; // your backend URL

export const saveUserAddress = async (form, token) => {
  const payload = {
    userId: form.userId, // should be passed dynamically now
    label: 'Home',
    street: form.street,
    apartment: form.apartment || '',
    city: form.city,
    state: form.state,
    zipCode: form.zipCode,
    lat: form.lat,        // ✅ added
    lng: form.lng,        // ✅ added
    isDefault: form.isDefault || false,
  };

  const headers = {
    Authorization: `Bearer ${token}`,
  };

  const response = await axios.post(`${API_URL}/addresses`, payload, { headers });
  return response.data;
};

export const getUserAddress = async (userId, token) => {
  const headers = {
    Authorization: `Bearer ${token}`,
  };

  const response = await axios.get(`${API_URL}/addresses/${userId}`, { headers });
  return response.data;
};

export const updateUserAddress = async (addressId, data, token) => {
  const headers = {
    Authorization: `Bearer ${token}`,
  };

  const response = await axios.put(`${API_URL}/addresses/${addressId}`, data, { headers });
  return response.data;
};

export const getUserDetails = async (userId, token) => {
  const headers = {
    Authorization: `Bearer ${token}`,
  };

  const response = await axios.get(`${API_URL}/users/${userId}`, { headers });
  return response.data;
};
