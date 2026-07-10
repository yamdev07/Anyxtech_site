"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { Plus, Pencil, Inbox, Loader2, ChevronDown } from "lucide-react";
import DeleteButton from "./DeleteButton";

interface ListItem {
  id: string;
  title: string;
  subtitle?: string;
  meta?: string;
}

export default function PaginatedList({
  collection,
  path,
  gradient,
  icon,
}: {
  collection: string;
  path: string;
  gradient: string;
  icon: React.ReactNode;
}) {
  const [items, setItems] = useState<ListItem[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const LIMIT = 10;

  const fetchData = useCallback(async (p: number, append: boolean) => {
    setLoading(true);
    const res = await fetch(`/api/collections/${collection}?page=${p}&limit=${LIMIT}`);
    const data = await res.json();
    setItems((prev) => (append ? [...prev, ...data.docs] : data.docs));
    setHasMore(data.hasNextPage ?? false);
    setLoading(false);
  }, [collection]);

  useEffect(() => { fetchData(1, false); }, [fetchData]);

  function loadMore() {
    const next = page + 1;
    setPage(next);
    fetchData(next, true);
  }

  const editBase = `/dashboard/edit/${collection}`;

  if (items.length === 0 && !loading) {
    return (
      <div className="dash-card p-12 text-center">
        <div className={`mx-auto grid h-16 w-16 place-items-center rounded-2xl bg-gradient-to-br ${gradient} text-white shadow-lg`}>
          {icon}
        </div>
        <p className="mt-4 text-sm font-medium text-gray-400">Aucun élément pour le moment.</p>
        <Link href={`${editBase}/create`} className="mt-5 inline-flex items-center gap-2 rounded-xl bg-white px-5 py-2.5 text-sm font-bold text-indigo-600 shadow-lg transition-all hover:-translate-y-0.5 hover:shadow-xl">
          <Plus className="h-4 w-4" /> Ajouter le premier
        </Link>
      </div>
    );
  }

  return (
    <div className="dash-card overflow-hidden">
      <ul className="divide-y divide-white/10">
        {items.map((it) => (
          <li key={it.id} className="flex flex-wrap items-center gap-4 px-6 py-4 transition-all hover:bg-white/5">
            <div className={`grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-gradient-to-br ${gradient} text-white shadow-md`}>
              {icon}
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2">
                <span className="truncate font-display font-semibold text-white">{it.title}</span>
                {it.meta && (
                  <span className="shrink-0 rounded-full bg-indigo-500/15 border border-indigo-500/20 px-2.5 py-0.5 text-xs font-bold text-indigo-400">{it.meta}</span>
                )}
              </div>
              {it.subtitle && <p className="mt-0.5 line-clamp-1 text-sm text-gray-400">{it.subtitle}</p>}
            </div>
            <div className="flex items-center gap-1">
              <Link href={`${editBase}/${it.id}`} className="inline-flex items-center gap-1.5 rounded-lg bg-white px-3 py-1.5 text-xs font-bold text-indigo-600 shadow-md transition-all hover:-translate-y-0.5 hover:shadow-lg">
                <Pencil className="h-3.5 w-3.5" /> Modifier
              </Link>
              <DeleteButton collection={collection as "services"} id={it.id} path={path} />
            </div>
          </li>
        ))}
      </ul>
      {hasMore && (
        <div className="p-6 text-center border-t border-white/10">
          <button onClick={loadMore} disabled={loading} className="inline-flex items-center gap-2 rounded-xl bg-white px-5 py-2.5 text-sm font-bold text-indigo-600 shadow-lg transition-all hover:-translate-y-0.5 hover:shadow-xl disabled:opacity-50">
            {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <ChevronDown className="h-4 w-4" />}
            {loading ? "Chargement..." : "Charger plus"}
          </button>
        </div>
      )}
    </div>
  );
}
