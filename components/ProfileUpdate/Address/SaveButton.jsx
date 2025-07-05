import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator } from 'react-native';

const SaveButton = ({ isSaving, onPress }) => (
  <TouchableOpacity
    style={[styles.button, isSaving && { opacity: 0.6 }]}
    onPress={onPress}
    disabled={isSaving}
  >
    {isSaving ? (
      <ActivityIndicator color="#fff" />
    ) : (
      <Text style={styles.btnText}>Save Changes</Text>
    )}
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#FF5722',
    marginTop: 24,
    paddingVertical: 14,
    borderRadius: 30,
    alignItems: 'center',
  },
  btnText: {
    color: '#FFF',
    fontWeight: '700',
    fontSize: 15,
  },
});

export default SaveButton;
