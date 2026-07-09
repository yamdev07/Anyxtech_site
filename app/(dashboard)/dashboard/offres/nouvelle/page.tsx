import JobForm from "@/components/dashboard/JobForm";

export const metadata = { title: "Nouvelle offre d'emploi" };

export default function NewJobPage() {
  return (
    <div className="p-5 md:p-8 lg:p-10">
      <header className="mb-8">
        <h1 className="font-display text-2xl font-bold sm:text-3xl">Nouvelle offre d&apos;emploi</h1>
        <p className="mt-1 text-soft">Publiée immédiatement sur la page Carrières du site.</p>
      </header>
      <JobForm />
    </div>
  );
}
