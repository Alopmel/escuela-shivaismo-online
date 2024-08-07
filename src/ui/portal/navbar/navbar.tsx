'use client';
import Link from 'next/link';
import Image from 'next/image';
import { handleSignOut } from "@/lib/cognitoActions";

const Navbar = () => {
  return (
    <nav className="absolute left-[177px] top-[20px] flex justify-between bg-transparent">
      <div className="flex items-center">
        <form action={handleSignOut} className="mr-2">
          <button
            type="submit"
            className="border-white border-opacity-10 border-solid rounded-[10px] w-20 h-9 bg-white/20 backdrop-blur-lg text-center text-white font-semibold text-sm shadow-2xl hover:bg-white/30 transition duration-300 ease-in-out"
          >
            Salir
          </button>
        </form>
        <Link href="/portal/userprofile/videos">
          <button
            className="border-white border-opacity-10 border-solid rounded-[10px] w-20 h-9 bg-white/20 backdrop-blur-lg text-center text-white font-semibold text-sm shadow-2xl hover:bg-white/30 transition duration-300 ease-in-out"
          >
            Perfil
          </button>
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
