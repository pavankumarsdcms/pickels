"use client";
import { createContext, useState, useEffect } from "react";

export const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);
  
  useEffect(() => {
    // Load from local storage
    const saved = localStorage.getItem('konaseema_cart');
    if (saved) {
      setCart(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    // Sync to local storage
    if(cart.length > 0) {
       localStorage.setItem('konaseema_cart', JSON.stringify(cart));
    }
  }, [cart]);

  const [notification, setNotification] = useState(null);

  const addToCart = (product, quantity, weight) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.product._id === product._id && item.weight === weight);
      if (existing) {
        return prev.map((item) =>
          item.product._id === product._id && item.weight === weight
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity, weight }];
    });
    
    // Trigger modern notification
    setNotification(`${product.name} added to cart!`);
    setTimeout(() => setNotification(null), 3000); // Hide after 3 seconds
  };

  const removeFromCart = (productId, weight) => {
    setCart((prev) => prev.filter((item) => !(item.product._id === productId && item.weight === weight)));
  };

  const updateQuantity = (productId, weight, quantity) => {
    setCart((prev) => 
      prev.map((item) => 
        item.product._id === productId && item.weight === weight 
          ? { ...item, quantity: Math.max(1, quantity) } 
          : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
    localStorage.removeItem('konaseema_cart');
  };

  const cartTotal = cart.reduce((total, item) => {
    const price = Number(item.product.price) || 0;
    return total + (price * item.quantity);
  }, 0);
  const cartCount = cart.reduce((count, item) => count + item.quantity, 0);

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity, clearCart, cartTotal, cartCount, notification }}>
      {children}
      {/* Dynamic Toast Notification */}
      {notification && (
        <div style={{
          position: 'fixed',
          top: '20px',
          right: '20px',
          background: 'var(--color-primary)',
          color: 'white',
          padding: '15px 25px',
          borderRadius: '8px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
          zIndex: 9999,
          animation: 'slideIn 0.3s ease-out',
          fontWeight: 'bold',
          display: 'flex',
          alignItems: 'center',
          gap: '10px'
        }}>
          <span>✅</span> {notification}
        </div>
      )}
      <style jsx global>{`
        @keyframes slideIn {
          from { transform: translateX(100%); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
      `}</style>
    </CartContext.Provider>
  );
}
