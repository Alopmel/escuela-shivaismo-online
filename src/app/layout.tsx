import { Suspense } from 'react'; // Importa Suspense
import type { Metadata } from "next";
import "./globals.css";
import { inter } from "@/ui/fonts";
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
                  <body className={`${inter.className} antialiased`}>
                    <>
                      <ConfigureAmplifyClientSide />
                      <ErrorBoundary>
                        <Suspense fallback={<div>Loading...</div>}>
                          <Link href={'/portal'}>
                            <Image src="/logo_login.png" alt="Logo" width={100} height={100} className="mt-1 absolute" />      
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
