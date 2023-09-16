import React from "react";
import { useState } from "react";

import { useEffect } from "react";
import { LuFilter, LuFilterX } from "react-icons/lu";
import Card from "../Card";
import Input from "../Input";

function Filter({ children, handleChange, handleReset, selected }) {
  const [isMobile, setIsMobile] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  useEffect(() => {
    if (window.innerWidth < 600) {
      setIsMobile(true);
    }
    const setListener = () => {
      if (window.innerWidth < 600) {
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
  const [searchData, setSearchData] = useState("");
  const [searchResults, setSearchResults] = useState(null);
  const handleChangeSearch = async (searchData) => {
    const URL = `http://localhost:3000/books/search?q=${searchData}`;
    const response = await fetch(URL);
    const data = await response.json();
    setSearchResults(data);
    console.log({ URL });
    console.log({ response });
  };
  useEffect(() => {
    if (searchData.trim().length === 0) {
      setSearchResults(null);
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
    <div className="drawer max-h-[90vh] overflow-hidden">
      <input
        id="my-drawer"
        type="checkbox"
        className="drawer-toggle"
        checked={!isMobile ? true : isFilterOpen}
        onChange={() => {}}
      />
      <div className="drawer-content">
        {/* Page content here */}
        <div className="flex items-center gap-2 m-2 ">
          <Input
            type="search"
            className="bookshelf__search"
            placeholder="Search for books..."
            name="search"
            onChange={(e) => {
              setSearchData(e.target.value);
            }}
            value={searchData}
            listData={searchResults}
          />
          {console.log({ searchData })}
          <label
            htmlFor="my-drawer"
            className={`btn btn-ghost drawer-button ${!isMobile && ` hidden `}`}
            onClick={() => setIsFilterOpen(!isFilterOpen)}
          >
            <LuFilter size={25} />
          </label>
        </div>
        {children}
      </div>
      <div className={`drawer-side max-h-[90vh]  ${!isMobile && ` static `}`}>
        <label
          htmlFor="my-drawer"
          className="drawer-overlay"
          onClick={() => setIsFilterOpen(false)}
        ></label>
        <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
          {/* Sidebar content here */}
          <div className=" px-4  w-full flex items-center justify-between my-5 ">
            <h1>Filters</h1>
            {selected.filter((genre) => genre.checked).length > 0 && (
              <button
                onClick={handleReset}
                className={`btn btn-ghost ${
                  selected.length == 0 && " hidden "
                } `}
              >
                <LuFilterX size={25} className="float-right" />
              </button>
            )}
          </div>
          <FilterOptions handleChange={handleChange} selected={selected} />
        </ul>
      </div>
    </div>
  );
}

const FilterOptions = ({ handleChange, selected }) => {
  return selected.map((selected, i) => {
    selected;
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
