import React, { useState, useEffect } from "react";

import { useLogin } from "../Context/LoginProvider";
import PageWrapper from "../utils/PageWrapper";
import { NavLink } from "react-router-dom";
import { Rating } from "react-simple-star-rating";
import { TbBuildingStore } from "react-icons/tb";
import { useUnlistBook } from "../hooks/apiQueries";
import { useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
const YourListingsPage = () => {
  const navigate = useNavigate();
  const { isLoggedIn, user } = useLogin();
  useEffect(() => {
    if (!isLoggedIn) navigate("/auth");
  }, [isLoggedIn]);
  return (
    <PageWrapper classes={" p-5 "}>
      <section className="">
        <h1 className="text-2xl mb-4 font-martel font-black text-secondary">
          Your Listings
        </h1>
        <div className="container mx-auto p-4">
          {/* User Profile Section */}
          <div className="flex items-center justify-center mb-6 gap-2 flex-col">
            <img
              src={user?.avatar_url}
              alt="User Profile"
              className="w-34 h-34 rounded-full border-2 border-base-200 outline-offset-4 outline-dashed outline-secondary"
            />
            <div className="text-center">
              <h2 className="text-3xl font-semibold capitalize ">
                {user?.name}
              </h2>
              <p className="text-gray-500">{user?.email}</p>
            </div>
            <NavLink
              to={"/sellbook"}
              className="btn btn-primary btn-wide mt-4 text-white"
            >
              <TbBuildingStore size={23} className="ml-2" />
              Sell Books
            </NavLink>
          </div>
          {/* User's Book Listings */}
          <div className="flex container gap-2 flex-wrap justify-center">
            {user?.listings?.length === 0 ? (
              <div className="flex w-full justify-center">
                <p className="text-gray-400">
                  Your listed books will show up here.
                </p>
              </div>
            ) : (
              user?.listings?.map((book) => (
                <div
                  key={book._id}
                  className="hover:shadow-none hover:translate-y-1 transition-all ease-in-out  bg-neutral translate-y-0 flex h-80 items-start flex-col rounded-lg shadow-lg p-1"
                >
                  <div className="flex flex-grow items-center  ">
                    <CardItem book={book} />
                    <CardInfo book={book} />
                  </div>
                  <button
                    className="btn btn-error btn-outline self-end w-full "
                    onClick={() =>
                      document
                        .getElementById(`my_modal_${book._id}`)
                        .showModal()
                    }
                  >
                    Unlist
                  </button>
                  <Dialog book={book} key={"modal" + book._id} />
                </div>
              ))
            )}
          </div>
        </div>
      </section>
    </PageWrapper>
  );
};

const CardItem = ({ book }) => {
  return (
    <NavLink
      className=" overflow-hidden rounded-t-lg shadow-md "
      to={`/bookshelf/${book._id}`}
    >
      {/* {console.log(book)} */}
      <img
        className="h-[12.5rem] w-[8.5rem] object-cover rounded-t-lg rounded-b-none "
        src={book.imageURL}
        alt={book.title}
        loading="lazy"
      />
      <div className="flex justify-center p-2 items-center  rounded-b-lg ">
        <div className="bookshelf__price-container flex flex-col items-center">
          <span className="line-through text-xs">
            ₹{Math.round(book.price + 0.8 * book.price)}
          </span>
          <h3 className="text-xl font-martel">₹{Math.round(book.price)}</h3>
        </div>
      </div>
    </NavLink>
  );
};

const CardInfo = ({ book }) => {
  return (
    <div className=" w-60 top-0 left-full rounded-box z-20  p-5 flex flex-col justify-center gap-2 overflow-hidden  ">
      <h3 className="font-martel font-black text-xl truncate mb-2 text-secondary">
        {book.title}
      </h3>
      <h5 className="font-martel text-md truncate">{book.author}</h5>
      <div className="text-sm">
        <p>Condition</p>
        <Rating
          emptyStyle={{ display: "flex" }}
          fillStyle={{ display: "-webkit-inline-box" }}
          readonly={true}
          initialValue={book.rating}
          allowFraction={true}
          size={25}
          SVGstrokeColor="#4d3505"
          emptyColor="#f2e7d9"
          SVGstorkeWidth={1}
          fillColor="#4d3619"
        />
        <div className="rate"></div>
      </div>
      <div className="bookshelf__about-container">
        <p className=" line-clamp-3">{book.summary}</p>
      </div>
    </div>
  );
};

export const Dialog = ({ book }) => {
  const { handleUnlistBook, isUnlisting } = useUnlistBook(book._id);
  const queryClient = useQueryClient();
  return (
    <dialog id={`my_modal_${book._id}`} className="modal">
      <div className="modal-box">
        <h3 className="font-bold text-lg">Delete this book?</h3>
        <div className="flex h-80 items-center flex-col rounded-lg shadow-lg p-1">
          <p>Book ID: {book._id}</p>
          <div className="flex flex-grow items-center  ">
            <CardItem book={book} />
            <CardInfo book={book} />
          </div>
        </div>
        <div className="modal-action">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn btn-ghost">Cancel</button>
          </form>
          <button
            className="btn btn-error"
            onClick={async () => {
              const data = await handleUnlistBook(book._id);
              if (data === "success") {
                queryClient.invalidateQueries("checkauth");
              }
            }}
          >
            Delete
          </button>
        </div>
      </div>
    </dialog>
  );
};
export default YourListingsPage;
