import { useEffect } from "react";
import AddressForm from "../../components/ui/AddressForm";
import Basket from "../../components/ui/Basket";

function InformationStep() {
  useEffect(() => {
    const storedSteps = JSON.parse(
      sessionStorage.getItem("visitedSteps") || "[]"
    );
    if (!storedSteps.includes("/checkout/information")) {
      sessionStorage.setItem(
        "visitedSteps",
        JSON.stringify([...storedSteps, "/checkout/information"])
      );
    }
  }, []);

  return (
    <div className="flex">
      <AddressForm />
      <Basket sideView={true} />
    </div>
  );
}
export default InformationStep;
