import React from 'react';
import { FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { getPlaceSuggestions } from '@/services/GooglePlacesService';

const LocationSearchBar = ({
  query,
  setQuery,
  suggestions,
  setSuggestions,
  onSuggestionSelect,
}) => {
  const handleChange = async (text) => {
    setQuery(text);
    if (text.length > 2) {
      const results = await getPlaceSuggestions(text);
      setSuggestions(results);
    } else {
      setSuggestions([]);
    }
  };

  return (
    <View style={styles.wrapper}>
      <View style={styles.searchWrapper}>
        <TextInput
          placeholder="Search for apartment, street name..."
          style={styles.searchInput}
          placeholderTextColor="#999"
          value={query}
          onChangeText={handleChange}
        />
        {query.length > 0 && (
          <TouchableOpacity
            onPress={() => {
              setQuery('');
              setSuggestions([]);
            }}
            style={styles.clearIcon}
          >
            <Ionicons name="close-circle" size={20} color="#999" />
          </TouchableOpacity>
        )}
      </View>

      {suggestions.length > 0 && (
        <FlatList
          data={suggestions}
          keyExtractor={(item) => item.place_id}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.suggestionItem}
              onPress={() => onSuggestionSelect(item.place_id, item.description)}
            >
              <Text style={styles.suggestionText}>{item.description}</Text>
            </TouchableOpacity>
          )}
        />
      )}
    </View>
  );
};

export default LocationSearchBar;

const styles = StyleSheet.create({
  wrapper: {
    marginHorizontal: 16,
    marginBottom: 6,
    zIndex: 10,
  },
  searchWrapper: {
    position: 'relative',
  },
  searchInput: {
    height: 44,
    backgroundColor: '#f2f2f2',
    borderRadius: 12,
    paddingHorizontal: 16,
    fontSize: 14,
    paddingRight: 36,
  },
  clearIcon: {
    position: 'absolute',
    right: 12,
    top: 12,
    zIndex: 10,
  },
  suggestionItem: {
    backgroundColor: '#fff',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderColor: '#eee',
  },
  suggestionText: {
    fontSize: 14,
    color: '#333',
  },
});
