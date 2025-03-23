import { Sidebar, Menu, MenuItem, sidebarClasses } from "react-pro-sidebar";
import {
  BellDot,
  BriefcaseBusiness,
  CalendarDays,
  Component,
  ListChecksIcon,
  LogOut,
  Settings,
  Users,
} from "lucide-react";
import logo from "./../../../assets/Images/Logo.png";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { logout } from "../../../redux/features/authReducer";
const SideBar = () => {
  const [colapsed, setColapsed] = useState(true);
  const toggleSideBar = () => {
    setColapsed(!colapsed);
  };
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };
  
  const iconDesign = "rounded-full bg-white p-2.5";
  return (
    <Sidebar
      collapsed={colapsed}
      rootStyles={{
        [`.${sidebarClasses.container}`]: {
          maxHeight: "100vh",
          minHeight:"100%",
          backgroundColor: "#F6FAFDE5",
        },
      }}
    >
      <Menu>
        <MenuItem
          icon={
            <div className="">
              <img src={logo} alt="CRM logo" />
            </div>
          }
          onClick={toggleSideBar}
        >
          {" "}
          CRM Dashboard{" "}
        </MenuItem>
        <MenuItem
          icon={
            <div className={iconDesign}>
              <Component size={20} />
            </div>
          }
          component={<Link to="/dashboard" />}
        >
          {" "}
          Dashboard{" "}
        </MenuItem>
        <MenuItem
          icon={
            <div className={iconDesign}>
              <BriefcaseBusiness size={20} />
            </div>
          }
          component={<Link to="/dashboard/deals" />}
        >
          {" "}
          Deal{" "}
        </MenuItem>
        <MenuItem
          icon={
            <div className={iconDesign}>
              <Users size={20} />
            </div>
          }
          component={<Link to="/dashboard/customers" />}

        >
          {" "}
          Customers{" "}
        </MenuItem>
        <MenuItem
          icon={
            <div className={iconDesign}>
              <ListChecksIcon size={20} />
            </div>
          }
        >
          {" "}
          CheckList{" "}
        </MenuItem>
        <MenuItem
          icon={
            <div className={iconDesign}>
              <CalendarDays size={20} />
            </div>
          }
        >
          {" "}
          Calender{" "}
        </MenuItem>
        <MenuItem
          icon={
            <div className={iconDesign}>
              <BellDot size={20} />
            </div>
          }
        >
          {" "}
          Notification{" "}
        </MenuItem>
        <MenuItem
          icon={
            <div className={iconDesign}>
              <Settings size={20} />
            </div>
          }
        >
          {" "}
          settings{" "}
        </MenuItem>
        <MenuItem
          icon={
            <div className={iconDesign}>
              <LogOut  size={20} />
            </div>
          }
 onClick={handleLogout}        >
          {" "}
          Logout{" "}
        </MenuItem>
      </Menu>
    </Sidebar>
  );
};
export default SideBar;
