// src/components/Admin/AdminPanel.js
import React, { useState, useEffect } from 'react';
import axios from '../../api/axios';
import { toast } from 'react-toastify';
import Fundraisers from '../Fundraise/Fundraisers';

const AdminPanel = () => {
  const [pendingFundraisers, setPendingFundraisers] = useState([]);

  // Fetch pending fundraisers (should return those with status "pending")
  const fetchPendingFundraisers = async () => {
    try {
      const res = await axios.get('/admin/fundraisers');
      setPendingFundraisers(res.data);
    } catch (error) {
      console.error('Error fetching pending fundraisers:', error);
      toast.error('Error fetching pending fundraisers.');
    }
  };

  useEffect(() => {
    fetchPendingFundraisers();
  }, []);


  return (
    <div className="pt-10 px-20">
      <h2 className="text-2xl font-bold mb-4">Admin Panel - Pending Fundraisers</h2>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4'>
      {pendingFundraisers.map((fundraiser) => (
        <Fundraisers
          fundraisers={[fundraiser]} 
          imageClass="mx-auto h-[250px] w-full object-cover transition duration-700 hover:skew-x-2 rounded-md hover:scale-110" 
          showProgressBar={false}
        />
      ))}
      </div>
    </div>
  );
};

export default AdminPanel;
