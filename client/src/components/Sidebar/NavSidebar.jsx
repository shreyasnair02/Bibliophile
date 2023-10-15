import { useEffect } from "react";
import { BiHomeCircle } from "react-icons/bi";
import { BsBookHalf } from "react-icons/bs";
import { CgProfile } from "react-icons/cg";
import { HiOutlineMenuAlt4 } from "react-icons/hi";
import { MdLogout } from "react-icons/md";
import { TbBooks, TbBuildingStore } from "react-icons/tb";
import { useLocation } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { useLogin } from "../../Context/LoginProvider";
import { useLogout } from "../../hooks/apiQueries";

function NavSidebar() {
  let location = useLocation();
  const { handleLogout, isLoggingout } = useLogout();
  const { isLoggedIn, user, setLoginData } = useLogin();
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
        <ul className="menu w-72 p-0 min-h-full bg-neutral text-base-content">
          {/* Sidebar content here */}

          <div className="navbar bg-neutral border-b-2 p-0 ">
            <a className="btn btn-ghost normal-case text-xl">
              <BsBookHalf />
            </a>
          </div>
          <ul className="menu p-4">
            {isLoggedIn ? (
              <div className="flex items-center justify-center mb-6 gap-2 flex-col">
                <img
                  src={user?.avatar_url}
                  alt="User Profile"
                  className="w-24 h-24 rounded-full border-2 border-base-200 outline-offset-4 outline-dashed outline-secondary"
                />
                <div className="text-center">
                  <h2 className="text-3xl font-semibold capitalize ">
                    {user?.name}
                  </h2>
                  <p className="text-gray-500">{user?.email}</p>
                </div>
                <NavLink
                  to={"/profile"}
                  className="btn btn-primary btn-wide mt-4 text-white"
                >
                  <TbBuildingStore size={23} className="ml-2" />
                  Sell Books
                </NavLink>
              </div>
            ) : (
              <NavLink to={"/auth"} className="btn btn-primary text-white mb-5">
                Sign Up / Login
              </NavLink>
            )}
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
            {isLoggedIn && (
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
                  to={"/profile"}
                >
                  <span className="flex items-center text-lg gap-[0.5ch]">
                    <CgProfile size={22} /> Profile
                  </span>
                </NavLink>
              </li>
            )}
            {isLoggedIn && (
              <li>
                <a
                  className={
                    " btn lg:btn-md btn-ghost upper  case text-sm lg:flex text-secondary font-light bg-neutral  decoration-secondary  decoration-2 underline-offset-2"
                  }
                  onClick={() => handleLogout(setLoginData)}
                >
                  <span className="flex items-center text-lg gap-[0.5ch]">
                    <MdLogout size={22} /> Logout
                  </span>
                </a>
              </li>
            )}
          </ul>
        </ul>
      </div>
    </div>
  );
}

export default NavSidebar;
