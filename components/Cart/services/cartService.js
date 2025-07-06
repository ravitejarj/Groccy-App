import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const BASE_URL = 'http://192.168.1.150:5000/api';

export const fetchCartData = async (userId) => {
  const token = await AsyncStorage.getItem('token');
  const res = await axios.get(`${BASE_URL}/cart/user/${userId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data[0] || {};
};

export const fetchVendorInfo = async (vendorId) => {
  const res = await axios.get(`${BASE_URL}/vendors/${vendorId}`);
  return res.data;
};

export const addProductToCart = async (body) => {
  const token = await AsyncStorage.getItem('token');
  await axios.post(`${BASE_URL}/cart/add`, body, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const updateProductQty = async (body) => {
  const token = await AsyncStorage.getItem('token');
  await axios.put(`${BASE_URL}/cart/update`, body, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const removeProduct = async (userId, vendorId, productId) => {
  const token = await AsyncStorage.getItem('token');
  await axios.delete(`${BASE_URL}/cart/remove`, {
    data: { userId, vendorId, productId },
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const clearUserCart = async (userId) => {
  const token = await AsyncStorage.getItem('token');
  await axios.delete(`${BASE_URL}/cart/clear/${userId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};
