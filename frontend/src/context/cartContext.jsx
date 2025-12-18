import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartCount, setCartCount] = useState(0);
  const [cartItems, setCartItems] = useState([]);

  // Function to update cart state from localStorage
  const updateCartState = () => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const totalItems = cart.reduce((sum, item) => sum + (item.quantity || 0), 0);
    setCartCount(totalItems);
    setCartItems(cart);
  };

  // Listen for storage changes (cross-tab sync)
  useEffect(() => {
    updateCartState();
    
    const handleStorageChange = (e) => {
      if (e.key === 'cart') {
        updateCartState();
      }
    };
    
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  return (
    <CartContext.Provider value={{ cartCount, updateCartState }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within CartProvider');
  }
  return context;
};