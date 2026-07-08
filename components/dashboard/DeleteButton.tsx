"use client";

import { useState, useTransition } from "react";
import { Trash2, Loader2 } from "lucide-react";
import { deleteDoc } from "@/lib/dashboard-actions";

type Collection =
  | "services"
  | "jobs"
  | "partners"
  | "news"
  | "testimonials"
  | "submissions";

export default function DeleteButton({
  collection,
  id,
  path,
  label,
}: {
  collection: Collection;
  id: string;
  path: string;
  label?: string;
}) {
  const [pending, start] = useTransition();
  const [confirm, setConfirm] = useState(false);

  function onClick() {
    if (!confirm) {
      setConfirm(true);
      setTimeout(() => setConfirm(false), 3000);
      return;
    }
    start(async () => {
      await deleteDoc(collection, id, path);
    });
  }

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={pending}
      className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold transition-all ${
        confirm
          ? "bg-red-500 text-white shadow-md shadow-red-500/20"
          : "border border-[var(--border)] bg-white/60 text-slate-400 hover:border-red-300 hover:bg-red-50 hover:text-red-500"
      }`}
    >
      {pending ? (
        <Loader2 className="h-3.5 w-3.5 animate-spin" />
      ) : (
        <Trash2 className="h-3.5 w-3.5" />
      )}
      {confirm ? "Confirmer ?" : label ?? "Supprimer"}
    </button>
  );
}
