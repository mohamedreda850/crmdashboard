import NavBar from "./../components/Shared/NavBar/NavBar";
import SideBar from "./../components/Shared/SideBar/SideBar";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <div className="flex max-h-full min-h-screen">
      <SideBar />
      <div className="w-full">
        {" "}
        <NavBar />
        <Outlet />
      </div>
    </div>
  );
};

export default MainLayout;
