import React from "react";
import logo from "../assets/logo.png";
import { NavLink } from "react-router";

const Navbar = () => {
  const links = (
    <div className="flex flex-col lg:flex-row gap-4">
      <li>
        <NavLink
          to={"/"}
          className={({ isActive }) =>
            isActive
              ? "text-primary border-b-2 border-primary pb-1 rounded-none"
              : ""
          }
        >
          Home
        </NavLink>
      </li>
      <li>
        <NavLink
          to={"/Properties"}
          className={({ isActive }) =>
            isActive
              ? "text-primary border-b-2 border-primary pb-1 rounded-none"
              : ""
          }
        >
          Properties
        </NavLink>
      </li>
      <li>
        <NavLink
          to={"/buyProperties"}
          className={({ isActive }) =>
            isActive
              ? "text-primary border-b-2 border-primary pb-1 rounded-none"
              : ""
          }
        >
          Buy Properties
        </NavLink>
      </li>
      <li>
        <NavLink
          to={"/rentProperties"}
          className={({ isActive }) =>
            isActive
              ? "text-primary border-b-2 border-primary pb-1 rounded-none"
              : ""
          }
        >
          Rent Properties
        </NavLink>
      </li>
    </div>
  );
  return (
    <div className="sticky top-0 z-50 bg-white border-b border-gray-300 shadow-sm">
      <div className="navbar bg-base-100 w-10/12 mx-auto items-center">
        <div
          data-aos="fade-right"
          data-aos-easing="ease-out-cubic"
          data-aos-duration="2000"
          className="navbar-start"
        >
          <div className="dropdown">
            <div tabIndex={0} role="button" className="lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex="-1"
              className="menu menu-sm dropdown-content bg-base-100 z-10 mt-3 w-52 p-2 shadow"
            >
              {links}
            </ul>
          </div>

          <NavLink to={"/"}>
            <img className="h-10 w-12 hidden md:block" src={logo} alt="logo" />
          </NavLink>
          <NavLink to={"/"} className="text-xl ml-2 font-bold text-primary">
            Home Nest
          </NavLink>
        </div>

        <div
          data-aos="fade-left"
          data-aos-easing="ease-out-cubic"
          data-aos-duration="2000"
          className="navbar-end gap-3"
        >
          <div
            data-aos="zoom-in"
            data-aos-easing="ease-out-cubic"
            data-aos-duration="2000"
            className="navbar-center hidden lg:flex"
          >
            <ul className="menu menu-horizontal gap-4 px-1">{links}</ul>
          </div>

          <NavLink
            to="/auth/login"
            className="btn btn-primary text-white hover:btn-secondary hover:scale-105 transition ease-in-out"
          >
            Login
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
