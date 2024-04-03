import React from 'react';
import { CodeBracketIcon, EyeIcon } from '@heroicons/react/24/solid';
import Link from 'next/link';

export default function ProjectCard({ imgUrl, title, description, gitUrl, previewUrl, tecnologias }) {
  return (
    <div>
      <div 
      className='h-72 hover:h-96 duration-500 rounded-t-xl relative group' 
      style={{ background: `url(${imgUrl})`, backgroundSize: "cover" }}
      >
        <div className='overlay items-center justify-center absolute top-0 left-0 w-full h-full bg-[#181818] bg-opacity-0 hidden group-hover:flex hover:bg-opacity-50 duration-700 '>
            <Link href={gitUrl} target='_blank' className='h-14 w-14 mr-4 border-2 relative rounded-full border-[#583ebc] hover:border-white group/link'>
                <CodeBracketIcon  className='h-10 w-10 text-[#583ebc] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 cursor-pointer group-hover/link:text-white duration-500'/>
            </Link>
            <Link href={previewUrl} target='_blank' className='h-14 w-14 border-2 relative rounded-full border-[#583ebc] hover:border-white group/link'>
                <EyeIcon  className='h-10 w-10 text-[#583ebc] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 cursor-pointer group-hover/link:text-white duration-500'/>
            </Link>
                
        </div>       
      </div>
      <div className='text-white h-72 rounded-b-xl mt-3 bg-[#181818] p-4'>
        <h5 className='text-xl font-semibold mb-2'>{title}</h5>
        <p className='text-[#ADB7BE] overflow-y-auto max-h-40'>{description}</p> {/* Adicionando overflow-y-auto e max-h-36 */}
        <div className='flex flex-wrap items max-w-[400px]'>
          {tecnologias && tecnologias.map((tecnologia, index) => (
          <p key={index} className='bg-[#242424] rounded-3xl flex flex-row items-center justify-center min-w-28 mr-2 mt-2'>{tecnologia}</p>
        ))}
        </div>       
      </div>
    </div>
  );
}
