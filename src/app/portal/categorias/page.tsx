'use client'
import Category from "@/ui/portal/categorias/category";
import { useUser } from "@/app/context/UserContext";

export default function Dashboard() {
  const { userId } = useUser(); // Obtener userId del contexto

  return (
    <section className="ml-5 mr-5 mt-28 md:ml-20 md:mr-20 md:mt-40">
      <Category userId={userId || ''} />
    </section>
  );
}
