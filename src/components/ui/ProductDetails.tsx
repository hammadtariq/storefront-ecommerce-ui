import {
  SfButton,
  SfLink,
  SfIconShoppingCart,
  SfIconCompareArrows,
  SfIconFavorite,
  SfIconPackage,
  SfIconWarehouse,
  SfIconSafetyCheck,
  SfIconShoppingCartCheckout,
  SfIconFavoriteFilled,
} from "@storefront-ui/react";
import { useCounter } from "react-use";
import { useEffect, useState } from "react";
import { useCart } from "../../hooks/useCart";
import { useWishlist } from "../../hooks/useWishlist";
import { ProductDetailsProps } from "../../types/Props.types";
import { handleAddToCart, handleWishlistToggle } from "../../utils/common";
import Counter from "./Counter";

export default function ProductDetails({
  product,
  loading,
}: ProductDetailsProps) {
  const { addToCart, cart } = useCart();
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

  const [value, { set }] = useCounter(1);

  const productName = product?.sync_product?.name ?? "Unknown Product";

  const productPrice = product?.sync_variants?.length
    ? product.sync_variants[0]?.retail_price
    : 0;

  const availabilityStatus = product?.sync_variants?.length
    ? product.sync_variants[0]?.availability_status
    : "Unavailable";

  return (
    <section className="md:max-w-[640px]">
      {loading ? (
        <div className="animate-pulse">
          {/* Skeleton Title */}
          <div className="h-6 w-3/4 bg-gray-200 rounded mb-2"></div>
          {/* Skeleton Price */}
          <div className="h-8 w-1/4 bg-gray-200 rounded mb-4"></div>
          {/* Skeleton Status */}
          <div className="h-4 w-1/3 bg-gray-200 rounded mb-4"></div>

          {/* Skeleton Quantity Selector */}
          <div className="flex items-center gap-2 mb-4">
            <div className="h-10 w-10 bg-gray-200 rounded"></div>
            <div className="h-10 w-16 bg-gray-200 rounded"></div>
            <div className="h-10 w-10 bg-gray-200 rounded"></div>
          </div>

          {/* Skeleton Add to Cart Button */}
          <div className="h-12 w-full bg-gray-200 rounded mb-4"></div>

          {/* Skeleton Action Buttons */}
          <div className="flex gap-4 mb-4">
            <div className="h-8 w-24 bg-gray-200 rounded"></div>
            <div className="h-8 w-32 bg-gray-200 rounded"></div>
          </div>

          {/* Skeleton Info Lines */}
          <div className="h-4 w-3/4 bg-gray-200 rounded mb-2"></div>
          <div className="h-4 w-2/3 bg-gray-200 rounded mb-2"></div>
          <div className="h-4 w-1/2 bg-gray-200 rounded"></div>
        </div>
      ) : (
        <>
          <h1 className="mb-1 font-bold typography-headline-4">
            {productName}
          </h1>
          <strong className="block font-bold typography-headline-3">
            ${productPrice}
          </strong>

          {/* <div className="inline-flex items-center mt-4 mb-2">
        <SfRating size="xs" value={5} max={5} />
        <SfCounter className="ml-1" size="xs">
          {product.rating.count}
        </SfCounter>
        <SfLink
          href="#"
          variant="secondary"
          className="ml-2 text-xs text-neutral-500"
        >
          5 reviews
        </SfLink>
      </div> */}

          <p className="mb-4 font-normal typography-text-sm">
            Status: {availabilityStatus?.toUpperCase()}
          </p>

          <div className="py-4 mb-4 border-gray-200 border-y">
            <div className="bg-primary-100 text-primary-700 flex justify-center gap-1.5 py-1.5 typography-text-sm items-center mb-4 rounded-md">
              <SfIconShoppingCartCheckout />{" "}
              {product &&
                cart
                  .filter(
                    (item) =>
                      item.product.sync_product.id === product.sync_product.id
                  )
                  .reduce((sum, item) => sum + item.quantity, 0)}
            </div>

            <div className="items-start xs:flex">
              <div className="flex flex-col items-stretch xs:items-center xs:inline-flex">
                <Counter value={value} onValueChange={set} min={1} max={999} />
                {/* <p className="self-center mt-1 mb-4 text-xs text-neutral-500 xs:mb-0">
                  <strong className="text-neutral-900">{max}</strong> in stock
                </p> */}
              </div>
              <SfButton
                size="lg"
                className="w-full xs:ml-4"
                slotPrefix={<SfIconShoppingCart size="sm" />}
                onClick={() => handleAddToCart(product, value, addToCart)}
              >
                <span className="md:hidden lg:block">Add to cart</span>
              </SfButton>
            </div>

            <div className="flex justify-center mt-4 gap-x-4">
              <SfButton
                size="sm"
                variant="tertiary"
                slotPrefix={<SfIconCompareArrows size="sm" />}
              >
                Compare
              </SfButton>
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
              >
                {isInWishlist ? "Remove from list" : "Add to list"}
              </SfButton>
            </div>
          </div>

          <div className="flex first:mt-4">
            <SfIconPackage
              size="sm"
              className="flex-shrink-0 mr-1 text-neutral-500"
            />
            <p className="text-sm">
              Free shipping, arrives by Thu, Apr 7. Want it faster?
              <SfLink href="#" variant="secondary" className="mx-1">
                Add an address
              </SfLink>
              to see options
            </p>
          </div>

          <div className="flex mt-4">
            <SfIconWarehouse
              size="sm"
              className="flex-shrink-0 mr-1 text-neutral-500"
            />
            <p className="text-sm">
              Pickup not available at your shop.
              <SfLink href="#" variant="secondary" className="ml-1">
                Check availability nearby
              </SfLink>
            </p>
          </div>

          <div className="flex mt-4">
            <SfIconSafetyCheck
              size="sm"
              className="flex-shrink-0 mr-1 text-neutral-500"
            />
            <p className="text-sm">
              Free 30-days returns.
              <SfLink href="#" variant="secondary" className="ml-1">
                Details
              </SfLink>
            </p>
          </div>
        </>
      )}
    </section>
  );
}
