import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import "./index.css";
import AppRouter from "./router";
import { CartProvider } from "./context/CartProvider";
import { WishlistProvider } from "./context/WishlistProvider";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Router>
      <CartProvider>
        <WishlistProvider>
          <AppRouter />
        </WishlistProvider>
      </CartProvider>
    </Router>
  </StrictMode>
);
