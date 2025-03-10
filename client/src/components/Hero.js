import React from "react";
import { motion } from "framer-motion";

const Hero = () => {

  const FadeUp =(delay) => {
    return {
      initial: {
        opacity: 0,
        y: 100,
      },
      animate: {
        opacity: 1,
        y: 0,
        transition: {
          duration: 0.6,
          delay: delay,
          ease: "easeInOut",
        },
      },
    };
  };


  return (
    <div
      className="w-full lg:h-[700px] bg-cover bg-top bg-no-repeat lg:pb-20"
      style={{ backgroundImage: `url('../../assets/Header.jpg')` }}>
        <div className="min-h-[650px] md:min-h-[700px] bg-gradient-to-r from-black/60 to-primary/60 pt-20 pb-20 md:pt-36 ">
          <div className="container">
            <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-12 text-white">
              <div className="flex flex-col items-center text-center gap-5 lg:text-left lg:max-w-[450px]">
                <motion.h1
                  variants={FadeUp(0.2)}
                  initial="initial"
                  animate="animate"
                  className="text-5xl lg:text-7xl font-bold">Join Us In Changing Lives</motion.h1>
                <motion.p
                  variants={FadeUp(0.4)}
                  initial="initial"
                  animate="animate">
                  Because together, we can make a real difference. Let's build a brighter future for everyone.
                </motion.p>
                <div className="space-x-4">
                  <motion.a
                    href="/fundraise"
                    variants={FadeUp(0.6)}
                    initial="initial"
                    animate="animate" 
                    className="btn-primary cursor-pointer">Fundraise</motion.a>
                  <motion.a
                    href="/donate"
                    variants={FadeUp(0.8)}
                    initial="initial"
                    animate="animate" 
                    className="btn-outline">Donate</motion.a>
                </div>
              </div>

              {/* Images */}
              <motion.div 
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ type: "spring", stiffness: 100 }}
                className="flex flex-col lg:w-1/2 items-center mt-10 lg:mt-0">
                {/* Top Images */}
                <div className="flex gap-2">
                  <img
                    src="/assets/Video.png"
                    alt="Student"
                    className="w-52 h-56 rounded-tr-[100px] rounded-bl-[100px] object-cover"
                  />
                  <img
                    src="/assets/Header2.jpg"
                    alt="Student"
                    className="w-52 h-56 rounded-tl-[100px] rounded-br-[100px] object-cover border-3 border-violet-900"
                  />
                </div>

                {/* Bottom Images */}
                <div className="flex gap-2 mt-2">
                  <img
                    src="/assets/Header3.jpg"
                    alt="Student"
                    className="w-52 h-56 rounded-br-[100px] rounded-tl-[100px] object-cover border-3 border-violet-900"
                  />
                  <img
                    src="/assets/Header4.jpg"
                    alt="Student"
                    className="w-52 h-56 rounded-bl-[100px] rounded-tr-[100px] object-cover"
                  />
                </div>
              </motion.div>
            </div>
          </div>
        </div>
    </div>
  );
};

export default Hero;