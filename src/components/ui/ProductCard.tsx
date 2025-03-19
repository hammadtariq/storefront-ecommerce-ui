import { Link } from "react-router-dom";
import {
  SfButton,
  SfRating,
  SfCounter,
  SfLink,
  SfIconShoppingCart,
  SfIconFavorite,
} from "@storefront-ui/react";
import { Product } from "../../types/Product";
import { generateShortDescription } from "../../utils/common";
import PLACEHOLDER_IMAGE from "../../assets/no-image.jpg"


export default function ProductCardVertical({ product }: { product: Product }) {
  const productImage =
    "sync_product" in product
      ? product.sync_product.thumbnail_url
      : product.thumbnail_url;

  const productName =
    "sync_product" in product ? product.sync_product.name : product.name;

  return (
    <div className="border border-neutral-200 rounded-md hover:shadow-lg max-w-[300px] flex flex-col">
      <div className="relative">
        <Link
          to={`/product/${
            "sync_product" in product ? product.sync_product.id : product.id
          }`}
          className="block"
        >
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
          variant="tertiary"
          size="sm"
          square
          className="absolute bottom-0 right-0 mr-2 mb-2 bg-white ring-1 ring-inset ring-neutral-200 !rounded-full"
          aria-label="Add to wishlist"
        >
          <SfIconFavorite size="sm" />
        </SfButton>
      </div>

      {/* Content Wrapper */}
      <div className="p-4 border-t border-neutral-200 flex flex-col flex-grow">
        <Link
          to={`/product/${
            "sync_product" in product ? product.sync_product.id : product.id
          }`}
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
          className="mt-auto"
        >
          Add to cart
        </SfButton>
      </div>
    </div>
  );
}
