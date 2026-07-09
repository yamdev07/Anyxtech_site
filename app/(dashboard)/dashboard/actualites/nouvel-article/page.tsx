import NewsForm from "@/components/dashboard/NewsForm";

export const metadata = { title: "Nouvel article" };

export default function NewNewsPage() {
  return (
    <div className="p-5 md:p-8 lg:p-10">
      <header className="mb-8">
        <h1 className="font-display text-2xl font-bold sm:text-3xl">Nouvel article</h1>
        <p className="mt-1 text-soft">Publié dans la rubrique Actualités du site.</p>
      </header>
      <NewsForm />
    </div>
  );
}
