import React from 'react'

const Banner2 = () => {
  return (
    <div className='bg-slate-100 dark:bg-slate-900 dark:text-white'>
      <div className='container md:h-[500px] flex items-center justify-center py-10'>
        <div className='grid grid-cols-1 items-center gap-4 sm:grid-cols-2'>
            <div className='lg:max-w-[400px] space-y-6'>
                <h1 className='text-2xl font-semibold md:text-4xl mb-4'>
                    Help the Needy People
                </h1>
                <ul className='flex list-inside list-disc flex-col gap-2 md:gap-4'>
                    <li className='font-medium'>At Hopefund, we see generosity transforming lives. 
                        Your donation creates meaningful change and inspires hope for a brighter future.
                    </li>
                    <li className='font-medium'>At Hopefund, we see generosity transforming lives. 
                        Your donation creates meaningful change and inspires hope for a brighter future.
                    </li>
                    <li className='font-medium'>At Hopefund, we see generosity transforming lives. 
                        Your donation creates meaningful change and inspires hope for a brighter future.
                    </li>
                    <li className='font-medium'>At Hopefund, we see generosity transforming lives. 
                        Your donation creates meaningful change and inspires hope for a brighter future.
                    </li>
                </ul>
                <button className='btn-primary'>Fundraise</button>
            </div>
            <div>
                <img
                    src='../../assets/Header3.jpg'
                    alt=""
                    className='mx-auto w-full p-4 md:max-w-full h-[300px] md:h-[350px] object-cover rounded-3xl '
                />
            </div>
        </div>
      </div>
    </div>
  )
}

export default Banner2
