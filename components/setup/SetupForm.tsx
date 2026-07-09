"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { createFirstAdmin } from "@/lib/setup-actions";

export default function SetupForm() {
  const router = useRouter();
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(formData: FormData) {
    setPending(true);
    setError(null);
    const result = await createFirstAdmin(formData);
    if (result.ok) {
      router.push("/dashboard");
      router.refresh();
    } else {
      setPending(false);
      setError(result.error || "Une erreur est survenue.");
    }
  }

  return (
    <div className="w-full max-w-md rounded-3xl border border-[var(--border)] bg-[var(--card)] p-8 shadow-2xl shadow-brand-blue/10 sm:p-10">
      <div className="mb-7 flex flex-col items-center text-center">
        <Image
          src="/images/logo-removebg-preview.png"
          alt="AnyxTech"
          width={160}
          height={48}
          className="mb-5 h-11 w-auto object-contain"
        />
        <h1 className="font-display text-2xl font-bold">Bienvenue sur AnyxTech</h1>
        <p className="mt-1.5 text-sm text-soft">
          Créez votre compte administrateur pour commencer à gérer votre site.
        </p>
      </div>

      <form action={handleSubmit} className="space-y-4">
        <div>
          <label className="mb-1.5 block text-sm font-medium">Email</label>
          <input name="email" type="email" required autoComplete="email" placeholder="vous@anyxtech.com" className="form-input" />
        </div>

        <div>
          <label className="mb-1.5 block text-sm font-medium">Nom</label>
          <input name="name" autoComplete="name" placeholder="Votre nom" className="form-input" />
        </div>

        <div>
          <label className="mb-1.5 block text-sm font-medium">Mot de passe</label>
          <input name="password" type="password" required minLength={8} autoComplete="new-password" className="form-input" />
          <p className="mt-1 text-xs text-soft">8 caractères minimum.</p>
        </div>

        <div>
          <label className="mb-1.5 block text-sm font-medium">Confirmer le mot de passe</label>
          <input name="confirmPassword" type="password" required minLength={8} autoComplete="new-password" className="form-input" />
        </div>

        {error && <p className="text-sm text-red-500">{error}</p>}

        <button type="submit" disabled={pending} className="btn-primary w-full text-sm disabled:opacity-60">
          {pending ? "Création du compte..." : "Créer mon compte"}
        </button>
      </form>
    </div>
  );
}
