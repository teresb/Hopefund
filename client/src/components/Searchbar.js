// src/components/SearchBar.js
import React from 'react';

const SearchBar = ({ search, setSearch }) => {
  return (
    <>
      <h1 className="text-5xl text-center font-semibold mb-2">Find Campaigns</h1>
      <p className="text-md text-center mb-4">
        Find Campaigns by person’s name, title, or keyword
      </p>
      <div className="flex justify-center items-center">
        <div className="relative flex w-3/5 items-center border-2 border-black rounded-2xl">
          <i className="fa-solid fa-magnifying-glass absolute left-3 text-xl cursor-pointer pointer-events-none"></i>
          <input
            type="text"
            placeholder="Search Campaigns..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="m-2 pl-10 w-full rounded-2xl focus:outline-none"
          />
        </div>
      </div>
    </>
  );
};

export default SearchBar;
