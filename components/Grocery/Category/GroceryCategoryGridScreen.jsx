import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import debounce from 'lodash.debounce';

import CategoryHeader from './CategoryHeader';
import CategorySection from './CategorySection';
import SearchDropdown from './SearchDropdown';
import { getVendorCategories, searchVendorProducts } from '@/services/GroceryCatalogService';
import { useCart } from '@/components/Cart/CartContext'; // ✅ Step 1: import

const CATEGORY_ORDER = [
  'Vegetables & Fruits',
  'Atta, Rice & Dal',
  'Oil, Ghee & Masala',
  'Dairy',
  'Dry Fruits & Cereals',
  'Kitchenware & Appliances',
  'Chips',
  'Sweets & Chocolates',
  'Drinks & Juices',
  'Tea, Coffee',
  'Bakery & Biscuits',
  'Instant Food',
  'Ice Creams & More',
  'Frozen Vegetables',
  'Frozen Snacks',
  'Bath & Body',
  'Hair',
];

const normalize = (str) => str?.toLowerCase().trim();
const sortByOrder = (list) =>
  list.sort((a, b) => {
    const indexA = CATEGORY_ORDER.findIndex((name) => normalize(name) === normalize(a.name));
    const indexB = CATEGORY_ORDER.findIndex((name) => normalize(name) === normalize(b.name));
    return (indexA === -1 ? 999 : indexA) - (indexB === -1 ? 999 : indexB);
  });

export default function GroceryCategoryGridScreen({ vendorId }) {
  const router = useRouter();
  const { loadCart } = useCart(); // ✅ Step 2: useCart hook

  const [groupedCategories, setGroupedCategories] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [dropdownResults, setDropdownResults] = useState([]);

  useEffect(() => {
    loadCart(); // ✅ Step 3: Load cart on screen open
  }, []);

  useEffect(() => {
    const loadStructure = async () => {
      try {
        const data = await getVendorCategories(vendorId);
        const all = sortByOrder(data.categories || []);

        const groceryKeywords = [
          'vegetables & fruits',
          'atta, rice & dal',
          'oil, ghee & masala',
          'dairy',
          'dry fruits & cereals',
          'kitchenware & appliances',
          'bakery & biscuits',
        ];
        const snacksKeywords = [
          'chips',
          'sweets & chocolates',
          'drinks & juices',
          'tea, coffee',
          'instant food',
          'ice creams & more',
          'frozen vegetables',
          'frozen snacks',
        ];

        const grocery = all.filter((c) =>
          groceryKeywords.some((k) => normalize(k) === normalize(c.name))
        );
        const snacks = all.filter((c) =>
          snacksKeywords.some((k) => normalize(k) === normalize(c.name))
        );

        setGroupedCategories([
          { title: 'Grocery & Kitchen', items: grocery },
          { title: 'Snacks & Drinks', items: snacks },
        ]);
      } catch (err) {
        console.error('Error loading categories:', err);
      }
    };

    if (vendorId) loadStructure();
  }, [vendorId]);

  const handleSearch = debounce(async (query) => {
    if (!query?.trim()) return setDropdownResults([]);
    try {
      const results = await searchVendorProducts(vendorId, query);
      setDropdownResults(results);
    } catch (err) {
      console.error('Search error:', err);
    }
  }, 300);

  useEffect(() => {
    handleSearch(searchQuery);
  }, [searchQuery]);

  const handleCategoryPress = (category) => {
    router.push(`/vendor/${vendorId}/${category._id}/sub`);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <CategoryHeader
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />

      {searchQuery && dropdownResults.length > 0 && (
        <SearchDropdown
          data={dropdownResults}
          vendorId={vendorId}
          onClose={() => setSearchQuery('')}
        />
      )}

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {groupedCategories.map((group) => (
          <CategorySection
            key={group.title}
            title={group.title}
            items={group.items}
            onCategoryPress={handleCategoryPress}
          />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F7FDF4',
  },
  scrollContainer: {
    paddingVertical: 16,
  },
});
