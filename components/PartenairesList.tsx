"use client";

import { useState, useEffect, useCallback } from "react";
import { Handshake, ArrowRight, Globe, Search, Loader2, ChevronDown } from "lucide-react";

interface PartnerDoc {
  id: string | number;
  name: string;
  website?: string | null;
  description?: string | null;
}

export default function PartenairesList() {
  const [partners, setPartners] = useState<PartnerDoc[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [searchInput, setSearchInput] = useState("");

  const LIMIT = 6;

  const fetchPartners = useCallback(async (p: number, q: string, append: boolean) => {
    setLoading(true);
    const params = new URLSearchParams({ page: String(p), limit: String(LIMIT) });
    if (q) params.set("q", q);
    const res = await fetch(`/api/partners?${params}`);
    const data = await res.json();
    const docs = data.docs as PartnerDoc[];
    setPartners((prev) => (append ? [...prev, ...docs] : docs));
    setHasMore(data.hasNextPage ?? false);
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchPartners(1, search, false);
    setPage(1);
  }, [search, fetchPartners]);

  function loadMore() {
    const next = page + 1;
    setPage(next);
    fetchPartners(next, search, true);
  }

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    setSearch(searchInput);
  }

  return (
    <div>
      {/* Search */}
      <form onSubmit={handleSearch} className="mb-10 flex max-w-md mx-auto">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-soft" />
          <input
            type="text"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            placeholder="Rechercher un partenaire..."
            className="form-input pl-11 pr-4"
          />
        </div>
        <button type="submit" className="btn-primary ml-3">
          Rechercher
        </button>
      </form>

      {partners.length === 0 && !loading ? (
        <div className="mx-auto max-w-xl rounded-3xl border border-[var(--border)] bg-soft p-10 text-center">
          <Handshake className="mx-auto h-10 w-10 text-brand-light" />
          <h2 className="mt-4 font-display text-2xl font-bold">Aucun partenaire trouvé</h2>
          <p className="mt-3 text-soft">
            {search ? "Aucun résultat pour cette recherche." : "Aucun partenaire pour le moment."}
          </p>
        </div>
      ) : (
        <>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {partners.map((partner, i) => (
              <div
                key={partner.id}
                className="group rounded-2xl border border-[var(--border)] bg-[var(--card)] p-6 transition-all hover:-translate-y-1 hover:border-brand-light/50 hover:shadow-card"
                style={{ animationDelay: `${i * 50}ms` }}
              >
                {partner.website ? (
                  <a
                    href={partner.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block"
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-brand-light/10 text-brand-light">
                        <Handshake className="h-6 w-6" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <h3 className="font-display text-lg font-bold">{partner.name}</h3>
                        {partner.description && (
                          <p className="mt-1 line-clamp-2 text-sm text-soft">{partner.description}</p>
                        )}
                      </div>
                    </div>
                    <div className="mt-4 flex items-center gap-1.5 text-sm font-semibold text-brand-blue transition-all group-hover:gap-2.5 dark:text-brand-light">
                      <Globe className="h-4 w-4" /> {partner.website?.replace(/^https?:\/\//, "")}
                      <ArrowRight className="h-4 w-4 ml-auto" />
                    </div>
                  </a>
                ) : (
                  <div>
                    <div className="flex items-center gap-3">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-brand-light/10 text-brand-light">
                        <Handshake className="h-6 w-6" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <h3 className="font-display text-lg font-bold">{partner.name}</h3>
                        {partner.description && (
                          <p className="mt-1 line-clamp-2 text-sm text-soft">{partner.description}</p>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>
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
                {loading ? "Chargement..." : "Voir plus de partenaires"}
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
