import React from 'react';
import { View, Text, TextInput, StyleSheet, Keyboard } from 'react-native';

const ZipField = ({ zip, onChangeText, error }) => (
  <View>
    <Text style={styles.label}>ZIP Code</Text>
    <TextInput
      style={styles.input}
      value={zip}
      keyboardType="number-pad"
      placeholder="e.g. 08820"
      maxLength={5}
      returnKeyType="done"
      onSubmitEditing={() => Keyboard.dismiss()}
      onChangeText={onChangeText}
    />
    {error && <Text style={styles.error}>ZIP must be 5 digits</Text>}
  </View>
);

const styles = StyleSheet.create({
  label: { fontSize: 14, color: '#666', marginBottom: 6 },
  input: {
    backgroundColor: '#F5F5F5',
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 10,
    fontSize: 16,
    color: '#222',
  },
  error: { fontSize: 13, color: '#D33', marginTop: 4 },
});

export default ZipField;
