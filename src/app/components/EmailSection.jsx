"use client"
import React, { useState } from 'react'
import TiktokIcon from "../../../public/images/tiktok.svg"
import GithubIcon from "../../../public/images/github.svg"
import LinkedinIcon from "../../../public/images/linkedin.svg"
import Link from 'next/link';
import Image from 'next/image'


export default function EmailSection() {
    const [emailSubmitted, setEmailSubmitted] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = {
            email: e.target.email.value,
            subject: e.target.subject.value,
            message: e.target.message.value,
        }
        const JSONdata = JSON.stringify(data);
        const endpoint = "/api/send";
        
        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSONdata,
        };

        const response = await fetch(endpoint, options);
        

        if (response.status === 200) {
            console.log('Message sent.');
            setEmailSubmitted(true);
        }
    }

  return (
    <section id="Contact" className='grid md:grid-cols-2 h-[900px] items-center justify-center my-12 md:m-12 py-24 gap-6'>
        <div>
            <h5 className='text-xl font-bold text-white my-2'>Let's Connect</h5>
            <p className='text-[#ADB7BE] b-4 max-w-md'>
                {" "}
                I'm currently looking for new opportunities, my inbox is always open. Whether you have a question or just wanto to say hi, I'll try my best to get back to you!
            </p>
            <div className='sociais flex flex-row gap-2 mt-4'>
                <Link target='_blank' href="https://github.com/CalvinSoares">
                    <Image src={GithubIcon}  alt="Github Icon" className='hover:bg-purple-500 hover:translate-y-2 hover:rounded-full transition-all ease-in-out duration-500'/>
                </Link>
                <Link target='_blank' href="https://www.linkedin.com/in/calvinsoares/">
                    <Image src={LinkedinIcon} alt="Linkedin Icon" className='hover:bg-purple-500 hover:translate-y-2 hover:rounded-md transition-all ease-in-out duration-500'/>
                </Link>
                <Link target='_blank' href="https://www.tiktok.com/@pato_programador?lang=pt-BR">
                    <Image className='w-12 h-12 text-white hover:bg-purple-500 hover:translate-y-2 hover:rounded-md transition-all ease-in-out duration-500' src={TiktokIcon} alt="Tiktok Icon" />
                </Link>
            </div>
        </div>
        <div>
        {emailSubmitted ? (
                <p className='text-green-500 text-sm mt-2'>
                    Email sent successfully!
                </p>
            ) : (
            <form className='flex flex-col' onSubmit={handleSubmit}>
                <div className='mb-6'>
                    <label htmlFor="email" className='text-white block text-sm mb-2 font-medium'>
                        Your email
                    </label>
                    <input 
                        name='email'
                        type="email" 
                        id="email"
                        required 
                        className='bg-[#18191E] border border-[#33353F] placeholder-[#9CA2A9] text-gray-100 text-sm rounded-lg block w-full p-2.5'
                        placeholder='email@google.com' 
                    />
                </div>
                <div className='mb-6'>
                    <label htmlFor="subject" className='text-white block text-sm mb-2 font-medium'>
                        Subject
                    </label>
                    <input 
                        name='subject'
                        type="text" 
                        id="subject"
                        required 
                        className='bg-[#18191E] border border-[#33353F] placeholder-[#9CA2A9] text-gray-100 text-sm rounded-lg block w-full p-2.5'
                        placeholder='Just saying hi' 
                    />
                </div>
                <div className='mb-6'>
                    <label 
                    htmlFor="message"
                    className='text-white block text-sm mb-2 font-medium'
                    >
                        Message
                    </label>
                    <textarea 
                        name='message'
                        id="message"
                        className='bg-[#18191E] border border-[#33353F] placeholder-[#9CA2A9] text-gray-100 text-sm rounded-lg block w-full p-2.5'
                        placeholder='Hi, I would like to know more about your project'>

                    </textarea>
                </div>
                <button
                type='submit'
                className='bg-purple-500 hover:bg-purple-600 text-white font-medium py-2.5 px-5 rounded-lg w-full '
                >
                    Send Message
                </button>                             
            </form>
            )} 
        </div>
    </section>
  )
}
