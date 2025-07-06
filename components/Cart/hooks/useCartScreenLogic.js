// components/Cart/hooks/useCartScreenLogic.js
export const useCartScreenLogic = ({ cartItems, addToCart, removeFromCart, decreaseQty }) => {
  const handleAdd = (id) => {
    const product = cartItems.find((item) => item.productId === id);
    if (product) addToCart(product, product.vendorId);
  };

  const handleRemove = (id) => {
    const product = cartItems.find((item) => item.productId === id);
    if (product) {
      if (product.quantity === 1) {
        removeFromCart(id, product.vendorId);
      } else {
        decreaseQty(id, product.quantity - 1, product.vendorId);
      }
    }
  };

  const handleDelete = (id) => {
    const product = cartItems.find((item) => item.productId === id);
    if (product) removeFromCart(id, product.vendorId);
  };

  return { handleAdd, handleRemove, handleDelete };
};
