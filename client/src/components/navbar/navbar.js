import React, { useState, useEffect } from 'react';
import Menu from './Menu'; 

function Navbar() {
  const [showMenu, setShowMenu] = useState(false);
  const [theme, setTheme] = useState(
    localStorage.getItem("theme") || "light");

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  }
  
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
      <div className="text-2xl font-semibold">
        <h2>Hopefund</h2>
      </div>

      {/* Navigation Links */}
      <div>
        <ul className="hidden lg:flex items-center gap-1 text-base ">
          <li>
            <a href="/" className="p-3 text-md hover:text-white">Donate</a>
          </li>
          <li>
            <a href="#about" className="p-3 text-md hover:text-white">Fundraise</a>
          </li>
          <li>
            <a href="#services" className="p-3 text-md hover:text-white">About</a>
          </li>
          <li>
            <a href="/login">
              <button className="py-2 px-6 bg-[#1fcbff] text-md text-white rounded-full hover:bg-gray-700 transition">
                Signin
              </button>
            </a>
          </li>
        </ul>
      </div>

      {/* Contact Button */}
      <div className="relative flex gap-3 items-center" >
        <i href="/search" className="fa-solid fa-magnifying-glass right-2 text-xl text-white"></i>
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