// src/ui/portal/Dashboard.tsx
'use client'
import { useEffect, useState, useCallback, useContext } from 'react';
import CircleMenuMobile from '@/ui/portal/circle-menu/circleMenuMobile';
import Search from '@/ui/portal/search/search';
import CircleMenuDesktop from '@/ui/portal/circle-menu/circleMenuDesktop';
import { useUser } from '@/app/context/UserContext'; // Importar el contexto del usuario

const Dashboard = () => {
  const [isDesktop, setIsDesktop] = useState<boolean>(false);
  const { email } = useUser(); // Obtener el email del contexto del usuario
  //console.log("Email del usuario:", email);

  const checkWindowSize = useCallback(() => {
    let windowWidth = 0;
    if (typeof window !== 'undefined') {
      windowWidth = window.innerWidth;
    }
    setIsDesktop(windowWidth >= 1024);
  }, []);

  useEffect(() => {
    checkWindowSize();
    window.addEventListener('resize', checkWindowSize);
    return () => {
      window.removeEventListener('resize', checkWindowSize);
    };
  }, [checkWindowSize]);

  return (
    <div className="relative flex h-screen justify-center items-center">
      <Search /> {/* Search is fixed to the top right */}
      {isDesktop ? (<CircleMenuDesktop />) : (<CircleMenuMobile />)}
    </div>
  );
};

export default Dashboard;