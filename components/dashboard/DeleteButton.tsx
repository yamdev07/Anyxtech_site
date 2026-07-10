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
          : "border border-white/10 bg-white/5 text-gray-500 hover:border-red-400/40 hover:bg-red-500/10 hover:text-red-400"
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
