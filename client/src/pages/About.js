import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/navbar/Navbar';
import Footer from '../components/Footer';
import { AuthContext } from '../context/AuthContext';

const About = () => {
  const navigate = useNavigate();
   const { auth } = useContext(AuthContext);

   const handleFundraiseClick = () => {
      if (auth.user) {
        navigate("/fundraise"); // If logged in, go to fundraise page
      } else {
        navigate("/login", { state: { from: "/fundraise" } }); // If not logged in, redirect to login with intended destination
      }
    };
  return (
    <div>
      <Navbar/>
      <div className="container pb-16 space-y-5">
         <div className='mt-32 w-1/2 space-y-4 mb-20'>
            <h1 className='text-6xl font-semibold'>Join Us In Changing Lives</h1>
            <p className='text-2xl'>Because together, we can make a real difference. Let's build a brighter future for everyone.</p>
            <button
            onClick={handleFundraiseClick}
            className="btn-primary cursor-pointer">Fundraise</button>
         </div>
         <hr className="border border-black mb-10" />
         <div className='pt-10'>
          <img src="/assets/Header.jpg" alt="About Us" className="w-full h-[500px] object-cover rounded-md" />
          <p className='w-3/5 pt-4'>
          GoFundMe launched in 2010 as a fundraising platform dedicated to helping people help each other. In 2022, GoFundMe acquired Classy, which enables nonprofit organizations to maximize their impact through a suite of online fundraising tools.
          <br/>
          <br/>
          Together, GoFundMe and Classy are building a future where everyone has the ability to make a meaningful difference for the people, causes, and communities they care about most. Through our GoFundMe platform and Classy software business, we offer innovative products and services that leverage insights and analytics of our combined company.
          </p>
         </div>
      </div>
      <Footer/>
    </div>
  )
}

export default About;
