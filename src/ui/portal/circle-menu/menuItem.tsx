'use client'
import { useState } from 'react';
import styles from './circleMenu.module.css';

interface MenuItemProps {
  text: string;
  position: {
    top: string;
    left: string;
  };
  subItems?: MenuItemProps[];
}

interface MenuItemComponentProps {
  item: MenuItemProps;
  onItemClick: (item: MenuItemProps) => void;
}

const MenuItem: React.FC<MenuItemComponentProps> = ({ item, onItemClick }) => {
  const handleItemClick = () => {
    onItemClick(item); // Llamar al callback onItemClick con el item correspondiente
  };

  return (
    <div
      className={`${styles.menuItem} absolute rounded-full bg-green-500 flex items-center justify-center text-white cursor-pointer transition-transform duration-300`}
      style={item.position}
      onClick={(e) => { e.stopPropagation(); handleItemClick(); }}
    >
      {item.text}
    </div>
  );
};

export default MenuItem;
