import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  Alert,
  Keyboard,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { getPlaceSuggestions, getPlaceDetails } from '@/services/GooglePlacesService';
import { saveUserAddress } from '@/services/AddressService';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AddressForm = () => {
  const router = useRouter();
  const params = useLocalSearchParams();

  const [form, setForm] = useState({
    apartment: '',
    street: params.street || '',
    city: params.city || '',
    state: params.state || '',
    zipCode: '',
    isDefault: false,
    lat: params.lat ? parseFloat(params.lat) : null,
    lng: params.lng ? parseFloat(params.lng) : null,
  });

  const [query, setQuery] = useState(form.street);
  const [suggestions, setSuggestions] = useState([]);

  const isValidZip = (zip) => /^\d{5}(-\d{4})?$/.test(zip);

  const onSubmit = async () => {
    const { street, city, state, zipCode, lat, lng } = form;

    if (!street || !city || !state || !zipCode || !lat || !lng) {
      Alert.alert('Missing Info', 'Please fill all required fields including location.');
      return;
    }

    if (!isValidZip(zipCode)) {
      Alert.alert('Invalid ZIP', 'Please enter a valid 5-digit ZIP code.');
      return;
    }

    try {
      const token = await AsyncStorage.getItem('token');
      await saveUserAddress(form, token);
      Alert.alert('Success', 'Address saved successfully.');
      router.replace('/(tabs)');
    } catch (err) {
      console.error('Address save failed:', err);
      Alert.alert('Error', 'Failed to save address.');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll}>
        <Text style={styles.title}>Delivery Address</Text>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Street Address</Text>
          <TextInput
            style={styles.input}
            value={query}
            placeholder="123 Main St"
            placeholderTextColor="#999"
            onChangeText={async (text) => {
              setQuery(text);
              setForm({ ...form, street: text });
              if (text.length > 2) {
                const results = await getPlaceSuggestions(text);
                setSuggestions(results);
              } else {
                setSuggestions([]);
              }
            }}
          />
          {suggestions.length > 0 && (
            <View style={styles.suggestionBox}>
              {suggestions.map((item) => (
                <TouchableOpacity
                  key={item.place_id}
                  style={styles.suggestionItem}
                  onPress={async () => {
                    const loc = await getPlaceDetails(item.place_id);
                    if (loc) {
                      const fullAddress = item.description;
                      const streetOnly = fullAddress.split(',')[0]?.trim();

                      setForm({
                        ...form,
                        street: streetOnly || '',
                        city: loc.city || '',
                        state: loc.state || '',
                        zipCode: loc.zipCode || '',
                        lat: loc.lat,
                        lng: loc.lng,
                      });

                      setQuery(streetOnly || '');
                      setSuggestions([]);
                    }
                  }}
                >
                  <Text style={styles.suggestionText}>{item.description}</Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </View>

        <CustomInput
          label="Apt / Unit / Suite (optional)"
          placeholder="Apt 3B"
          value={form.apartment}
          onChange={(v) => setForm({ ...form, apartment: v })}
        />

        <CustomInput
          label="City"
          placeholder="City"
          value={form.city}
          onChange={(v) => setForm({ ...form, city: v })}
        />

        <CustomInput
          label="State"
          placeholder="State"
          value={form.state}
          onChange={(v) => setForm({ ...form, state: v })}
        />

        <CustomInput
          label="ZIP Code"
          placeholder="12345"
          keyboardType="numeric"
          value={form.zipCode}
          onChange={(v) => setForm({ ...form, zipCode: v })}
          returnKeyType="done"
          onSubmitEditing={() => Keyboard.dismiss()}
        />

        <TouchableOpacity style={styles.button} onPress={onSubmit}>
          <Text style={styles.btnText}>Save Address</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const CustomInput = ({
  label,
  placeholder,
  value,
  onChange,
  keyboardType = 'default',
  returnKeyType = 'next',
  onSubmitEditing,
}) => (
  <View style={styles.inputGroup}>
    <Text style={styles.label}>{label}</Text>
    <TextInput
      style={styles.input}
      value={value}
      placeholder={placeholder}
      placeholderTextColor="#999"
      keyboardType={keyboardType}
      returnKeyType={returnKeyType}
      onChangeText={onChange}
      onSubmitEditing={onSubmitEditing}
    />
  </View>
);

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  scroll: { padding: 20 },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#222',
    marginBottom: 20,
  },
  inputGroup: { marginBottom: 16 },
  label: { fontSize: 14, color: '#666', marginBottom: 6 },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
    color: '#333',
  },
  button: {
    backgroundColor: '#FF6D00',
    paddingVertical: 16,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  btnText: { color: '#fff', fontSize: 16, fontWeight: '600' },
  suggestionBox: {
    backgroundColor: '#fff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#eee',
    marginTop: 4,
  },
  suggestionItem: {
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderBottomWidth: 1,
    borderColor: '#eee',
  },
  suggestionText: {
    fontSize: 14,
    color: '#333',
  },
});

export default AddressForm;
