import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { getDistanceColor } from '@/constants/Colors';

const VendorCard = ({ vendor, onPress }) => {
  const { name, distance, image } = vendor;

  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.9}>
      <Image source={{ uri: image }} style={styles.logo} />
      <View style={styles.details}>
        <Text style={styles.name} numberOfLines={1}>{name}</Text>
        {distance !== undefined && (
          <Text
            style={[
              styles.distanceText,
              { color: getDistanceColor(distance) }
            ]}
          >
            {distance?.toFixed(1)} mi
          </Text>
        )}
      </View>
    </TouchableOpacity>
  );
};

// Removed getDistanceLabel function

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 14,
    marginHorizontal: 16,
    marginBottom: 12,

    // Soft shadow (iOS)
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,

    // Elevation (Android)
    elevation: 4,
  },
  logo: {
    width: 60,
    height: 60,
    borderRadius: 12,
    backgroundColor: '#eee',
    marginRight: 14,
  },
  details: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111',
    marginBottom: 6,
  },
  distanceText: {
    fontSize: 13,
    fontWeight: '500',
  },
});

export default VendorCard;
