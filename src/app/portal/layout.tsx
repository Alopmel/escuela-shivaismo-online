// src/ui/portal/Layout.tsx
'use client'
import { useEffect, useState, useCallback } from "react";
import SideNav from "@/ui/portal/userprofile/side-nav";
import SideNavbarMobile from '@/ui/portal/userprofile/side-nav-mov';
import Search from "@/ui/portal/search/search";
import useAuthUser from '@/app/hooks/use-auth-user'; // Usa el hook
import NeonSpinner from "@/ui/neon-spinner";

export default function Layout({ children }: { children: React.ReactNode }) {
  const [isDesktop, setIsDesktop] = useState<boolean>(false);
  const { user, userId, name, email, loading } = useAuthUser();

  // console.log('User in Layout:', user); // Verifica que el usuario esté disponible

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

  if (loading) {
    return <NeonSpinner />; // Maneja el estado de carga
  }

  return (
    <div className="flex auth-background">
      <Search /> {/* Agrega el componente de búsqueda */}
      {isDesktop ? (<SideNav />) : (<SideNavbarMobile />)}
      <main className="flex-1">
        {children}
      </main>
    </div>
  );
}
