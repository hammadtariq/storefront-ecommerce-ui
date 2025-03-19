import { useState, ReactNode } from "react";
import { WishlistContext } from "./WishlistContext";
import { Product } from "../types/Product";
import { getProductId } from "../utils/common";
import { WishlistContextType } from "../types/Wishlist";

export const WishlistProvider = ({ children }: { children: ReactNode }) => {
  const [wishlist, setWishlist] = useState<Product[]>([]);

  const addToWishlist = (product: Product) => {
    setWishlist((prev) =>
      prev.some((p) => getProductId(p) === getProductId(product))
        ? prev
        : [...prev, product]
    );
  };

  const removeFromWishlist = (productId: string) => {
    setWishlist((prev) =>
      prev.filter((p) => getProductId(p) !== Number(productId))
    );
  };

  const value: WishlistContextType = {
    wishlist,
    addToWishlist,
    removeFromWishlist,
  };

  return (
    <WishlistContext.Provider value={value}>
      {children}
    </WishlistContext.Provider>
  );
};
