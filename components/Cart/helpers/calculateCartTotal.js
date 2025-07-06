// components/Cart/helpers/calculateCartTotal.js
export const calculateCartTotal = (cartItems, deliveryFee = 0) => {
  const itemTotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const total = itemTotal + deliveryFee;
  return { itemTotal, total };
};
