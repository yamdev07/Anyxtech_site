import { redirect } from "next/navigation";
import { getPayloadClient } from "@/lib/payload";
import SetupForm from "@/components/setup/SetupForm";

export const dynamic = "force-dynamic";

export default async function SetupPage() {
  const payload = await getPayloadClient();
  const { totalDocs } = await payload.count({ collection: "users" });

  // Le premier compte existe déjà : ce n'est plus l'écran à utiliser.
  if (totalDocs > 0) redirect("/admin");

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden px-4 py-12">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(60% 50% at 50% 0%, rgba(29,185,255,0.16), transparent), radial-gradient(50% 40% at 100% 100%, rgba(31,66,155,0.14), transparent)",
        }}
      />
      <SetupForm />
    </div>
  );
}
