"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { MapPin, Briefcase, ArrowRight, Search, Loader2, ChevronDown } from "lucide-react";

interface JobDoc {
  id: string | number;
  title: string;
  slug?: string | null;
  location?: string | null;
  type?: string | null;
  department?: string | null;
  excerpt?: string | null;
}

export default function CarrieresList() {
  const [jobs, setJobs] = useState<JobDoc[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [typeFilter, setTypeFilter] = useState("");

  const LIMIT = 6;

  const fetchJobs = useCallback(async (p: number, q: string, type: string, append: boolean) => {
    setLoading(true);
    const params = new URLSearchParams({ page: String(p), limit: String(LIMIT) });
    if (q) params.set("q", q);
    if (type) params.set("type", type);
    const res = await fetch(`/api/jobs?${params}`);
    const data = await res.json();
    const docs = data.docs as JobDoc[];
    setJobs((prev) => (append ? [...prev, ...docs] : docs));
    setHasMore(data.hasNextPage ?? false);
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchJobs(1, search, typeFilter, false);
    setPage(1);
  }, [search, typeFilter, fetchJobs]);

  function loadMore() {
    const next = page + 1;
    setPage(next);
    fetchJobs(next, search, typeFilter, true);
  }

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    setSearch(searchInput);
  }

  const types = ["", "CDI", "CDD", "Stage", "Alternance", "Freelance"];

  return (
    <div>
      {/* Filters */}
      <div className="mb-10 flex flex-col sm:flex-row gap-3 max-w-2xl mx-auto">
        <form onSubmit={handleSearch} className="flex flex-1">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-soft" />
            <input
              type="text"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              placeholder="Rechercher une offre..."
              className="form-input pl-11 pr-4"
            />
          </div>
          <button type="submit" className="btn-primary ml-3">
            Rechercher
          </button>
        </form>
        <div className="flex gap-1.5 flex-wrap">
          {types.map((t) => (
            <button
              key={t}
              onClick={() => setTypeFilter(t)}
              className={`rounded-full px-4 py-2 text-xs font-semibold transition-all ${
                typeFilter === t
                  ? "bg-brand-blue text-white dark:bg-brand-light dark:text-ink"
                  : "border border-[var(--border)] bg-[var(--card)] text-soft hover:border-brand-light/50"
              }`}
            >
              {t || "Tous"}
            </button>
          ))}
        </div>
      </div>

      {jobs.length === 0 && !loading ? (
        <div className="mx-auto max-w-xl rounded-3xl border border-[var(--border)] bg-soft p-10 text-center">
          <Briefcase className="mx-auto h-10 w-10 text-brand-light" />
          <h2 className="mt-4 font-display text-2xl font-bold">Aucune offre trouvée</h2>
          <p className="mt-3 text-soft">
            {search || typeFilter ? "Aucun résultat pour cette recherche." : "Aucun poste n'est ouvert actuellement."}
          </p>
        </div>
      ) : (
        <>
          <div className="mx-auto grid max-w-4xl gap-4">
            {jobs.map((job) => (
              <Link
                key={job.id}
                href={`/carrieres/${job.slug ?? job.id}`}
                className="group flex flex-col gap-4 rounded-2xl border border-[var(--border)] bg-[var(--card)] p-6 transition-all hover:-translate-y-1 hover:border-brand-light/50 hover:shadow-card sm:flex-row sm:items-center sm:justify-between"
              >
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    {job.type && (
                      <span className="rounded-full bg-brand-light/10 px-3 py-1 text-xs font-semibold text-brand-blue dark:text-brand-light">
                        {job.type}
                      </span>
                    )}
                    {job.department && (
                      <span className="text-xs font-medium uppercase tracking-wider text-soft">
                        {job.department}
                      </span>
                    )}
                  </div>
                  <h3 className="mt-2 font-display text-xl font-bold">{job.title}</h3>
                  {job.excerpt && (
                    <p className="mt-1 line-clamp-2 text-sm text-soft">{job.excerpt}</p>
                  )}
                  {job.location && (
                    <p className="mt-2 flex items-center gap-1.5 text-sm text-soft">
                      <MapPin className="h-4 w-4 text-brand-light" /> {job.location}
                    </p>
                  )}
                </div>
                <span className="inline-flex shrink-0 items-center gap-1.5 font-semibold text-brand-blue transition-all group-hover:gap-2.5 dark:text-brand-light">
                  Voir l&apos;offre <ArrowRight className="h-4 w-4" />
                </span>
              </Link>
            ))}
          </div>

          {hasMore && (
            <div className="mt-10 text-center">
              <button
                onClick={loadMore}
                disabled={loading}
                className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--card)] px-6 py-3 text-sm font-semibold transition-all hover:border-brand-light/50 hover:shadow-card disabled:opacity-50"
              >
                {loading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <ChevronDown className="h-4 w-4" />
                )}
                {loading ? "Chargement..." : "Voir plus d'offres"}
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
