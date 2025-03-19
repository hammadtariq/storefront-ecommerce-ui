import { createContext } from "react";
import { WishlistContextType } from "../types/Wishlist";

export const WishlistContext = createContext<WishlistContextType | undefined>(undefined);
