import React from "react";

function BookshelfSkeleton() {
  return (
    <>
      {Array.from({ length: 45 }).map((_, index) => (
        <div
          className=" rounded-lg  h-[12.5rem] w-[9rem] flex flex-col"
          key={`bookshelf-skeleton-${index}`}
        >
          <div className="animate-pulse flex flex-col h-full bg-[#eddecb] shadow-lg rounded-t-lg" />
          <div className="animate-pulse flex flex-col h-10 shadow-lg bg-base-100 rounded-b-lg" />
        </div>
      ))}
    </>
  );
}

export default BookshelfSkeleton;
