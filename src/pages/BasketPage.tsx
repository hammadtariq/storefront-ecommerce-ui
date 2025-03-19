import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { SfButton } from "@storefront-ui/react";

export default function BasketPage() {
  const { cart, removeFromCart, clearCart } = useCart();

  return (
    <section className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Your Cart</h1>
      {cart.length === 0 ? (
        <p>Your cart is empty. <Link to="/">Go shopping!</Link></p>
      ) : (
        <div>
          {cart.map((item) => (
            <div key={item.product.id} className="flex justify-between items-center p-2 border-b">
              <span>{item.product.name} - {item.quantity}x</span>
              <SfButton variant="danger" onClick={() => removeFromCart(item.product.id)}>
                Remove
              </SfButton>
            </div>
          ))}
          <SfButton className="mt-4" onClick={clearCart}>Clear Cart</SfButton>
        </div>
      )}
    </section>
  );
}
