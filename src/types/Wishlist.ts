import { Product } from "./Product";

export interface WishlistContextType {
    wishlist: Product[];
    addToWishlist: (product: Product) => void;
    removeFromWishlist: (productId: string) => void;
  }