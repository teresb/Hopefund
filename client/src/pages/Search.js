// src/pages/Search.js
import React, { useState } from 'react';
import Navbar from '../components/navbar/Navbar';
import Fundraisers from '../components/Fundraise/Fundraisers';
import Footer from '../components/Footer';
import SearchBar from '../components/Searchbar';

function Search() {
   const [search, setSearch] = useState('');

  return (
    <div className="overflow-x-hidden dark:bg-gray-900 bg-white">
      <Navbar />
      <div className="mt-32">
        <SearchBar search={search} setSearch={setSearch} />
      </div>
      <div className="container py-32 space-y-5">
        <h1 className="border-l-8 pl-2 text-3xl font-bold">
            Trending
        </h1>
        <Fundraisers count={9} imageClass="h-[250px] w-full object-cover transition duration-700 hover:skew-x-2 rounded-md hover:scale-110" />
      </div>
      <Footer />
    </div>
  );
}

export default Search;
