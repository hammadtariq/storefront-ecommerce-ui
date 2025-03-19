import { createContext } from "react";
import { CartContextType } from "../types/Cart";

export const CartContext = createContext<CartContextType | undefined>(
  undefined
);
