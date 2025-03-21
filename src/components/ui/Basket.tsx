/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useRef, useEffect, useMemo, useCallback } from "react";
import {
  SfButton,
  SfIconCheckCircle,
  SfIconClose,
  SfIconDelete,
  SfInput,
} from "@storefront-ui/react";
import { useCart } from "../../hooks/useCart";
import { getProductPrice } from "../../utils/common";
import { useNavigate } from "react-router-dom";
import Counter from "./Counter";
import { SignedIn, SignedOut, SignInButton } from "@clerk/clerk-react";

export default function Basket({ sideView }: { sideView: boolean }) {
  const { cart, updateCartItem, removeFromCart } = useCart();
  const [promoCode, setPromoCode] = useState<number>(0);
  const [inputValue, setInputValue] = useState("");
  const [positiveAlert, setPositiveAlert] = useState(false);
  const [errorAlert, setErrorAlert] = useState(false);
  const [informationAlert, setInformationAlert] = useState(false);
  const navigate = useNavigate();

  const errorTimer = useRef<any>(null);
  const positiveTimer = useRef<any>(null);
  const informationTimer = useRef<any>(null);

  useEffect(() => {
    if (errorAlert) {
      errorTimer.current = setTimeout(() => setErrorAlert(false), 5000);
    }
    return () => {
      if (errorTimer.current) clearTimeout(errorTimer.current);
    };
  }, [errorAlert]);

  useEffect(() => {
    if (positiveAlert) {
      positiveTimer.current = setTimeout(() => setPositiveAlert(false), 5000);
    }
    return () => {
      if (positiveTimer.current) clearTimeout(positiveTimer.current);
    };
  }, [positiveAlert]);

  useEffect(() => {
    if (informationAlert) {
      informationTimer.current = setTimeout(
        () => setInformationAlert(false),
        5000
      );
    }
    return () => {
      if (informationTimer.current) clearTimeout(informationTimer.current);
    };
  }, [informationAlert]);

  const orderDetails = useMemo(() => {
    const subtotal = cart.reduce(
      (sum, item) => sum + getProductPrice(item.product) * item.quantity,
      0
    );
    const taxRate = 0.1;
    const tax = subtotal * taxRate;
    const shipping = subtotal > 100 ? 0 : 10;
    const savings = Math.abs(promoCode);
    const total = subtotal + tax + shipping - savings;

    return { subtotal, tax, shipping, savings, total };
  }, [cart, promoCode]);

  const formatPrice = (price: number) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(price);

  const estimatedDelivery = useCallback(() => {
    const date = new Date();
    date.setDate(date.getDate() + 5);
    return date.toDateString();
  }, []);

  const checkPromoCode = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!inputValue) return;

    if (inputValue.toUpperCase() === "VSF2020") {
      setPromoCode(-100);
      setPositiveAlert(true);
    } else {
      setErrorAlert(true);
    }
  };

  const removePromoCode = () => {
    setPromoCode(0);
    setInformationAlert(true);
  };

  const handleQuantityChange = useCallback(
    (id: number, newQuantity: number) => {
      updateCartItem(id, newQuantity);
    },
    [updateCartItem]
  );

  return (
    <div>
      <div className="md:shadow-lg md:rounded-md md:border md:border-neutral-100 mt-6">
        {cart.length === 0 ? (
          <div className="text-center text-gray-500 text-lg py-10">
            Your cart is empty!
          </div>
        ) : (
          <div className="px-4 pb-4 mt-3 md:px-6 md:pb-6 md:mt-0">
            <div className="flex flex-col lg:flex-row gap-8">
              <div className="flex-grow">
                {cart.map((item) => (
                  <div
                    key={item.product.sync_product.id}
                    className="mb-4 p-4 my-4 border rounded flex items-center justify-between"
                  >
                    <div
                      className="flex items-center cursor-pointer flex-1 min-w-0"
                      onClick={() =>
                        navigate(`/product/${item.product.sync_product.id}`)
                      }
                    >
                      <div className="w-20 h-20 sm:w-24 sm:h-24 flex-shrink-0 mr-4">
                        <img
                          src={item.product.sync_product.thumbnail_url}
                          alt={
                            item.product.sync_product.name ?? "Product image"
                          }
                          className="w-full h-full object-cover rounded"
                          width={96}
                          height={96}
                        />
                      </div>
                      <div className="min-w-0">
                        <h2 className="text-lg sm:text-xl font-semibold truncate">
                          {item.product.sync_product.name}
                        </h2>
                        <p className="text-sm sm:text-base">
                          Price: $
                          {getProductPrice(item.product) * item.quantity}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center ml-4 flex-shrink-0">
                      <Counter
                        value={item.quantity}
                        onValueChange={(newQuantity) =>
                          handleQuantityChange(
                            item.product.sync_product.id,
                            newQuantity
                          )
                        }
                        min={1}
                        max={999}
                      />
                      <SfButton
                        variant="tertiary"
                        className="ml-2 text-red-600 hover:text-red-800"
                        aria-label="Remove item"
                        onClick={() =>
                          removeFromCart(item.product.sync_product.id)
                        }
                      >
                        <SfIconDelete />
                      </SfButton>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {promoCode ? (
              <div className="flex items-center mb-5 py-5 border-y border-neutral-200">
                <p>Promo Code</p>
                <SfButton
                  size="sm"
                  variant="tertiary"
                  className="ml-auto mr-2"
                  onClick={removePromoCode}
                >
                  Remove
                </SfButton>
                <p>{formatPrice(promoCode)}</p>
              </div>
            ) : (
              <form
                className="flex gap-x-2 py-4 border-y border-neutral-200 mb-4"
                onSubmit={checkPromoCode}
              >
                <SfInput
                  value={inputValue}
                  placeholder="Enter promo code"
                  wrapperClassName="grow"
                  onChange={(event) => setInputValue(event.target.value)}
                />
                <SfButton type="submit" variant="secondary">
                  Apply
                </SfButton>
              </form>
            )}
            <p className="px-3 py-1.5 bg-secondary-100 text-secondary-700 typography-text-sm rounded-md text-center mb-4">
              You are saving ${Math.abs(orderDetails.savings).toFixed(2)} on
              your order today!
            </p>
            <div className="flex justify-between typography-headline-4 font-bold pb-4 mb-4">
              <h3 className="font-semibold">Estimated Delivery</h3>
              <p>{estimatedDelivery()}</p>
            </div>
            <div className="flex justify-between typography-headline-4 font-bold pb-4 mb-4 border-b border-neutral-200">
              <p>Total</p>
              <p>{formatPrice(orderDetails.total)}</p>
            </div>
            {!sideView && (
              <SignedOut>
                <SignInButton>
                  <SfButton size="lg" className="w-full">
                    Sign In
                  </SfButton>
                </SignInButton>
              </SignedOut>
            )}

            {!sideView && (
              <SignedIn>
                <SfButton
                  size="lg"
                  className="w-full"
                  onClick={() => navigate("/checkout/information")}
                >
                  Place Order And Pay
                </SfButton>
              </SignedIn>
            )}
          </div>
        )}
      </div>
      <div className="fixed top-5 right-5 md:top-10 md:right-10 z-50 max-w-full">
        {positiveAlert && (
          <div
            role="alert"
            className="flex items-start md:items-center shadow-md max-w-[600px] bg-positive-100 pr-2 pl-4 mb-2 ring-1 ring-positive-200 typography-text-sm md:typography-text-base py-1 rounded-md"
          >
            <SfIconCheckCircle className="mr-2 my-2 text-positive-700" />
            <p className="py-2 mr-2">Your promo code has been added.</p>
            <button
              type="button"
              className="p-1.5 md:p-2 ml-auto rounded-md text-positive-700 hover:bg-positive-200 active:bg-positive-300 hover:text-positive-800 active:text-positive-900"
              aria-label="Close positive alert"
              onClick={() => setPositiveAlert(false)}
            >
              <SfIconClose className="hidden md:block" />
              <SfIconClose size="sm" className="md:hidden block" />
            </button>
          </div>
        )}
        {informationAlert && (
          <div
            role="alert"
            className="flex items-start md:items-center shadow-md max-w-[600px] bg-neutral-100 pr-2 pl-4 mb-2 ring-1 ring-neutral-200 typography-text-sm md:typography-text-base py-1 rounded-md"
          >
            <SfIconCheckCircle className="mr-2 my-2 text-neutral-700" />
            <p className="py-2 mr-2">Your promo code has been removed.</p>
            <button
              type="button"
              className="p-1.5 md:p-2 ml-auto rounded-md text-neutral-700 hover:bg-neutral-200 active:bg-neutral-300 hover:text-neutral-800 active:text-neutral-900"
              aria-label="Close information alert"
              onClick={() => setInformationAlert(false)}
            >
              <SfIconClose className="hidden md:block" />
              <SfIconClose size="sm" className="md:hidden block" />
            </button>
          </div>
        )}
        {errorAlert && (
          <div
            role="alert"
            className="flex flex-wrap items-start md:items-center shadow-md max-w-[600px] bg-negative-100 pr-2 pl-4 ring-1 ring-negative-300 typography-text-sm md:typography-text-base py-1 rounded-md"
          >
            <p className="py-2 mr-2">This promo code is not valid.</p>
            <button
              type="button"
              className="p-1.5 md:p-2 ml-auto rounded-md text-negative-700 hover:bg-negative-200 active:bg-negative-300 hover:text-negative-800 active:text-negative-900"
              aria-label="Close error alert"
              onClick={() => setErrorAlert(false)}
            >
              <SfIconClose className="hidden md:block" />
              <SfIconClose size="sm" className="md:hidden block" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
