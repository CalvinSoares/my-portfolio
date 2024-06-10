"use client"
import { color } from 'framer-motion';
import Image from 'next/image';
import React, { useState } from 'react';
import { FaClipboard, FaCheck } from 'react-icons/fa';
import { toast } from 'react-toastify';

const CopyText = ({ text }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      toast.success('Contato Copiado!!!', {
        position: 'top-right',
        autoClose: 3000,
        theme: 'dark',
        progressStyle: {
          color: 'purple'
        }
      });
      setTimeout(() => setCopied(false), 3000);
    });
  };

  return (
    <div className="flex items-center">
      <p className="text-white mr-2">{text}</p>
      <button onClick={handleCopy} className="flex items-center justify-center p-2 rounded-full bg-gray-800 hover:bg-gray-700">
        {copied 
        ? <Image 
          src="/check.svg"
          alt=''
          width={20}
          height={20}
        /> 
        : <Image 
          src="/copy.svg"
          alt=''
          width={20}
          height={20}
        />
        }
      </button>
    </div>
  );
};

export default CopyText;
