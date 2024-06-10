"use client";
import React from 'react';
import Link from 'next/link';
import { XMarkIcon } from '@heroicons/react/24/solid';
import Image from 'next/image';

export default function MenuOverlay({ isOpen, onClose }) {
    return (
        <div className={`fixed inset-0 z-20 bg-black bg-opacity-50 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`} onClick={onClose}>
            <div className={`absolute top-0 left-0 right-0 bg-[#242424] p-8 transition-transform duration-300 ${isOpen ? '-translate-y-0' : '-translate-y-full'}`}>
                <div className='flex flex-col items-center space-y-6'>
                  <div className='flex justify-around items-center w-screen'>
                      <Image 
                        src="/images/devImg.jpg"
                        alt="Logo"
                        width={50}
                        height={50}
                        className='self-start rounded-full'
                      />
                     <button 
                          onClick={onClose} 
                          className='self-end mb-4 p-2 border rounded border-slate-200 text-slate-200 hover:text-white hover:bg-[#583ebc] hover:scale-110 duration-300'>
                          <XMarkIcon className="h-5 w-5" />
                      </button>
                  </div>                                   
                    <Link className='items-center flex justify-center w-full h-12 rounded-3xl hover:bg-[#583ebc] duration-300 cursor-pointer' href="/" onClick={onClose}>
                        Home
                    </Link>
                    <Link className='items-center flex justify-center w-full h-12 rounded-3xl hover:bg-[#583ebc] duration-300 cursor-pointer' href="/About" onClick={onClose}>
                        About
                    </Link>
                    <Link className='items-center flex justify-center w-full h-12 rounded-3xl hover:bg-[#583ebc] duration-300 cursor-pointer' href="/projects" onClick={onClose}>
                        Project
                    </Link>
                    <Link className='items-center flex justify-center w-full h-12 rounded-3xl hover:bg-[#583ebc] duration-300 cursor-pointer' href="/Contact" onClick={onClose}>
                        Contact
                    </Link>
                </div>
            </div>
        </div>
    );
}
