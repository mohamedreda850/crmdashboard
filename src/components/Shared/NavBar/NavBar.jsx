import {
  BriefcaseBusiness,
  Menu,
  MoveRight,
  Plus,
  Search,
  UserRound,
  UsersRound,
  X,
} from "lucide-react";
import React, { useState } from "react";
import avatar from "./../../../assets/Images/Avatar.png";
import { useDispatch } from "react-redux";
import { openDealModal } from "../../../redux/features/dealModalReducer";
const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dispatch = useDispatch();

  const toggleDropdown = () => {
    setDropdownOpen((prev) => !prev);
  };
  const handleOpenModal = () => {

    dispatch(openDealModal("newDeal"));
  };

  return (
    <nav className="bg-[#F6FAFDE5] ">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <span className="self-center text-xl font-semibold whitespace-nowrap">
          Dashboard
        </span>

        <button
          onClick={() => setIsOpen(!isOpen)}
          type="button"
          className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
          aria-controls="navbar-dropdown"
          aria-expanded={isOpen}
        >
          <span className="sr-only">Open main menu</span>
          <Menu />
        </button>
        <div
          className={`w-full md:block md:w-auto ${isOpen ? "block" : "hidden"}`}
          id="navbar-dropdown"
        >
          <div className="flex items-center">
            <button
              onClick={toggleDropdown}
              id="dropdownDefaultButton"
              data-dropdown-toggle="dropdown"
              type="button"
              className="text-white bg-[#514EF3]  flex items-center rounded-full text-sm px-5 py-2.5 text-center me-2 cursor-pointer"
            >
              Add New <Plus className="text-[#ECECFE] ms-3" size={14} />
            </button>
            <div
              id="dropdown"
              className="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow-sm w-44 "
            >
              <div className="border-0 p-2 ">
                <h3 className="text-sm text-[#7E92A2]">Add New</h3>
              </div>
              <ul
                className="py-2 text-sm text-gray-700 "
                aria-labelledby="dropdownDefaultButton"
              >
                <li>
                  <button
                    onClick={handleOpenModal}
                    className=" px-4 py-2 hover:bg-gray-100 w-full flex justify-between items-center border-t border-gray-200"
                  >
                    <span className="flex">
                      <BriefcaseBusiness
                        size={18}
                        className="me-2 text-#7E92A2"
                      />{" "}
                      Deal{" "}
                    </span>
                    <MoveRight className="text-[#514EF3]" />
                  </button>
                </li>
                <li>
                  <button className=" px-4 py-2 hover:bg-gray-100 w-full flex justify-between items-center border-t border-gray-200">
                    <span className="flex">
                      <UsersRound size={18} className="me-2 text-#7E92A2" />{" "}
                      Deal{" "}
                    </span>
                    <MoveRight className="text-[#514EF3]" />
                  </button>
                </li>
              </ul>
            </div>
            <div className="rounded-full bg-white p-2.5 me-2">
              <Search size={20} />
            </div>
            <img
              className="w-10 h-10 rounded-full"
              src={avatar}
              alt="Rounded avatar"
            ></img>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
