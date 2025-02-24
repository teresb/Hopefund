import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from "react-router-dom";
import Menu from './Menu'; 
import { AuthContext } from '../../contexts/AuthContext';

function Navbar() {
  const navigate = useNavigate();
  const { auth, logout } = useContext(AuthContext);
  const [showMenu, setShowMenu] = useState(false);
  const [theme, setTheme] = useState(
    localStorage.getItem("theme") || "light");

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  }

  const handleFundraiseClick = () => {
    if (auth.user) {
      navigate("/fundraise"); // If logged in, go to fundraise page
    } else {
      navigate("/login"); // If not logged in, redirect to login
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
  }, [element,theme]);


  return (
    <div className="fixed top-0 left-0 right-0 z-50 flex justify-between items-center text-white py-2 px-5 md:my-3 md:mx-20 lg:mx-30 bg-gradient-to-l from-violet-900 via-violet-800 to-violet-900 md:rounded-full border-primary/50">
      {/* Logo */}
      <div className="flex text-2xl font-semibold">
       <i class="fa-solid fa-handshake-angle text-3xl"></i>
        <h2>Hopefund</h2>
      </div>

      {/* Navigation Links */}
      <div>
        <ul className="hidden lg:flex items-center gap-1 text-base ">
          <li>
            <a href="/search" className="p-3 text-md hover:text-white">Donate</a>
          </li>
          <li>
            <button onClick={handleFundraiseClick} className="text-md hover:text-white bg-transparent border-none cursor-pointer">Fundraise</button>
          </li>
          <li>
            <a href="#services" className="p-3 text-md hover:text-white">About</a>
          </li>
          {!auth.user ? (
            <li>
            <a href="/login">
              <button className="btn-primary">
                Signin
              </button>
            </a>
          </li>
          ) : (
            <li>
              <a href="/" onClick={logout} className="text-md hover:text-white">Logout</a>
            </li>
          )}
        </ul>
      </div>

      {/* Contact Button */}
      <div className="relative flex gap-3 items-center" >
        <a href="/search">
          <i className="fa-solid fa-magnifying-glass right-2 text-xl text-white"></i>
        </a>
        {theme === "dark" ? (
          <i 
            className="fa-solid fa-sun text-2xl cursor-pointer" 
            onClick={() => setTheme("light")}></i>
        ) : (
          <i 
            className="fa-solid fa-moon text-2xl cursor-pointer" 
            onClick={() => setTheme("dark")}></i>
        )}
        <i className="fa-solid fa-bars lg:hidden block text-2xl hover:bg-blue-900 px-2 rounded-full cursor-pointer transition-all" onClick={toggleMenu}></i>
        <Menu showMenu={showMenu}/>
      </div>
    </div>
  );
};

export default Navbar;