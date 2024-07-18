'use client'
import CardProfile from "@/ui/portal/userprofile/card-profile";
import useAuthUser from "@/app/hooks/use-auth-user";
import FavoritesComponent from "@/ui/portal/categorias/favorites-component";
export default function Recommended() {
  const user = useAuthUser();
  const userId = user ? user.userId : 'null'
  return (
    <>
       <h1 className="mt-28 md:mt-32 text-[31px] md:text-[41px] ml-12 md:ml-20 text-white">
          Lo que te gusta y quieres ver más tarde
        </h1>
        {/* <CardProfile/> */}
        {/* <FavoritesComponent userId={userId} /> */}
        <CardProfile />
    </>
  );
}
