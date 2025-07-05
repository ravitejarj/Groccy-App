import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function OrderTimeline() {
  const timelineSteps = [
    { label: 'Order Confirmed', time: '9:00 AM', icon: 'checkmark-circle' },
    { label: 'Packing Items', time: '9:10 AM', icon: 'cube' },
    { label: 'Out for Delivery', time: '9:45 AM', icon: 'bicycle' },
    { label: 'Delivered', time: '--', icon: 'home-outline' },
  ];

  return (
    <View style={styles.container}>
      {timelineSteps.map((step, index) => (
        <View key={index} style={styles.step}>
          <View style={styles.iconCircle(index <= 2)}>
            <Ionicons
              name={step.icon}
              size={20}
              color={index <= 2 ? '#FF5722' : '#AAA'}
            />
          </View>
          <View style={styles.textBox}>
            <Text style={styles.label}>{step.label}</Text>
            <Text style={styles.time}>{step.time}</Text>
          </View>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 16,
    marginBottom: 16,
    padding: 16,
    backgroundColor: '#FFF',
    borderRadius: 16,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    elevation: 2,
  },
  step: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 14,
  },
  iconCircle: (active) => ({
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: '#F2F2F2',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  }),
  textBox: {
    flex: 1,
    borderBottomWidth: 0.5,
    borderBottomColor: '#EEE',
    paddingBottom: 6,
  },
  label: {
    fontSize: 14,
    color: '#222',
    fontWeight: '500',
  },
  time: {
    fontSize: 12,
    color: '#999',
  },
});
