'use client'
import { useEffect, useState, useCallback } from 'react';
import CircleMenu from '@/ui/portal/circle-menu/circleMenu';
import CircleMenuMobile from '@/ui/portal/circle-menu/circleMenuMobile';
import Search from '@/ui/portal/search/search';
const Dashboard = () => {
  const [isDesktop, setIsDesktop] = useState<boolean>(false);

  const checkWindowSize = useCallback(() => {
    let windowWidth = 0;
    if (typeof window !== 'undefined') {
      windowWidth = window.innerWidth;
    }
    if (windowWidth >= 1024) {
      setIsDesktop(true);
    } else {
      setIsDesktop(false);
    }
  }, []);

  useEffect(() => {
    checkWindowSize();
    window.addEventListener('resize', checkWindowSize);
    return () => {
      window.removeEventListener('resize', checkWindowSize);
    };
  }, [checkWindowSize]);

  return (
    <>
      <Search /> {/* Agrega el componente de búsqueda */}
      {isDesktop ? (<CircleMenu />) : (<CircleMenuMobile />)}
    </>
  );
};

export default Dashboard;
