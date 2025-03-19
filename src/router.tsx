import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import App from "./App";
import CategoryPage from "./pages/CategoryPage";
import ProductPage from "./pages/ProductPage";

export default function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<HomePage />} />
        <Route path="category" element={<CategoryPage />} />
        <Route path="category/:id" element={<CategoryPage />} />
        <Route path="product/:id" element={<ProductPage />} />
      </Route>
    </Routes>
  );
}
