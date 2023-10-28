/* eslint-disable react/prop-types */
import { createContext, useContext, useState } from "react";

// Create a context for the cart data
const CartContext = createContext();

// Create a provider component that will wrap the app and provide the cart data to all components
export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  // Add an item to the cart
  const addItemToCart = (item) => {
    // check id item is already in cart then update the quantity
    const existingCartItem = cartItems.find(
      (cartItem) => cartItem.id === item.id
    );

    if (existingCartItem) {
      const updatedCartItems = cartItems.map((cartItem) =>
        cartItem.id === item.id
          ? { ...cartItem, quantity: cartItem.quantity + 1 }
          : cartItem
      );
      setCartItems(updatedCartItems);
      return;
    }

    // if item is not in cart then add it
    setCartItems([...cartItems, { ...item, quantity: 1 }]);
  };

  // Remove an item from the cart
  const removeItemFromCart = (item) => {
    // check if item is already in cart then update the quantity
    const existingCartItem = cartItems.find(
      (cartItem) => cartItem.id === item.id
    );

    if (existingCartItem.quantity === 1) {
      const updatedCartItems = cartItems.filter(
        (cartItem) => cartItem.id !== item.id
      );
      setCartItems(updatedCartItems);
      return;
    }

    // if item is not in cart then add it
    const updatedCartItems = cartItems.map((cartItem) =>
      cartItem.id === item.id
        ? { ...cartItem, quantity: cartItem.quantity - 1 }
        : cartItem
    );
    setCartItems(updatedCartItems);
  };

  // Clear the cart
  const clearCart = () => {
    setCartItems([]);
  };

  // Pass the cart data and functions to the context provider
  return (
    <CartContext.Provider
      value={{ cartItems, addItemToCart, removeItemFromCart, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useCartContext = () => {
  const cartContext = useContext(CartContext);
  if (!cartContext) {
    throw new Error("useCartContext must be used within a CartProvider");
  }
  return cartContext;
};
