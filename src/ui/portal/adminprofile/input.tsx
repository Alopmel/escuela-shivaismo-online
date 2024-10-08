import React from "react"
import { roboto } from "@/app/fonts";
import styles from './AdminDashboard.module.css';
import { IoPencil } from "react-icons/io5";
import { FaFolderPlus } from "react-icons/fa6";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: 'folder-plus' | 'pencil';
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, icon, ...props }, ref) => {
    return (
      <div className={`${styles.inputWrapper} ${icon ? styles.withIcon : ''}`}>
        <div className={styles.inputContainer}>
          <input
            type={type}
            className={`${styles.input} ${roboto.className} ${className || ''}`}
            ref={ref}
            {...props}
          />
        </div>
        {icon && (
          <div className={styles.inputIcon}>
            {icon === 'folder-plus' && <FaFolderPlus />}
            {icon === 'pencil' && <IoPencil />}
          </div>
        )}
      </div>
    )
  }
)
Input.displayName = "Input"

export { Input }