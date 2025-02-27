import React from 'react';
import { useNavigate } from 'react-router-dom';


const Menu = ({ auth, logout, showAllLinks = true }) => {
  const navigate = useNavigate();
  return (
    <div className="absolute right-0 mt-2 w-[300px] bg-white rounded-md shadow-lg py-10 px-5 space-y-5 z-50">
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
              <a href="/" className="text-gray-800 text-md hover:text-white">My fundraisers</a>
            </li>
            <li>
              <a href="#about" className="text-gray-800 text-md hover:text-white">My Impact</a>
            </li>
            <li>
              <a href="#about" className="text-gray-800 text-md hover:text-white">Pending Campaigns</a>
            </li>
          </>
        )}
        {showAllLinks && (
          <>
            <li>
              <a href="/" className="text-gray-800 text-md hover:text-white">Donate</a>
            </li>
            <li>
              <a href="#about" className="text-gray-800 text-md hover:text-white">Fundraise</a>
            </li>
            <li>
              <a href="#services" className="text-md text-gray-800 hover:text-white">About</a>
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


