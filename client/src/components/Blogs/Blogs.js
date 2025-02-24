// client/src/components/RandomFundraisers.js

import React, { useState, useEffect } from 'react';
import axios from '../../api/axios';
import Fundraisers from '../Fundraise/Fundraisers';


const FeaturedFundraisers = () => {
  const [featured, setFeatured] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFundraisers = async () => {
      try {
        const res = await axios.get('/fundraisers');
        // Shuffle the array and select 3 random fundraisers
        const randomFeatured = [...res.data].sort(() => Math.random() - 0.5).slice(0, 3);
        setFeatured(randomFeatured);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching fundraisers:', error);
        setLoading(false);
      }
    };

    fetchFundraisers();
  }, []);

  if (loading) {
    return <div>Loading featured fundraisers...</div>;
  }


  return (
    <div className="dark:bg-gray-900 dark:text-white">
      <div className="container py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
        {featured.map((fundraiser) => (
            <Fundraisers key={fundraiser._id} 
            fundraisers={[fundraiser]}
            imageClass="mx-auto h-[250px] w-full object-cover transition duration-700 hover:skew-x-2 rounded-md hover:scale-110"/>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeaturedFundraisers;
