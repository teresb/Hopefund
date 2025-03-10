import React from 'react'

const Video = () => {
  return (
    <div className='bg-[#f7b400]'>
      <div className='container py-8 md:py-16'>
        <div className='grid grid-cols-1 items-center md:grid-cols-2 gap-4 md:gap-8'>
            <div>
                <iframe
                    src="https://www.youtube.com/embed/TqhNILVX8IE?si=59q7CGj0g6mmGeOF"
                    title="YouTube video player"
                    frameborder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerpolicy="strict-origin-when-cross-origin"
                    allowfullscreen
                    className='aspect-video w-full'
                ></iframe>
            </div>
            <div className='space-y-4 text-center md:text-left text-white'> 
                <h1 className='text-4xl font-bold'>Watch Our Video</h1>
                <p>
                A small act of kindness can create a ripple of change. Your donation has the power to bring hope, support, and a brighter future to those in need. Every contribution, no matter the size, makes a difference. #GiveBack #SpreadKindness #DonateForACause
                </p>
                <button className='btn-primary !bg-white !text-black'>Get Started</button> 
            </div>
        </div>
      </div>
    </div>
  )
}

export default Video
