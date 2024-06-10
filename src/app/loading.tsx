import Image from 'next/image';
import React from 'react';

const Loading = () => {
  return (
    <div className="h-screen w-full flex flex-col justify-center items-center bg-[#FDE1CB]">
        <div>
            <Image 
                src="/duck.jpg"
                alt="Loading..."
                width={100}
                height={100}
                priority
            />
                
        </div>
        <span className='text-black font-semibold'>Loading...</span>   
    </div>
  );
};

export default Loading;
