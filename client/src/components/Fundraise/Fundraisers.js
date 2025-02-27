// src/components/Fundraisers.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import ProgressBar from '../Progressbar';
import axios from '../../api/axios';

const Fundraisers = ({ count, imageClass, showProgressBar = true, search = '' }) => {
  const [fundraisers, setFundraisers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFundraisers = async () => {
      try {
        const res = await axios.get(`/fundraisers?search=${search}`);
        let data = res.data;
        if (count && data.length > count) {
          data = data.sort(() => 0.5 - Math.random()).slice(0, count);
        }
        setFundraisers(data);
      } catch (error) {
        console.error('Error fetching fundraisers:', error);
      }
    };

    fetchFundraisers();
  }, [count, search]);

  const handleClick = (id) => {
    navigate(`/fundraiser/${id}`);
  };

  if (!fundraisers || fundraisers.length === 0) {
    return <p className="text-center text-gray-500">No fundraisers found.</p>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
      {fundraisers.map((fundraiser) => (
        <div key={fundraiser._id} 
        onClick={() => handleClick(fundraiser._id)}
        className="p-4 border bg-slate-200 rounded-lg shadow-md">
          {fundraiser.image && (
            <div className='overflow-hidden'>
              <img
              src={fundraiser.image}
              alt={fundraiser.title}
              className={imageClass || "w-full h-72 mb-2 object-cover rounded-md "}
              />
            </div>
          )}
          <div className="flex justify-between pt-2 text-slate-600 text-sm">
              <p>Due: {new Date(fundraiser.deadline).toLocaleDateString()}</p>
            </div>
            <div className="space-y-2 py-2">
              <h1 className="line-clamp-1 font-semibold">{fundraiser.title}</h1>
              {showProgressBar && (
                <ProgressBar
                  raised={fundraiser.raised}
                  goal={fundraiser.goal}
                  variant="horizontal"
                  width="100%"
                  height="15px"
                />
              )}
              <div className="flex justify-between text-sm mt-2">
                <p>Goal: ${fundraiser.goal}</p>
                <p>Raised: ${fundraiser.raised}</p>
              </div>
              
            </div>
        </div>
      ))}
    </div>
  );
};

export default Fundraisers;
