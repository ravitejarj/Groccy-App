// File: components/Login/LoginScreen.jsx
import AuthBackground from '@/components/Common/AuthBackground';
import { sendOtp } from '@/services/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  ActivityIndicator,
  BackHandler,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import MobileInput from './MobileInput';

const LoginScreen = () => {
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => true;
      const subscription = BackHandler.addEventListener('hardwareBackPress', onBackPress);
      return () => subscription.remove();
    }, [])
  );

  const handleSendOtp = async () => {
    setError('');
    const trimmedPhone = phone.trim();

    const isValid = /^[0-9]{10}$/.test(trimmedPhone);
    if (!isValid) {
      setError('Please enter a valid 10-digit mobile number.');
      return;
    }

    setLoading(true);
    try {
      const fullPhone = `+1${trimmedPhone}`;
      await sendOtp({ phone: fullPhone });
      await AsyncStorage.setItem('phone', fullPhone);
      router.push('/verify_otp');
    } catch (err) {
      setError(err.message || 'Failed to send OTP');
    }
    setLoading(false);
  };

  return (
    <AuthBackground>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.title}>Welcome Back!</Text>
          <Text style={styles.subtitle}>Login with your mobile number</Text>
        </View>

        <Animatable.View animation="fadeInUp" duration={600} delay={100} style={styles.form}>
          <MobileInput value={phone} onChangeText={setPhone} />
          {error ? <Text style={styles.errorText}>{error}</Text> : null}

          <TouchableOpacity
            style={[styles.loginButton, loading && { opacity: 0.6 }]}
            onPress={handleSendOtp}
            activeOpacity={0.8}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#FFF" />
            ) : (
              <Text style={styles.loginButtonText}>Send OTP</Text>
            )}
          </TouchableOpacity>
        </Animatable.View>
      </ScrollView>
    </AuthBackground>
  );
};

const styles = StyleSheet.create({
  header: {
    marginBottom: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
  },
  form: {
    flex: 1,
  },
  loginButton: {
    backgroundColor: '#FF5722',
    borderRadius: 24,
    paddingVertical: 12,
    alignItems: 'center',
    marginBottom: 18,
    marginTop: 4,
    width: '100%',
  },
  loginButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  errorText: {
    color: '#e53935',
    backgroundColor: '#fff0f0',
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 7,
    marginBottom: 6,
    marginTop: -5,
    fontSize: 15,
    alignSelf: 'flex-start',
  },
});

export default LoginScreen;
