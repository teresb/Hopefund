import React, { useState, useContext } from 'react';
import api from '../../api/axios';
import { AuthContext } from '../../context/AuthContext';
import { useNavigate, Link} from 'react-router-dom';

const Signup = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post('/auth/register', formData);
      // On successful signup, log the user in
      login(res.data.token, res.data.user);
      navigate('/'); // Redirect to home or dashboard
    } catch (error) {
      console.error(error);
      alert('Error signing up');
    }
  };

  return (
    <div className="min-h-screen flex justify-end items-center bg-violet-800 relative">
      <div className='w-full lg:w-3/5 flex justify-center'>
        <div
          className="absolute inset-0 bg-no-repeat bg-center lg:bg-left bg-cover lg:bg-auto"
          style={{ backgroundImage: `url('../../assets/login.png')`, backgroundSize: 'contain'  }}
        ></div>

        <div className="relative z-10 bg-white bg-opacity-40 rounded-lg shadow-xl p-4 max-w-xs w-full backdrop-blur-md border border-black">
          <h2 className="text-center text-2xl font-bold text-violet-800 mb-4">SignUp</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4 relative">
              <input
                className="w-full p-2 rounded-lg bg-violet-800 bg-opacity-20 text-violet-800 placeholder-gray-700 focus:outline-none focus:ring-2 focus:ring-violet-800"
                type="text"
                name="name"
                placeholder="Name"
                value={formData.name}
                onChange={handleChange}
                required
              />
              <i className="fa-solid text-violet-800 absolute right-3 top-2">👤</i>
            </div>
            <div className="mb-4 relative">
              <input
                className="w-full p-2 rounded-lg bg-violet-800 bg-opacity-20 text-violet-800 placeholder-gray-700 focus:outline-none focus:ring-2 focus:ring-violet-800"
                type="email"
                name="email"
                placeholder="Email"
                value={FormData.email}
                onChange={handleChange}
                required
              />
              <i className="fa-solid fa-envelope text-violet-800 absolute right-3 top-2"></i>
            </div>
            <div className="mb-4 relative">
              <input
                className="w-full p-2 rounded-lg bg-violet-800 bg-opacity-20 text-violet-800 placeholder-gray-700 focus:outline-none focus:ring-2 focus:ring-violet-800"
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                required
              />
              <i class="fa-solid fa-lock text-violet-800 absolute right-3 top-2"></i>            
            </div>

            <button type="submit" className="w-full py-2 bg-violet-800 text-white rounded-lg hover:bg-violet-500 transition duration-300">
              Register
            </button>
            <p className="text-center text-black mt-4">
              Already have an account? <Link to="/login" className="text-violet-800">Login</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
