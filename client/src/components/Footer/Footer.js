import React,{ useContext} from 'react'
import FooterLinks from './FooterLinks'
import { AuthContext } from '../../contexts/AuthContext';


const Links = [
    {
        name: "Home",
    },
    {
        name: "Home",
    },
    {
        name: "Home",
    },
    
]
const Footer = () => {
      const { auth, logout } = useContext(AuthContext);
    
  return (
    <div className='text-white rounded-t-3xl bg-gradient-to-r from-violet-950 to to-violet-900'>
      <div className='mx-auto max-w-[1200px] p-4'>
        <div className='grid py-5 md:grid-cols-3'>
            <div className='px-4'>
                <i class="fa-solid fa-handshake-angle text-8xl"></i>
                <h2 className='mb-3 text-justify text-xl sm:text-left sm:text-3xl'>Hopefund</h2>
                <p>
                At Hopefund, we help you turn dreams into reality. Share your story, rally support, and inspire change together.
                </p>
                <div className='flex items-center gap-3 mt-3'>
                    <i className="fa-solid fa-location-arrow"></i>
                    <p>Molyko, Buea</p>
                </div>
                <div className='flex items-center gap-3 mt-3'>
                    <i className="fa-solid fa-mobile-screen-button"></i>
                    <p>+237612345678</p>
                </div>
            </div>
            <div className='grid grid-cols-2 sm:grid-cols-3 md:pl-10 col-span-2'>
                <div className='px-4 py-8 list-none space-y-2'>
                    <h1 className='mb-3 text-xl font-bold sm:text-left sm:text-xl'>Important Links</h1>
                    <li>
                        <a href="/" className="text-md hover:text-white">Donate</a>
                    </li>
                    <li>
                        <a href="/fundraise" className="text-md hover:text-white">Fundraise</a>
                    </li>
                    <li>
                        <a href="#services" className="text-md hover:text-white">About</a>
                    </li>
                    {!auth.user ? (
                        <li>
                        <a href="/login">
                        <button className="btn-primary">
                            Signin
                        </button>
                        </a>
                    </li>
                    ) : (
                        <li>
                        <a href="/" onClick={logout} className="text-md hover:text-white">Logout</a>
                        </li>
                    )}
                </div>
                <div className='px-4 py-8'>
                    <h1 className='mb-3 text-xl font-bold sm:text-left sm:text-xl'>Links</h1>
                    <ul className='flex flex-col gap-3'>
                        <FooterLinks links={Links} />
                    </ul>
                </div>
                <div className='px-4 py-8'>
                    <h1 className='mb-3 text-xl font-bold sm:text-left sm:text-xl'>Social Links</h1>
                    <div className='space-y-3'>
                        <h1>Subscribe to our newsletter</h1>
                        <input
                            type='text'
                            placeholder='Enter your email'
                            className='rounded-full px-3 py-1 text-black focus:border-sky-500 focus:outline-none focus:ring-sky-500'
                        />
                        <div className='flex gap-3 mt-6 items-center'>
                            <a href='/' className='duration-200 hover:scale-105'>
                                <i className="fa-brands fa-instagram text-3xl"></i>
                            </a>
                            <a href='/' className='duration-200 hover:scale-105'>
                                <i className="fa-brands fa-facebook text-3xl"></i>
                            </a>
                            <a href='/' className='duration-200 hover:scale-105'>
                                <i className="fa-brands fa-linkedin text-3xl"></i>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div className='bottom-footer'>
            <p className='border-t-2 border-gray-300/50 py-6 text-center'>
                Copyright © 2025. All Rights Reserved.</p>
        </div>
      </div>
    </div>
  )
}

export default Footer
