import CardProfile from "@/ui/portal/userprofile/card-profile";
import Image from "next/image";
import Link from 'next/link';
export default function Recommended() {
  return (
    <>
       <h1 className="mt-28 md:mt-32 text-[31px] md:text-[41px] ml-12 md:ml-20 text-white">
          Clases que te han gustado o quieres ver más tarde
        </h1>
        <CardProfile />
    </>
  );
}
