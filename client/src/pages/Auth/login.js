import React, { useState, useContext } from 'react';
import axios from '../../api/axios';
import { AuthContext } from '../../context/AuthContext';
import {useNavigate, useLocation, Link} from "react-router-dom";

function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('/auth/login', formData);
      // res.data should include the token and user details (including role)
      const { token, user } = res.data;
      login(token, user);
      // If user role is admin, redirect to /admin, else go to home or dashboard
      if (user.role === 'admin') {
        navigate('/adminpanel');
      } else {
        const from = location.state?.from || '/';
        navigate(from);
      }
    }  catch (error) {
      console.error("Login error:", error);
      alert("Login failed. Please check your credentials and try again.");
    }
  };

  return (
    <div className="min-h-screen flex justify-end items-center relative">
      <div className='w-full lg:w-2/5 flex justify-center'>
        <div
          className="absolute inset-0 bg-no-repeat bg-center lg:bg-left bg-cover lg:bg-auto"
          style={{ backgroundImage: `url('../../assets/LoginImage.jpg')` }}
        ></div>

        <div className="absolute"></div>

        <div className="relative z-10 bg-blue-500 bg-opacity-40 rounded-lg shadow-xl p-4 max-w-xs w-full backdrop-blur-md border border-black">
          <h2 className="text-center text-2xl font-bold text-white mb-4">Welcome Back :-)</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4 relative">
              <input
                className="w-full p-2 rounded-lg bg-blue-700 bg-opacity-20 text-blue-700 placeholder-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
                type="email"
                name="email"
                placeholder="Email"
                value={FormData.email}
                onChange={handleChange}
                required
              />
              <i className="fa-solid fa-envelope text-blue-700 absolute right-3 top-2"></i>
            </div>
            <div className="mb-2 relative">
              <input
                className="w-full p-2 rounded-lg bg-blue-700 bg-opacity-20 text-blue-700 placeholder-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                required
              />
              <i className="fa-solid text-blue-700 absolute right-3 top-2">🔒</i>
            </div>

            <div className='w-full flex items-center mb-2'>
              <input type="checkbox" className="w-4 h-4 mr-2"/>
              <p className="text-sm">Remember me</p>
            </div>

            <button type="submit" className="w-full py-2 bg-blue-700 text-white rounded-lg hover:bg-blue-500 transition duration-300">
              Login
            </button>
            <p className="text-center text-white mt-4">
              Don't have an account? <Link to="/signup" className="text-blue-400">Register</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;