'use client'
import { useEffect, useState } from 'react';
import CircleMenu from '@/ui/portal/circle-menu/circleMenu';
import CircleMenuMobile from '@/ui/portal/circle-menu/circleMenuMobile';

const Dashboard = () => {
  const [ isDesktop, setIsDesktop ] = useState<boolean>(false);
  const [isMobile, setIsMobile] = useState<boolean>(false);

  const checkWindowSize = () => {
    let windowWidth = 0;
    if (typeof window !== 'undefined') {
      windowWidth = window.innerWidth;
    }
    if (windowWidth >= 1024) { 
      setIsDesktop(true)
      console.log('Destop es true ' + isDesktop)
      console.log('windowWidth ' + windowWidth)
    } else {
      setIsDesktop(false)
      console.log('Destop es false ' + isDesktop)
      console.log('windowWidth ' + windowWidth)
    }
  }
  // logic when user first load the page
    useEffect(() => {
      checkWindowSize();
    }, [isDesktop])

  // useEffect(() => {
  //   const checkMobile = () => {
  //     const mobile = window.innerWidth <= 768;
  //     console.log(`Ancho de pantalla: ${window.innerWidth}, es móvil: ${mobile}`);
  //     setIsMobile(mobile);
  //   };

  //   checkMobile(); // Chequea el tamaño de la pantalla al cargar el componente

  //   const handleResize = () => {
  //     checkMobile(); // Actualiza el estado al redimensionar la ventana
  //   };

  //   window.addEventListener('resize', handleResize);

  //   return () => {
  //     window.removeEventListener('resize', handleResize); // Limpia el event listener al desmontar el componente
  //   };
  // }, []);

  return (
    <>
      {isDesktop ? (<CircleMenu />): (<CircleMenuMobile />)}
    </>
  );
};

export default Dashboard;
