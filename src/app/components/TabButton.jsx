import React from 'react'

export default function TabButton({ active, selectTab, children }) {

    const buttonClasses = active ? 'text-[#ADB7BE] border-b border-purple-500' : 'text-[#ADB7BE]'

  return (
    <button onClick={selectTab}>
        <p className={`mr-3 font-semibold hover:text-white ${buttonClasses}`}>
            {children}
        </p>
    </button>
  )
}
