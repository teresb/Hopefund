import React, { useEffect, useState, useContext } from 'react';
import axios from '../api/axios';
import { AuthContext } from '../context/AuthContext';
import ProgressBar from '../components/Progressbar';


const MyImpact = () => {
  const [campaigns, setCampaigns] = useState([]);
  const { auth } = useContext(AuthContext);
  useEffect(() => {
    const fetchDonations = async () => {
      if (!auth || !auth.user) return;

      try {
         console.log('Fetching campaigns for user:', auth.user.id);
         const response = await axios.get(`/donations/user/${auth.user.id}`, {
           headers: {
             Authorization: `Bearer ${auth.token}`, // Ensure the token is sent if required
           },
         });
         console.log('Campaigns fetched:', response.data);
         setCampaigns(response.data);
       } catch (error) {
        console.error('Error fetching campaigns:', error);
      }
    };

    fetchDonations();
  }, [auth]);

  return (
    <div>
      <h1>My Campaigns</h1>
      {campaigns.length === 0 ? (
        <p>No campaigns found.</p>
      ) : (
        <div className="container py-32 space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
      {campaigns.map((donation) => (
        <div key={donation._id} 
        className="p-4 border bg-slate-200 rounded-lg shadow-md">
          {donation.campaign.image && (
            <div className='overflow-hidden'>
              <img
              src={donation.campaign.image}
              alt={donation.campaign.title}
              className="h-[250px] w-full object-cover transition duration-700 hover:skew-x-2 rounded-md hover:scale-110"
              />
            </div>
          )}
          <div className="flex justify-between pt-2 text-slate-600 text-sm">
              <p>Due: {new Date(donation.campaign.deadline).toLocaleDateString()}</p>
            </div>
            <div className="space-y-2 py-2">
              <h1 className="line-clamp-1 font-semibold">{donation.campaign.title}</h1>
                <ProgressBar
                  raised={donation.campaign.raised}
                  goal={donation.campaign.goal}
                  variant="horizontal"
                  width="100%"
                  height="15px"
                />
              <div className="flex justify-between text-sm mt-2">
                <p>Goal: ${donation.campaign.goal}</p>
                <p>Raised: ${donation.campaign.raised}</p>
              </div>
              
            </div>
        </div>
      ))}
    </div>
        </div>
      )}
    </div>
  );
};

export default MyImpact;