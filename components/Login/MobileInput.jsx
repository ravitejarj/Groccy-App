// File: components/Login/MobileInput.jsx
import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';

const MobileInput = ({ value, onChangeText }) => {
  return (
    <View style={styles.container}>
      <View style={styles.codeBox}>
        <Text style={styles.flag}>🇺🇸</Text>
        <Text style={styles.code}>+1</Text>
      </View>
      <TextInput
        style={styles.input}
        placeholder="Enter mobile number"
        placeholderTextColor="#999"
        keyboardType="phone-pad"
        maxLength={10}
        value={value}
        onChangeText={onChangeText}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 14,
    backgroundColor: '#fff',
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  codeBox: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingRight: 10,
    borderRightWidth: 1,
    borderRightColor: '#ccc',
  },
  flag: {
    fontSize: 18,
    marginRight: 6,
  },
  code: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  input: {
    flex: 1,
    fontSize: 16,
    paddingLeft: 10,
    height: 48,
    color: '#000',
  },
});

export default MobileInput;
