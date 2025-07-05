// components/ProfileUpdate/EditAddressScreen.jsx

import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import SafeAreaWrapper from '@/components/Common/SafeAreaWrapper';
import EditAddressForm from './Address/EditAddressForm';

export default function EditAddressScreen() {
  const router = useRouter();

  return (
    <SafeAreaWrapper style={{ flex: 1, backgroundColor: '#fff' }}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.title}>Edit Address</Text>
      </View>

      <ScrollView contentContainerStyle={{ paddingBottom: 80 }}>
        <EditAddressForm />
      </ScrollView>
    </SafeAreaWrapper>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderColor: '#EEE',
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    marginLeft: 10,
    color: '#222',
  },
});
