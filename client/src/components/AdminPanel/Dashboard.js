import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CampaignCard from '../CampaignCard';
import Modal from './Modal';

const Dashboard = ({ sidebarToggle, setSidebarToggle, activePanel }) => {
  const [pendingCampaigns, setPendingCampaigns] = useState([]);
  const [approvedCampaigns, setApprovedCampaigns] = useState([]);
  const [users, setUsers] = useState([]);
  
  const [selectedCampaign, setSelectedCampaign] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const totalPendingCampaigns = pendingCampaigns.length;
  const totalApprovedCampaigns = approvedCampaigns.length;
  const totalUsers = users.length;

  useEffect(() => {
    const fetchPendingCampaigns = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/campaigns/pending');
        setPendingCampaigns(response.data);
      } catch (error) {
        console.error('Error fetching pending campaigns:', error);
      }
    };

    const fetchApprovedCampaigns = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/campaigns');
        setApprovedCampaigns(response.data);
      } catch (error) {
        console.error('Error fetching approved campaigns:', error);
      }
    };

    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/users');
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchPendingCampaigns();
    fetchApprovedCampaigns();
    fetchUsers();
  }, []);

  const handleClick = (campaign) => {
    setSelectedCampaign(campaign);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedCampaign(null);
  };

  const handleApprove = async (id) => {
    try {
      await axios.put(`http://localhost:5000/api/campaigns/${id}/approve`);
      setPendingCampaigns(pendingCampaigns.filter(campaign => campaign._id !== id));
      setApprovedCampaigns([...approvedCampaigns, selectedCampaign]);
      handleCloseModal();
    } catch (error) {
      console.error('Error approving campaign:', error);
    }
  };

  const renderCampaigns = (campaigns) => (
    <div className="mx-5 py-12">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {campaigns.map((campaign) => (
          <CampaignCard
            key={campaign._id}
            campaign={campaign}
            imageClass={"w-full h-48 mb-2 object-cover rounded-md"}
            onClick={() => handleClick(campaign)}
          />
        ))}
      </div>
    </div>
  );

  return (
    <div className={`${sidebarToggle ? "" : "ml-72"}`}>
      <div className="mt-0">
        {activePanel === "Home" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 m-10">
            <div className="flex bg-blue-200 gap-4 p-8 rounded-lg shadow-md items-center">
              <i className="fa-solid fa-clock text-9xl"></i>
              <div className='font-semibold'>
                <p className="text-5xl">{totalPendingCampaigns}</p>
                <h2 className="text-3xl mb-2">Pending Campaigns</h2>
              </div>
            </div>
            <div className="flex bg-blue-200 gap-4 p-8 rounded-lg shadow-md items-center">
              <i className="fa-solid fa-thumbs-up text-9xl"></i>
              <div className='font-semibold'>
                <p className="text-5xl">{totalApprovedCampaigns}</p>
                <h2 className="text-3xl mb-2">Approved Campaigns</h2>
              </div>
            </div>
            <div className="flex bg-blue-200 gap-4 p-8 rounded-lg shadow-md items-center">
              <i className="fa-solid fa-users text-9xl"></i>
              <div className='font-semibold'>
                <p className="text-5xl">{totalUsers}</p>
                <h2 className="text-3xl mb-2">Users</h2>
              </div>
            </div>
          </div>
        )}
        {activePanel === "PendingCampaigns" && renderCampaigns(pendingCampaigns)}
        {activePanel === "ApprovedCampaigns" && renderCampaigns(approvedCampaigns)}
        {activePanel === "Users" && (
          <div className="mx-20 py-6">
              <h2 className="text-xl font-bold">Users</h2>
              <table className="w-full bg-white rounded shadow mt-4">
                <thead className="bg-gray-200">
                  <tr>
                    <th className="p-2">Name</th>
                    <th className="p-2">Email</th>
                    <th className="p-2">Role</th>
                    <th className="">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map(user => (
                    <tr key={user.id} className="border-t">
                      <td className="p-2">{user.name}</td>
                      <td className="p-2">{user.email}</td>
                      <td className="p-2">{user.role}</td>
                      <td className="">
                        <button className="text-blue-500">Edit</button> | 
                        <button className="text-red-500"> Delete</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
        )}
      </div>
      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        campaign={selectedCampaign}
        onApprove={handleApprove}
        showApproveButton={activePanel === "PendingCampaigns"}
      />
    </div>
  );
};

export default Dashboard;
