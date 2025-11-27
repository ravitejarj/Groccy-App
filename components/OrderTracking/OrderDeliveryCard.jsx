import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function OrderDeliveryCard() {
  return (
    <View style={styles.card}>
      <View style={styles.row}>
        <Image
          source={{ uri: 'https://randomuser.me/api/portraits/men/44.jpg' }}
          style={styles.avatar}
        />
        <View style={styles.info}>
          <Text style={styles.name}>Ravi Kalavena</Text>
          <Text style={styles.sub}>Delivery Partner • ⭐ 4.8</Text>
        </View>
        <TouchableOpacity style={styles.callBtn}>
          <Ionicons name="call" size={18} color="#FFF" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFF',
    borderRadius: 16,
    padding: 16,
    marginHorizontal: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    elevation: 2,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#EEE',
  },
  info: {
    flex: 1,
    marginLeft: 12,
  },
  name: {
    fontWeight: '600',
    fontSize: 15,
    color: '#222',
  },
  sub: {
    fontSize: 13,
    color: '#777',
    marginTop: 2,
  },
  callBtn: {
    backgroundColor: '#FF5722',
    borderRadius: 20,
    padding: 10,
    marginLeft: 10,
  },
});
