import React from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AuthProvider } from './context/AuthContext';
import Home from "./pages/Home";
import Login from './pages/Auth/login'
import SignUp from './pages/Auth/signup'
import About from './pages/About'
import Fundraise from './pages/Fundraise'
import Donate from './pages/Donate'
import Search from './pages/Search'
import AdminPanel from './pages/AdminPanel'
import CampaignDetail from './pages/CampaignDetails'
import MyCampaigns from './pages/MyCampaigns'
import MyImpact from './pages/MyImpact'
import Campaigns from './components/Campaigns'
import PendingCampaigns from './pages/pendingCampaigns'
import ProtectedRoute from './components/ProtectedRoute'
import Payment from './pages/Payment'

function App() {

  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route exact path="/" element={<Home/>} />
          <Route exact path="/login" element={<Login/>} />
          <Route exact path="/signup" element={<SignUp/>} />
          <Route exact path="/about" element={<About/>} />
          <Route exact path="/fundraise" element={<Fundraise/>} />
          <Route exact path="/donate" element={<Donate/>} />
          <Route exact path="/search" element={<Search/>} />
          <Route
            exact
            path="/adminpanel"
            element={<ProtectedRoute element={AdminPanel} requiredRole="admin" />}
          />
          <Route exact path="/campaigns/:id" element={<CampaignDetail/>} />
          <Route exact path="/mycampaigns" element={<MyCampaigns/>} />
          <Route exact path="/myimpact" element={<MyImpact/>} />
          <Route exact path="/pendingcampaigns" element={<PendingCampaigns/>} />
          <Route exact path="/campaigns" element={<Campaigns/>} />
          <Route exact path="/payment" element={<Payment/>} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
