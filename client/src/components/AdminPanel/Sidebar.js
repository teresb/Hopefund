import React, { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';

const Sidebar = ({ sidebarToggle, setActivePanel, activePanel }) => {
  const { logout } = useContext(AuthContext);

  return (
    <aside className={`${sidebarToggle ? "hidden" : "block"} w-72 bg-gradient-to-l from-violet-900 via-violet-800 to-violet-900 fixed h-full px-4 py-2`}>
      <div className='mb-4'>
        <h1 className="text-white text-2xl font-bold pt-4">Admin Panel</h1>
      </div>
      <hr className="border border-white" />
      <nav className="mt-3 text-white font-bold space-y-4">
        <button
          className={`w-full text-left px-3 py-2 rounded ${activePanel === "Home" ? "bg-gray-700" : "hover:bg-gray-700"}`}
          onClick={() => setActivePanel("Home")}
        >
          <i className="fa-solid fa-house inline-block w-6 h-6 mr-2 mt-2"></i>
          Home
        </button>
        <button
          className={`w-full text-left px-3 py-2 rounded ${activePanel === "PendingCampaigns" ? "bg-gray-700" : "hover:bg-gray-700"}`}
          onClick={() => setActivePanel("PendingCampaigns")}
        >
          <i className="fa-solid fa-clock inline-block w-6 h-6 mr-2 mt-2"></i>
          Pending Campaigns
        </button>
        <button
          className={`w-full text-left px-3 py-2 rounded ${activePanel === "ApprovedCampaigns" ? "bg-gray-700" : "hover:bg-gray-700"}`}
          onClick={() => setActivePanel("ApprovedCampaigns")}
        >
          <i className="fa-solid fa-thumbs-up inline-block w-6 h-6 mr-2 mt-2"></i>
          Approved Campaigns
        </button>
        <button
          className={`w-full text-left px-3 py-2 rounded ${activePanel === "Donations" ? "bg-gray-700" : "hover:bg-gray-700"}`}
          onClick={() => setActivePanel("Donations")}
        >
          <i className="fa-solid fa-hand-holding-dollar inline-block w-6 h-6 mr-2 mt-2"></i>
          Donations
        </button>
        <button
          className={`w-full text-left px-3 py-2 rounded ${activePanel === "Users" ? "bg-gray-700" : "hover:bg-gray-700"}`}
          onClick={() => setActivePanel("Users")}
        >
          <i className="fa-solid fa-users inline-block w-6 h-6 mr-2 mt-2"></i>
          Users
        </button>
        <button onClick={logout} className="btn-primary inline-block ml-3 mt-4">Logout</button>
      </nav>
    </aside>
  )
}

export default Sidebar;
