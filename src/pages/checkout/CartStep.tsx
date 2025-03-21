import { useEffect } from "react";
import Basket from "../../components/ui/Basket";

function CartStep() {
  useEffect(() => {
    sessionStorage.setItem("visitedSteps", JSON.stringify(["/checkout"]));
  }, []);

  return <Basket sideView={false} />;
}
export default CartStep;
