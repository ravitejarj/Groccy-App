import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function ProfileSectionCard({ title, items }) {
  const router = useRouter();

  return (
    <View style={styles.card}>
      <Text style={styles.title}>{title}</Text>
      {items.map((item) => (
        <TouchableOpacity
          key={item.label}
          style={styles.row}
          activeOpacity={0.8}
          onPress={() => {
            if (item.onPress) item.onPress();
            else if (item.route) router.push(item.route);
          }}
        >
          <Text style={styles.label}>{item.label}</Text>
          <Ionicons name="chevron-forward" size={18} color="#999" />
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFF',
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginBottom: 14,
    marginHorizontal: 20,
    elevation: 1,
  },
  title: {
    fontSize: 13,
    fontWeight: '600',
    color: '#999',
    marginBottom: 12,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    borderBottomColor: '#F2F2F2',
    borderBottomWidth: 1,
  },
  label: {
    flex: 1,
    fontSize: 15,
    color: '#222',
  },
});
