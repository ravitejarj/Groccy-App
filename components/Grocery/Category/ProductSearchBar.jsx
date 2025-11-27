import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Animated,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function ProductSearchBar({ searchText, onSearchTextChange }) {
  const [isFocused, setIsFocused] = useState(false);
  const borderAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(borderAnim, {
      toValue: isFocused ? 1 : 0,
      duration: 200,
      useNativeDriver: false,
    }).start();
  }, [isFocused]);

  const borderColor = borderAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['#E0E0E0', '#FF5722'],
  });

  return (
    <Animated.View style={[styles.container, { borderColor }]}>
      {/* 🔍 Icon Bubble */}
      <View style={styles.iconBubble}>
        <Ionicons name="search" size={18} color="#666" />
      </View>

      {/* 📝 Input Field */}
      <TextInput
        value={searchText}
        onChangeText={onSearchTextChange}
        placeholder="Search products..."
        placeholderTextColor="#999"
        style={styles.input}
        returnKeyType="search"
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        autoCorrect={false}
        underlineColorAndroid="transparent"
      />

      {/* ❌ Clear Button */}
      {searchText.length > 0 && (
        <TouchableOpacity onPress={() => onSearchTextChange('')} style={styles.clearButton}>
          <Ionicons name="close-circle" size={20} color="#999" />
        </TouchableOpacity>
      )}
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255,255,255,0.85)',
    borderRadius: 30,
    paddingHorizontal: 12,
    alignItems: 'center',
    height: 50,
    marginHorizontal: 16,
    marginTop: 14,
    borderWidth: 1,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
  },
  iconBubble: {
    backgroundColor: '#EAEAEA',
    padding: 6,
    borderRadius: 9999,
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#333',
    paddingVertical: 8,
  },
  clearButton: {
    padding: 4,
    marginLeft: 6,
  },
});
