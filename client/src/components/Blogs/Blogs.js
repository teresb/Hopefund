// client/src/components/RandomFundraisers.js

import React, { useState, useEffect } from 'react';
import axios from '../../api/axios';

const FeaturedFundraisers = () => {
  const [fundraisers, setFundraisers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('/fundraisers')
      .then((res) => {
        // Randomize the array and select 3 fundraisers
        const randomFundraisers = [...res.data]
          .sort(() => Math.random() - 0.5)
          .slice(0, 3);
        setFundraisers(randomFundraisers);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching fundraisers:', error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading featured fundraisers...</div>;
  }


  return (
    <div className="dark:bg-gray-900 dark:text-white">
      <div className="container py-8">
        <h1 className="mb-8 border-l-8 pl-2 text-3xl font-bold">
          Discover some fundraisers...
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
        {fundraisers.map(fundraiser => {
          const formattedDeadline = fundraiser.deadline
          ? new Date(fundraiser.deadline).toLocaleDateString()
          : 'No deadline';
          return (
            <div key={fundraiser._id} className="p-4 shadow-lg transition-all duration-500 hover:shadow-xl bg-slate-200 dark:bg-slate-950 dark:text-white rounded-lg">
              <div className="overflow-hidden">
                <img 
                  src={fundraiser.image} 
                  alt={fundraiser.title}
                  className="mx-auto h-[250px] w-full object-cover transition duration-700 hover:skew-x-2 rounded-md hover:scale-110" 
                />
              </div>
              <div className="flex justify-between pt-2 text-slate-600 text-sm">
                <p>Due: {formattedDeadline}</p>
                <p className="line-clamp-1">By: {fundraiser.creator.name}</p>
              </div>
              <div className="space-y-2 py-3">
                <h1 className="line-clamp-1 font-bold">{fundraiser.title}</h1>
                <div className="flex justify-between text-sm mt-2">
                  <p>Goal: ${fundraiser.goal}</p>
                  <p>Raised: ${fundraiser.raised}</p>
                </div>
              </div>
            </div>
          );
        })}
        </div>
      </div>
    </div>
  );
};

export default FeaturedFundraisers;
