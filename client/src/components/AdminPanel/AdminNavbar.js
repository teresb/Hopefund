import React, { useEffect, useState } from 'react';

const AdminNavbar = ({ sidebarToggle, setSidebarToggle }) => {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  const element = document.documentElement;

  useEffect(() => {
    if (theme === "dark") {
      element.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      element.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [element, theme]);

  return (
    <div className={`${sidebarToggle ? "" : "ml-72"}`}>
      <div className="items-center flex justify-between text-2xl px-3 py-2 text-white bg-gradient-to-l from-violet-900 via-violet-800 to-violet-900 border-primary/50">
        <i className="fa-solid fa-bars me-4 cursor-pointer"
          onClick={() => setSidebarToggle(!sidebarToggle)}></i>
        <div className="flex font-semibold">
          <i className="fa-solid fa-handshake-angle text-3xl"></i>
          <h2>Hopefund</h2>
        </div>
        {theme === "dark" ? (
          <i className="fa-solid fa-sun text-2xl cursor-pointer" onClick={() => setTheme("light")}></i>
        ) : (
          <i className="fa-solid fa-moon text-2xl cursor-pointer" onClick={() => setTheme("dark")}></i>
        )}
      </div>
    </div>
  )
}

export default AdminNavbar;
