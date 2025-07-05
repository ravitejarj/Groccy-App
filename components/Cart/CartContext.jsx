import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { Alert } from 'react-native';
import ReplaceCartModal from './ReplaceCartModal';

const BASE_URL = 'http://192.168.1.150:5000/api';
const CartContext = createContext();
export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [storeName, setStoreName] = useState('');
  const [storeAddress, setStoreAddress] = useState('');
  const [userId, setUserId] = useState('');
  const [showReplaceModal, setShowReplaceModal] = useState(false);
  const [pendingItem, setPendingItem] = useState(null);
  const [pendingVendorId, setPendingVendorId] = useState('');

  useEffect(() => {
    const fetchUserId = async () => {
      try {
        const id = await AsyncStorage.getItem('userId');
        if (id) setUserId(id);
      } catch (err) {
        console.error('Failed to fetch userId:', err);
      }
    };
    fetchUserId();
  }, []);

  const loadCart = async () => {
    if (!userId) return;
    try {
      const token = await AsyncStorage.getItem('token');

      const res = await axios.get(`${BASE_URL}/cart/user/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const items = res.data[0]?.items || [];
      const vendorId = res.data[0]?.vendorId;

      const itemsWithVendor = items.map(item => ({
        ...item,
        vendorId,
      }));

      setCartItems(itemsWithVendor);

      if (vendorId) {
        const vendorRes = await axios.get(`${BASE_URL}/vendors/${vendorId}`);
        const vendor = vendorRes.data;
        setStoreName(vendor.name || '');
        setStoreAddress(`${vendor.street}, ${vendor.city}, ${vendor.state}`);
      } else {
        setStoreName('');
        setStoreAddress('');
      }
    } catch (err) {
      console.error('🛑 Load cart failed:', err.message);
    }
  };

  const isVendorConflict = (vendorId) =>
    cartItems.length > 0 && cartItems[0].vendorId !== vendorId;

  const forceAddToCart = async (product, vendorId) => {
    const parsedPrice =
      typeof product.price === 'string'
        ? parseFloat(product.price.replace('$', ''))
        : product.price;

    const token = await AsyncStorage.getItem('token');

    const body = {
      userId,
      vendorId,
      productId: product._id, // ✅ fixed here
      name: product.name,
      price: parsedPrice,
      quantity: 1,
    };

    try {
      await axios.post(`${BASE_URL}/cart/add`, body, {
        headers: { Authorization: `Bearer ${token}` },
      });
      loadCart();
    } catch (err) {
      console.error('❌ Force add to cart failed:', err.message);
    }
  };

  const addToCart = async (product, vendorId) => {
    if (!userId || !vendorId || !product._id) {
      console.error('Missing data in addToCart:', { userId, vendorId, product });
      return;
    }

    if (isVendorConflict(vendorId)) {
      setPendingItem(product);
      setPendingVendorId(vendorId);
      setShowReplaceModal(true);
      return;
    }

    try {
      const token = await AsyncStorage.getItem('token');
      const productId = product._id; // ✅ fixed here too
      const existing = cartItems.find(item => item.productId === productId);
      const currentQty = existing ? existing.quantity : 0;

      if (existing) {
        await axios.put(
          `${BASE_URL}/cart/update`,
          {
            userId,
            vendorId,
            productId,
            quantity: currentQty + 1,
          },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        await loadCart();
      } else {
        await forceAddToCart(product, vendorId);
      }
    } catch (err) {
      console.error("Add to cart failed:", err.message);
      Alert.alert("Error", "Failed to update cart");
    }
  };

  const handleReplaceConfirm = async () => {
    setShowReplaceModal(false);
    await clearCart();
    if (pendingItem && pendingVendorId) {
      await forceAddToCart(pendingItem, pendingVendorId);
      setPendingItem(null);
      setPendingVendorId('');
    }
  };

  const handleReplaceCancel = () => {
    setShowReplaceModal(false);
    setPendingItem(null);
    setPendingVendorId('');
  };

  const decreaseQty = async (productId, newQty, vendorId) => {
    if (!userId || !vendorId || !productId) return;

    try {
      const token = await AsyncStorage.getItem('token');

      if (newQty === 0) {
        await axios.delete(`${BASE_URL}/cart/remove`, {
          data: { userId, vendorId, productId },
          headers: { Authorization: `Bearer ${token}` },
        });
      } else {
        await axios.put(
          `${BASE_URL}/cart/update`,
          {
            userId,
            vendorId,
            productId,
            quantity: newQty,
          },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
      }

      await loadCart();
    } catch (err) {
      console.error('Decrease qty failed:', err.message);
      Alert.alert("Error", "Failed to update quantity");
    }
  };

  const removeFromCart = async (productId, vendorId) => {
    try {
      const token = await AsyncStorage.getItem('token');
      await axios.delete(`${BASE_URL}/cart/remove`, {
        data: { userId, vendorId, productId },
        headers: { Authorization: `Bearer ${token}` },
      });

      loadCart();
    } catch (err) {
      console.error('Remove item failed:', err.message);
      Alert.alert("Error", "Failed to remove item");
    }
  };

  const clearCart = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      await axios.delete(`${BASE_URL}/cart/clear/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCartItems([]);
      setStoreName('');
      setStoreAddress('');
    } catch (err) {
      console.error('Clear cart failed:', err.message);
    }
  };

  if (!userId) return null;

  return (
    <CartContext.Provider
      value={{
        cartItems,
        storeName,
        storeAddress,
        addToCart,
        decreaseQty,
        removeFromCart,
        clearCart,
        loadCart,
      }}
    >
      {children}
      <ReplaceCartModal
        visible={showReplaceModal}
        onCancel={handleReplaceCancel}
        onReplace={handleReplaceConfirm}
      />
    </CartContext.Provider>
  );
};
