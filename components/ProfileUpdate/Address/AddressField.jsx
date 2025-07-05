import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { getPlaceSuggestions, getPlaceDetails } from '@/services/GooglePlacesService';

const AddressField = ({ query, setQuery, form, setForm }) => {
  const [suggestions, setSuggestions] = useState([]);

  const handleChange = async (text) => {
    setQuery(text);
    setForm({ ...form, street: text });
    if (text.length > 2) {
      const results = await getPlaceSuggestions(text);
      setSuggestions(results);
    } else {
      setSuggestions([]);
    }
  };

  const handleSelect = async (item) => {
    const loc = await getPlaceDetails(item.place_id);
    if (!loc) return;

    const streetOnly = item.description.split(',')[0]?.trim();
    setForm({
      ...form,
      street: streetOnly || '',
      city: loc.city || '',
      state: loc.state || '',
      zipCode: loc.zipCode || '',
      lat: loc.lat,
      lng: loc.lng,
    });
    setQuery(streetOnly || '');
    setSuggestions([]);
  };

  return (
    <>
      <Text style={styles.label}>Street Address</Text>
      <View style={styles.inputWithIcon}>
        <Ionicons name="location-outline" size={20} color="#999" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="123 Main St"
          value={query}
          onChangeText={handleChange}
        />
        {query.length > 0 && (
          <TouchableOpacity
            onPress={() => {
              setQuery('');
              setForm({ ...form, street: '', lat: null, lng: null });
              setSuggestions([]);
            }}
            style={styles.clearIcon}
          >
            <Ionicons name="close-circle" size={18} color="#999" />
          </TouchableOpacity>
        )}
      </View>

      {suggestions.length > 0 && (
        <View style={styles.suggestionBox}>
          {suggestions.map((item) => (
            <TouchableOpacity
              key={item.place_id}
              onPress={() => handleSelect(item)}
              style={styles.suggestionItem}
            >
              <Text style={styles.suggestionText}>{item.description}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  label: {
    fontSize: 14,
    color: '#666',
    marginBottom: 6,
  },
  inputWithIcon: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 14,
  },
  icon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#222',
  },
  clearIcon: {
    marginLeft: 8,
  },
  suggestionBox: {
    marginTop: 6,
    borderWidth: 1,
    borderColor: '#EEE',
    borderRadius: 10,
    backgroundColor: '#FFF',
  },
  suggestionItem: {
    padding: 12,
    borderBottomWidth: 1,
    borderColor: '#F0F0F0',
  },
  suggestionText: {
    fontSize: 14,
    color: '#333',
  },
});

export default AddressField;
