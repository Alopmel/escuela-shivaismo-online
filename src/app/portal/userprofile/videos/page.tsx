'use client'
import CardProfile from "@/ui/portal/userprofile/card-profile";
import useAuthUser from "@/app/hooks/use-auth-user";
import FavoritesComponent from "@/ui/portal/categorias/favorites-component";
export default function Recommended() {
  const user = useAuthUser();
  const userId = user ? user.userId : 'null'
  return (
    <section className="ml-5 mr-5 mt-28 md:ml-20 md:mr-20 md:mt-40">
       <h1 className=" text-[31px] md:text-[41px] text-white">
          Lo que te gusta y quieres ver más tarde
        </h1>
        <CardProfile />
    </section>
  );
}
