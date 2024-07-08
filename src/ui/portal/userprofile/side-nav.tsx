'use client'
import React, { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { SIDENAV_ITEMS } from './constants';
import { SideNavItem } from './types';
import { IoIosArrowDropleftCircle, IoIosArrowDroprightCircle } from "react-icons/io";
import { handleSignOut } from "@/lib/cognitoActions";

const SideNav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [initialPosition, setInitialPosition] = useState({ x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.currentTarget.classList.contains('use-client')) {
      setDragging(true);
      setInitialPosition({
        x: e.clientX - position.x,
        y: e.clientY - position.y
      });
    }
  };

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (dragging) {
      setPosition({
        x: e.clientX - initialPosition.x,
        y: e.clientY - initialPosition.y
      });
    }
  }, [dragging, initialPosition]);

  const handleMouseUp = () => {
    setDragging(false);
  };

  useEffect(() => {
    if (dragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    } else {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    }
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [dragging, handleMouseMove]);

  const sidebarWidth = isOpen ? 'w-60' : 'w-16';

  return (
    <div
      className={`fixed rounded-lg h-auto z-30 transition-all duration-300 ${sidebarWidth} bg-white/30 backdrop-blur-lg shadow-lg border-r border-zinc-200`}
      style={{
        borderRadius: '10px',
        transform: `translate(${position.x}px, ${position.y}px)`,
        cursor: dragging ? 'grabbing' : 'grab'
      }}
    >
      <div className="use-client" onMouseDown={handleMouseDown}>
        <div className="relative flex flex-col h-full">
          <div className="absolute top-2 right-[-12px] cursor-pointer" onClick={toggleSidebar}>
            {isOpen ? <IoIosArrowDropleftCircle size={24} className="text-white" /> : <IoIosArrowDroprightCircle size={24} className="text-white" />}
          </div>
          <div className="flex flex-col space-y-2 mt-4">
            {SIDENAV_ITEMS.map((item, idx) => (
              <MenuItem key={idx} item={item} isOpen={isOpen} />
            ))}
            <form action={handleSignOut}>
              <button type='submit'>
                Salir
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SideNav;

const MenuItem = ({ item, isOpen }: { item: SideNavItem, isOpen: boolean }) => {
  const pathname = usePathname();

  return (
    <Link
      href={item.path}
      className={`flex flex-row items-center p-2 rounded-lg hover:bg-white/20 ${item.path === pathname ? 'bg-white/20' : ''} text-white font-semibold no-underline`}
    >
      <div className={`flex items-center ${isOpen ? 'space-x-4' : 'justify-center'} w-full`}>
        <span style={{ width: '45px', height: '45px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          {item.icon}
        </span>
        {isOpen && <span className="text-xl ml-2">{item.title}</span>}
      </div>
    </Link>
  );
};
