// components/Profile/ProfileRow.jsx

import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function ProfileRow({ icon, label, onPress }) {
  return (
    <TouchableOpacity style={styles.row} activeOpacity={0.8} onPress={onPress}>
      <Text style={styles.emoji}>{label.slice(0, 2)}</Text>
      <Text style={styles.label}>{label.slice(2).trim()}</Text>
      <Ionicons name="chevron-forward" size={18} color="#C4C4C4" />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FAFAFA',
    paddingVertical: 12,
    borderRadius: 12,
    paddingHorizontal: 16,
    shadowColor: '#000',
    shadowOpacity: 0.03,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 3,
    elevation: 1,
  },
  emoji: {
    fontSize: 18,
    width: 28,
    marginRight: 12,
    textAlign: 'center',
  },
  label: {
    flex: 1,
    fontSize: 15,
    color: '#222',
    fontWeight: '500',
  },
});
