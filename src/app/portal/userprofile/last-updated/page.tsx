import LatestUpload from "@/ui/portal/userprofile/card-latestUpload";

export default function Recommended() {
  return (
    <section className="ml-5 mr-5 mt-28 md:ml-20 md:mr-20 md:mt-40">
      <h1 className="mt-28 md:mt-36 ml-4 md:ml-24 text-[31px] md:text-[41px] text-white">
        Últimas clases subidas ¡No te las pierdas!
      </h1>
      <LatestUpload />
    </section>
  );
}
