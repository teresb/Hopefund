import { useState } from 'react';
import Sidebar from '../components/AdminPanel/Sidebar';
import Dashboard from '../components/AdminPanel/Dashboard';
import AdminNavbar from '../components/AdminPanel/AdminNavbar';

const AdminPanel = () => {
  const [sidebarToggle, setSidebarToggle] = useState(false);
  const [activePanel, setActivePanel] = useState("Home");

  return (
    <div className="">
      <Sidebar
        sidebarToggle={sidebarToggle}
        setActivePanel={setActivePanel}
        activePanel={activePanel}
      />
      <div>
        <AdminNavbar
        sidebarToggle={sidebarToggle}
        setSidebarToggle={setSidebarToggle}
        activePanel={activePanel}
        />
        <Dashboard
          sidebarToggle={sidebarToggle}
          setSidebarToggle={setSidebarToggle}
          activePanel={activePanel}
        />
      </div>
    </div>
  )
}

export default AdminPanel;
