import React from 'react';
import { Text, TextInput, View } from 'react-native';
import styles from './styles';

// ✅ Reusable FormInput component
export const FormInput = ({
  label,
  value,
  onChangeText,
  placeholder,
  ...props
}) => (
  <View>
    <Text style={styles.inputLabel}>{label}</Text>
    <TextInput
      style={styles.input}
      value={value}
      onChangeText={onChangeText}
      placeholder={placeholder}
      placeholderTextColor="#999"
      {...props}
    />
  </View>
);

// ✅ Reusable ErrorText component
export const ErrorText = ({ error }) => {
  if (!error) return null;
  return (
    <Text style={{ color: 'red', marginBottom: 12, textAlign: 'center' }}>
      {error}
    </Text>
  );
};
