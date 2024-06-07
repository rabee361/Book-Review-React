import { useState } from 'react'
import cover from '../assets/cover.png'
import { Link } from "react-router-dom";
import { motion } from 'framer-motion';

export default () => {
    const pageVariants = {
        initial: {
          x: "-5%", // Start from the left outside the viewport
          opacity: 0,
        },
        in: {
          x: "0%", // End at the original position
          opacity: 1,
          transition: {
            duration: 1, // Duration of the fade-in animation
          },
        },
      };
      
    const pageVariants2 = {
        initial2: {
        x: "5%", // Start from the left outside the viewport
        opacity: 0,
        },
        in2: {
        x: "0%", // End at the original position
        opacity: 1,
        transition: {
            duration: 1, // Duration of the fade-in animation
        },
        },
    };




    return (
        <section className=" pt-52 text-amber-100 dark:text-gray-200 mx-auto max-w-screen-xl pb-4 px-4 sm:px-8">
            <div className="text-center space-y-4">
                <motion.h1 variants={pageVariants} initial="initial" animate="in"  className="font-bold text-3xl lg:text-5xl">
                    Book Recommendations 
                </motion.h1>
                <motion.p variants={pageVariants2} initial="initial2" animate="in2" className="max-w-xl mx-auto leading-relaxed text-wrap text">
                    It is a long c fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum
                </motion.p>
            </div>
            <motion.div variants={pageVariants2} initial="initial2" animate="in2" className="mt-12 justify-center items-center space-y-3 sm:space-x-6 sm:space-y-0 sm:flex">
                <Link to="/library">
                    <a href="javascript:void(0)" className="px-10 py-3.5 w-full text-center border rounded-md duration-300 hover:bg-amber-500 dark:hover:bg-gray-500 hover:shadow block sm:w-auto">
                        Check Our Library
                    </a>
                </Link>
            </motion.div>
        </section>
    
    )
}