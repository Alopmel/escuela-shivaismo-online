// /src/portal/books/page.tsx
import BookRenderer from "@/ui/portal/categorias/book-render"

export default function Dashboard() {
    return (
        <section className="m-4 p-4 pt-20 md:m-10 md:p-20">
        <h1 className=" text-[31px] md:text-[41px] text-white">
           Libros recomendados
         </h1>
            <BookRenderer />
        </section>
    )

  }