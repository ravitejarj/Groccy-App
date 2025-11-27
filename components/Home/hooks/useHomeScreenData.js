import { useCart } from '@/components/Cart/CartContext';
import { getUserAddress } from '@/services/AddressService';
import { getNearbyVendors } from '@/services/NearbyVendorsService';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import { useCallback, useEffect, useState } from 'react';

export const useHomeScreenData = () => {
  const [activeCategory, setActiveCategory] = useState('grocery');
  const [refreshing, setRefreshing] = useState(false);
  const [userAddress, setUserAddress] = useState(null);
  const [searchText, setSearchText] = useState('');
  const [allVendors, setAllVendors] = useState([]);
  const [scrollOffset, setScrollOffset] = useState(0);

  const { loadCart } = useCart();

  const fetchData = async () => {
    try {
      const userId = await AsyncStorage.getItem('userId');
      const token = await AsyncStorage.getItem('token');
      if (!userId || !token) return;

      const data = await getUserAddress(userId, token);
      const address = Array.isArray(data)
        ? data.find(addr => addr.isDefault) || data[0]
        : data;

      setUserAddress(address);

      if (address?.lat && address?.lng) {
        const vendorData = await getNearbyVendors(address.lat, address.lng, activeCategory);
        setAllVendors(vendorData);
      }
    } catch (err) {
      console.error('Error loading data:', err);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchData();
    }, [activeCategory])
  );

  useEffect(() => {
    const init = async () => {
      await fetchData();
      const userId = await AsyncStorage.getItem('userId');
      if (userId && typeof loadCart === 'function') {
        await loadCart();
      }
    };

    init();
  }, [activeCategory]);

  return {
    activeCategory,
    setActiveCategory,
    refreshing,
    onRefresh: async () => {
      setRefreshing(true);
      await fetchData();
      setRefreshing(false);
    },
    userAddress,
    searchText,
    setSearchText,
    allVendors,
    scrollOffset,
    setScrollOffset,
  };
};
