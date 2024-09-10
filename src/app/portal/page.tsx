// src/ui/portal/Dashboard.tsx
'use client'
import { useEffect, useState, useCallback } from 'react';
// import CircleMenu from '@/ui/portal/circle-menu/circleMenu';
import CircleMenuMobile from '@/ui/portal/circle-menu/circleMenuMobile';
import Search from '@/ui/portal/search/search';
import CircleMenuDesktop from '@/ui/portal/circle-menu/circleMenuDesktop';

const Dashboard = () => {
  const [isDesktop, setIsDesktop] = useState<boolean>(false);

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
      {/* {isDesktop ? (<CircleMenu />) : (<CircleMenuMobile />)} */}
      {isDesktop ? (<CircleMenuDesktop />) : (<CircleMenuMobile />)}
      {/* <CircleMenuDesktop /> */}
    </div>
  );
};

export default Dashboard;
