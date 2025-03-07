import React, { useState } from 'react';
import axios from '../api/axios';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const DonationModal = ({ isOpen, onClose, campaign }) => {
  const [amount, setAmount] = useState('');
  const { auth } = useContext(AuthContext);

  console.log('Auth user:', auth.user);

  const handleSubmit = async (e) => {
   e.preventDefault();
   try {
     const donationData = {
       campaign: campaign._id,
       donor: auth.user ? auth.user.id : null,
       amount: parseFloat(amount),
     };
     
     console.log('Sending donation data:', donationData);
     await axios.post('/donations', donationData);
     console.log(`Donated ${amount} to ${campaign.title}`);
     onClose(); // Close the modal after submission
   } catch (error) {
     console.error('Error making donation:', error);
   }
 };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center ">
      <div className="bg-white p-6 rounded-lg shadow-lg w-3/4 max-w-lg">
      <div className="flex space-x-5 items-center">
          {/* Image Section */}
          {campaign.image && (
            <img
              src={campaign.image}
              alt={campaign.title}
              className="w-32 h-32 object-cover rounded-lg shadow-lg"
            />
          )}
          <div className=' '>
            <p>Enter donation amount for</p>
            <h2 className="text-2xl font-bold mb-4">{campaign.title}</h2>
        </div>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold my-2" htmlFor="amount">
              Donation Amount
            </label>
            <input
              type="number"
              id="amount"
              name="amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div className="flex justify-end space-x-4">
            <button type="button" onClick={onClose} className="btn-secondary">
              Cancel
            </button>
            <button type="submit" className="btn-primary">
              Donate
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DonationModal;