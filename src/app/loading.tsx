import Image from "next/image";
import React from "react";

const Loading = () => {
  return (
    <div className="h-screen w-full flex flex-col justify-center items-center bg-[#121212] text-white">
      <div className="relative mb-4">
        <div className="absolute inset-0 rounded-full bg-[#583ebc]/30 blur-2xl" />
        <Image
          src="/duck.jpg"
          alt="Loading..."
          width={100}
          height={100}
          priority
          className="relative rounded-full border border-[#583ebc]/40"
        />
      </div>
      <span className="font-semibold tracking-wide text-white/90">Loading...</span>
      <span className="mt-2 text-sm text-white/60">
        Preparing the experience
      </span>
    </div>
  );
};

export default Loading;
