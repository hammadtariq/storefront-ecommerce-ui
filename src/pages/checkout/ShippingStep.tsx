import { useEffect } from "react";
import ShippingForm from "../../components/ui/ShippingForm";

function ShippingStep() {
  useEffect(() => {
    const storedSteps = JSON.parse(
      sessionStorage.getItem("visitedSteps") || "[]"
    );
    if (!storedSteps.includes("/checkout/shipping")) {
      sessionStorage.setItem(
        "visitedSteps",
        JSON.stringify([...storedSteps, "/checkout/shipping"])
      );
    }
  }, []);

  return <ShippingForm />;
}
export default ShippingStep;
