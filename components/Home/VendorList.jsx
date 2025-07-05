import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import VendorCard from './VendorCard';
import { useRouter } from 'expo-router';
import { getNearbyVendors } from '@/services/NearbyVendorsService';

const VendorList = ({ lat, lng, storeType }) => {
  const [vendors, setVendors] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const fetchVendors = async () => {
    try {
      const data = await getNearbyVendors(lat, lng, storeType);
      setVendors(data);
    } catch (error) {
      console.error('Failed to fetch vendors:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (lat && lng && storeType) {
      fetchVendors();
    }
  }, [lat, lng, storeType]);

  const renderVendor = ({ item }) => (
    <VendorCard
      vendor={item}
      onPress={() => router.push(`/vendor/${item._id}/cat`)} // ✅ FIXED PATH
    />
  );

  if (loading) {
    return <ActivityIndicator size="small" color="#888" style={{ marginTop: 20 }} />;
  }

  if (!vendors.length) {
    return <Text style={styles.emptyText}>No vendors found nearby.</Text>;
  }

  return (
    <FlatList
      data={vendors}
      keyExtractor={(item) => item._id}
      renderItem={renderVendor}
      contentContainerStyle={{ paddingBottom: 12 }}
      showsVerticalScrollIndicator={false}
    />
  );
};

const styles = StyleSheet.create({
  emptyText: {
    fontSize: 14,
    color: '#888',
    textAlign: 'center',
    marginTop: 20,
  },
});

export default VendorList;
