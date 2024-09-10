import CardRecommended from "@/ui/portal/userprofile/card-recommended";

export default function Recommended() {
  return (
    <section className="m-4 p-4 pt-20 md:m-10 md:p-20">     
      <h1 className="text-[31px] md:text-[41px] text-white">
         Recomendaciones ¡A ver que te parecen!
      </h1>
      <CardRecommended />
    </section>
  );
}
