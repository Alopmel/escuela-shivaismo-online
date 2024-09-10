'use client'
import CardProfile from "@/ui/portal/userprofile/card-profile";
import useAuthUser from "@/app/hooks/use-auth-user";
import FavoritesComponent from "@/ui/portal/categorias/favorites-component";
export default function Recommended() {
  const user = useAuthUser();
  const userId = user ? user.userId : 'null'
  return (
    <section className="m-4 p-4 pt-20 md:m-10 md:p-20">
       <h1 className=" text-[31px] md:text-[41px] text-white">
          Lo que te gusta y quieres ver más tarde
        </h1>
        <CardProfile />
    </section>
  );
}
