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
      className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-bold transition-all ${
        confirm
          ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/20"
          : "bg-white px-3 py-1.5 text-xs font-bold text-indigo-600 shadow-md transition-all hover:-translate-y-0.5 hover:shadow-lg"
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
