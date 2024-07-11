// import HeaderMobile from "@/ui/portal/userprofile/header-mobile"
'use client'
import { useEffect, useState } from "react";
import SideNav from "@/ui/portal/userprofile/side-nav";
export default function Layout({ children }: { children: React.ReactNode }) {
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
  
  return (
    <div className="flex">
      {isDesktop ? (<SideNav />): ('')}
      <main className="flex-1">
        {/* <HeaderMobile /> */}
        {children}  
      </main>
    </div>
  );
}