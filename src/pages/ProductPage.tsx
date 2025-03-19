import { useParams, useNavigate } from "react-router-dom";
import GalleryWithBullets from "../components/ui/Gallery";
import ProductDetails from "../components/ui/ProductDetails";
import { useProduct } from "../hooks/usePrintful";

export default function ProductPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const {
    product,
    isError: productError,
    isLoading: isProductLoading,
  } = useProduct(id ?? null);

  if (productError) {
    navigate("/not-found");
    return null;
  }

  if (isProductLoading) return <p>Loading...</p>;

  const images = [
    {
      imageSrc:
        product &&
        ("sync_product" in product
          ? product.sync_product?.thumbnail_url ?? ""
          : product.thumbnail_url ?? "") || "",
      alt:
        product &&
        ("sync_product" in product ? product.sync_product?.name ?? "" : product.name ?? "") || "",
    },
  ];

  return (
    <section className="flex flex-col gap-12 p-12">
      <section className="flex flex-col md:flex-row md:gap-12">
        {images && <GalleryWithBullets images={images} />}
        {product && <ProductDetails product={product} />}
      </section>
      {/* {relatedProducts.length > 0 && (
        <section className="flex flex-col gap-12">
          <h2 className="text-3xl font-bold">Related products</h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
            {relatedProducts.map((product) => (
              <ProductCardVertical key={product.id} product={product} />
            ))}
          </div>
        </section>
      )} */}
    </section>
  );
}
