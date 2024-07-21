import React, { useEffect } from 'react'
import { useState } from 'react'
import logo from '../assets/logo.svg'
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';


function NavBar() {

    const [dark, setDark] = useState(() => {
        const saved = localStorage.getItem("darkMode");
        console.log(saved)
        const initialValue = JSON.parse(saved);
        return initialValue || false;
    })
    
    useEffect(() => {
        localStorage.setItem("darkMode",JSON.stringify(dark))
        document.body.classList.toggle("dark", dark);
    },[dark])

    const darkModeHandler = () => {
        setDark(!dark);
        document.body.classList.toggle("dark");
    }

  
  return (
    <>
        <div  className="fixed z-50 navbar h-[10px] text-white dark:text-slate-300 transition-all ease-linear duration-100 nav-blur-start">
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </div>
                </div>
                <Link to="/">
                    <a className="btn btn-ghost text-xl">GoodReads</a>
                </Link>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                <li><a>Home</a></li>
                <li><a>Browse</a></li>
                <li><a>item</a></li>
                </ul>
                <input type="text" placeholder='      search books' className="bg-white rounded-md pl-10 text-black" />
            </div>
            <div className="navbar-end">
                <label className="swap swap-rotate">
                    {/* this hidden checkbox controls the state */}
                    <input type="checkbox" className="theme-controller" value="synthwave" checked={dark} onClick={()=> darkModeHandler()} />
                    {/* sun icon */}
                    <svg className="swap-off fill-current w-10 h-10" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z"/></svg>
                    {/* moon icon */}
                    <svg className="swap-on fill-current w-10 h-10" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z"/></svg>
                </label>
                <Link to="/login">
                    <a className="hidden sm:btn sm:bg-amber-600 sm:hover:bg-amber-300 sm:text-black sm:dark:bg-gray-200 sm:dark:hover:bg-gray-500 sm:ml-4 sm:mr-4 sm:rounded-2xl">Log in</a>
                </Link>
            </div>
        </div>
    </>
  )
}

export default NavBar