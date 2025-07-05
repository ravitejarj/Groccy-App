import { useRouter } from 'expo-router';
import React from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';

const ConfirmLocationFooter = ({ address, city, onConfirm, checking, notServiceable }) => {
  const router = useRouter();

  return (
    <View style={styles.footer}>
      <Text style={styles.addressMain}>{address}</Text>
      <Text style={styles.addressCity}>{city}</Text>

      {notServiceable && (
        <View style={styles.errorBox}>
          <Text style={styles.errorText}>
            We are not serviceable at this location. Please select a different location.
          </Text>
        </View>
      )}

      <TouchableOpacity
        style={[styles.confirmButton, notServiceable && styles.disabled]}
        onPress={onConfirm}
        disabled={checking || notServiceable}
      >
        {checking ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.confirmText}>Confirm Location</Text>
        )}
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.manualButton}
        onPress={() => router.push('/address_form')}
      >
        <Text style={styles.manualButtonText}>Enter Address Manually</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ConfirmLocationFooter;

const styles = StyleSheet.create({
  footer: {
    backgroundColor: '#fff',
    padding: 16,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    elevation: 6,
  },
  addressMain: {
    fontSize: 15,
    fontWeight: '600',
    color: '#000',
    textAlign: 'center',
  },
  addressCity: {
    fontSize: 13,
    color: '#777',
    textAlign: 'center',
    marginBottom: 14,
  },
  errorBox: {
    backgroundColor: '#fdecea',
    padding: 10,
    marginBottom: 10,
    borderRadius: 8,
  },
  errorText: {
    color: '#d32f2f',
    fontSize: 13,
    textAlign: 'center',
  },
  confirmButton: {
    backgroundColor: '#FF6D00',
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
  },
  confirmText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
  disabled: {
    opacity: 0.5,
  },
  manualButton: {
    marginTop: 12,
    paddingVertical: 14,
    borderRadius: 10,
    borderColor: '#FF6D00',
    borderWidth: 1.5,
    alignItems: 'center',
  },
  manualButtonText: {
    color: '#FF6D00',
    fontSize: 15,
    fontWeight: '600',
  },
});
