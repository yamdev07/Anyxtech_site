import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { poppins, spaceGrotesk } from "@/lib/fonts";
import { getAdminUser } from "@/lib/admin";
import Sidebar from "@/components/dashboard/Sidebar";
import "../(frontend)/globals.css";

export const metadata: Metadata = {
  title: { default: "Tableau de bord", template: "%s — AnyxTech" },
  robots: { index: false, follow: false },
};

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getAdminUser();
  if (!user) redirect("/admin");

  return (
    <html lang="fr" className={`dark ${poppins.variable} ${spaceGrotesk.variable}`}>
      <body className="bg-soft font-sans">
        <Sidebar email={user.email as string | undefined} />
        <main className="min-h-screen pt-16 lg:pl-64 lg:pt-0">{children}</main>
      </body>
    </html>
  );
}
