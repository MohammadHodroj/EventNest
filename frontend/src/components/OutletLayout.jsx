import { Outlet } from "react-router-dom";
import Header from "./Header";

const OutletLayout = () => {
  return (
    <>
      <div className="main-content">
        <Header />
        <Outlet />
      </div>
    </>
  );
};

export default OutletLayout;
