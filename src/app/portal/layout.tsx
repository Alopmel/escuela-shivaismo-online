'use client'
import { useEffect, useState, useCallback } from "react";
import SideNav from "@/ui/portal/userprofile/side-nav";
import Navbar from "@/ui/portal/navbar/navbar";

export default function Layout({ children }: { children: React.ReactNode }) {
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
    <div className="flex">
      {isDesktop ? (<SideNav />) : (<Navbar/> )}
      <h1>Hola</h1>
      <main className="flex-1">
        {children}
      </main>
    </div>
  );
}
