import React from "react";
import { BsBookHalf, BsCart3 } from "react-icons/bs";
import { TbBooks } from "react-icons/tb";
import { BiHomeCircle } from "react-icons/bi";
import { NavLink } from "react-router-dom";
import NavSidebar from "./Sidebar/NavSidebar";
function Navbar() {
  return (
    <div className="navbar bg-base-100 border-b-2 ">
      <div className="flex-1">
        <a className="btn btn-ghost normal-case text-xl">
          <BsBookHalf />
        </a>
      </div>
      <div className="flex-grow flex gap-2 ">
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
        <div className="dropdown dropdown-end hidden lg:block ">
          <label tabIndex={0} className="btn btn-ghost btn-circle">
            <div className="indicator">
              <BsCart3 size={22} />
              <span className="badge badge-sm indicator-item font-chat-start">
                8
              </span>
            </div>
          </label>
          <div
            tabIndex={0}
            className="mt-3 z-[1] card card-compact dropdown-content w-52 bg-base-100 shadow"
          >
            <div className="card-body bg-neutral rounded-lg">
              <span className="font-bold text-lg">8 Items</span>
              <span className="text-info">Subtotal: $999</span>
              <div className="card-actions">
                <button className="btn btn-primary btn-block">View cart</button>
              </div>
            </div>
          </div>
        </div>
        <div className="dropdown dropdown-end hidden lg:block">
          <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
            <div className="w-10 rounded-full">
              <img src="https://robohash.org/as?set=set4" />
            </div>
          </label>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow rounded-box w-52
             bg-neutral"
          >
            <li>
              <a className="justify-between">
                Profile
                <span className="badge">New</span>
              </a>
            </li>
            <li>
              <a>Settings</a>
            </li>
            <li>
              <a>Logout</a>
            </li>
          </ul>
        </div>
        <div className="lg:hidden flex">
          <NavSidebar />
        </div>
      </div>
    </div>
  );
}

export default Navbar;
