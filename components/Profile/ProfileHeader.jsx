import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const API_URL = 'http://192.168.1.150:5000/api';

export default function ProfileHeader() {
  const [user, setUser] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
  });

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userId = await AsyncStorage.getItem('userId');
        const token = await AsyncStorage.getItem('token');
        if (userId) {
          const res = await axios.get(`${API_URL}/users/${userId}`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          setUser(res.data);
        }
      } catch (err) {
        console.error('Failed to fetch user profile:', err);
      }
    };

    fetchUser();
  }, []);

  const formatPhone = (raw) => {
    const cleaned = raw.replace(/\D/g, '').replace(/^1/, ''); // remove +1 if present
    if (cleaned.length === 10) {
      const formatted = `${cleaned.slice(0, 3)} ${cleaned.slice(3, 6)} ${cleaned.slice(6)}`;
      return `🇺🇸 +1 ${formatted}`;
    }
    return raw;
  };

  return (
    <View style={styles.card}>
      <Image
        source={{
          uri: 'https://img.icons8.com/?size=100&id=7820&format=png&color=000000',
        }}
        style={styles.avatar}
      />
      <View style={styles.info}>
        <Text style={styles.name}>{user.firstName} {user.lastName}</Text>
        <Text style={styles.email}>{user.email}</Text>
        <Text style={styles.phone}>{formatPhone(user.phone)}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: '#FFF',
    borderRadius: 16,
    padding: 2,
    alignItems: 'center',
    elevation: 1,
    marginHorizontal: 20,
    marginBottom: 2,
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    marginRight: 12,
  },
  info: {
    flex: 1,
  },
  name: {
    fontSize: 15,
    fontWeight: '700',
    color: '#222',
    marginBottom: 2,
  },
  email: {
    fontSize: 12,
    color: '#888',
    marginBottom: 2,
  },
  phone: {
    fontSize: 12,
    color: '#888',
  },
});
