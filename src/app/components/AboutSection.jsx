"use client"
import React, { useTransition, useState, useEffect } from 'react'
import Image from 'next/image'
import TabButton from './TabButton';
import AOS from 'aos';
import 'aos/dist/aos.css';

const TAB_DATA = [
    {
        title: "Skills",
        id: "skills",
        content: (
            <div className='flex'>
                 <ul className='list-disc pl-2 mr-12'>
                <li>React.js</li>
                <li>React Native</li>
                <li>TypeScript</li>
                <li>JavaScript</li>
            </ul>
            <ul className='list-disc pl-2'>
                <li>Node.js</li>
                <li>Express</li>
                <li>Tailwind</li>
                <li>Chakra UI</li>
            </ul>
            </div>
           
        ),
    },
    {
        title: "Education",
        id: "education",
        content: (
            <ul className='list-disc pl-2'>
                <li>Analysis and systems development </li>
                <p>- University of Anhanguera</p>
            </ul>
        ),
    },
    {
        title: "Certifications",
        id: "certifications",
        content: (
            <ul className='list-disc pl-2'>
                <li>2023 - Algorithms and Data Structure in Javascript- freeCodeCamp - 300 hours;</li>
                <li>2023 - Legacy Responsive Web Design - freeCodeCamp - 300 hours;</li>
            </ul>
        ),
    },
]

export default function AboutSection() {
    useEffect(() =>{
        AOS.init({
              easing: 'ease-out-quart',
              delay: 0,
              duration: 750
            })
      }, [])

    const [tab, setTab] = useState("skills");
    const [ispending, startTransition] = useTransition();

    const handleTabChange = (id) => {
        startTransition(() => {
            setTab(id);
        });
    };

  return (
    <section id="About" className='text-white h-[900px] flex justify-center items-center'>
        <div className='md:grid md:grid-cols-2 gap-8 items-center py-8 px-4 xl:gap-16 sm:py-16 xl:px-16'>
            <Image data-aos="fade-right" src="/images/AboutImg.jpg" alt="About Me Image" width={500} height={500} priority/>
            <div data-aos="fade-left" className='mt-4 md:mt-0 text-left flex flex-col h-full'>
                <h2 className='text-4xl font-bold text-white mb-4'>
                    About Me
                </h2>
                <p className='text-base lg:text-lg'>
                Graduating in systems analysis and development, passionate about technology and web development. I am currently working as a Freelance Fullstack programmer.
                </p>
                <div className='flex flex-row justify-start mt-8'>
                    <TabButton 
                    selectTab={() => handleTabChange("skills")} active={tab === "skills"}>
                        {" "}
                        Skills{" "}
                    </TabButton>
                    <TabButton 
                    selectTab={() => handleTabChange("education")} active={tab === "education"}>
                        {" "}
                        Education{" "}
                    </TabButton>
                    <TabButton 
                    selectTab={() => handleTabChange("certifications")} active={tab === "certifications"}>
                        {" "}
                        Certifications{" "}
                    </TabButton>
                </div>
                <div className='mt-8'>
                    {TAB_DATA.find((t) => t.id === tab).content}
                </div>
            </div>
        </div>
    </section>
  )
}
