import { Product } from "./Product";

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface CartContextType {
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (productId: string) => void;
  clearCart: () => void;
}
