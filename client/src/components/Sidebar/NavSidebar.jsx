import { useEffect } from "react";
import { BiHomeCircle } from "react-icons/bi";
import { BsBookHalf } from "react-icons/bs";
import { HiOutlineMenuAlt4 } from "react-icons/hi";
import { TbBooks } from "react-icons/tb";
import { useLocation } from "react-router-dom";
import { NavLink } from "react-router-dom";

function NavSidebar() {
  let location = useLocation();
  useEffect(() => {
    document.getElementById("my-navsidebar").checked = false;
  }, [location]);
  return (
    <div className="drawer z-20">
      <input id="my-navsidebar" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">
        {/* Page content here */}
        <label
          htmlFor="my-navsidebar"
          className="btn btn-neutral drawer-button"
        >
          <HiOutlineMenuAlt4 size={25} />
        </label>
      </div>
      <div className="drawer-side">
        <label htmlFor="my-navsidebar" className="drawer-overlay"></label>
        <ul className="menu w-80 p-0 min-h-full bg-neutral text-base-content">
          {/* Sidebar content here */}
          <div className="navbar bg-neutral border-b-2 p-0 ">
            <a className="btn btn-ghost normal-case text-xl">
              <BsBookHalf />
            </a>
          </div>
          <ul className="menu p-4">
            <li>
              <NavLink
                className={({ isActive, isPending }) =>
                  ` btn  btn-ghost uppercase text-sm  text-secondary font-light
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
            </li>
            <li>
              <NavLink
                className={({ isActive, isPending }) =>
                  ` btn lg:btn-md btn-ghost upper  case text-sm lg:flex text-secondary font-light
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
            </li>
          </ul>
        </ul>
      </div>
    </div>
  );
}

export default NavSidebar;
