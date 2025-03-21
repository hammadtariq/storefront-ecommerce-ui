import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import App from "./App";
import CategoryPage from "./pages/CategoryPage";
import ProductPage from "./pages/ProductPage";
import CheckoutPage from "./pages/CheckoutPage";
import CartStep from "./pages/checkout/CartStep";
import InformationStep from "./pages/checkout/InformationStep";
import ShippingStep from "./pages/checkout/ShippingStep";
import PaymentStep from "./pages/checkout/PaymentStep";

export default function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<HomePage />} />
        <Route path="category" element={<CategoryPage />} />
        <Route path="category/:id" element={<CategoryPage />} />
        <Route path="product/:id" element={<ProductPage />} />

        {/* Checkout Nested Routes */}
        <Route path="checkout" element={<CheckoutPage />}>
          <Route index element={<CartStep />} />
          <Route path="information" element={<InformationStep />} />
          <Route path="shipping" element={<ShippingStep />} />
          <Route path="payment" element={<PaymentStep />} />
        </Route>
      </Route>
    </Routes>
  );
}
