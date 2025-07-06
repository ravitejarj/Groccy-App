import { useFocusEffect, useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React, { useCallback, useEffect, useState } from 'react';
import {
  BackHandler,
  FlatList,
  Keyboard,
  RefreshControl,
  TouchableWithoutFeedback,
  View,
} from 'react-native';

import SafeAreaWrapper from '@/components/Common/SafeAreaWrapper';
import { CATEGORY_COLORS } from '@/constants/Colors';
import FixedHeader from './FixedHeader';
import SearchDropdown from './Header/SearchDropdown';
import VendorListSection from './Vendors/VendorListSection';

import { getFilteredVendors } from './helpers/handleSearchLogic';
import { useHomeScreenData } from './hooks/useHomeScreenData';

export default function HomeScreen() {
  const router = useRouter();

  const {
    activeCategory,
    setActiveCategory,
    refreshing,
    onRefresh,
    userAddress,
    searchText,
    setSearchText,
    allVendors,
    scrollOffset,
    setScrollOffset,
  } = useHomeScreenData();

  const [filteredVendors, setFilteredVendors] = useState([]);

  useEffect(() => {
    if (!searchText) return setFilteredVendors([]);
    const filtered = getFilteredVendors(allVendors, searchText);
    setFilteredVendors(filtered);
  }, [searchText, allVendors]);

  useFocusEffect(
    useCallback(() => {
      const onBackPress = () => true;
      const subscription = BackHandler.addEventListener('hardwareBackPress', onBackPress);
      return () => subscription.remove();
    }, [])
  );

  const categoryBg = CATEGORY_COLORS[activeCategory] || '#FFFDF7';

  return (
    <SafeAreaWrapper style={{ flex: 1, backgroundColor: categoryBg }}>
      <TouchableWithoutFeedback
        onPress={() => {
          setSearchText('');
          Keyboard.dismiss();
        }}
      >
        <View style={{ flex: 1 }}>
          <StatusBar style="dark" backgroundColor={categoryBg} />

          <FixedHeader
            searchText={searchText}
            onSearchTextChange={setSearchText}
            userAddress={userAddress}
            activeCategory={activeCategory}
            setActiveCategory={setActiveCategory}
          />

          <SearchDropdown
            searchText={searchText}
            filteredVendors={filteredVendors}
            onVendorSelect={(id) => {
              router.push(`/vendor/${id}/cat`);
              setSearchText('');
            }}
          />

          <FlatList
            data={[1]} // Dummy data to render VendorListSection once
            keyExtractor={() => 'vendorListKey'}
            renderItem={() => (
              <VendorListSection
                lat={userAddress?.lat}
                lng={userAddress?.lng}
                storeType={activeCategory}
              />
            )}
            refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 24 }}
            scrollEventThrottle={16}
            onScroll={({ nativeEvent }) => {
              const currentOffset = nativeEvent.contentOffset.y;
              if (currentOffset > scrollOffset && searchText.length > 0) {
                setSearchText('');
                Keyboard.dismiss();
              }
              setScrollOffset(currentOffset);
            }}
          />
        </View>
      </TouchableWithoutFeedback>
    </SafeAreaWrapper>
  );
}
