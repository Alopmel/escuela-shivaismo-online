'use client'
import { useEffect, useState } from 'react';
import CircleMenu from '@/ui/portal/circle-menu/circleMenu';
import CircleMenuMobile from '@/ui/portal/circle-menu/circleMenuMobile';

const Dashboard = () => {
  const [isMobile, setIsMobile] = useState<boolean>(false);

  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth <= 768;
      console.log(`Ancho de pantalla: ${window.innerWidth}, es móvil: ${mobile}`);
      setIsMobile(mobile);
    };

    checkMobile(); // Chequea el tamaño de la pantalla al cargar el componente

    const handleResize = () => {
      checkMobile(); // Actualiza el estado al redimensionar la ventana
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize); // Limpia el event listener al desmontar el componente
    };
  }, []);

  return (
    <>
      {isMobile ? <CircleMenuMobile /> : <CircleMenu />}
    </>
  );
};

export default Dashboard;
