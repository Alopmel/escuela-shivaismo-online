/* styles/fonts.css */
import { Antonio, Poppins, Roboto } from 'next/font/google';


export const antonio = Antonio({
  subsets: ['latin'],
  weight: '200',
});

export const poppins = Poppins({
  weight: ['400', '700'],
  subsets: ['latin'],
  display: 'swap',
});

export const roboto = Roboto({
  weight: ['400', '700'],
  subsets: ['latin'],
  display: 'swap',
});