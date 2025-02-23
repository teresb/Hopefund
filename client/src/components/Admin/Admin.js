// client/src/components/Admin/AdminPanel.js

import React, { useState, useEffect } from 'react';
import axios from '../../api/axios';
import { toast } from 'react-toastify';

const AdminPanel = () => {
  const [pendingFundraisers, setPendingFundraisers] = useState([]);

  // Fetch pending fundraisers from the backend
  const fetchPendingFundraisers = async () => {
    try {
      // This endpoint should return fundraisers with status "pending"
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

  // Function to approve a fundraiser
  const approveFundraiser = async (id) => {
    try {
      await axios.put(`/admin/fundraisers/${id}/approve`);
      toast.success('Fundraiser approved!');
      // Remove the approved fundraiser from the list
      setPendingFundraisers((prev) => prev.filter((f) => f._id !== id));
    } catch (error) {
      console.error('Error approving fundraiser:', error);
      toast.error('Error approving fundraiser.');
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Admin Panel - Pending Fundraisers</h2>
      {pendingFundraisers.length === 0 ? (
        <p>No pending fundraisers.</p>
      ) : (
        <ul>
          {pendingFundraisers.map((f) => (
            <li key={f._id} className="p-4 border-b">
              <h3 className="font-bold text-xl">{f.title}</h3>
              <p>{f.description}</p>
              <button
                onClick={() => approveFundraiser(f._id)}
                className="mt-2 px-4 py-2 bg-green-500 text-white rounded"
              >
                Approve
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AdminPanel;
