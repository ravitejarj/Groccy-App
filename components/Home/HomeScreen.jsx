import React, { useState, useCallback, useEffect } from 'react';
import {
  View,
  FlatList,
  Keyboard,
  TouchableWithoutFeedback,
  RefreshControl,
  BackHandler,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect, useRouter } from 'expo-router';

import SafeAreaWrapper from '@/components/Common/SafeAreaWrapper';
import { getUserAddress } from '@/services/AddressService';
import { getNearbyVendors } from '@/services/NearbyVendorsService';
import { useCart } from '@/components/Cart/CartContext';
import { CATEGORY_COLORS } from '@/constants/Colors';

import FixedHeader from './FixedHeader';
import SearchDropdown from './SearchDropdown';
import VendorListSection from './VendorListSection';

export default function HomeScreen() {
  const router = useRouter();
  const { loadCart } = useCart();

  const [activeCategory, setActiveCategory] = useState('grocery');
  const [refreshing, setRefreshing] = useState(false);
  const [userAddress, setUserAddress] = useState(null);
  const [searchText, setSearchText] = useState('');
  const [allVendors, setAllVendors] = useState([]);
  const [filteredVendors, setFilteredVendors] = useState([]);
  const [scrollOffset, setScrollOffset] = useState(0);

  const fetchData = async () => {
    try {
      const userId = await AsyncStorage.getItem('userId');
      const token = await AsyncStorage.getItem('token');
      if (!userId || !token) return;

      const address = await getUserAddress(userId, token);
      setUserAddress(address);

      if (address?.lat && address?.lng) {
        const data = await getNearbyVendors(address.lat, address.lng, activeCategory);
        setAllVendors(data);
      }
    } catch (err) {
      console.error('Error loading data:', err);
    }
  };

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await fetchData();
    setRefreshing(false);
  }, [activeCategory]);

  useEffect(() => {
    fetchData();
    loadCart();
  }, [activeCategory]);

  useEffect(() => {
    if (!searchText) return setFilteredVendors([]);
    const filtered = allVendors.filter(v =>
      v.name?.toLowerCase().includes(searchText.toLowerCase())
    );
    setFilteredVendors(filtered.slice(0, 5));
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
            data={[1]}
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
