import axios from 'axios';

const API_URL = 'http://192.168.1.150:5000/api'; // Update if needed

export const getSavedCards = async (token) => {
  const headers = {
    Authorization: `Bearer ${token}`,
  };

  const response = await axios.get(`${API_URL}/savedcards`, { headers });
  return response.data;
};

export const saveNewCard = async (cardData, token) => {
  const headers = {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
  };

  const response = await axios.post(`${API_URL}/savedcards`, cardData, { headers });
  return response.data;
};

export const deleteSavedCard = async (cardId, token) => {
  const headers = {
    Authorization: `Bearer ${token}`,
  };

  const response = await axios.delete(`${API_URL}/savedcards/${cardId}`, { headers });
  return response.data;
};
