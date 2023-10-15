import React from "react";
import { BsBookHalf, BsCart3 } from "react-icons/bs";
import { TbBooks } from "react-icons/tb";
import { BiHomeCircle } from "react-icons/bi";
import { NavLink } from "react-router-dom";
import NavSidebar from "./Sidebar/NavSidebar";
import { useLogin } from "../Context/LoginProvider";
import { useLogout } from "../hooks/apiQueries";
import { useCart } from "../Context/CartProvider";

function Navbar() {
  const { isLoggedIn, user, setLoginData } = useLogin();
  const { handleLogout, isLoggingout } = useLogout();
  const { cart, handleCartChange } = useCart();
  const getCartTotal = (total, book) => {
    return total + book.price;
  };
  return (
    <div className="justify-between navbar flex bg-base-100 border-b-2 relative px-5">
      <div className="">
        <NavLink to={"/"} className="btn btn-ghost normal-case text-xl">
          <BsBookHalf className="text-secondary" />
        </NavLink>
      </div>
      <div className="flex-grow flex gap-2 absolute left-1/2 top-1/2 translate-x-[-50%] translate-y-[-50%]">
        <NavLink
          className={({ isActive, isPending }) =>
            ` btn btn-sm lg:btn-md btn-ghost uppercase text-sm hidden lg:flex text-secondary font-light
                ${
                  isActive
                    ? " bg-neutral underline decoration-default decoration-2 underline-offset-2"
                    : " "
                } `
          }
          to={"/"}
        >
          <span className=" flex items-center gap-[0.5ch] text-lg">
            <BiHomeCircle size={22} /> Home
          </span>
        </NavLink>
        <NavLink
          className={({ isActive, isPending }) =>
            ` btn btn-sm lg:btn-md btn-ghost upper  case text-sm hidden lg:flex text-secondary font-light
                ${
                  isActive
                    ? " bg-neutral underline decoration-secondary  decoration-2 underline-offset-2"
                    : " "
                } `
          }
          to={"/bookshelf"}
        >
          <span className="flex items-center text-lg gap-[0.5ch]">
            <TbBooks size={22} /> Bookshelf
          </span>
        </NavLink>
      </div>
      <div className="flex-none">
        <div className="flex items-center">
          {isLoggedIn ? (
            <div className="flex items-center">
              <div className="dropdown dropdown-end hidden lg:block ">
                <label tabIndex={0} className="btn btn-ghost btn-circle">
                  <div className="indicator">
                    <BsCart3 size={22} />
                    <span className="badge badge-sm indicator-item font-chat-start">
                      {cart.length}
                    </span>
                  </div>
                </label>
                <div
                  tabIndex={0}
                  className="mt-3 z-[1] card card-compact dropdown-content w-52 bg-base-100 shadow"
                >
                  <div className="card-body bg-neutral rounded-lg">
                    <span className="font-bold text-lg">
                      {cart.length} Item(s)
                    </span>
                    <span className="text-secondary">
                      Subtotal: $
                      <span>
                        {console.log(cart)}
                        {cart.reduce(getCartTotal, 0)}
                      </span>
                    </span>

                    <div className="card-actions">
                      <NavLink
                        to={"/cart"}
                        className="btn btn-primary btn-block text-white"
                      >
                        View cart
                      </NavLink>
                    </div>
                  </div>
                </div>
              </div>
              <div className="dropdown dropdown-end hidden lg:block">
                <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                  <div className="w-10 rounded-full">
                    <img
                      src={
                        user?.avatar_url || "https://robohash.org/as?set=set4"
                      }
                    />
                  </div>
                </label>
                <ul
                  tabIndex={0}
                  className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow rounded-lg w-52
             bg-neutral"
                >
                  <li>
                    <NavLink to={"/profile"} className="justify-between">
                      Profile
                      <span className="badge">New</span>
                    </NavLink>
                  </li>
                  <li>
                    <a>Settings</a>
                  </li>
                  <li onClick={() => handleLogout(setLoginData)}>
                    <a>Logout</a>
                  </li>
                </ul>
              </div>
            </div>
          ) : (
            <div>
              <NavLink
                to={"/auth"}
                className="hidden lg:flex btn btn-primary text-white"
              >
                Sign Up / Login
              </NavLink>
            </div>
          )}
          <div className="lg:hidden flex">
            <NavSidebar />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
