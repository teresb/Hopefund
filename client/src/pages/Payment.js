import React, { useState, useContext } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from '../api/axios';
import { AuthContext } from '../context/AuthContext';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';

const Payment = () => {
  const [amount, setAmount] = useState('');
  const { auth } = useContext(AuthContext);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [message, setMessage] = useState('');
  const [paymentProcessed, setPaymentProcessed] = useState(false);
  const [thankYou, setThankYou] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { campaign } = location.state || {};

  const handlePayment = async (e) => {
    e.preventDefault();

    // Simulate payment processing
    setTimeout(() => {
      setMessage('A withdrawal has been placed on your account. Please dial *126# to authenticate.');
      setPaymentProcessed(true);
    }, 1000);
  };

  const handleDone = async () => {
    try {
      const donationData = {
        campaign: campaign._id,
        donor: auth.user ? auth.user.id : null,
        amount: parseFloat(amount),
      };

      console.log('Sending donation data:', donationData);
      await axios.post('/donations', donationData);
      console.log(`Donated ${amount} to ${campaign.title}`);

      setAmount('');
      setPhoneNumber('');
      setMessage('');
      setPaymentProcessed(false);
      setThankYou(true);
    } catch (error) {
      console.error('Error making donation:', error);
      setMessage('Error making donation. Please try again.');
    }
  };

  const handleBackToHome = () => {
    navigate('/');
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="container shadow-2xl rounded-xl w-[350px] p-4 bg-white">
        <h1 className="text-2xl text-center font-bold mb-4">MTN Mobile Money Payment</h1>
        {thankYou ? (
          <div className="text-center">
            <p className="mb-4">Thank you for your payment!</p>
            <button onClick={handleBackToHome} className="btn-primary w-full">Back to Home</button>
          </div>
        ) : paymentProcessed ? (
          <div className="text-center">
            <p className="mb-4">{message}</p>
            <button onClick={handleDone} className="btn-primary w-full">Done</button>
          </div>
        ) : (
          <form onSubmit={handlePayment} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Amount</label>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Phone Number</label>
              <PhoneInput
                country={'cm'} // Set default country to Cameroon
                value={phoneNumber}
                onChange={setPhoneNumber}
                inputClass="mt-1 block w-full pl-5 border border-gray-300 rounded-md"
                required
              />
            </div>
            <button type="submit" className="btn-primary w-full">Pay Now</button>
          </form>
        )}
      </div>
    </div>
  );
};

export default Payment;