import { useState, ReactNode } from "react";
import { CartContext } from "./CartContext";
import { CartContextType, CartItem } from "../types/Cart";
import { getProductId } from "../utils/common";

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>([]);

  const addToCart = (item: CartItem) => {
    setCart((prevCart) => {
      return prevCart.some(
        (i) => getProductId(i.product) === getProductId(item.product)
      )
        ? prevCart.map((i) =>
            getProductId(i.product) === getProductId(item.product)
              ? { ...i, quantity: i.quantity + item.quantity }
              : i
          )
        : [...prevCart, item];
    });
  };

  const removeFromCart = (productId: string) => {
    setCart((prevCart) =>
      prevCart.filter(
        (item) => getProductId(item.product) !== Number(productId)
      )
    );
  };

  const clearCart = () => setCart([]);

  const value: CartContextType = { cart, addToCart, removeFromCart, clearCart };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
