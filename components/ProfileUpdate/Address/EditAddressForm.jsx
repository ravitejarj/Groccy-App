import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ScrollView, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getUserAddress, updateUserAddress } from '@/services/AddressService';
import AddressField from './AddressField';
import TextField from './TextField';
import ZipField from './ZipField';
import SaveButton from './SaveButton';
import { useRouter } from 'expo-router';

const EditAddressForm = () => {
  const [form, setForm] = useState({
    _id: '',
    street: '',
    apartment: '',
    city: '',
    state: '',
    zipCode: '',
    lat: null,
    lng: null,
  });

  const [query, setQuery] = useState('');
  const [zipError, setZipError] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      const userId = await AsyncStorage.getItem('userId');
      const token = await AsyncStorage.getItem('token');
      if (!userId || !token) return;

      try {
        const data = await getUserAddress(userId, token);
        if (data) {
          setForm({ ...form, ...data });
          setQuery(data.street);
        }
      } catch (e) {
        console.error('Load address error:', e);
      }
    };

    fetchData();
  }, []);

  const updateField = (key, value) => {
    if (key === 'zipCode') setZipError(false);
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSave = async () => {
    if (!/^\d{5}$/.test(form.zipCode)) {
      setZipError(true);
      return;
    }

    if (!form.lat || !form.lng) {
      Alert.alert('Invalid Address', 'Please select a valid street address');
      return;
    }

    setIsSaving(true);
    try {
      const token = await AsyncStorage.getItem('token');
      if (form._id && token) {
        await updateUserAddress(form._id, form, token);
        router.back();
      }
    } catch (e) {
      console.error('Update error:', e);
      Alert.alert('Error', 'Could not update address');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.wrapper}>
      <View style={styles.card}>
        <AddressField query={query} setQuery={setQuery} form={form} setForm={setForm} />
        <TextField label="Apt / Unit / Suite" value={form.apartment} onChangeText={(v) => updateField('apartment', v)} />
        <TextField label="City" value={form.city} onChangeText={(v) => updateField('city', v)} />
        <TextField label="State" value={form.state} onChangeText={(v) => updateField('state', v)} />
        <ZipField zip={form.zipCode} onChangeText={(v) => updateField('zipCode', v)} error={zipError} />
      </View>
      <SaveButton isSaving={isSaving} onPress={handleSave} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 40,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 14,
    padding: 16,
    gap: 14,
    elevation: 1,
  },
});

export default EditAddressForm;
