import React, { useEffect, useRef, useState } from 'react';
import {
  TextInput,
  Animated,
  View,
  StyleSheet,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const PLACEHOLDER_HEIGHT = 20;

type SearchBarProps = {
  searchText: string;
  onSearchTextChange: (text: string) => void;
  autoFocus?: boolean;
  rotatingTexts?: string[];
  placeholderText?: string;
  customStyle?: ViewStyle; // ✅ new prop
};

const SearchBar: React.FC<SearchBarProps> = ({
  searchText,
  onSearchTextChange,
  autoFocus = false,
  rotatingTexts = [],
  placeholderText = '',
  customStyle = {},
}) => {
  const animation = useRef(new Animated.Value(0)).current;
  const [index, setIndex] = useState(0);
  const [displayText, setDisplayText] = useState(rotatingTexts?.[0] || '');
  const [isFocused, setIsFocused] = useState(false);

  const animateText = () => {
    if (!rotatingTexts || rotatingTexts.length === 0) return;

    Animated.sequence([
      Animated.timing(animation, {
        toValue: -PLACEHOLDER_HEIGHT,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(animation, {
        toValue: PLACEHOLDER_HEIGHT,
        duration: 0,
        useNativeDriver: true,
      }),
      Animated.timing(animation, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start(() => {
      const nextIndex = (index + 1) % rotatingTexts.length;
      setIndex(nextIndex);
      setDisplayText(rotatingTexts[nextIndex]);
    });
  };

  useEffect(() => {
    if (!rotatingTexts || rotatingTexts.length === 0) return;

    const interval = setInterval(() => {
      if (!searchText) animateText();
    }, 2500);

    return () => clearInterval(interval);
  }, [index, searchText, rotatingTexts]);

  return (
    <View style={styles.wrapper}>
      <View
        style={[
          styles.container,
          customStyle, // ✅ custom overrides here
          {
            borderColor: isFocused ? '#FF5722' : '#ddd',
            backgroundColor: 'rgba(255,255,255,0.7)',
            borderWidth: 1,
            shadowColor: '#000',
            shadowOpacity: 0.05,
            shadowRadius: 4,
            shadowOffset: { width: 0, height: 2 },
          },
        ]}
      >
        <View style={styles.iconBubble}>
          <Ionicons name="search" size={18} color="#666" />
        </View>

        <TextInput
          value={searchText}
          onChangeText={onSearchTextChange}
          placeholder={
            placeholderText || (displayText ? `Search for "${displayText}"` : 'Search')
          }
          placeholderTextColor="#999"
          style={styles.input}
          returnKeyType="search"
          autoFocus={autoFocus}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />

        {searchText.length > 0 && (
          <TouchableOpacity
            onPress={() => onSearchTextChange('')}
            style={styles.clearButton}
          >
            <Ionicons name="close-circle" size={20} color="#999" />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    marginHorizontal: 16,
    borderRadius: 12,
    overflow: 'hidden',
  },
  container: {
    height: 48,
    borderRadius: 24,
    paddingHorizontal: 14,
    flexDirection: 'row',
    alignItems: 'center',
    position: 'relative',
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
  },
  clearButton: {
    padding: 4,
    marginLeft: 6,
  },
});

export default SearchBar;
