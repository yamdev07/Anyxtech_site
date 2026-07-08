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
    <html lang="fr" className={`dashboard-light ${poppins.variable} ${spaceGrotesk.variable}`}>
      <body className="bg-soft font-sans">
        {/* Top gradient accent strip */}
        <div className="fixed inset-x-0 top-0 z-[60] h-[3px]"
          style={{
            background: "linear-gradient(90deg, #1f429b, #1db9ff, #22d3ee, #1db9ff, #1f429b)",
            backgroundSize: "200% 100%",
            animation: "shimmer 4s linear infinite",
          }}
        />
        {/* Animated mesh background */}
        <div className="aurora-mesh pointer-events-none fixed inset-0 z-0" />
        <Sidebar email={user.email as string | undefined} />
        <main className="relative z-10 min-h-screen pt-16 lg:pl-64 lg:pt-0">
          {children}
        </main>
      </body>
    </html>
  );
}
