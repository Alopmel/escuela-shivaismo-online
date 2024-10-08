import React, { useState } from "react"
import { roboto } from "@/app/fonts";
import styles from './AdminDashboard.module.css';
import { IoCaretDownCircleSharp, IoCaretUpCircleSharp } from "react-icons/io5";

export interface SelectProps
  extends React.SelectHTMLAttributes<HTMLSelectElement> {
  options: string[];
  placeholder?: string;
}

const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, options, placeholder, ...props }, ref) => {
    const [isOpen, setIsOpen] = useState(false);

    const handleSelectClick = () => {
      setIsOpen(!isOpen);
    };

    return (
      <div className={styles.selectContainer}>
        <select
          className={`${styles.select} ${roboto.className} ${className || ''}`}
          ref={ref}
          onClick={handleSelectClick}
          onBlur={() => setIsOpen(false)}
          {...props}
        >
          {placeholder && <option value="" disabled>{placeholder}</option>}
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        <div className={styles.selectArrow}>
          {isOpen ? (
            <IoCaretUpCircleSharp className={`${styles.selectArrowIcon} ${styles.iconTransition}`} />
          ) : (
            <IoCaretDownCircleSharp className={`${styles.selectArrowIcon} ${styles.iconTransition}`} />
          )}
        </div>
      </div>
    )
  }
)
Select.displayName = "Select"

export { Select }