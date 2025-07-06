import { verifyOtp } from '@/services/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { useState } from 'react';
import { Alert } from 'react-native';

const useOtpVerification = ({ inputRefs, router }) => {
  const [otp, setOtp] = useState(['', '', '', '']);
  const [verifying, setVerifying] = useState(false);

  const handleOtpChange = (value, index) => {
    if (value.length > 1) value = value[value.length - 1];
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    if (value && index < 3) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = (e, index) => {
    if (e.nativeEvent.key === 'Backspace' && index > 0 && otp[index] === '') {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleVerify = async () => {
    const otpString = otp.join('');
    if (otpString.length < 4) return;

    setVerifying(true);
    try {
      const phone = await AsyncStorage.getItem('phone');
      const res = await verifyOtp({ phone, otp: otpString });

      const { token, user } = res;
      await AsyncStorage.setItem('token', token);
      await AsyncStorage.setItem('user', JSON.stringify(user));
      await AsyncStorage.setItem('userId', user._id); // ✅ Required for cart

      // 🧠 New user: go to signup to enter name
      if (!user.firstName || user.firstName.trim() === '') {
        router.replace('/signup');
        return;
      }

      // 🧠 Existing user: check address
      const addressRes = await axios.get(
        `http://192.168.1.150:5000/api/addresses/${user._id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const addresses = addressRes.data;
      if (!addresses || addresses.length === 0) {
        router.replace('/set_location');
      } else {
        router.replace('/(tabs)'); // ✅ Go to home
      }
    } catch (err) {
      Alert.alert('Verification Failed', err.message || 'Please try again.');
    }
    setVerifying(false);
  };

  const handleResendCode = () => {
    Alert.alert('Resend not implemented yet.');
  };

  return {
    otp,
    setOtp,
    verifying,
    handleOtpChange,
    handleKeyPress,
    handleVerify,
    handleResendCode,
  };
};

export default useOtpVerification;
