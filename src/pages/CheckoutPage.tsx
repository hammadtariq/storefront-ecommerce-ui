import { Outlet } from "react-router-dom";
import Breadcrumbs from "../components/ui/Breadcrumbs";

function CheckoutPage() {
  return (
    <div className="m-8">
      <Breadcrumbs />
      <Outlet />
    </div>
  );
}
export default CheckoutPage;
