import CardRecommended from "@/ui/portal/userprofile/card-recommended";

export default function Recommended() {
  return (
    <section className="ml-5 mr-5 mt-28 md:ml-20 md:mr-20 md:mt-40">
      <h1 className="text-[31px] md:text-[41px] text-white">
         Recomendaciones ¡A ver que te parecen!
      </h1>
      <CardRecommended />
    </section>
  );
}
