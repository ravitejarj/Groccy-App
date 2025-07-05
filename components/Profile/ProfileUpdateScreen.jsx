import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Image,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import SafeAreaWrapper from '@/components/Common/SafeAreaWrapper';
import axios from 'axios';

const API_URL = 'http://192.168.1.150:5000/api';

export default function ProfileUpdateScreen() {
  const router = useRouter();

  const [avatar, setAvatar] = useState('https://img.icons8.com/?size=100&id=7820&format=png&color=000000');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userId = await AsyncStorage.getItem('userId');
        const token = await AsyncStorage.getItem('token');
        if (userId) {
          const res = await axios.get(`${API_URL}/users/${userId}`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          setFirstName(res.data.firstName);
          setLastName(res.data.lastName);
          setEmail(res.data.email);
          const raw = (res.data.phone || '').replace('+1', '').replace(/\D/g, '').slice(-10);
          setPhone(formatPhoneNumber(raw));
        }
      } catch (err) {
        console.error('Error loading profile:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  const formatPhoneNumber = (text) => {
    const cleaned = text.replace(/\D/g, '').slice(0, 10);
    const match = cleaned.match(/^(\d{0,3})(\d{0,3})(\d{0,4})$/);
    if (!match) return text;
    return [match[1], match[2], match[3]].filter(Boolean).join(' ');
  };

  const handleUpdate = async () => {
    setSaving(true);
    try {
      const userId = await AsyncStorage.getItem('userId');
      const token = await AsyncStorage.getItem('token');
      if (userId) {
        const formattedPhone = phone.replace(/\D/g, '');
        await axios.put(
          `${API_URL}/users/${userId}`,
          { firstName, lastName, email, phone: `+1${formattedPhone}` },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        router.back();
      }
    } catch (err) {
      console.error('Error saving profile:', err);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <SafeAreaWrapper style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#FF5722" />
      </SafeAreaWrapper>
    );
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}
    >
      <SafeAreaWrapper style={{ flex: 1, backgroundColor: '#F7F7F7' }}>
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <View style={styles.header}>
            <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
              <Text style={styles.backIcon}>{'‹'}</Text>
            </TouchableOpacity>
            <Text style={styles.title}>Edit Profile</Text>
          </View>

          <View style={styles.avatarContainer}>
            <Image source={{ uri: avatar }} style={styles.avatar} />
          </View>

          <View style={styles.formCard}>
            <Text style={styles.label}>First Name</Text>
            <TextInput
              style={styles.input}
              value={firstName}
              onChangeText={setFirstName}
              placeholder="First Name"
            />
            <Text style={styles.label}>Last Name</Text>
            <TextInput
              style={styles.input}
              value={lastName}
              onChangeText={setLastName}
              placeholder="Last Name"
            />
            <Text style={styles.label}>Email</Text>
            <TextInput
              style={styles.input}
              value={email}
              onChangeText={setEmail}
              placeholder="Email"
              keyboardType="email-address"
              autoCapitalize="none"
            />
            <Text style={styles.label}>Phone Number</Text>
            <View style={styles.phoneRow}>
              <Text style={styles.prefix}>+1</Text>
              <TextInput
                style={styles.phoneInput}
                value={phone}
                onChangeText={(text) => setPhone(formatPhoneNumber(text))}
                placeholder="Phone"
                keyboardType="phone-pad"
                returnKeyType="done"
                blurOnSubmit={true}
              />
            </View>
          </View>

          <TouchableOpacity
            style={[styles.updateBtn, saving && { opacity: 0.6 }]}
            onPress={handleUpdate}
            disabled={saving}
          >
            <Text style={styles.updateBtnText}>{saving ? 'Saving...' : 'Update'}</Text>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaWrapper>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  backBtn: {
    marginRight: 8,
  },
  backIcon: {
    fontSize: 28,
    color: '#222',
    fontWeight: '600',
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: '#222',
  },
  avatarContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 16,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  formCard: {
    backgroundColor: '#FFF',
    marginHorizontal: 20,
    borderRadius: 16,
    padding: 16,
    gap: 14,
    elevation: 1,
  },
  label: {
    fontSize: 13,
    color: '#777',
    marginBottom: 4,
    paddingLeft: 4,
  },
  input: {
    backgroundColor: '#F5F5F5',
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderRadius: 12,
    fontSize: 16,
    color: '#222',
  },
  phoneRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 14,
  },
  prefix: {
    fontSize: 16,
    color: '#333',
    marginRight: 8,
  },
  phoneInput: {
    flex: 1,
    fontSize: 16,
    color: '#222',
  },
  updateBtn: {
    marginTop: 24,
    marginHorizontal: 20,
    backgroundColor: '#FF5722',
    paddingVertical: 14,
    borderRadius: 30,
    alignItems: 'center',
  },
  updateBtnText: {
    color: '#FFF',
    fontWeight: '700',
    fontSize: 15,
  },
});
