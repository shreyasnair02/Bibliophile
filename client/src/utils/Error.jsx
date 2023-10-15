import React from "react";
import { NavLink } from "react-router-dom";
import { TbFaceIdError } from "react-icons/tb";

const Error = () => {
  return (
    <div className="flex items-center justify-center h-screen text-secondary">
      <div className="text-center flex items-center justify-center flex-col">
        <TbFaceIdError className="text-9xl" />
        <h1 className="text-4xl font-bold mt-8">Oops! Something Went Wrong</h1>
        <NavLink
          href="/"
          className="bg-error btn-link text-white font-semibold px-6 py-3 rounded-full mt-6 hover:bg-accent hover:text-secondary transition duration-300"
        >
          Go Back to Home
        </NavLink>
      </div>
    </div>
  );
};

export default Error;
