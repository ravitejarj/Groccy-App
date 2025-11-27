import React, { useRef } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, StyleSheet,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import AuthBackground from '@/components/Common/AuthBackground';
import useOtpVerification from './useOtpVerification';

const VerifyOTP = () => {
  const router = useRouter();
  const inputRefs = useRef([]);

  const {
    otp,
    setOtp,
    verifying,
    handleOtpChange,
    handleKeyPress,
    handleVerify,
    handleResendCode,
  } = useOtpVerification({ inputRefs, router });

  return (
    <AuthBackground showBack={true} onBack={() => router.back()}>
      <View style={{ alignItems: 'center', marginBottom: 10 }}>
        <Ionicons name="cart" size={40} color="#FF5722" />
      </View>

      <Text style={styles.title}>Verify Your Account</Text>
      <Text style={styles.subtitle}>
        Enter the 4-digit code we sent you to verify your mobile.
      </Text>

      <View style={styles.otpContainer}>
        {otp.map((digit, index) => (
          <TextInput
            key={index}
            ref={ref => inputRefs.current[index] = ref}
            style={styles.otpInput}
            value={digit}
            onChangeText={(value) => handleOtpChange(value, index)}
            onKeyPress={(e) => handleKeyPress(e, index)}
            keyboardType="numeric"
            maxLength={1}
            selectTextOnFocus
          />
        ))}
      </View>

      <TouchableOpacity
        style={[styles.verifyButton, !otp.every(d => d) && styles.verifyButtonDisabled]}
        onPress={handleVerify}
        disabled={!otp.every(d => d) || verifying}
      >
        <Text style={styles.verifyButtonText}>
          {verifying ? 'Verifying...' : 'Verify'}
        </Text>
      </TouchableOpacity>

      <View style={styles.resendContainer}>
        <Text style={styles.resendText}>Didn't receive OTP? </Text>
        <TouchableOpacity onPress={handleResendCode}>
          <Text style={styles.resendLink}>Resend code</Text>
        </TouchableOpacity>
      </View>
    </AuthBackground>
  );
};

const styles = StyleSheet.create({
  title: { fontSize: 24, fontWeight: 'bold', textAlign: 'center', color: '#222', marginBottom: 10 },
  subtitle: { fontSize: 15, color: '#666', textAlign: 'center', marginBottom: 32 },
  otpContainer: { flexDirection: 'row', justifyContent: 'center', marginBottom: 32, gap: 12 },
  otpInput: {
    width: 48, height: 48, borderRadius: 12, borderWidth: 1, borderColor: '#E0E0E0',
    backgroundColor: '#FFF', fontSize: 20, textAlign: 'center', color: '#333',
  },
  verifyButton: {
    backgroundColor: '#FF5722', borderRadius: 32, height: 50,
    justifyContent: 'center', alignItems: 'center', marginBottom: 20,
  },
  verifyButtonDisabled: { backgroundColor: '#FFBFA5' },
  verifyButtonText: { color: '#FFF', fontSize: 18, fontWeight: '600' },
  resendContainer: { flexDirection: 'row', justifyContent: 'center' },
  resendText: { color: '#666' },
  resendLink: { color: '#FF5722', fontWeight: 'bold' },
});

export default VerifyOTP;
