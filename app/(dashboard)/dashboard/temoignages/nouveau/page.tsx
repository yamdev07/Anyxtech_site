import TestimonialForm from "@/components/dashboard/TestimonialForm";

export const metadata = { title: "Nouveau témoignage" };

export default function NewTestimonialPage() {
  return (
    <div className="p-5 md:p-8 lg:p-10">
      <header className="mb-8">
        <h1 className="font-display text-2xl font-bold sm:text-3xl">Nouveau témoignage</h1>
        <p className="mt-1 text-soft">Ajouté aux avis clients affichés sur le site.</p>
      </header>
      <TestimonialForm />
    </div>
  );
}
