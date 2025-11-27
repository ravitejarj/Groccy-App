import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, TextInput, View } from 'react-native';

const FormInput = ({ icon, rightIcon, ...props }) => (
  <View style={styles.inputContainer}>
    <Ionicons name={icon} size={20} color="#666" />
    <TextInput style={styles.input} placeholderTextColor="#999" {...props} />
    {rightIcon && <View style={styles.rightIcon}>{rightIcon}</View>}
  </View>
);

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 15,
    position: 'relative',
  },
  input: {
    flex: 1,
    height: 50,
    marginLeft: 10,
    fontSize: 16,
  },
  rightIcon: {
    position: 'absolute',
    right: 12,
  },
});

export default FormInput;
