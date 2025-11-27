import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useContext, useEffect, useState } from 'react';
import {
  addProductToCart,
  clearUserCart,
  fetchCartData,
  fetchVendorInfo,
  removeProduct,
  updateProductQty,
} from './services/cartService';

import ReplaceCartModal from './ReplaceCartModal';

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
      const cart = await fetchCartData(userId);
      const items = cart.items || [];
      const vendorId = cart.vendorId;

      const itemsWithVendor = items.map((item) => ({ ...item, vendorId }));
      setCartItems(itemsWithVendor);

      if (vendorId) {
        const vendor = await fetchVendorInfo(vendorId);
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

    const body = {
      userId,
      vendorId,
      productId: product._id,
      name: product.name,
      price: parsedPrice,
      quantity: 1,
    };

    try {
      await addProductToCart(body);
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
      const productId = product._id;
      const existing = cartItems.find((item) => item.productId === productId);
      const currentQty = existing ? existing.quantity : 0;

      if (existing) {
        await updateProductQty({ userId, vendorId, productId, quantity: currentQty + 1 });
        await loadCart();
      } else {
        await forceAddToCart(product, vendorId);
      }
    } catch (err) {
      console.error("Add to cart failed:", err.message);
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
      if (newQty === 0) {
        await removeProduct(userId, vendorId, productId);
      } else {
        await updateProductQty({ userId, vendorId, productId, quantity: newQty });
      }
      await loadCart();
    } catch (err) {
      console.error('Decrease qty failed:', err.message);
    }
  };

  const removeFromCart = async (productId, vendorId) => {
    try {
      await removeProduct(userId, vendorId, productId);
      await loadCart();
    } catch (err) {
      console.error('Remove item failed:', err.message);
    }
  };

  const clearCart = async () => {
    try {
      await clearUserCart(userId);
      setCartItems([]);
      setStoreName('');
      setStoreAddress('');
    } catch (err) {
      console.error('Clear cart failed:', err.message);
    }
  };

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
