import React from 'react'

export default function ProjectTag({ name, onClick, isSelected }) {

    const buttonStyles = isSelected 
    ? "text-white bg-[#583ebc]" 
    : "text-[#ADB7BE] border-slate-600 hover:border-white";

  return (
    <button 
    className={`${buttonStyles} rounded-full hover:bg-[#583ebc] px-6 py-3 text-xl cursor-pointer duration-300`}
    onClick={() => onClick(name)}
    >
        {name}
    </button>
  )
}
