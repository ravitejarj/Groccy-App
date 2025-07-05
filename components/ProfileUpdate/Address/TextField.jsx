import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';

const TextField = ({ label, value, onChangeText, ...props }) => (
  <View>
    <Text style={styles.label}>{label}</Text>
    <TextInput
      style={styles.input}
      value={value}
      onChangeText={onChangeText}
      placeholder={`Enter ${label}`}
      placeholderTextColor="#AAA"
      {...props}
    />
  </View>
);

const styles = StyleSheet.create({
  label: {
    fontSize: 14,
    color: '#666',
    marginBottom: 6,
  },
  input: {
    backgroundColor: '#F5F5F5',
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 6,
    fontSize: 16,
    color: '#222',
  },
});

export default TextField;
