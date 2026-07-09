import type { Metadata } from "next";
import { poppins, spaceGrotesk } from "@/lib/fonts";
import "../(frontend)/globals.css";

export const metadata: Metadata = {
  title: "Bienvenue — AnyxTech",
  robots: { index: false, follow: false },
};

export default function SetupLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={`${poppins.variable} ${spaceGrotesk.variable}`}>
      <body className="bg-soft font-sans" suppressHydrationWarning>{children}</body>
    </html>
  );
}
