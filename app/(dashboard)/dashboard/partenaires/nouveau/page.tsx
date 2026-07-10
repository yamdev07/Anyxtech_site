import PartnerForm from "@/components/dashboard/PartnerForm";

export const metadata = { title: "Nouveau partenaire" };

export default function NewPartnerPage() {
  return (
    <div className="p-5 md:p-8 lg:p-10">
      <header className="mb-8">
        <h1 className="font-display text-2xl font-bold sm:text-3xl">Nouveau partenaire</h1>
        <p className="mt-1 text-soft">Le logo, le nom et le lien apparaissent automatiquement sur l&apos;accueil.</p>
      </header>
      <PartnerForm />
    </div>
  );
}
