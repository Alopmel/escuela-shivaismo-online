'use client'
import { useEffect, useState } from 'react';
import CircleMenu from '@/ui/portal/circle-menu/circleMenu';
import CircleMenuMobile from '@/ui/portal/circle-menu/circleMenuMobile';

const Dashboard = () => {
  const [ isDesktop, setIsDesktop ] = useState<boolean>(false);

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
  
  //when user resize the window
  if (typeof window !== 'undefined'){
    window.addEventListener('resize', checkWindowSize)
  }

  return (
    <>
      {isDesktop ? (<CircleMenu />): (<CircleMenuMobile />)}
    </>
  );
};

export default Dashboard;
