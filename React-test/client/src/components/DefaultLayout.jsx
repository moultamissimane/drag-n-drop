import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import DirectionsBusIcon from "@mui/icons-material/DirectionsBus";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import LogoutIcon from "@mui/icons-material/Logout";
import HomeIcon from "@mui/icons-material/Home";
import Face4Icon from "@mui/icons-material/Face4";
import Logo from "../assets/Logo.png";

function DefaultLayout({ children }) {
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);
  const { user } = useSelector((state) => state.users);
  const userMenu = [
    {
      name: "Home",
      path: "/home",
      icon: <HomeIcon />,
    },
    {
      name: "Bookings",
      path: "/bookings",
      icon: <LibraryBooksIcon />,
    },
    {
      name: "Profile",
      path: "/profile",
      icon: <Face4Icon />,
    },
    {
      name: "Logout",
      path: "/logout",
      icon: <LogoutIcon />,
    },
  ];
  const adminMenu = [
    {
      name: "Home",
      path: "/home",
      icon: <HomeIcon />,
    },
    {
      name: "Buses",
      path: "/admin/buses",
      icon: <DirectionsBusIcon />,
    },
    {
      name: "Bookings",
      path: "/admin/bookings",
      icon: <LibraryBooksIcon />,
    },
    {
      name: "Logout",
      path: "/logout",
      icon: <LogoutIcon />,
    },
  ];
  const menutoBeRendered = user?.isAdmin ? adminMenu : userMenu;
  const activeRoute = window.location.pathname;
  return (
    <div
      className=" flex w-full  h-screen gap-[20px]"
      style={{ fontFamily: "quicksand" }}
    >
      <div className=" bg-[#174C4F] h-screen flex flex-col justify-start px-5 py-0  ">
        <div className="">
          <div className="flex justify-center">
            <img
              src={Logo}
              alt="website_Logo"
              height={20}
              width={120}
            />
          </div>
          <h1 className="text-white text-[16px] text-center font-semibold text-lg">
            Welcome {user?.name} <br />
          </h1>
        </div>
        <div className=" flex flex-col gap-4 justify-start mt-16 -ml-4 ">
          {menutoBeRendered.map((item, idx) => {
            return (
              <div
                key={idx}
                className={`${
                  activeRoute === item.path &&
                  "border-l-4 border-[#174C4F] rounded-lg bg-[#103638]"
                } " text-[20px] gap-10 mr-[10px] text-white flex items-center hover:bg-[#09292a] hover:rounded-lg duration-200 justify-start py-[5px] px-[15px] w-full cursor-pointer transition-[0.2s]"`}
              >
                <span>{item.icon}</span>
                {!collapsed && (
                  <span
                    onClick={() => {
                      if (item.path === "/logout") {
                        localStorage.removeItem("token");
                        navigate("/login");
                      } else {
                        navigate(item.path);
                      }
                    }}
                  >
                    {item.name}
                  </span>
                )}
              </div>
            );
          })}
        </div>
      </div>

      <div className="  w-screen bg-white left-5">
        <div className="p-2 shadow-sm shadow-gray-100">
          <div className="pt-2 relative mx-auto text-gray-600">
            <input
              className="border-2 border-gray-300 bg-white h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none"
              type="search"
              name="search"
              placeholder="Search"
            />
            <button type="submit" className="absolute  top-0 mt-5 left-52">
              <svg
                className="text-gray-600 h-4 w-4 fill-current"
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
                version="1.1"
                id="Capa_1"
                x="0px"
                y="0px"
                viewBox="0 0 56.966 56.966"
                style={{ enableBackground: "new 0 0 56.966 56.966" }}
                xmlSpace="preserve"
                width="512px"
                height="512px"
              >
                <path d="M55.146,51.887L41.588,37.786c3.486-4.144,5.396-9.358,5.396-14.786c0-12.682-10.318-23-23-23s-23,10.318-23,23  s10.318,23,23,23c4.761,0,9.298-1.436,13.177-4.162l13.661,14.208c0.571,0.593,1.339,0.92,2.162,0.92  c0.779,0,1.518-0.297,2.079-0.837C56.255,54.982,56.293,53.08,55.146,51.887z M23.984,6c9.374,0,17,7.626,17,17s-7.626,17-17,17  s-17-7.626-17-17S14.61,6,23.984,6z" />
              </svg>
            </button>
          </div>
        </div>
        <div className="content p-[10px]">{children}</div>
      </div>
    </div>
  );
}

export default DefaultLayout;
