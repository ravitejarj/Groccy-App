import AuthBackground from '@/components/Common/AuthBackground';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  Alert,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import styles from './styles';

// ✅ Reusable FormInput
const FormInput = ({ label, value, onChangeText, placeholder, ...props }) => (
  <View>
    <Text style={styles.inputLabel}>{label}</Text>
    <TextInput
      style={styles.input}
      value={value}
      onChangeText={onChangeText}
      placeholder={placeholder}
      placeholderTextColor="#999"
      {...props}
    />
  </View>
);

const SignUpScreen = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [saving, setSaving] = useState(false);
  const router = useRouter();

  const handleSubmit = async () => {
    if (!firstName || !lastName) {
      Alert.alert('Invalid Input', 'Please enter your first and last name.');
      return;
    }

    setSaving(true);
    try {
      const token = await AsyncStorage.getItem('token');
      const user = await AsyncStorage.getItem('user');
      const parsedUser = JSON.parse(user);
      const userId = parsedUser._id;

      await axios.put(
        `http://192.168.1.150:5000/api/users/${userId}`,
        { firstName, lastName },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      await AsyncStorage.setItem(
        'user',
        JSON.stringify({ ...parsedUser, firstName, lastName })
      );

      router.replace('/set_location');
    } catch (err) {
      Alert.alert('Error', err.response?.data?.message || 'Failed to save name.');
    }
    setSaving(false);
  };

  return (
    <AuthBackground showBack={false}>
      <View style={styles.iconHeader}>
        <Text style={styles.title}>Let's Get You Started</Text>
      </View>

      <View style={{ marginBottom: 16 }}>
        <FormInput
          label="First Name"
          value={firstName}
          onChangeText={setFirstName}
          placeholder="Enter your first name"
          autoCapitalize="words"
        />
        <FormInput
          label="Last Name"
          value={lastName}
          onChangeText={setLastName}
          placeholder="Enter your last name"
          autoCapitalize="words"
        />
      </View>

      <TouchableOpacity
        style={[
          styles.button,
          (!firstName || !lastName || saving) && { opacity: 0.5 },
        ]}
        onPress={handleSubmit}
        disabled={!firstName || !lastName || saving}
      >
        <Text style={styles.buttonText}>
          {saving ? 'Saving...' : 'Continue'}
        </Text>
      </TouchableOpacity>
    </AuthBackground>
  );
};

export default SignUpScreen;
