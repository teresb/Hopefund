// src/pages/Search.js
import React, { useState, useEffect } from 'react';
import Navbar from '../components/navbar/navbar';
import Fundraisers from '../components/Fundraise/Fundraisers';
import Footer from '../components/Footer/Footer';
import SearchBar from '../components/searchbar/searchbar';
import axios from '../api/axios';

function Search() {
   const [search, setSearch] = useState('');
   const [randomFour, setRandomFour] = useState([]); // 5 Featured fundraisers
   const [fundraisers, setFundraisers] = useState([]); // All fetched fundraisers
   const [extraFundraiser, setExtraFundraiser] = useState(null); // 6th separate fundraiser
 
   useEffect(() => {
     const fetchFundraisers = async () => {
       try {
         const res = await axios.get(`/fundraisers?search=${search}`);
         setFundraisers(res.data);
         // Select 5 random unique fundraisers
         if (res.data.length > 4) {
           const shuffled = [...res.data].sort(() => 0.5 - Math.random());
           setRandomFour(shuffled.slice(0, 4));
 
           // Select a 6th unique fundraiser that is NOT in the 5 already selected
           const remainingFundraisers = shuffled.slice(4);
           setExtraFundraiser(remainingFundraisers.length > 0 ? remainingFundraisers[0] : null);
         } else {
           setRandomFour(res.data);
           setExtraFundraiser(null);
         }
       } catch (error) {
         console.error('Error fetching fundraisers:', error);
       }
     };
 
     fetchFundraisers();
   }, [search]);
  
  return (
    <div className="overflow-x-hidden dark:bg-gray-900 bg-white">
      <Navbar />
      <div className="mt-32">
        <SearchBar search={search} setSearch={setSearch} />
      </div>
      <div className='grid grid-cols-2 gap-4 mt-32 mx-10 mb-32'>
         {extraFundraiser && (
         <div className="">
            <Fundraisers fundraisers={[extraFundraiser]} imageClass="rounded-lg shadow-lg w-full h-[500px] object-cover transition duration-700 hover:skew-x-2 rounded-md hover:scale-110" />
         </div>
         )}
         {/* Display 5 Featured Fundraisers */}
         <div className="col-span-1 grid grid-cols-2 gap-4">
           {randomFour.map((fundraiser) => (
             <Fundraisers key={fundraiser._id} fundraisers={[fundraiser]} imageClass="rounded-lg shadow-lg w-full h-[150px] object-cover transition duration-700 hover:skew-x-2 rounded-md hover:scale-110"/>
           ))}
         </div>
      </div>
      <Footer />
    </div>
  );
}

export default Search;
