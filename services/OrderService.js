import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const API_BASE_URL = 'http://192.168.1.150:5000/api';

/**
 * Fetch all orders for the current user
 * Used in OrdersScreen.jsx
 */
export const fetchOrdersTabData = async (userId) => {
  try {
    const token = await AsyncStorage.getItem('token');
    if (!token || !userId) throw new Error('Missing token or userId');

    const response = await axios.get(`${API_BASE_URL}/order-tab/user/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data.orders; // return just the orders array
  } catch (error) {
    console.error('❌ fetchOrdersTabData error:', error);
    throw error;
  }
};
