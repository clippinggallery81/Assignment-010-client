import React, { useContext } from "react";
import logo from "../assets/logo.png";
import { NavLink, useNavigate } from "react-router";
import { AuthContext } from "../provider/AuthContext";
import { FaUserCircle, FaBars } from "react-icons/fa";
import { toast } from "react-toastify";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      toast.success("Logged out successfully!");
      navigate("/");
    } catch {
      toast.error("Failed to logout");
    }
  };

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
          to={"/allProperties"}
          className={({ isActive }) =>
            isActive
              ? "text-primary border-b-2 border-primary pb-1 rounded-none"
              : ""
          }
        >
          All Properties
        </NavLink>
      </li>
      <li>
        <NavLink
          to={"/addProperties"}
          className={({ isActive }) =>
            isActive
              ? "text-primary border-b-2 border-primary pb-1 rounded-none"
              : ""
          }
        >
          Add Properties
        </NavLink>
      </li>
      <li>
        <NavLink
          to={"/myProperties"}
          className={({ isActive }) =>
            isActive
              ? "text-primary border-b-2 border-primary pb-1 rounded-none"
              : ""
          }
        >
          My Properties
        </NavLink>
      </li>
      <li>
        <NavLink
          to={"/myRatings"}
          className={({ isActive }) =>
            isActive
              ? "text-primary border-b-2 border-primary pb-1 rounded-none"
              : ""
          }
        >
          My Ratings
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
              <FaBars className="h-5 w-5" />
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

          {user ? (
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar"
              >
                <div className="w-10 rounded-full">
                  {user.photoURL ? (
                    <img
                      alt={user.displayName || "User"}
                      src={user.photoURL}
                      onError={(e) => {
                        e.target.style.display = "none";
                        e.target.parentElement.innerHTML =
                          '<svg class="w-full h-full text-gray-400" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd" /></svg>';
                      }}
                    />
                  ) : (
                    <FaUserCircle className="w-full h-full text-gray-400" />
                  )}
                </div>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
              >
                <li className="menu-title">
                  <span className="text-base font-semibold">
                    {user.displayName || "User"}
                  </span>
                </li>
                <li className="disabled">
                  <span className="text-xs text-gray-500">{user.email}</span>
                </li>
                <div className="divider my-1"></div>
                <li>
                  <NavLink to="/profile">Update Profile</NavLink>
                </li>
                <li>
                  <button
                    onClick={handleLogout}
                    className="text-error hover:bg-error hover:text-white"
                  >
                    Log out
                  </button>
                </li>
              </ul>
            </div>
          ) : (
            <div className="flex gap-2">
              <NavLink
                to="/auth/login"
                className="btn btn-outline btn-primary hover:scale-105 transition ease-in-out"
              >
                Login
              </NavLink>
              <NavLink
                to="/auth/signup"
                className="btn btn-primary text-white hover:scale-105 transition ease-in-out"
              >
                Sign Up
              </NavLink>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
