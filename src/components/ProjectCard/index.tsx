import React from 'react';
import { CodeBracketIcon, EyeIcon } from '@heroicons/react/24/solid';
import Link from 'next/link';
import Image from 'next/image';

interface ProjectCardProps {
  title: string;
  description: string;
  gitUrl: string;
  previewUrl: string;
  imgUrl: string;
  tags: string[];
  tecnologias: string[];
}

export default function ProjectCard({ imgUrl, title, description, gitUrl, previewUrl, tecnologias }: ProjectCardProps) {
  return (
    <div className="flex flex-col items-center rounded-lg p-4 shadow-md">
      <div className="flex-shrink-0 bg-[#282828] w-[300px] h-[200px] md:w-[700px] md:h-[300px] flex justify-center items-center rounded-tl-xl rounded-tr-xl hover:h-64 md:hover:h-96 duration-500">
        <div className='w-[200px] h-[150px] md:w-[380px] md:h-[300px]  py-8 hover:w-[250px] hover:h-[180px] md:hover:w-[450px] md:hover:h-[380px] duration-500  '>
          <Image
            src={imgUrl}
            alt=""
            layout="responsive"
            width={900}
            height={900}
            className="rounded-lg bg-cover"
          />
        </div>
        
      </div>
      <div className="flex flex-col w-[300px] h-[300px] md:w-[700px] md:h-[300px] rounded-bl-xl rounded-br-xl flex-grow bg-[#191919] p-4">
        <h3 className="text-2xl md:text-4xl font-semibold text-white mb-2">{title}</h3>
        <p className="text-gray-400 mb-4 text-sm md:text-md">{description}</p>
        <div className="flex flex-wrap max-w-sm mb-4">
          {tecnologias.map((tech, index) => (
            <span key={index} className="px-2 py-1 mr-2 mt-2 md:mr-4 md:mt-4 bg-gray-800 text-xs md:text-lg text-white rounded-md">{tech}</span>
          ))}
        </div>
        <div className="flex space-x-4">
          <Link href={gitUrl} passHref>
            <div className="flex items-center justify-center w-10 h-10 bg-[#583ebc] rounded-full hover:scale-125  duration-300">
              <CodeBracketIcon className="h-6 w-6 text-white" />
            </div>
          </Link>
          <Link href={previewUrl} passHref>
            <div className="flex items-center justify-center w-10 h-10 bg-[#583ebc] rounded-full hover:scale-125 duration-300">
              <EyeIcon className="h-6 w-6 text-white" />
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
