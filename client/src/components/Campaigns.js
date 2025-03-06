// src/components/Campaigns.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import ProgressBar from './Progressbar';
import axios from '../api/axios';

const Campaigns = ({ count, imageClass, showProgressBar = true, search = '', creatorId = '' }) => {
  const [campaigns, setCampaigns] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCampaigns = async () => {
      try {
        const res = await axios.get(`/campaigns?search=${search}`);
        let data = res.data;
        if (count && data.length > count) {
          data = data.sort(() => 0.5 - Math.random()).slice(0, count);
        }
        setCampaigns(data);
      } catch (error) {
        console.error('Error fetching campaigns:', error);
      }
    };

    fetchCampaigns();
  }, [count, search, creatorId]);

  const handleClick = (id) => {
    navigate(`/campaigns/${id}`); // Ensure this route matches your routing setup
  };

  if (!campaigns || campaigns.length === 0) {
    return <p className="text-center text-gray-500">No campaigns found.</p>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
      {campaigns.map((campaign) => (
        <div key={campaign._id} 
        onClick={() => handleClick(campaign._id)}
        className="p-4 border bg-slate-200 rounded-lg shadow-md">
          {campaign.image && (
            <div className='overflow-hidden'>
              <img
              src={campaign.image}
              alt={campaign.title}
              className={imageClass || "w-full h-72 mb-2 object-cover rounded-md "}
              />
            </div>
          )}
          <div className="flex justify-between pt-2 text-slate-600 text-sm">
              <p>Due: {new Date(campaign.deadline).toLocaleDateString()}</p>
            </div>
            <div className="space-y-2 py-2">
              <h1 className="line-clamp-1 font-semibold">{campaign.title}</h1>
              {showProgressBar && (
                <ProgressBar
                  raised={campaign.raised}
                  goal={campaign.goal}
                  variant="horizontal"
                  width="100%"
                  height="15px"
                />
              )}
              <div className="flex justify-between text-sm mt-2">
                <p>Goal: ${campaign.goal}</p>
                <p>Raised: ${campaign.raised}</p>
              </div>
              
            </div>
        </div>
      ))}
    </div>
  );
};

export default Campaigns;
