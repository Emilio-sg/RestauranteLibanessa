import React, { createContext, useState } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const addToCart = (menu) => {
    setCart(prev => {
      const found = prev.find(item => item._id === menu._id);
      if (found) {
        if (menu.decrease) {
          return prev.map(item => item._id === menu._id ? { ...item, qty: item.qty - 1 } : item);
        } else {
          return prev.map(item => item._id === menu._id ? { ...item, qty: item.qty + 1 } : item);
        }
      }
      return [...prev, { ...menu, qty: 1 }];
    });
  };

  const removeFromCart = (id) => {
    setCart(prev => prev.filter(item => item._id !== id));
  };

  const clearCart = () => setCart([]);

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};
