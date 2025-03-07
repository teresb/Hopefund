import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ProgressBar from '../Progressbar'; // Adjust the path as necessary

const Modal = ({ isOpen, onClose, campaign, onApprove, showApproveButton }) => {
  const [donations, setDonations] = useState([]);

  useEffect(() => {
    if (isOpen) {
      const fetchDonations = async () => {
        try {
          const response = await axios.get(`http://localhost:5000/api/donations/campaign/${campaign._id}`);
          setDonations(response.data);
        } catch (error) {
          console.error('Error fetching donations:', error);
        }
      };

      fetchDonations();
    }
  }, [isOpen, campaign]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white px-12 py-4 rounded-lg shadow-lg w-3/4 max-w-lg max-h-screen overflow-y-auto">
        <h2 className="text-2xl font-bold mb-4">{campaign.title}</h2>
        {campaign.image && (
          <img src={campaign.image} alt={campaign.title} className="w-full h-48 mb-4 object-cover rounded-md" />
        )}
        <p className="mb-2">{campaign.description}</p>
        <div className="flex space-x-4 my-4">
          <ProgressBar
            raised={campaign.raised}
            goal={campaign.goal}
            variant="circular"
            size={70}
            strokeWidth={8}
          />
          <div>
            <p className="text-3xl">${campaign.raised} Raised</p>
            <h2 className="text-sm text-slate-400">Goal: ${campaign.goal}</h2>
          </div>
        </div>
        <p className="mb-2"><strong>Due:</strong> {new Date(campaign.deadline).toLocaleDateString()}</p>
        <div className='flex items-center gap-2 justify-start'>
          <i className="fa-solid fa-circle-user text-gray-800 text-4xl"></i>
          <h1 className='text-gray-800'>{campaign.creator.name}</h1>
        </div>
        <div className="mt-4">
          <h3 className="text-xl font-bold mb-2">Donations</h3>
          <table className="w-full bg-white rounded shadow mt-4">
            <thead className="bg-gray-200">
              <tr>
                <th className="p-2">Donor</th>
                <th className="p-2">Amount</th>
                <th className="p-2">Date</th>
              </tr>
            </thead>
            <tbody>
              {donations.map(donation => (
                <tr key={donation._id} className="border-t">
                  <td className="p-2">{donation.donor ? donation.donor.email : 'Anonymous'}</td>
                  <td className="p-2">${donation.amount}</td>
                  <td className="p-2">{new Date(donation.date).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex justify-end space-x-4 mt-4">
          <button onClick={onClose} className="btn-primary">Close</button>
          {showApproveButton && (
            <button onClick={() => onApprove(campaign._id)} className="btn-primary">Approve</button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Modal;