import React from 'react'
import { motion } from 'framer-motion';

const fadeAnimation = (delay) => {
    return {
        initial: {
            opacity: 0,
        },
        animate: {
            opacity: 1,
            transition: {
                duration: 0.6,
                delay: delay,
                ease: 'easeInOut',
            },
        },
    };
};


const Vision = () => {
  return (
    <div className='container my-16 bg-white dark:bg-gray-900 dark:texxt-white'>
      <div className='grid grid-cols-1 sm:grid-cols-2 gap-10'>
        <motion.div
            variants={fadeAnimation(0.2)}
            initial='initial'
            whileInView='animate' 
            className='mx-5 md:mx-8 px-6 py-10 space-y-4 shadow-lg border-t-8 border-green-800 dark:bg-slate-800'>
            <h1 className='text-xl font-semibold'>Our Vision</h1>
            <p>At Hopefund, we see generosity transforming lives. Your donation creates meaningful change and inspires hope for a brighter future.
            </p>
            <a href='/about' className='inline-block hover:text-primary border-b hover-yellow-500'>Learn More</a>
        </motion.div>
        <motion.div 
            variants={fadeAnimation(0.2)}
            initial='initial'
            whileInView='animate'
            className='mx-5 md:mx-8 px-6 py-10 space-y-4 shadow-lg border-t-8 border-yellow-500 dark:bg-slate-800'>
            <h1 className='text-xl font-semibold'>Our Vision</h1>
            <p>At Hopefund, we help you turn dreams into reality. Share your story, rally support, and inspire change together.
            </p>
            <a href='/about' className='inline-block hover:text-primary border-b hover-yellow-500'>Learn More</a>
        </motion.div>
      </div>
    </div>
  )
}

export default Vision
