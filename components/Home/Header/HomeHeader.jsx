import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const HomeHeader = ({ address, style }) => {
  const router = useRouter();

  const handleNotificationPress = () => {
    router.push('/notifications');
  };

  const handleLocationPress = () => {
    router.push('/address_form');
  };

  return (
    <View style={[styles.container, style]}>
      <TouchableOpacity 
        style={styles.locationContainer}
        onPress={handleLocationPress}
        activeOpacity={0.7}
      >
        <Text style={styles.locationLabel}>My Location</Text>
        <View style={styles.locationRow}>
          <Ionicons name="location-outline" size={20} color="#333" />
          <Text style={styles.locationText}>
            {address?.street ? address.street.slice(0, 25) + '...' : 'Set Address'}
          </Text>
          <Ionicons name="chevron-down" size={20} color="#333" />
        </View>
      </TouchableOpacity>

      <TouchableOpacity 
        style={styles.notificationButton}
        onPress={handleNotificationPress}
      >
        <Ionicons name="notifications-outline" size={24} color="#333" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 4,
    paddingBottom: 8,
  },
  locationContainer: {
    flex: 1,
  },
  locationLabel: {
    fontSize: 13,
    color: '#333',
    fontWeight: '700', // thicker text for "My Location"
    marginBottom: 4,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationText: {
    fontSize: 15,
    fontWeight: '400', // thinner address
    color: '#555',
    marginHorizontal: 4,
  },
  notificationButton: {
    padding: 8,
  },
});

export default HomeHeader;
