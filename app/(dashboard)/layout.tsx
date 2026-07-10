import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { poppins, spaceGrotesk } from "@/lib/fonts";
import { getAdminUser } from "@/lib/admin";
import { getSiteSettings } from "@/lib/settings";
import Sidebar from "@/components/dashboard/Sidebar";
import ThemeProvider from "@/components/dashboard/ThemeProvider";
import DashboardFooter from "@/components/dashboard/DashboardFooter";
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
  if (!user) redirect("/dashboard/login");

  const settings = await getSiteSettings();

  return (
    <html lang="fr" className={`dashboard-dark ${poppins.variable} ${spaceGrotesk.variable}`} suppressHydrationWarning>
      <body className="bg-[#13151A] font-sans">
        <ThemeProvider>
          <div className="fixed inset-x-0 top-0 z-[60] h-[3px]"
            style={{
              backgroundImage: "linear-gradient(90deg, #4F46E5, #818CF8, #22D3EE, #818CF8, #4F46E5)",
              backgroundSize: "200% 100%",
              animation: "shimmer 4s linear infinite",
            }}
          />
          <div className="aurora-mesh pointer-events-none fixed inset-0 z-0" />
          <Sidebar email={user.email as string | undefined} />
          <main className="relative z-10 min-h-screen pt-16 lg:pl-64 lg:pt-0">
            {children}
          </main>
          <DashboardFooter
            email={user.email as string | undefined}
            contact={{
              phone: settings.phone,
              email: settings.email,
              address: settings.addressShort || settings.address,
              hours: settings.hours,
            }}
          />
        </ThemeProvider>
      </body>
    </html>
  );
}
