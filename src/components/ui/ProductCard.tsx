import { Link } from "react-router-dom";
import {
  SfButton,
  SfRating,
  SfCounter,
  SfLink,
  SfIconShoppingCart,
  SfIconFavorite,
  SfIconFavoriteFilled,
} from "@storefront-ui/react";
import { Product } from "../../types/Product";
import {
  generateShortDescription,
  handleWishlistToggle,
} from "../../utils/common";
import PLACEHOLDER_IMAGE from "../../assets/no-image.jpg";
import { useWishlist } from "../../hooks/useWishlist";
import { useEffect, useState } from "react";
import { useCart } from "../../hooks/useCart";

export default function ProductCardVertical({ product }: { product: Product }) {
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, wishlist } = useWishlist();
  const [isInWishlist, setIsInWishlist] = useState(false);

  useEffect(() => {
    if (product) {
      setIsInWishlist(
        wishlist.some(
          (item) => item.sync_product.id === product.sync_product.id
        )
      );
    }
  }, [wishlist, product]);

  const handleAddToCart = () => {
    if (product) {
      addToCart({ product, quantity: 1 });
    }
  };

  const productImage = product.sync_product.thumbnail_url;
  const price = product.sync_variants?.length
    ? product.sync_variants[0].retail_price
    : 0;
  const productName = product.sync_product.name;

  return (
    <div className="border border-neutral-200 rounded-md hover:shadow-lg max-w-[300px] flex flex-col">
      <div className="relative">
        <Link to={`/product/${product.sync_product.id}`} className="block">
          <img
            src={productImage || PLACEHOLDER_IMAGE}
            alt={`${productName} image`}
            className="object-cover h-auto rounded-md aspect-square w-full"
            onError={(e) => {
              (e.target as HTMLImageElement).src = PLACEHOLDER_IMAGE; // Fallback to placeholder
            }}
          />
        </Link>
        <SfButton
          size="sm"
          variant="tertiary"
          slotPrefix={
            product && isInWishlist ? (
              <SfIconFavoriteFilled
                size="sm"
                className="text-green-500 transition-colors"
              />
            ) : (
              <SfIconFavorite
                size="sm"
                className="text-gray-500 transition-colors"
              />
            )
          }
          onClick={() =>
            handleWishlistToggle(
              product,
              isInWishlist,
              addToWishlist,
              removeFromWishlist,
              setIsInWishlist
            )
          }
        ></SfButton>
      </div>

      {/* Content Wrapper */}
      <div className="p-4 border-t border-neutral-200 flex flex-col flex-grow">
        <Link
          to={`/product/${product.sync_product.id}`}
          className="no-underline"
        >
          <SfLink variant="secondary">{productName}</SfLink>
        </Link>

        <div className="flex items-center pt-1">
          <SfRating size="xs" value={5} max={5} />
          <Link to="#" className="pl-1 no-underline">
            <SfCounter size="xs">{5}</SfCounter>
          </Link>
        </div>

        {/* Description */}
        <p className="block py-2 font-normal text-neutral-700 text-sm flex-grow">
          {generateShortDescription({ name: productName })}
        </p>

        {/* Button at the bottom */}
        <SfButton
          size="sm"
          slotPrefix={<SfIconShoppingCart size="sm" />}
          className="mt-auto flex items-center gap-2"
          onClick={handleAddToCart}
        >
          <span className="block font-bold typography-text-lg">
            ${price}
          </span>
          <span>Add to cart</span>
        </SfButton>
      </div>
    </div>
  );
}
