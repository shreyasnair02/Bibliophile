import React, { useRef, useState } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
const Root = () => {

  return (
    <div className="font-outfit font-normal selection:bg-amber-900 selection:text-white overflow-x-hidden">
      <Navbar />
      <Outlet />
    </div>
  );
};

export default Root;
