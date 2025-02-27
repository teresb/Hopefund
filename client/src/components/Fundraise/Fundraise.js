// client/src/components/CreateFundraiser.js

import React, { useState, useContext } from 'react';
import axios from '../../api/axios';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';

const CreateFundraiser = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    goal: '',
    deadline: '',
  });
  const [imageFile, setImageFile] = useState(null);
  const navigate = useNavigate();
  const { auth } = useContext(AuthContext);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Ensure that the user is logged in
    console.log('Form Data:', formData);
    if (!auth.token) {
      alert('You must be logged in to create a fundraiser.');
      return;
    }
    try {
        const data = new FormData();
        data.append('title', formData.title);
        data.append('description', formData.description);
        data.append('goal', formData.goal);
        data.append('deadline', formData.deadline);
        if (imageFile) {
        data.append('image', imageFile);
        }

      await axios.post('/fundraisers', data , {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
      });
      navigate('/'); // Redirect to the list after creation
    } catch (error) {
      console.error(error);
      alert('Error creating fundraiser.');
    }
  };

  return (
    <div className="w-full h-screen bg-violet-900 flex gap-3 items-center">
        <div className="text-center px-5">
          <i class="fa-solid fa-handshake-angle text-white text-9xl"></i>
          <h1 className="text-4xl text-white font-bold my-4">Turn your dreams into reality</h1>
          <p className="text-xl text-white font-normal">Create a fundraiser free and get support from the community</p>
        </div>
        <div className="w-3/5 p-20 bg-white rounded-tl-3xl rounded-bl-3xl ">
          <h2 className="text-xl font-bold mb-4">Create Fundraiser</h2>
          <form onSubmit={handleSubmit}>
            <input
              type="title"
              name="title"
              placeholder="Title"
              value={formData.title}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded mb-4"
              required />
            <textarea
              name="description"
              placeholder="Description"
              value={formData.description}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded mb-4"
              required />
            <input
              type="number"
              name="goal"
              placeholder="Goal"
              value={formData.goal}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded mb-4"
              required />
            <input
              type="date"
              name="deadline"
              placeholder="Deadline"
              value={formData.deadline}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded mb-4"
              required />
            <input
              type="file"
              name="image"
              onChange={handleFileChange}
              className="w-full p-2 border border-gray-300 rounded mb-4"
              accept="image/*" />
            <button type="submit" className="btn-primary">
              Create Fundraiser
            </button>
          </form>
        </div>
    </div>
  );
};

export default CreateFundraiser;
