import React from 'react'

const Banner = () => {
  return (
    <div className='bg-slate-100 dark:bg-slate-900 dark:text-white'>
      <div className='container md:h-[500px] flex items-center justify-center py-10'>
        <div className='grid grid-cols-1 items-center gap-4 sm:grid-cols-2'>
            <div>
                <img
                    src='../../assets/Banner1.jpg'
                    alt=""
                    className='mx-auto w-full p-4 md:max-w-full h-[300px] md:h-[350px] object-cover rounded-3xl '
                />
            </div>
            <div className='lg:max-w-[400px] space-y-6'>
                <h1 className='text-2xl font-semibold md:text-4xl mb-4'>
                Join Us in Making a Difference
                </h1>
                <ul className='flex list-inside list-disc flex-col gap-2 md:gap-4'>
                    <li className='font-medium'>Every donation, no matter the size, helps bring hope and change to those in need.
                    </li>
                    <li className='font-medium'>Contribute to a meaningful project and be part of a community making a difference.
                    </li>
                    <li className='font-medium'>Your generosity directly supports real people and their stories—watch your contribution create positive change.
                    </li>
                    <li className='font-medium'>Let’s unite to uplift others; together, we can achieve incredible things!
                    </li>
                </ul>
                <button className='btn-primary'>Donate</button>
            </div>
        </div>
      </div>
    </div>
  )
}

export default Banner
