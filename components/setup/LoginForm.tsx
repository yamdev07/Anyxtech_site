"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Mail, Lock, ArrowRight } from "lucide-react";
import { loginAdmin } from "@/lib/login-actions";

export default function LoginForm() {
  const router = useRouter();
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(formData: FormData) {
    setPending(true);
    setError(null);
    const result = await loginAdmin(formData);
    if (result.ok) {
      router.push("/dashboard");
      router.refresh();
    } else {
      setPending(false);
      setError(result.error || "Une erreur est survenue.");
    }
  }

  const fieldWrap = "relative flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3.5 transition-all focus-within:border-brand-light/60 focus-within:bg-white/[0.06] focus-within:shadow-[0_0_0_3px_rgba(29,185,255,0.15)]";
  const fieldInput = "w-full border-none bg-transparent p-0 text-[15px] text-white placeholder:text-white/35 outline-none";

  return (
    <div className="w-full max-w-md rounded-3xl border border-white/10 bg-[#0b1120] p-8 shadow-[0_30px_80px_-20px_rgba(29,185,255,0.18)] sm:p-10">
      <div className="mb-8 flex flex-col items-center text-center">
        <Image
          src="/images/logo-removebg-preview.png"
          alt="AnyxTech"
          width={168}
          height={50}
          className="mb-6 h-12 w-auto object-contain"
        />
        <h1 className="font-display text-[26px] font-bold leading-tight text-white">Espace administrateur</h1>
        <p className="mt-2 text-[15px] text-white/50">Connectez-vous pour gérer votre site.</p>
      </div>

      <form action={handleSubmit} className="space-y-4">
        <div>
          <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-white/50">Email</label>
          <div className={fieldWrap}>
            <Mail className="h-[18px] w-[18px] shrink-0 text-white/35" />
            <input
              name="email"
              type="email"
              required
              autoComplete="email"
              placeholder="vous@anyxtech.com"
              className={fieldInput}
            />
          </div>
        </div>

        <div>
          <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-white/50">Mot de passe</label>
          <div className={fieldWrap}>
            <Lock className="h-[18px] w-[18px] shrink-0 text-white/35" />
            <input
              name="password"
              type="password"
              required
              autoComplete="current-password"
              placeholder="••••••••"
              className={fieldInput}
            />
          </div>
        </div>

        {error && <p className="text-sm text-red-400">{error}</p>}

        <button
          type="submit"
          disabled={pending}
          className="group mt-2 flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-brand-blue to-brand-light py-3.5 text-[15px] font-semibold text-white shadow-[0_16px_36px_-12px_rgba(29,185,255,0.55)] transition-all hover:brightness-110 disabled:opacity-60"
        >
          {pending ? "Connexion..." : "Se connecter"}
          {!pending && <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />}
        </button>
      </form>
    </div>
  );
}
