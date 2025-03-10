// client/src/components/CreateFundraiser.js

import React, { useState, useContext } from 'react';
import axios from '../api/axios';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

const Fundraise = () => {
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
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImageFile(imageUrl);
    }
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

      await axios.post('/campaigns', data, {
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
        <i className="fa-solid fa-handshake-angle text-white text-9xl"></i>
        <h1 className="text-4xl text-white font-bold my-4">Turn your dreams into reality</h1>
        <p className="text-xl text-white font-normal">Create a campaign free and get support from the community</p>
      </div>
      <div className="w-3/5 p-20 bg-white rounded-tl-3xl rounded-bl-3xl overflow-hidden">
        <h2 className="text-xl font-bold mb-4">Create Fundraiser</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="title"
            name="title"
            placeholder="Title"
            value={formData.title}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded mb-4"
            required
          />
          <textarea
            name="description"
            placeholder="Description"
            value={formData.description}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded mb-4"
            required
          />
          <input
            type="number"
            name="goal"
            placeholder="Goal"
            value={formData.goal}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded mb-4"
            required
          />
          <DatePicker
        selected={formData.deadline}
        onChange={(date) => handleChange({ target: { name: 'deadline', value: date } })}
        name="deadline"
        placeholderText="Deadline"
        className="w-full p-2 border border-gray-300 rounded mb-4"
        required
        dateFormat="yyyy-MM-dd"  // Date format to match the input
      />
          <div className="relative">
            <input
              type="file"
              name="image"
              onChange={handleFileChange}
              className="w-full p-2 border border-gray-300 rounded mb-4 opacity-0 absolute inset-0 z-10"
              accept="image/*"
              required
            />
            <div className="w-full p-2 border border-gray-300 rounded mb-4 bg-white flex items-center justify-center cursor-pointer">
            {imageFile ? (
          <img src={imageFile} alt="Uploaded preview" className="max-h-20 rounded" />
        ) : (
          <span className="text-gray-500">Upload an Image for your Campaign</span>
        )}
            </div>
          </div>
          <button type="submit" className="btn-primary">
            Create Campaign
          </button>
        </form>
      </div>
    </div>
  );
};

export default Fundraise;
