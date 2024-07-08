import { Suspense } from 'react'; // Importa Suspense
import type { Metadata } from "next";
import "./globals.css";
import { inter } from "@/ui/fonts";
import ConfigureAmplifyClientSide from "./amplify-cognito-config";
// Importa tus context providers aquí
import { FavoritesProvider } from './context/FavoritesContext';
import { WatchLaterProvider } from "./context/WatchLaterContext";
import { BucketProvider } from "./context/BucketContext";
import ErrorBoundary from "@/ui/ErrorBoundary";


export const metadata: Metadata = {
  title: "Next.js Cognito Authentication",
  description: "Cognito authenticated Next.js app.",
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
          <html lang="en">
            <body className={`${inter.className} antialiased`}>
              <>
                <ConfigureAmplifyClientSide />
                <ErrorBoundary>
                  <Suspense fallback={<div>Loading...</div>}>
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
