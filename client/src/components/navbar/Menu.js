import React from 'react';
import { useNavigate } from 'react-router-dom';


const Menu = ({ auth, logout, showAllLinks = true }) => {
  const navigate = useNavigate();
  return (
    <div className="absolute right-0 mt-2 w-[350px] bg-white rounded-md shadow-lg py-10 px-5 space-y-5 z-50">
    {auth.user && (
      <div className='flex items-center gap-2 justify-start'>
        <i className="fa-solid fa-circle-user text-gray-800 text-4xl"></i>
        <div>
          <h1 className='text-gray-800'>{auth.user.name}</h1>
          <h1 className='text-gray-400'>{auth.user.email}</h1>
        </div>
      </div>
    )}
    <div>
      <ul className="space-y-6 text-lg font-semibold">
        {auth.user && (
          <>
            <li>
              <button onClick={() => navigate("/mycampaigns")} className="w-full text-left text-gray-800 p-2 rounded text-md hover:bg-slate-300 hover:w-full">My Campaigns</button>
            </li>
            <li>
              <button onClick={() => navigate("/myimpact")} className="w-full text-left text-gray-800 rounded text-md p-2 hover:bg-slate-300 hover:w-full">My Impact</button>
            </li>
            <li>
              <button onClick={() => navigate("/pendingcampaigns")} className="text-left text-gray-800 rounded text-md p-2 hover:bg-slate-300 hover:w-full">Pending Campaigns</button>
            </li>
          </>
        )}
        {showAllLinks && (
          <>
            <li>
            <button onClick={() => navigate("/donate")} className="w-full text-left text-gray-800 p-2 rounded text-md hover:bg-slate-300 hover:w-full">Donate</button>
            </li>
            <li>
            <button onClick={() => navigate("/fundraise")} className="w-full text-left text-gray-800 p-2 rounded text-md hover:bg-slate-300 hover:w-full">Fundraise</button>
            </li>
            <li>
            <button onClick={() => navigate("/about")} className="w-full text-left text-gray-800 p-2 rounded text-md hover:bg-slate-300 hover:w-full">About</button>
            </li>
          </>
        )}
        {!auth.user ? (
          <li>
            <button onClick={() => navigate("/login")} className="btn-primary">Signin</button>
          </li>
        ) : (
          <button onClick={logout} className="btn-primary">Logout</button>
        )}
      </ul>
    <div></div>
    </div>
    </div>
  );
};


export default Menu;


