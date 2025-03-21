import { useState, useEffect, ReactNode } from "react";
import { CartItem } from "../types/Cart";
import { CartContext } from "./CartContext";

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>(() => {
    // Load from localStorage if available
    if (typeof window !== "undefined") {
      const storedCart = localStorage.getItem("cart");
      return storedCart ? JSON.parse(storedCart) : [];
    }
    return [];
  });

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (item: CartItem) => {
    setCart((prevCart) => {
      return prevCart.some(
        (i) => i.product.sync_product.id === item.product.sync_product.id
      )
        ? prevCart.map((i) =>
            i.product.sync_product.id === item.product.sync_product.id
              ? { ...i, quantity: i.quantity + item.quantity }
              : i
          )
        : [...prevCart, item];
    });
  };

  const removeFromCart = (productId: number) => {
    setCart((prevCart) =>
      prevCart.filter((item) => item.product.sync_product.id !== productId)
    );
  };

  const updateCartItem = (productId: number, quantity: number) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.product.sync_product.id === productId
          ? { ...item, quantity }
          : item
      )
    );
  };

  const clearCart = () => setCart([]);

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, clearCart, updateCartItem }}
    >
      {children}
    </CartContext.Provider> 
  );
};
