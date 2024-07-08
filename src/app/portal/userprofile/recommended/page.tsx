import Image from "next/image";
import Link from 'next/link';
export default function Recommended() {
  return (
    <>
        <Link  href="/portal">
            <Image src="/logo_login.png" alt="Logo" width={100} height={100} priority className="mt-1" />
        </Link>        
        <h1
            style={{
            textAlign: 'center',
            color: 'rgb(251, 251, 251)',
            fontSize: '41px', // Cambiado el fontSize a formato string
            }}
        >
            Recomendaciones ¡A ver que te parecen!
        </h1>
        </>
  );
}
