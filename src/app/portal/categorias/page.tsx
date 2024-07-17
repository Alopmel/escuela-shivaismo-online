'use client'
import Category from "@/ui/portal/categorias/category";
import useAuthUser from "@/app/hooks/use-auth-user";
export default function Dashboard() {
  const user = useAuthUser();
  const userId = user ? user.userId : 'null'
    return <Category  userId={userId}/>;
  }