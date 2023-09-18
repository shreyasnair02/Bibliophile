import React from "react";
import { useState } from "react";

import { useEffect } from "react";
import { TbFilterOff, TbFilter } from "react-icons/tb";

import Card from "../Card";
import Input from "../Input";
import { useSearchBooks } from "../../hooks/apiQueries";
import { QueryClient } from "@tanstack/react-query";

function Filter({ children, handleChange, handleReset, selected, handleSort }) {
  const [isMobile, setIsMobile] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [searchData, setSearchData] = useState("");
  const searchResults = useSearchBooks([searchData]);
  const queryClient = new QueryClient();
  useEffect(() => {
    if (window.innerWidth < 825) {
      setIsMobile(true);
    }
    const setListener = () => {
      if (window.innerWidth < 825) {
        setIsMobile(true);
      } else {
        setIsMobile(false);
      }
    };
    window.addEventListener("resize", setListener);
    return () => {
      window.removeEventListener("resize", setListener);
    };
  }, []);
  const handleChangeSearch = async (searchData) => {
    queryClient.invalidateQueries("books/search");
  };
  useEffect(() => {
    if (searchData.trim().length === 0) {
      searchResults.remove();
      return;
    }
    const debouncedSearch = setTimeout(() => {
      handleChangeSearch(searchData);
    }, 500);
    return () => {
      clearTimeout(debouncedSearch);
    };
  }, [searchData]);

  return (
    <div className="drawer max-h-[90vh] overflow-x-hidden">
      <input
        id="my-drawer"
        type="checkbox"
        className="drawer-toggle"
        checked={!isMobile ? true : isFilterOpen}
        onChange={() => {}}
      />
      <div className="drawer-content">
        {/* Page content here */}
        <div className="flex items-center gap-2 m-2  ">
          <Input
            type="search"
            className="bookshelf__search"
            placeholder="Search for books..."
            name="search"
            onChange={(e) => {
              setSearchData(e.target.value);
            }}
            value={searchData}
            listData={searchResults?.data}
          />
          <label
            htmlFor="my-drawer"
            className={`btn hover:btn-secondary btn-ghost group btn-circle border-2 border-secondary drawer-button  ${
              !isMobile && ` hidden `
            }`}
            onClick={() => {
              setTimeout(() => {
                setIsFilterOpen(!isFilterOpen);
              }, 500);
            }}
          >
            <TbFilter
              size={25}
              className="text-secondary group-active:text-white  group-hover:text-white"
            />
          </label>
        </div>
        {children}
      </div>
      <div
        className={`drawer-side max-h-[90vh] lg:sticky lg:top-0 lg:left-0 lg:bottom-0  ${
          !isMobile && ` static `
        }`}
      >
        <label
          htmlFor="my-drawer"
          className="drawer-overlay bg-black"
          onClick={() => setIsFilterOpen(false)}
        ></label>
        <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
          {/* Sidebar content here */}
          <div className=" px-4  w-full flex items-center justify-between my-5 ">
            <div className="px-4 w-full flex items-center justify-between my-5">
              <h1>Filters</h1>
              {selected.filter((genre) => genre.checked).length > 0 && (
                <button
                  onClick={handleReset}
                  className={`btn btn-ghost btn-circle ${
                    selected.length == 0 && " hidden "
                  } `}
                >
                  <TbFilterOff size={25} className="text-secondary" />
                </button>
              )}
            </div>
          </div>
          <FilterOptions handleChange={handleChange} selected={selected} />
          <div>
            <h1>Sort By</h1>
            <div className="form-control">
              <label className="label cursor-pointer">
                <span className="label-text">Price (Low to High)</span>
                <input
                  type="radio"
                  name="radio-10"
                  className="radio radio-secondary"
                  data-sort="lth"
                  onChange={handleSort}
                />
              </label>
            </div>
            <div className="form-control">
              <label className="label cursor-pointer">
                <span className="label-text">Price (High to Low)</span>
                <input
                  type="radio"
                  name="radio-10"
                  className="radio radio-secondary"
                  data-sort="htl"
                  onChange={handleSort}
                />
              </label>
            </div>
          </div>
        </ul>
      </div>
    </div>
  );
}

const FilterOptions = ({ handleChange, selected }) => {
  return selected.map((selected, i) => {
    return (
      <Option
        key={i}
        genreObj={selected}
        handleChange={handleChange}
        selected={selected}
      />
    );
  });
};

const Option = ({ genreObj, handleChange, selected }) => {
  const { genre, checked } = genreObj;
  return (
    <li className="form-control">
      <label className="label cursor-pointer">
        <span className="label-text">{genre}</span>
        <input
          type="checkbox"
          className="checkbox checkbox-secondary"
          checked={checked}
          onChange={(e) => {
            handleChange(e);
          }}
          data-genre={genre.toLowerCase()}
        />
      </label>
    </li>
  );
};

export default Filter;
