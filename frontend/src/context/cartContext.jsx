import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartCount, setCartCount] = useState(0);
  const [cartItems, setCartItems] = useState([]);

  const updateCartState = () => {
    try {
      const cart = JSON.parse(localStorage.getItem('cart')) || [];
      const totalItems = cart.reduce((sum, item) => sum + (item.quantity || 0), 0);
      setCartCount(totalItems);
      setCartItems(cart);
    } catch (error) {
      console.error('Error reading cart from localStorage:', error);
      setCartCount(0);
      setCartItems([]);
    }
  };

  // Function to update cart and trigger re-render
  const updateCart = (updatedCart) => {
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    updateCartState(); // This updates both count and items
    window.dispatchEvent(new StorageEvent('storage', { key: 'cart' })); // For cross-tab sync
  };

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
    <CartContext.Provider value={{ 
      cartCount, 
      cartItems,
      updateCartState,
      updateCart 
    }}>
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