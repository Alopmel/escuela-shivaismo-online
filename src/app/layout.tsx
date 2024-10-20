import { Suspense, useState, useEffect } from 'react'; // Importa useState y useEffect
import type { Metadata } from "next";
import "./globals.css";
import { unicaOne } from './fonts';
import ConfigureAmplifyClientSide from "./amplify-cognito-config";
import { UserProvider } from './context/UserContext'; // Importa el UserProvider
import { FavoritesProvider } from './context/FavoritesContext';
import { WatchLaterProvider } from "./context/WatchLaterContext";
import { BucketProvider } from "./context/BucketContext";
import { ProgressProvider } from './context/ProgressContext';
import { CommentProvider } from '@/app/context/CommentContext';
import { MenuProvider } from '@/app/context/MenuContext';
import ErrorBoundary from "@/ui/ErrorBoundary"; // Ajusta la ruta según tu estructura de archivos
import Image from "next/image";
import Link from 'next/link';
import NeonSpinner from '@/ui/neon-spinner';

export const metadata: Metadata = {
  title: "Tantra Shivaismo de Cachemira ",
  description: "Escuela online",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <UserProvider>
      <FavoritesProvider>
        <WatchLaterProvider>
          <CommentProvider>
            <ProgressProvider>
              <BucketProvider>
                <MenuProvider>
                  <html lang="es">
                    <body className={`${unicaOne.className} antialiased`}>
                      <>
                        <ConfigureAmplifyClientSide />
                        <ErrorBoundary>
                          <Suspense fallback={<NeonSpinner />}>
                            <Link href={'/portal'}>
                              <Image 
                                src="/logo_login.png"
                                alt="Logo"
                                width={90} 
                                height={90} 
                                className="mt-8 ml-8 absolute logo-white logo-size" 
                                priority={true}
                              />
                            </Link>
                            {children}
                          </Suspense>
                        </ErrorBoundary>
                      </>
                    </body>
                  </html>
                </MenuProvider>
              </BucketProvider>
            </ProgressProvider>          
          </CommentProvider>
        </WatchLaterProvider>
      </FavoritesProvider>
    </UserProvider>
  );
}