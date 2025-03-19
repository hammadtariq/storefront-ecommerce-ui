import { useParams } from "react-router-dom";
import CategorySidebar from "../components/ui/CategorySidebar";
import ProductCardVertical from "../components/ui/ProductCard";
import { useProducts } from "../hooks/useProducts";
import { useCategories } from "../hooks/useCategories";

export default function CategoryPage() {
  const { id } = useParams();
  const { categories, isLoading: loadingCategories } = useCategories();
  const { products, isLoading: loadingProducts } = useProducts(
    id ? { categoryId: id } : undefined
  );

  return (
    <div className="flex justify-center gap-12 md:px-6 md:py-16 md:items-start md:mx-auto xl:max-w-[1400px]">
      {/* Sidebar - Fixed Position */}
      <aside className="hidden md:flex w-3/12 flex-col justify-center gap-4 mx-auto min-h-[300px]">
        {loadingCategories ? (
          <div className="animate-pulse space-y-4">
            <div className="h-6 bg-gray-200 rounded w-3/4"></div>
            <div className="h-6 bg-gray-200 rounded w-5/6"></div>
            <div className="h-6 bg-gray-200 rounded w-2/3"></div>
          </div>
        ) : (
          <CategorySidebar categories={categories} id={id} />
        )}
      </aside>

      {/* Product Grid - Ensures Layout Stability */}
      <main className="flex-1 grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 min-h-[500px]">
        {loadingProducts ? (
          <>
            {Array.from({ length: 8 }).map((_, index) => (
              <div key={index} className="animate-pulse p-4 border rounded-lg">
                <div className="h-40 bg-gray-200 rounded"></div>
                <div className="h-4 bg-gray-200 rounded mt-4 w-3/4"></div>
                <div className="h-4 bg-gray-200 rounded mt-2 w-1/2"></div>
              </div>
            ))}
          </>
        ) : (
          products.map((product) => (
            <ProductCardVertical
              key={
                "sync_product" in product ? product.sync_product.id : product.id
              }
              product={product}
            />
          ))
        )}
      </main>
    </div>
  );
}

