import React, {useContext} from 'react'
import Navbar from '../components/navbar/navbar'
import Footer from '../components/Footer'
import Campaigns from '../components/Campaigns'
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Donate = () => {
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
      <div className="container pb-32 space-y-5">
         <div className='mt-32 w-1/2 space-y-4 mb-20'>
            <h1 className='text-6xl font-semibold'>Join Us In Changing Lives</h1>
            <p className='text-2xl'>Because together, we can make a real difference. Let's build a brighter future for everyone.</p>
            <button
            onClick={handleFundraiseClick}
            className="btn-primary cursor-pointer">Fundraise</button>
         </div>
         <hr className="border border-black mb-10" />
         <div className='space-y-4'>
            <h1 className="border-l-8 pl-2 mt-16 text-3xl font-bold">
               Trending
            </h1>
            <Campaigns count={6} imageClass="h-[250px] w-full object-cover transition duration-700 hover:skew-x-2 rounded-md hover:scale-110" />
         </div>
      </div>
      <Footer/>
    </div>
  )
}

export default Donate
