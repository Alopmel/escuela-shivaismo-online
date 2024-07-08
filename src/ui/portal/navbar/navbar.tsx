'use client';
import Link from 'next/link';
import Image from 'next/image';
import { handleSignOut } from "@/lib/cognitoActions";

const Navbar = () => {
  return (
    <nav className="absolute left-0 right-0 top-0 p-6 flex justify-between items-center bg-transparent">
      <Link href="/portal">
        <Image src="/logo_login.png" alt="Logo" width={80} height={80} />
      </Link>
      <div className="flex items-center">
        <form action={handleSignOut} className="mr-2">
          <button
            type="submit"
            className="border-white border-opacity-10 border-solid rounded-[10px] w-28 h-9 bg-white/20 backdrop-blur-lg text-center text-white font-semibold text-sm shadow-2xl hover:bg-white/30 transition duration-300 ease-in-out"
          >
            Salir
          </button>
        </form>
        <Link href="/portal/userprofile">
          <button
            className="border-white border-opacity-10 border-solid rounded-[10px] w-28 h-9 bg-white/20 backdrop-blur-lg text-center text-white font-semibold text-sm shadow-2xl hover:bg-white/30 transition duration-300 ease-in-out"
          >
            Perfil
          </button>
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
