import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from "react-router-dom";
import { AuthContext } from '../../context/AuthContext';
import Menu from './Menu';

function Navbar() {
  const navigate = useNavigate();
  const { auth, logout } = useContext(AuthContext);
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const [showBarsDropdown, setShowBarsDropdown] = useState(false);
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  const toggleUserDropdown = () => {
    setShowUserDropdown(!showUserDropdown);
    setShowBarsDropdown(false);
  }

  const toggleBarsDropdown = () => {
    setShowBarsDropdown(!showBarsDropdown);
    setShowUserDropdown(false);
  }

  const handleFundraiseClick = () => {
    if (auth.user) {
      navigate("/fundraise"); // If logged in, go to fundraise page
    } else {
      navigate("/login", { state: { from: "/fundraise" } }); // If not logged in, redirect to login with intended destination
    }
  };


  const element = document.documentElement;
  useEffect(() => {
    if (theme === "dark") {
      element.classList.add("dark");
      localStorage.setItem("theme", "dark")
    } else {
      element.classList.remove("dark");
      localStorage.setItem("theme", "light")
    }
  }, [element, theme]);

  return (
    <div className="fixed top-0 left-0 right-0 z-50 flex justify-between items-center text-white py-2 px-2 md:px-5 md:my-3 md:mx-20 lg:mx-30 bg-gradient-to-l from-violet-900 via-violet-800 to-violet-900 md:rounded-full border-primary/50">

        <ul className="flex items-center gap-1 text-base ">
          <a href="/search">
            <i className="fa-solid fa-magnifying-glass right-2 text-xl text-white hover:text-black"></i>
          </a>
          <div className='hidden md:flex '>
            <li>
              <a href="/donate" className="p-3 text-md hover:text-black">Donate</a>
            </li>
            <li>
              <button onClick={handleFundraiseClick} className="text-md hover:text-black bg-transparent border-none cursor-pointer">Fundraise</button>
            </li>
          </div>
        </ul>

      {/* Logo */}
      <a href='/' className="flex text-2xl font-semibold">
        <i className="fa-solid fa-handshake-angle text-3xl"></i>
        <h2>Hopefund</h2>
      </a>

      {/* Navigation Links */}
      <div className='relative flex gap-3 items-center'>
        <ul className="hidden md:flex items-center gap-1 text-base ">
          <li>
            <a href="/about" className="p-3 text-md hover:text-black">About</a>
          </li>
          {!auth.user ? (
            <li>
            <button onClick={() => navigate("/login")} className="btn-primary">Signin</button>
          </li>
          ) : (
            <li className="relative">
              <i className="fa-solid fa-user text-xl cursor-pointer hover:text-black" onClick={toggleUserDropdown}></i>
              {showUserDropdown && <Menu auth={auth} logout={logout} showAllLinks={false} />}
            </li>
          )}
        </ul>
        <div className='flex gap-3'>
          {theme === "dark" ? (
            <i className="fa-solid fa-sun text-2xl cursor-pointer hover:text-black" onClick={() => setTheme("light")}></i>
          ) : (
            <i className="fa-solid fa-moon text-2xl cursor-pointer hover:text-black" onClick={() => setTheme("dark")}></i>
          )}
            <div className='relative'>
              <i className="fa-solid fa-bars md:hidden block text-2xl hover:text-black" onClick={toggleBarsDropdown}></i>
              {showBarsDropdown && <Menu showMenu={showBarsDropdown} auth={auth} logout={logout} />}
            </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;