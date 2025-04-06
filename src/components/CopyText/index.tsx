"use client";

import { useState } from "react";
import { Copy, CheckCircle } from "lucide-react";
import { toast } from "react-toastify";

interface CopyTextProps {
  text: string;
  className?: string;
}

export default function CopyText({ text, className = "" }: CopyTextProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    toast.success("Copied to clipboard!");

    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  return (
    <div
      className={`flex items-center justify-between w-full max-w-md bg-[#1e1e1e]/60 backdrop-blur-sm rounded-lg px-4 py-3 border border-[#2a2a2a] ${className}`}
    >
      <span className="text-gray-300 font-medium">{text}</span>
      <button
        onClick={handleCopy}
        className="p-2 rounded-full hover:bg-[#2a2a2a] transition-colors"
        aria-label="Copy to clipboard"
      >
        {copied ? (
          <CheckCircle className="w-5 h-5 text-green-500" />
        ) : (
          <Copy className="w-5 h-5 text-gray-400 hover:text-white" />
        )}
      </button>
    </div>
  );
}
