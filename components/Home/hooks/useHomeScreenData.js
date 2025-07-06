import { useCart } from '@/components/Cart/CartContext';
import { getUserAddress } from '@/services/AddressService';
import { getNearbyVendors } from '@/services/NearbyVendorsService';
import AsyncStorage from '@react-native-async-storage/async-storage';
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
    onRefresh,
    userAddress,
    searchText,
    setSearchText,
    allVendors,
    scrollOffset,
    setScrollOffset,
  };
};
