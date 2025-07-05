import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ScrollView,
} from 'react-native';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import { saveNewCard } from '@/services/SavedCardService';
import SafeAreaWrapper from '@/components/Common/SafeAreaWrapper';

export default function AddCardScreen() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    nameOnCard: '',
    cardNumber: '',
    expiry: '',
    cvv: '',
  });
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [isValid, setIsValid] = useState(false);

  const formatCardNumber = (value) => {
    const digits = value.replace(/\D/g, '');
    if (/^3[47]/.test(digits)) {
      return digits.replace(/(\d{4})(\d{6})(\d{0,5})/, '$1 $2 $3').trim();
    }
    return digits.replace(/(\d{4})(?=\d)/g, '$1 ').trim();
  };

  const handleInputChange = (field, value) => {
    if (field === 'cardNumber') value = formatCardNumber(value);
    if (field === 'expiry') {
      value = value.replace(/[^\d]/g, '');
      if (value.length >= 3) value = `${value.slice(0, 2)}/${value.slice(2, 4)}`;
    }
    if (field === 'cvv') value = value.replace(/[^\d]/g, '').slice(0, 3);
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleBlur = (field) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
  };

  const detectBrand = (number) => {
    const cleaned = number.replace(/\s/g, '');
    if (cleaned.startsWith('4')) return 'Visa';
    if (/^5[1-5]/.test(cleaned)) return 'MasterCard';
    if (/^3[47]/.test(cleaned)) return 'Amex';
    return 'Unknown';
  };

  const isValidCardNumber = (number) => {
    const digits = number.replace(/\s/g, '');
    let sum = 0;
    let shouldDouble = false;
    for (let i = digits.length - 1; i >= 0; i--) {
      let digit = parseInt(digits[i]);
      if (shouldDouble) {
        digit *= 2;
        if (digit > 9) digit -= 9;
      }
      sum += digit;
      shouldDouble = !shouldDouble;
    }
    return sum % 10 === 0;
  };

  useEffect(() => {
    const { nameOnCard, cardNumber, expiry, cvv } = formData;
    const cleanNumber = cardNumber.replace(/\s/g, '');
    const month = parseInt(expiry.slice(0, 2));
    const year = parseInt(`20${expiry.slice(3, 5)}`);

    const newErrors = {};
    if (!nameOnCard.trim()) newErrors.name = 'Name is required';
    if (!isValidCardNumber(cleanNumber)) newErrors.cardNumber = 'Enter a valid card number';
    if (!/^\d{2}\/\d{2}$/.test(expiry) || month < 1 || month > 12) newErrors.expiry = 'Invalid expiry format';
    if (cvv.length !== 3) newErrors.cvv = 'CVV must be 3 digits';

    setErrors(newErrors);
    setIsValid(Object.keys(newErrors).length === 0);
  }, [formData]);

  const handleSaveCard = async () => {
    const { nameOnCard, cardNumber } = formData;
    const last4 = cardNumber.replace(/\s/g, '').slice(-4);
    const brand = detectBrand(cardNumber);

    try {
      const token = await AsyncStorage.getItem('token');
      if (!token) throw new Error('Missing token');

      const payload = {
        brand,
        last4,
        paymentMethodId: 'pm_dummy_' + last4,
        isDefault: true,
      };

      await saveNewCard(payload, token);
      Alert.alert('Success', 'Card saved successfully');
      router.back();
    } catch (err) {
      console.error('Card save error:', err);
      Alert.alert('Error', 'Failed to save card');
    }
  };

  return (
    <SafeAreaWrapper style={{ backgroundColor: '#F7FDF4', flex: 1 }}>
      <StatusBar style="dark" translucent={false} backgroundColor="#F7FDF4" />
      <ScrollView contentContainerStyle={{ flexGrow: 1, padding: 24, backgroundColor: '#F7FDF4' }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 16 }}>
          <TouchableOpacity onPress={() => router.back()} style={{ marginRight: 12 }}>
            <Ionicons name="arrow-back" size={24} color="#222" />
          </TouchableOpacity>
          <Text style={styles.title}>Add Credit / Debit Card</Text>
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Name on Card</Text>
          <TextInput
            style={styles.input}
            value={formData.nameOnCard}
            onChangeText={(text) => handleInputChange('nameOnCard', text)}
            onBlur={() => handleBlur('name')}
            placeholder="Name"
            placeholderTextColor="#999"
          />
          {touched.name && errors.name && <Text style={styles.error}>{errors.name}</Text>}
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Card Number</Text>
          <View style={styles.iconInputWrapper}>
            <Ionicons name="card-outline" size={20} color="#888" style={styles.inputIcon} />
            <TextInput
              style={[styles.input, { paddingLeft: 40 }]}
              value={formData.cardNumber}
              onChangeText={(text) => handleInputChange('cardNumber', text)}
              onBlur={() => handleBlur('cardNumber')}
              placeholder="1234 5678 9012 3456"
              placeholderTextColor="#999"
              keyboardType="numeric"
              maxLength={19}
            />
          </View>
          {touched.cardNumber && errors.cardNumber && <Text style={styles.error}>{errors.cardNumber}</Text>}
        </View>

        <View style={styles.row}>
          <View style={[styles.formGroup, styles.halfWidth]}>
            <Text style={styles.label}>Expiry</Text>
            <TextInput
              style={styles.input}
              value={formData.expiry}
              onChangeText={(text) => handleInputChange('expiry', text)}
              onBlur={() => handleBlur('expiry')}
              placeholder="MM/YY"
              placeholderTextColor="#999"
              keyboardType="number-pad"
              maxLength={5}
            />
            {touched.expiry && errors.expiry && <Text style={styles.error}>{errors.expiry}</Text>}
          </View>

          <View style={[styles.formGroup, styles.halfWidth]}>
            <Text style={styles.label}>CVV</Text>
            <TextInput
              style={styles.input}
              value={formData.cvv}
              onChangeText={(text) => handleInputChange('cvv', text)}
              onBlur={() => handleBlur('cvv')}
              placeholder="CVV"
              placeholderTextColor="#999"
              keyboardType="numeric"
              secureTextEntry
              maxLength={3}
            />
            {touched.cvv && errors.cvv && <Text style={styles.error}>{errors.cvv}</Text>}
          </View>
        </View>

        <TouchableOpacity
          style={[styles.button, !isValid && { backgroundColor: '#A5D6A7' }]}
          onPress={handleSaveCard}
          disabled={!isValid}
        >
          <Text style={styles.buttonText}>Save</Text>
        </TouchableOpacity>

        <View style={styles.secureNote}>
          <Ionicons name="lock-closed-outline" size={16} color="#888" />
          <Text style={styles.secureText}>Your payment information is secured with encryption.</Text>
        </View>
      </ScrollView>
    </SafeAreaWrapper>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: '#222',
  },
  formGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 6,
    color: '#333',
  },
  input: {
    height: 50,
    backgroundColor: '#FFF',
    borderRadius: 12,
    paddingHorizontal: 16,
    fontSize: 15,
    borderColor: '#DDD',
    borderWidth: 1,
    color: '#333',
  },
  iconInputWrapper: {
    position: 'relative',
    justifyContent: 'center',
  },
  inputIcon: {
    position: 'absolute',
    left: 12,
    zIndex: 1,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  halfWidth: {
    width: '48%',
  },
  button: {
    backgroundColor: '#4CAF50',
    padding: 16,
    borderRadius: 32,
    alignItems: 'center',
    marginTop: 8,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600',
  },
  secureNote: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 16,
    justifyContent: 'center',
    gap: 6,
  },
  secureText: {
    fontSize: 13,
    color: '#666',
  },
  error: {
    marginTop: 4,
    fontSize: 12,
    color: '#E53935',
  },
});
