import { Suspense, useState, useEffect } from 'react'; // Importa useState y useEffect
import type { Metadata } from "next";
import "./globals.css";
import { antonio } from './fonts';
import ConfigureAmplifyClientSide from "./amplify-cognito-config";
import { UserProvider } from './context/UserContext'; // Importa el UserProvider
import { FavoritesProvider } from './context/FavoritesContext';
import { WatchLaterProvider } from "./context/WatchLaterContext";
import { BucketProvider } from "./context/BucketContext";
import { ProgressProvider } from './context/ProgressContext';
import { CommentProvider } from '@/app/context/CommentContext';
import ErrorBoundary from "@/ui/ErrorBoundary"; // Ajusta la ruta según tu estructura de archivos
import Image from "next/image";
import Link from 'next/link';

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
                <html lang="es">
                  <body className={`${antonio.className} antialiased`}>
                    <>
                      <ConfigureAmplifyClientSide />
                      <ErrorBoundary>
                        <Suspense fallback={<div>Loading...</div>}>
                          <Link href={'/portal'}>
                            <Image 
                              src="/logo_login.png"
                              alt="Logo"
                              width={90} 
                              height={90} 
                              className="mt-8 ml-8 absolute logo-white logo-size" 
                            />
                          </Link>
                          {children}
                        </Suspense>
                      </ErrorBoundary>
                    </>
                  </body>
                </html>
              </BucketProvider>
            </ProgressProvider>          
          </CommentProvider>
        </WatchLaterProvider>
      </FavoritesProvider>
    </UserProvider>
  );
}
