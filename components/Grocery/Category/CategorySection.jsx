import React from 'react';
import { View, Text, Animated, StyleSheet, Dimensions } from 'react-native';
import CategoryBox from './CategoryBox';

const SCREEN_WIDTH = Dimensions.get('window').width;
const NUM_COLUMNS = 4;
const CARD_GAP = 12;
const TOTAL_GAPS = CARD_GAP * (NUM_COLUMNS + 1);
const CARD_WIDTH = (SCREEN_WIDTH - TOTAL_GAPS) / NUM_COLUMNS;

const groupIntoRows = (items) => {
  const rows = [];
  let temp = [];
  for (let i = 0; i < items.length; i++) {
    temp.push(items[i]);
    if (temp.length === NUM_COLUMNS) {
      rows.push(temp);
      temp = [];
    }
  }
  if (temp.length > 0) rows.push(temp);
  return rows;
};

export default function CategorySection({ title, items, onCategoryPress }) {
  return (
    <Animated.View style={styles.sectionBlock}>
      <Text style={styles.sectionTitle}>{title}</Text>
      <View style={styles.sectionCard}>
        {groupIntoRows(items).map((row, rowIndex) => (
          <View key={rowIndex} style={styles.row}>
            {row.map((item) => (
              <CategoryBox
                key={item._id}
                image={{ uri: item.images?.[0] || 'https://via.placeholder.com/100' }}
                label={item.name}
                width={CARD_WIDTH}
                onPress={() => onCategoryPress(item)}
              />
            ))}
          </View>
        ))}
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  sectionBlock: {
    paddingTop: 16,
    paddingBottom: 0,
    paddingHorizontal: 12,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#222',
    marginBottom: 14,
    paddingHorizontal: 6,
  },
  sectionCard: {
    paddingVertical: 4,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginBottom: CARD_GAP,
    paddingHorizontal: CARD_GAP,
    flexWrap: 'nowrap',
    gap: 8,
  },
});
