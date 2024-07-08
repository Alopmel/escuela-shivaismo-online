// SideNavbar.tsx
'use client'
import React from 'react';
import Link from 'next/link';
import styles from './userProfile.module.css'; // Importar estilos CSS
import Image from 'next/image';

import { handleSignOut } from '@/lib/cognitoActions';

const SideNavbar: React.FC = () => {
  return (
    <div className={styles.sideNavbarContainer}>
      <Link href="/portal">
        <Image src="/logo_login.png" alt="Logo" width={80} height={80} />
      </Link>
      <div className={styles.sideNavbarLinkContainer}>
        <Link href="/portal/userprofile/videos"  className={styles.sideNavbarLink}>
          General
        </Link>
      </div>
      <div className={styles.sideNavbarLinkContainer}>
        <Link href="/portal/userprofile/videos"  className={styles.sideNavbarLink}>
          Videos guardados
        </Link>
      </div>
      <div className={styles.sideNavbarLinkContainer}>
        <Link href="/portal/userprofile/notification"  className={styles.sideNavbarLink}>
          Notificaciones
        </Link>
      </div>
      <div className={styles.sideNavbarLinkContainer}>
        <Link href="/portal/userprofile/setting" className={styles.sideNavbarLink}>
          Ajustes
        </Link>
      </div>
      <form className={styles.sideNavbarLinkContainer} action={handleSignOut}>
        <button type='submit' className={styles.button} >
          Salir
        </button>
      </form>
    </div>
  );
};

export default SideNavbar;
