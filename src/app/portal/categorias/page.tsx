'use client'
import Category from "@/ui/portal/categorias/category";
import { useUser } from "@/app/context/UserContext";

export default function Dashboard() {
  const { userId } = useUser(); // Obtener userId del contexto

  return <Category userId={userId || ''} />;
}
