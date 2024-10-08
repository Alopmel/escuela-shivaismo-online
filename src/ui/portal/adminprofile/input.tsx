import React from "react"
import { roboto } from "@/app/fonts";
import { IoPencil } from "react-icons/io5";
import { FaFolderPlus } from "react-icons/fa6";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: 'folder-plus' | 'pencil';
  label?: string;
}

export const Input: React.FC<InputProps> = ({ className, type, icon, label, ...props }) => {
  return (
    <div className="mb-4">
      {label && <label className="block text-white mb-2">{label}</label>}
      <div className="relative">
        <input
          type={type}
          className={`w-full h-14 bg-white bg-opacity-20 border-none rounded-lg px-4 py-2 text-white text-base box-border ${roboto.className} ${className || ''}`}
          {...props}
        />
        {icon && (
          <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white">
            {icon === 'folder-plus' && <FaFolderPlus />}
            {icon === 'pencil' && <IoPencil />}
          </span>
        )}
      </div>
    </div>
  )
}