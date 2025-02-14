import React from 'react'

const Menu = ({ showMenu}) => {
    return (
        <div >
            <div className={`fixed top-12 md:top-14 ${ showMenu ? "right-0 md:right-24" : "-left-[100%]"} h-3/4 w-1/2 sm:w-1/3 bg-white text-black dark:bg-slate-950 dark:text-white transition-all duration-500 pt-14 pb-8 px-8 flex flex-col justify-between rounded-b-2xl lg:hidden `} >
                <div className='flex items-center justify-start gap-3'>
                    <i class="fa-solid fa-circle-user text-2xl"></i>
                    <div>
                        <h1 className='text-xl font-semibold'>John doe</h1>
                        <h1 className='text-sm text-slate-500'>+237612345678</h1>
                    </div>
                </div>
                <div>
                    <ul className="space-y-6 text-lg font-semibold">
                        <li>
                            <a href="/" className="p-3 text-md hover:text-white">Donate</a>
                        </li>
                        <li>
                            <a href="#about" className="p-3 text-md hover:text-white">Fundraise</a>
                        </li>
                        <li>
                            <a href="#services" className="p-3 text-md hover:text-white">About</a>
                        </li>
                        <li>
                            <a href="/login">
                            <button className="py-2 px-6 bg-[#1fcbff] text-md text-white rounded-full hover:bg-gray-700 transition">
                                Signin
                            </button>
                            </a>
                        </li>
                    </ul>
                </div>
                <div>
                    <p>@2024 All Rights Reserved</p>
                </div>
            </div>
        </div>
    )
}

export default Menu
