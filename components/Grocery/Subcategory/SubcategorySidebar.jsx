import React from 'react';
import { View, FlatList, ActivityIndicator, StyleSheet } from 'react-native';
import VerticalTabItem from './VerticalTabItem';

const SIDEBAR_WIDTH = 80;

export default function SubcategorySidebar({ subcategories, selectedId, loading, onSelect }) {
  return (
    <View style={styles.sidebar}>
      {loading ? (
        <ActivityIndicator size="large" color="#FF5722" style={{ marginTop: 40 }} />
      ) : (
        <FlatList
          data={subcategories}
          renderItem={({ item }) => (
            <VerticalTabItem
              item={item}
              selected={item._id === selectedId}
              onPress={() => onSelect(item._id)}
            />
          )}
          keyExtractor={(item) => item._id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingTop: 120 }}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  sidebar: {
    width: SIDEBAR_WIDTH,
    backgroundColor: '#FFF',
  },
});
