import React, { useContext } from 'react';
import ProgressBar from '../Progressbar'; // Adjust the path as necessary
import { AuthContext } from '../../context/AuthContext';


const Modal = ({ isOpen, onClose, campaign, onApprove, showApproveButton }) => {
  const { auth } = useContext(AuthContext);
  if (!isOpen) return null;


  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white px-12 py-4 rounded-lg shadow-lg w-3/4 max-w-lg">
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
        <p className="mb-2"><strong>Deadline:</strong> {new Date(campaign.deadline).toLocaleDateString()}</p>
        <div className='flex items-center gap-2 justify-start'>
         <i className="fa-solid fa-circle-user text-gray-800 text-4xl"></i>
         <h1 className='text-gray-800'>{auth.user.name}</h1>
        </div>
        <div className="flex justify-end space-x-4 mt-4">
          <button onClick={onClose} className="btn-primary ">Close</button>
          {showApproveButton && (
            <button onClick={() => onApprove(campaign._id)} className="btn-primary">Approve</button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Modal;