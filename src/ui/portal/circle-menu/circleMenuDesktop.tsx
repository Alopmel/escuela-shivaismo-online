import React, { useState, useEffect, useRef } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import PrincipalSphere from './principalSphere';
import SecondSphere from './secondSphere';
import ThirdSphere from './thirdSphere';
import FourthSphere from './fourthSphere';
import FifthSphere from './fifthSphere';
import { motion, AnimatePresence } from 'framer-motion';
import useAuthUser from '@/app/hooks/use-auth-user'; // Importar el hook
import { items, MenuItem } from '@/utils/menuItems'


const CircleMenuDesktop: React.FC = () => {
  const [isClicked, setIsClicked] = useState(false);
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);
  const [selectedSecondItem, setSelectedSecondItem] = useState<MenuItem | null>(null);
  const [selectedThirdItem, setSelectedThirdItem] = useState<MenuItem | null>(null);
  const [selectedFourthItem, setSelectedFourthItem] = useState<MenuItem | null>(null);
  const {user, userId} = useAuthUser(); // Obtener el nombre del usuario logeado
  const audioRef = useRef();
  const router = useRouter();
  const searchParams = useSearchParams();

  const params = new URLSearchParams(searchParams.toString());
  const itemFromParams = params.get('item') || '';
  const [hasInitialized, setHasInitialized] = useState(false);

  // Convertimos el breadcrumb en un array
  const breadcrumbString = params.get('breadcrumb') || '';
  const breadcrumb = breadcrumbString.split(',').filter((item) => item);  // Convertir a array y eliminar valores vacíos
  // console.log('breadcrumb', breadcrumb);
  const firstItemB = breadcrumb[0]
  // console.log('firstItemB', firstItemB)
  const secondtItemB = breadcrumb[1]
  // console.log('secondtItemB', secondtItemB);
  const thirdItemB = breadcrumb[2]
  // console.log('thirdItemB', thirdItemB);

 

   // Función para encontrar el camino del breadcrumb
    const findItemPath = (items: MenuItem[], text: string, path: string[] = []): string[] | null => {
      for (const item of items) {
        if (item.text === text) return [...path, text];
        if (item.subItems) {
          const result = findItemPath(item.subItems, text, [...path, item.text]);
          if (result) return result;
        }
      }
      return null;
    };
    const findItem = (items: MenuItem[], text: string): MenuItem | null => {
      for (const item of items) {
        if (item.text === text) return item;
        if (item.subItems) {
          const result = findItem(item.subItems, text);
          if (result) return result;
        }
      }
      return null;
    };
  
    useEffect(() => {
      if (hasInitialized) return;
    
      if (breadcrumb.length === 1) {
        setIsClicked(true);    
      } else if (breadcrumb.length === 2) {
        setIsClicked(true);
        const [firstItemB, secondItemB] = breadcrumb;
        const secondItem = findItem(items, secondItemB);    
        if (secondItem) {
          handleSecondSphereClick(secondItem);
        }
      } else if (breadcrumb.length === 3) {
        setIsClicked(true);
        const [firstItemB, secondItemB, thirdItemB] = breadcrumb;
        const secondItem = findItem(items, secondItemB);
        setSelectedSecondItem(secondItem);
    
        const thirdItem = findItem(secondItem?.subItems || [], thirdItemB);
        setSelectedThirdItem(thirdItem);
        setSelectedFourthItem(null);
      }
    
      setHasInitialized(true);
    }, [breadcrumb, items, hasInitialized]);
    
  
    const handleNavigation = (item: MenuItem) => {
      const breadcrumbPath = findItemPath(items, item.text);
      if (breadcrumbPath) {
        const params = new URLSearchParams({
          item: item.text,
          breadcrumb: breadcrumbPath.join(','),
        });
        router.push(`/portal/categorias?${params.toString()}`);
      }
    };
  
    const handlePrincipalSphereClick = () => {
      if (isClicked) {
        setSelectedItem(null);
        setSelectedSecondItem(null);
        setSelectedThirdItem(null);
        setSelectedFourthItem(null);
        setIsClicked(false);
      } else {
        setSelectedItem(items[0]);
        setIsClicked(true);
      }
    };
  
    const handleSecondSphereClick = (item: MenuItem) => {
      if (item.subItems) {
        if (selectedSecondItem?.text === item.text) {
          setSelectedSecondItem(null);
          setSelectedThirdItem(null);
          setSelectedFourthItem(null);
        } else {
          setSelectedSecondItem(item);
          setSelectedThirdItem(null);
          setSelectedFourthItem(null);
        }
      } else {
        handleNavigation(item);
      }
    };
  
    const handleThirdSphereClick = (item: MenuItem) => {
      if (item.subItems) {
        if (selectedThirdItem?.text === item.text) {
          setSelectedThirdItem(null);
          setSelectedFourthItem(null);
        } else {
          setSelectedThirdItem(item);
          setSelectedFourthItem(null);
        }
      } else {
        handleNavigation(item);
      }
    };
  
    const handleFourthSphereClick = (item: MenuItem) => {
      if (item.subItems) {
        if (selectedFourthItem?.text === item.text) {
          // No se hace nada si el ítem ya está seleccionado
        } else {
          setSelectedFourthItem(item);
        }
      } else {
        handleNavigation(item);
      }
    };
  
    return (
    
        <AnimatePresence>
        <PrincipalSphere onClick={handlePrincipalSphereClick} isClicked={isClicked} />
          {isClicked && (
            items.map((item) => (
              <motion.div
                key={item.text}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                style={{
                  top: item.position.desktop.top,
                  left: item.position.desktop.left,
                }}
              >
                <SecondSphere
                  text={item.text}
                  position={item.position.desktop}
                  onClick={() => handleSecondSphereClick(item)}
                />
              </motion.div>
            ))
          )}
          {selectedSecondItem && selectedSecondItem.subItems && (
            selectedSecondItem.subItems.map((subItem) => (
              <motion.div
                key={subItem.text}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                style={{
                  top: subItem.position.desktop.top,
                  left: subItem.position.desktop.left,
                }}
              >
                <ThirdSphere
                  text={subItem.text}
                  position={subItem.position.desktop}
                  onClick={() => handleThirdSphereClick(subItem)}
                />
              </motion.div>
            ))
          )}
          {selectedThirdItem && selectedThirdItem.subItems && (
            selectedThirdItem.subItems.map((subItem) => (
              <motion.div
                key={subItem.text}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                style={{
                  top: subItem.position.desktop.top,
                  left: subItem.position.desktop.left,
                }}
              >
                <FourthSphere
                  text={subItem.text}
                  position={subItem.position.desktop}
                  onClick={() => handleFourthSphereClick(subItem)}
                />
              </motion.div>
            ))
          )}
          {selectedFourthItem && selectedFourthItem.subItems && (
            selectedFourthItem.subItems.map((subItem) => (
              <motion.div
                key={subItem.text}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                style={{
                  top: subItem.position.desktop.top,
                  left: subItem.position.desktop.left,
                }}
              >
                <FifthSphere
                  text={subItem.text}
                  position={subItem.position.desktop}
                  onClick={() => handleFourthSphereClick(subItem)}
                />
              </motion.div>
            ))
          )}
        </AnimatePresence>
    );
  };
  
  export default CircleMenuDesktop;