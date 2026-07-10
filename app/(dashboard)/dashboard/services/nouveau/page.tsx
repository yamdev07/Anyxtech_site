import ServiceForm from "@/components/dashboard/ServiceForm";

export const metadata = { title: "Nouveau service" };

export default function NewServicePage() {
  return (
    <div className="p-5 md:p-8 lg:p-10">
      <header className="mb-8">
        <h1 className="font-display text-2xl font-bold sm:text-3xl">Nouveau service</h1>
        <p className="mt-1 text-soft">Ajouté immédiatement à la page Services du site.</p>
      </header>
      <ServiceForm />
    </div>
  );
}
