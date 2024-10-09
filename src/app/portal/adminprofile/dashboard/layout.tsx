import { roboto } from "@/app/fonts";
export default function Layout({ children }: { children: React.ReactNode }) {
    return (
      <main className={`flex justify-center items-center min-h-screen w-full ml-5 mr-5 mt-10 md:ml-20 md:mr-20 md:mt-40 ${roboto.className}`}>
          {children}  
      </main>
    );
  }