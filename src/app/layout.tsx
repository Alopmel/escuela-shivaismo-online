
import { Suspense } from 'react'; // Importa Suspense
import type { Metadata } from "next";
import "./globals.css";
import { inter } from "@/ui/fonts";
import ConfigureAmplifyClientSide from "./amplify-cognito-config";
// Importa tus context providers aquí
import { FavoritesProvider } from './context/FavoritesContext';
import { WatchLaterProvider } from "./context/WatchLaterContext";
import { BucketProvider } from "./context/BucketContext";
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
    <FavoritesProvider>
      <WatchLaterProvider>
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
      </WatchLaterProvider>
    </FavoritesProvider>
  );
}
