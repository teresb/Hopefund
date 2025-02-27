import React from 'react';
import Hero from '../components/Hero';
import Navbar from '../components/navbar/Navbar';
import OverviewCounter from '../components/OverviewCounter';
import Vision from '../components/Vision';
import Banners from '../components/Banners';
import Video from '../components/Video';
import Footer from '../components/Footer';
import Fundraisers from '../components/Fundraise/Fundraisers';

function Home() {
    return (
        <div className='overflow-x-hidden dark:bg-gray-900 bg-white'>
            <Navbar />
            <Hero />
            <OverviewCounter />
            <Vision />
            <Banners />
            <Video />
            <div className='dark:bg-gray-900 dark:text-white'>
                <div className="container py-16 space-y-5">
                    <h1 className="border-l-8 pl-2 text-3xl font-bold">
                        Discover some fundraisers...
                    </h1>
                    <Fundraisers count={3} imageClass="h-[250px] w-full object-cover transition duration-700 hover:skew-x-2 rounded-md hover:scale-110" />
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default Home;