import React, { useRef, useState } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const contextClass = {
  success: "bg-base-200  text-secondary",
  error: "bg-base-200 text-secondary",
  info: "bg-gray-600",
  warning: "bg-orange-400",
  default: "bg-indigo-600",
};

const Root = () => {
  return (
    <div className="font-outfit font-normal selection:bg-amber-900 selection:text-white overflow-x-hidden">
      <Navbar />
      <Outlet />
      <ToastContainer
        toastClassName={({ type }) =>
          contextClass[type || "default"] +
          " relative flex p-3 min-h-10 rounded-md justify-between overflow-hidden cursor-pointer font-bold"
        }
        position="bottom-right"
        autoClose={3000}
      />
    </div>
  );
};

export default Root;
