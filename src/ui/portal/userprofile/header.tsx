'use client'

import React from 'react';
import Image from 'next/image';
import useAuthUser from '@/app/hooks/use-auth-user'; // Importar el hook

const Header = () => {
  const user = useAuthUser(); // Obtener el nombre del usuario logeado

  return (
    <div className="flex">
      <div className="flex flex-col items-center justify-start p-5 fixed left-0 top-0 z-1000 h-full bg-transparent">
        <Image src="/logo_login.png" alt="Logo" width={100} height={100} priority className="mb-8 mt-12" />
      </div>
      <div className="flex-1 flex items-center justify-center p-5 text-white ml-28" style={{ marginTop: '5rem' }}>
        <div className="flex items-center">
          <div
            className="w-24 h-24 rounded-full bg-cover bg-center mr-4"
            style={{ backgroundImage: "url('https://img.freepik.com/fotos-premium/diosa-negra-kali-calavera_94574-6432.jpg')" }}
          />
          <h1 className="font-bold text-xl">Bienvenido de nuevo, {user ? user.name : '...'}</h1>
        </div>
      </div>
    </div>
  );
};

export default Header;
