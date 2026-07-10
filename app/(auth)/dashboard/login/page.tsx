"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, Lock, Mail, Eye, EyeOff } from "lucide-react";
import Image from "next/image";
import { login } from "@/lib/dashboard-actions";
import { useTheme } from "@/components/dashboard/ThemeProvider";
import DashboardFooter from "@/components/dashboard/DashboardFooter";

export default function LoginPage() {
  const router = useRouter();
  const { resolvedTheme } = useTheme();
  const dark = resolvedTheme === "dark";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setPending(true);
    setError("");
    const res = await login(email, password);
    if (res.ok) {
      router.push("/dashboard");
      router.refresh();
    } else {
      setError("Email ou mot de passe incorrect.");
      setPending(false);
    }
  }

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center px-4 transition-colors duration-300"
      style={{ background: dark ? "#13151A" : "#F8FAFC" }}
    >
      <div className="aurora-mesh pointer-events-none fixed inset-0 z-0" />
      <div className="fixed inset-x-0 top-0 z-[60] h-[3px]"
        style={{
          backgroundImage: "linear-gradient(90deg, #4F46E5, #818CF8, #22D3EE, #818CF8, #4F46E5)",
          backgroundSize: "200% 100%",
          animation: "shimmer 4s linear infinite",
        }}
      />

      <div className="relative z-10 w-full max-w-md flex-1 flex items-center justify-center pt-12">
        <div className="w-full mb-24">
          <div className="text-center mb-8">
            <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500 to-indigo-400 shadow-lg shadow-indigo-500/25 mb-4">
              <Image src="/images/logo-removebg-preview.png" alt="AnyxTech" width={40} height={40} className="h-10 w-10 object-contain brightness-0 invert" />
            </div>
            <h1 className="font-display text-2xl font-bold" style={{ color: "var(--text)" }}>AnyxTech Dashboard</h1>
            <p className="mt-2 text-sm" style={{ color: "var(--text-soft)" }}>Connectez-vous pour accéder au tableau de bord</p>
          </div>

          <form onSubmit={handleSubmit} className="dash-card p-8 space-y-6">
            {error && (
              <div className="rounded-xl bg-red-500/10 border border-red-500/20 px-4 py-3 text-sm text-red-400">
                {error}
              </div>
            )}

            <div>
              <label className="block text-sm font-bold mb-2" style={{ color: "var(--text-soft)" }}>Email</label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4" style={{ color: "var(--text-muted)" }} />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full rounded-xl border pl-10 pr-4 py-3 text-sm outline-none transition-all"
                  style={{
                    borderColor: dark ? "rgba(148, 163, 184, 0.12)" : "rgba(15, 23, 42, 0.12)",
                    background: dark ? "rgba(255,255,255,0.05)" : "rgba(15, 23, 42, 0.04)",
                    color: "var(--text)",
                  }}
                  placeholder="admin@anyxtech.com"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold mb-2" style={{ color: "var(--text-soft)" }}>Mot de passe</label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4" style={{ color: "var(--text-muted)" }} />
                <input
                  type={showPw ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full rounded-xl border pl-10 pr-11 py-3 text-sm outline-none transition-all"
                  style={{
                    borderColor: dark ? "rgba(148, 163, 184, 0.12)" : "rgba(15, 23, 42, 0.12)",
                    background: dark ? "rgba(255,255,255,0.05)" : "rgba(15, 23, 42, 0.04)",
                    color: "var(--text)",
                  }}
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPw((v) => !v)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 transition-colors"
                  style={{ color: "var(--text-muted)" }}
                >
                  {showPw ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={pending}
              className="w-full rounded-xl bg-gradient-to-r from-indigo-500 to-indigo-400 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-indigo-500/25 transition-all hover:-translate-y-0.5 hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2"
            >
              {pending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Lock className="h-4 w-4" />}
              {pending ? "Connexion..." : "Se connecter"}
            </button>
          </form>
        </div>
      </div>

      <div className="relative z-10 w-full px-4 sm:px-6 lg:px-8 pb-6 pt-2">
        <DashboardFooter noSidebar />
      </div>
    </div>
  );
}
