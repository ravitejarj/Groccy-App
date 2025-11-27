import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function LanguageModal({ onClose }) {
  const languages = [
    { label: '🇺🇸 English' },
    { label: '🇮🇳 Hindi' },
    { label: '🇮🇳 Telugu' },
    { label: '🌐 Other' },
  ];

  return (
    <View style={styles.overlay}>
      <View style={styles.modal}>
        <Text style={styles.title}>🌐 Choose Language</Text>
        {languages.map((lang) => (
          <TouchableOpacity
            key={lang.label}
            style={styles.option}
            onPress={onClose} // replace with real language switch
          >
            <Text style={styles.optionText}>{lang.label}</Text>
          </TouchableOpacity>
        ))}
        <TouchableOpacity style={styles.closeBtn} onPress={onClose}>
          <Text style={styles.closeText}>Cancel</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modal: {
    width: 300,
    backgroundColor: '#FFF',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 16,
    color: '#222',
  },
  option: {
    width: '100%',
    paddingVertical: 12,
    alignItems: 'center',
    borderBottomColor: '#EEE',
    borderBottomWidth: 1,
  },
  optionText: {
    fontSize: 16,
    color: '#333',
  },
  closeBtn: {
    marginTop: 16,
  },
  closeText: {
    fontSize: 15,
    color: '#888',
  },
});
