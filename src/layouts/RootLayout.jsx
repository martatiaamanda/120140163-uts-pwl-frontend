import { Outlet } from "react-router-dom";
import HeaderLayout from "./HeaderLayout";
import FooterLayout from "./FooterLayout";

const RootLayout = () => {
  return (
    <>
      <div className="bg-red-50 max-w-lg mx-auto">
        <HeaderLayout />
        <Outlet />
        <FooterLayout />
      </div>
    </>
  );
};

export default RootLayout;
