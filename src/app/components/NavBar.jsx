"use client"
import React, { useState } from 'react'
import NavLink from './NavLink'
import Image from 'next/image'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/solid'
import MenuOverlay from './MenuOverlay'
import devImg from '../../../public/images/devImg.jpg'

const navLinks = [
    {
        title: "Home",
        path: "#Home",
    },
    {
        title: "About",
        path: "#About",
    },
    {
        title: "Projects",
        path: "#Projects",
    },
    {
        title: "Contact",
        path: "#Contact",
    },
]

export default function NavBar() {
    const [navbarOpen, setNavbarOpen] = useState(false);

  return (
    <nav className='fixed top-0 left-0 right-0 z-10 lg:mt-10 lg:mx-6 bg-[#242424] lg:rounded-full'>
        <div className='flex container flex-wrap items-center justify-around m-auto py-4 px-2'>
            <div className='mobile-menu block md:hidden'>
                {!navbarOpen ? (
                        <button 
                        onClick={() => setNavbarOpen(true)} 
                        className='flex items-center px-3 py-2 border rounded border-slate-200 text-slate-200 hover:text-white hover:border-white'>
                            <Bars3Icon className="h-5 w-5" />
                        </button>
                    ) : (
                        <button 
                        onClick={() => setNavbarOpen(false)} 
                        className='flex items-center px-3 py-2 border rounded border-slate-200 text-slate-200 hover:text-white hover:border-white'>
                            <XMarkIcon className="h-5 w-5" />
                        </button>
                    )
                }
            </div>
            <div className='menu hidden md:block md:w-auto' id='navbar'>
                <ul className='flex items-center md:p-0 md:flex-row md:space-x-8 '>
                            <li className='items-center flex justify-center w-32 h-12 rounded-3xl hover:bg-[#583ebc] duration-300 cursor-pointer  '>
                                <NavLink href="#Home" title="Home" />
                            </li>
                            <li className='items-center flex justify-center w-32 h-12 rounded-3xl hover:bg-[#583ebc] duration-300 cursor-pointer'>
                                <NavLink href="#About" title="About"/>
                            </li>  
                            
                            <div>
                                <Image 
                                src={devImg}
                                alt='hero image'
                                className='rounded-full w-[50px] h-[50px] mx-24'
                                priority
                            />
                            </div>
                            
                            <li className='items-center flex justify-center w-32 h-12 rounded-3xl hover:bg-[#583ebc] duration-300 cursor-pointer'>
                                <NavLink href="#Projects" title="Projects" />
                            </li>  
                            <li className='items-center flex justify-center w-32 h-12 rounded-3xl hover:bg-[#583ebc] duration-300 cursor-pointer' >
                                <NavLink href="#Contact" title="Contact" />
                            </li>                 
                </ul>
                
            </div>
        </div>
        {navbarOpen ? <MenuOverlay links={navLinks}/> : null}
    </nav>
  )
}
