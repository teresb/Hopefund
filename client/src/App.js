import React from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AuthProvider } from './context/AuthContext';
import Home from "./pages/Home";
import Login from './components/Auth/login'
import SignUp from './components/Auth/signup'
import Fundraise from './pages/Fundraise'
import Search from './pages/Search'
import Admin from './components/Admin/Admin'
import CampaignDetail from './pages/CampaignDetails'
import MyCampaigns from './pages/MyCampaigns'
import Campaigns from './components/Campaigns'
import PendingCampaigns from './pages/pendingCampaigns'

function App() {

  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route exact path="/" element={<Home/>} />
          <Route exact path="/login" element={<Login/>} />
          <Route exact path="/signup" element={<SignUp/>} />
          <Route exact path="/fundraise" element={<Fundraise/>} />
          <Route exact path="/search" element={<Search/>} />
          <Route exact path="/admin" element={<Admin/>} />
          <Route exact path="/campaigns/:id" element={<CampaignDetail/>} />
          <Route exact path="/mycampaigns" element={<MyCampaigns/>} />
          <Route exact path="/pendingcampaigns" element={<PendingCampaigns/>} />
          <Route exact path="/campaigns" element={<Campaigns/>} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
