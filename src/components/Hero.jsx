import { useState } from 'react'
import cover from '../assets/cover.png'
import { Link } from "react-router-dom";

export default () => {

    return (
        <section className=" pt-52 text-amber-100 dark:text-gray-200 mx-auto max-w-screen-xl pb-4 px-4 sm:px-8">
            <div className="text-center space-y-4">
                <h1 className="font-bold text-4xl md:text-5xl">
                    Book Recommendations 
                </h1>
                <p className="max-w-xl mx-auto leading-relaxed">
                    It is a long c fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum
                </p>
            </div>
            <div className="mt-12 justify-center items-center space-y-3 sm:space-x-6 sm:space-y-0 sm:flex">
                {/* <a href="javascript:void(0)" className="px-10 py-3.5 w-full bg-yellow-600 hover:bg-yellow-500 transition-all text-white text-center rounded-md shadow-md block sm:w-auto">
                    Get started
                </a> */}
                <Link to="/library">
                    <a href="javascript:void(0)" className="px-10 py-3.5 w-full text-center border rounded-md duration-300 hover:bg-amber-800 dark:hover:bg-gray-500 hover:shadow block sm:w-auto">
                        Check Our Library
                    </a>
                </Link>
            </div>
        </section>
    
    )
}