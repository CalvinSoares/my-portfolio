"use client";
import React,{ useEffect } from 'react'
import Image from 'next/image'
import { TypeAnimation } from 'react-type-animation'
import AOS from 'aos';
import 'aos/dist/aos.css';


export default function HeroSection() {
    useEffect(() =>{
      AOS.init({
            easing: 'ease-out-quart',
            delay: 0,
            duration: 750
          })
    }, [])

    const downloadPDF = () => {
        
      const pdfUrl = '/images/CalvinSoares.pdf';

      const link = document.createElement('a');

      link.href = pdfUrl;

      link.download = 'calvinsoares.pdf';

      document.body.appendChild(link);

      link.click();

      document.body.removeChild(link);

      };

  return (
    <section id='Home' className='h-[500px] flex flex-col justify-center'>
        <div  className='grid grid-cols-1 sm:grid-cols-12'>
            <div 
              data-aos="fade-up"
              className='col-span-7 place-self-center text-center sm:text-left'>
                  <h1 className='text-white mb-4 text-4xl sm:text-5xl lg:text-6xl font-extrabold'>
                    <span className='text-transparent pb-8 bg-clip-text bg-[#583ebc]'>Hello, I&apos;m{" "}</span> 
                    <br />
                    <TypeAnimation
                      sequence={[
                          'Calvin Soares',
                          3000, 
                          'Web Developer',
                          3000,
                          'Mobile Developer',
                          3000,
                      ]}
                      wrapper="span"
                      speed={50}
                      repeat={Infinity}
                      />
                  </h1>
                  <p className='text-[#ADB7BE] text-base sm:text-lg mb-6 lg:text-xl'>
                      Welcome to my personal portfolio, feel free to contact me.
                  </p>
                  
                  <div>                  
                      <button onClick={downloadPDF} className=' bg-[#583ebc] rounded-full text-white mt-3 w-36 h-12 flex items-center justify-center hover:text-[#583ebc] hover:bg-gray-300 font-bold duration-200 hover:scale-110'>
                              Donwload CV
                      </button>
                  </div>
              </div>
              <div
              className='col-span-5 place-self-center mt-4 lg:mt-0'>
                  <div data-aos="fade-up" className=' w-[250px] h-[250px] lg:w-[400px] lg:h-[400px] relative'>
                    <Image 
                      
                      src="/images/devImg.jpg"
                      alt='hero image'
                      width={300}
                      height={300}
                      className='rounded-full w-[150px] h-[150px] lg:w-[300px] lg:h-[300px] absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2'
                      priority
                  /> 
                  </div>  
              </div>           
        </div>     
    </section>
  )
}
