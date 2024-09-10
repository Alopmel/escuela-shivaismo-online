import LatestUpload from "@/ui/portal/userprofile/card-latestUpload";

export default function Recommended() {
  return (
    <section className="m-4 p-4 pt-20 md:m-10 md:p-20">      
      <h1 className="mt-28 md:mt-36 ml-4 md:ml-24 text-[31px] md:text-[41px] text-white">
        Últimas clases subidas ¡No te las pierdas!
      </h1>
      <LatestUpload />
    </section>
  );
}
