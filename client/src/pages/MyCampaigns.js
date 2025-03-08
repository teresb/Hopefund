import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../api/axios';
import { AuthContext } from '../context/AuthContext';
import ProgressBar from '../components/Progressbar';
import Navbar from '../components/navbar/navbar';
import Footer from '../components/Footer';


const MyCampaigns = () => {
  const [campaigns, setCampaigns] = useState([]);
  const { auth } = useContext(AuthContext);
  const navigate = useNavigate();
  

  useEffect(() => {
    const fetchCampaigns = async () => {
      if (!auth || !auth.user) return;

      try {
         console.log('Fetching campaigns for user:', auth.user.id);
         const response = await axios.get(`/campaigns/creator/${auth.user.id}`, {
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

    fetchCampaigns();
  }, [auth]);

  const handleFundraiseClick = () => {
    if (auth.user) {
      navigate("/fundraise"); // If logged in, go to fundraise page
    } else {
      navigate("/login", { state: { from: "/fundraise" } }); // If not logged in, redirect to login with intended destination
    }
  };

  return (
    <div>
      <Navbar/>
      <div className='mt-32 w-100 text-center space-y-4'>
            <h1 className='text-4xl text-center font-semibold'>Track the Progress of all your campaigns</h1>
            <p className='text-xl'>Every contribution counts! Keep sharing your campaigns and make a bigger impact.</p>
            <button
            onClick={handleFundraiseClick}
            className="btn-primary cursor-pointer">Fundraise</button>
         </div>
        <div className="container py-32 space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
      {campaigns.map((campaign) => (
        <div key={campaign._id} 
        className="p-4 border bg-slate-200 rounded-lg shadow-md">
          {campaign.image && (
            <div className='overflow-hidden'>
              <img
              src={campaign.image}
              alt={campaign.title}
              className="h-[250px] w-full object-cover transition duration-700 hover:skew-x-2 rounded-md hover:scale-110"
              />
            </div>
          )}
          <div className="flex justify-between pt-2 text-slate-600 text-sm">
              <p>Due: {new Date(campaign.deadline).toLocaleDateString()}</p>
            </div>
            <div className="space-y-2 py-2">
              <h1 className="line-clamp-1 font-semibold">{campaign.title}</h1>
                <ProgressBar
                  raised={campaign.raised}
                  goal={campaign.goal}
                  variant="horizontal"
                  width="100%"
                  height="15px"
                />
              <div className="flex justify-between text-sm mt-2">
                <p>Goal: ${campaign.goal}</p>
                <p>Raised: ${campaign.raised}</p>
              </div>
              
            </div>
        </div>
      ))}
    </div>
        </div>
        <Footer/>
    </div>
  );
};

export default MyCampaigns;