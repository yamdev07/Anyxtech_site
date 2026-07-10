import type { Metadata } from "next";
import { poppins, spaceGrotesk } from "@/lib/fonts";
import ThemeProvider from "@/components/dashboard/ThemeProvider";
import "../(frontend)/globals.css";

export const metadata: Metadata = {
  title: { default: "Connexion", template: "%s — AnyxTech" },
  robots: { index: false, follow: false },
};

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
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
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
