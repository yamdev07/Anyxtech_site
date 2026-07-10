"use client";

import { useState, useEffect, useCallback } from "react";
import { Eye, Globe, Monitor, Clock, ExternalLink, Loader2, ChevronDown } from "lucide-react";

interface VisitDoc {
  path?: string | null;
  ip?: string | null;
  userAgent?: string | null;
  country?: string | null;
  referrer?: string | null;
  createdAt?: string | null;
}

function fmt(d?: string | null) {
  if (!d) return "";
  return new Date(d).toLocaleDateString("fr-FR", { day: "numeric", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" });
}

function timeAgo(d: string) {
  const diff = Date.now() - new Date(d).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return "à l'instant";
  if (mins < 60) return `il y a ${mins}min`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `il y a ${hours}h`;
  return `il y a ${Math.floor(hours / 24)}j`;
}

function parseUA(ua?: string | null) {
  if (!ua) return { browser: "Inconnu", os: "Inconnu" };
  let browser = "Autre";
  if (ua.includes("Firefox")) browser = "Firefox";
  else if (ua.includes("Edg")) browser = "Edge";
  else if (ua.includes("Chrome")) browser = "Chrome";
  else if (ua.includes("Safari")) browser = "Safari";
  let os = "Autre";
  if (ua.includes("Windows")) os = "Windows";
  else if (ua.includes("Mac OS")) os = "macOS";
  else if (ua.includes("Linux")) os = "Linux";
  else if (ua.includes("Android")) os = "Android";
  else if (ua.includes("iPhone") || ua.includes("iPad")) os = "iOS";
  return { browser, os };
}

export default function ActiviteList() {
  const [visits, setVisits] = useState<VisitDoc[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const LIMIT = 20;

  const fetchData = useCallback(async (p: number, append: boolean) => {
    setLoading(true);
    const res = await fetch(`/api/visitors?page=${p}&limit=${LIMIT}`);
    const data = await res.json();
    setVisits((prev) => (append ? [...prev, ...data.docs] : data.docs));
    setHasMore(data.hasNextPage ?? false);
    setLoading(false);
  }, []);

  useEffect(() => { fetchData(1, false); }, [fetchData]);

  function loadMore() {
    const next = page + 1;
    setPage(next);
    fetchData(next, true);
  }

  if (visits.length === 0 && !loading) {
    return <div className="p-12 text-center text-sm text-gray-400">Aucune visite enregistrée.</div>;
  }

  return (
    <div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-white/10 text-left text-xs font-bold uppercase tracking-wider text-gray-500">
              <th className="px-6 py-3">Heure</th>
              <th className="px-6 py-3">Page</th>
              <th className="px-6 py-3">IP</th>
              <th className="px-6 py-3">Pays</th>
              <th className="px-6 py-3">Navigateur</th>
              <th className="px-6 py-3">Système</th>
              <th className="px-6 py-3">Référent</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {visits.map((v, i) => {
              const ua = parseUA(v.userAgent);
              return (
                <tr key={i} className="transition-colors hover:bg-white/[0.02]">
                  <td className="px-6 py-3 whitespace-nowrap">
                    <div className="text-white font-medium">{fmt(v.createdAt)}</div>
                    <div className="text-xs text-gray-500">{v.createdAt ? timeAgo(v.createdAt) : ""}</div>
                  </td>
                  <td className="px-6 py-3">
                    <a href={`/${(v.path || "").replace(/^\//, "")}`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-indigo-400 hover:text-indigo-300 font-medium transition-colors">
                      {v.path || "/"} <ExternalLink className="h-3 w-3" />
                    </a>
                  </td>
                  <td className="px-6 py-3 whitespace-nowrap">
                    {v.ip ? <span className="rounded-full bg-white/10 px-2.5 py-0.5 font-mono text-xs text-gray-300">{v.ip}</span> : <span className="text-gray-600">—</span>}
                  </td>
                  <td className="px-6 py-3 whitespace-nowrap text-gray-300">
                    {v.country ? <span className="flex items-center gap-1.5"><Globe className="h-3.5 w-3.5 text-gray-500" />{v.country}</span> : <span className="text-gray-600">—</span>}
                  </td>
                  <td className="px-6 py-3 whitespace-nowrap">
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-white/5 px-2.5 py-0.5 text-xs font-medium text-gray-300"><Monitor className="h-3 w-3 text-gray-500" />{ua.browser}</span>
                  </td>
                  <td className="px-6 py-3 whitespace-nowrap text-xs text-gray-400">{ua.os}</td>
                  <td className="px-6 py-3 whitespace-nowrap text-xs text-gray-500 max-w-[150px] truncate">
                    {v.referrer ? <span title={v.referrer}>{v.referrer.replace(/^https?:\/\//, "").split("/")[0]}</span> : <span className="text-gray-600">—</span>}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      {hasMore && (
        <div className="p-6 text-center">
          <button onClick={loadMore} disabled={loading} className="inline-flex items-center gap-2 rounded-xl bg-white px-5 py-2.5 text-sm font-bold text-indigo-600 shadow-lg transition-all hover:-translate-y-0.5 hover:shadow-xl disabled:opacity-50">
            {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <ChevronDown className="h-4 w-4" />}
            {loading ? "Chargement..." : "Charger plus"}
          </button>
        </div>
      )}
    </div>
  );
}
