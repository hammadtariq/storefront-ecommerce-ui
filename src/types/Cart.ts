import { Product } from "./Product";

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface CartContextType {
  cart: CartItem[];
  clearCart: () => void;
  addToCart: (item: CartItem) => void;
  removeFromCart: (productId: number) => void;
  updateCartItem: (productId: number, quantity: number) => void;
}
