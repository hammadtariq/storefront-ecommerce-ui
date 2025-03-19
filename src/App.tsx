import { Outlet } from "react-router-dom";
import NavBarTop from "./components/layout/NavBarTop";

function App() {
  return (
    <>
      <NavBarTop />
      <div className="pt-[70px]">
        <Outlet />
      </div>
    </>
  );
}

export default App;
