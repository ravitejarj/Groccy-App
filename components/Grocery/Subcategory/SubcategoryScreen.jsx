// ✅ Rewritten clean SubcategoryScreen layout with fixed sidebar + proper spacing
import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  StyleSheet,
  Keyboard,
  TouchableWithoutFeedback,
  SafeAreaView,
  LayoutAnimation,
} from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import {
  getVendorSubcategories,
  getProductsBySubcategory,
  searchVendorProducts,
} from '@/services/GroceryCatalogService';
import { useCart } from '@/components/Cart/CartContext';

import SubcategoryHeader from './SubcategoryHeader';
import SubcategorySidebar from './SubcategorySidebar';
import SubcategoryProductList from './SubcategoryProductList';
import { sortSubcategoriesByOrder } from './subcategoryHelpers'; // ✅ NEW

export default function SubcategoryScreen() {
  const { vendorId, categoryId } = useLocalSearchParams();
  const { loadCart } = useCart();

  const [subcategories, setSubcategories] = useState([]);
  const [selectedSubcategoryId, setSelectedSubcategoryId] = useState(null);
  const [products, setProducts] = useState([]);
  const [loadingSubcategories, setLoadingSubcategories] = useState(true);
  const [loadingProducts, setLoadingProducts] = useState(false);

  const [searchQuery, setSearchQuery] = useState('');
  const [dropdownResults, setDropdownResults] = useState([]);
  const flatListRef = useRef(null);

  useEffect(() => {
    loadCart();
  }, []);

  useEffect(() => {
    const fetchSubcategories = async () => {
      setLoadingSubcategories(true);
      try {
        const data = await getVendorSubcategories(vendorId, categoryId);
        const list = data?.subcategories || [];
        const categoryName = data?.categoryName || '';

        // ✅ Apply sort logic here
        const sorted = sortSubcategoriesByOrder(list, categoryName);

        setSubcategories(sorted);
        if (sorted.length > 0) setSelectedSubcategoryId(sorted[0]._id);
      } catch (err) {
        console.error('❌ Subcategories fetch error:', err);
      } finally {
        setLoadingSubcategories(false);
      }
    };

    if (vendorId && categoryId) fetchSubcategories();
  }, [vendorId, categoryId]);

  useEffect(() => {
    const fetchProducts = async () => {
      if (!selectedSubcategoryId) return;
      setLoadingProducts(true);
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
      try {
        const data = await getProductsBySubcategory(vendorId, selectedSubcategoryId);
        setProducts(data?.products || []);
        flatListRef?.current?.scrollToOffset?.({ offset: 0, animated: true });
      } catch (err) {
        console.error('❌ Products fetch error:', err);
      } finally {
        setLoadingProducts(false);
      }
    };
    if (!searchQuery) fetchProducts();
  }, [selectedSubcategoryId, searchQuery]);

  useEffect(() => {
    const delaySearch = setTimeout(async () => {
      if (!searchQuery?.trim()) return setDropdownResults([]);
      try {
        const results = await searchVendorProducts(vendorId, searchQuery);
        setDropdownResults(results);
      } catch (err) {
        console.error('❌ Search failed:', err);
      }
    }, 300);
    return () => clearTimeout(delaySearch);
  }, [searchQuery]);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView style={styles.container}>
        <View style={styles.row}>
          <SubcategorySidebar
            subcategories={subcategories}
            selectedId={selectedSubcategoryId}
            loading={loadingSubcategories}
            onSelect={setSelectedSubcategoryId}
          />

          <View style={styles.rightColumn}>
            <SubcategoryHeader
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              dropdownResults={dropdownResults}
              vendorId={vendorId}
              clearSearch={() => setSearchQuery('')}
            />

            <SubcategoryProductList
              products={products}
              loading={loadingProducts}
              selectedSubcategory={subcategories.find(s => s._id === selectedSubcategoryId)}
              showGrid={!searchQuery}
              vendorId={vendorId}
              flatListRef={flatListRef}
            />
          </View>
        </View>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  row: {
    flexDirection: 'row',
    flex: 1,
  },
  rightColumn: {
    flex: 1,
    paddingTop: 8,
    paddingLeft: 0,
    backgroundColor: '#FAFAFA',
  },
});
