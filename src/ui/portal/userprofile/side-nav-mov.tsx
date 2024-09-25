import React, { useState } from 'react';
import { SIDENAV_ITEMS } from './constants';
import { SideNavItem } from './types';
import SideSphere from './sideSphere';
import SideSubSphere from './sideSubSphere';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { handleSignOut } from "@/lib/cognitoActions";
import styles from './sideNavbarMobile.module.css'
import { unicaOne } from '@/app/fonts';
const SideNavbarMobile = () => {
  const [isClicked, setIsClicked] = useState(false);
  const [selectedItem, setSelectedItem] = useState<SideNavItem | null>(null);

  const handleClick = () => {
    if (isClicked) {
      setSelectedItem(null);
      setIsClicked(false);
    } else {
      setSelectedItem(SIDENAV_ITEMS[0]);
      setIsClicked(true);
    }
  };

  return (
    <>
      {/* Overlay que aparece sobre los elementos de fondo */}
      {isClicked && (
        <motion.div
          className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-10 .no-select"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
        />
      )}

      <nav className="absolute left-[177px] top-[20px] flex justify-between bg-transparent z-20 no-outline">
        {/* SideSphere para abrir el menú */}
        <SideSphere onClick={handleClick} />
        {/* Renderizar los sub-items si se hizo click */}
        {isClicked && selectedItem && (
          SIDENAV_ITEMS.map((item) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, ease: 'easeInOut' }}
              style={{
                position: 'fixed', // Cambiar de absolute a fixed
                // top: item.position?.top,
                // left: item.position?.left,
              }}
            >
              {/* Usar Link de Next.js */}
              <div className={`p-4 text-[1rem] ${styles.textContent}`}>
                <Link href={item.path}>
                    <SideSubSphere
                      text={item.title}
                      position={item.position}
                    />
                </Link>
              </div>  
            </motion.div>
          ))
        )}

        {/* Renderizar el botón 'Salir' */}
        {isClicked && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
            style={{
              position: 'fixed', // Cambiar de absolute a fixed
            //   top: 'calc(50% + 396px)',
            //   left: 'calc(50% + 80px)',
            }}
          >
          <div className={`p-4 text-[1rem] ${styles.textContent}`}>
            <form action={handleSignOut} className="mr-2">
              <button
                type="submit"
                className= {unicaOne.className}
              >
                <SideSubSphere
                  text={'Salir'}
                  position={{ top: 'calc(50% + 550px)', left: 'calc(50% - 62px)' }}
                />
              </button>
            </form>
          </div>
          </motion.div>
        )}
      </nav>
    </>
  );
};

export default SideNavbarMobile;
