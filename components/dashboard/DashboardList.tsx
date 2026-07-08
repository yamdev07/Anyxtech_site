import { Plus, Pencil } from "lucide-react";
import DeleteButton from "./DeleteButton";

type Collection = "services" | "jobs" | "partners" | "news" | "testimonials";

export interface ListItem {
  id: string;
  title: string;
  subtitle?: string;
  meta?: string;
}

export default function DashboardList({
  title,
  description,
  items,
  collection,
  path,
  addLabel = "Ajouter",
  emptyText = "Aucun élément pour le moment.",
}: {
  title: string;
  description?: string;
  items: ListItem[];
  collection: Collection;
  path: string;
  addLabel?: string;
  emptyText?: string;
}) {
  const editBase = `/admin/collections/${collection}`;

  return (
    <div className="p-5 md:p-8 lg:p-10 space-y-6">
      <header className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl font-bold sm:text-3xl text-[var(--text)]">{title}</h1>
          {description && <p className="mt-1 text-sm text-[var(--text-soft)]">{description}</p>}
        </div>
        <a
          href={`${editBase}/create`}
          className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-brand-blue to-brand-light px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-brand-blue/20 transition-all hover:-translate-y-0.5 hover:shadow-xl hover:shadow-brand-blue/30"
        >
          <Plus className="h-4 w-4" /> {addLabel}
        </a>
      </header>

      {items.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-[var(--border)] bg-white/60 backdrop-blur-sm p-12 text-center">
          <p className="text-sm text-[var(--text-soft)]">{emptyText}</p>
          <a
            href={`${editBase}/create`}
            className="mt-5 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-brand-blue to-brand-light px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-brand-blue/20 transition-all hover:-translate-y-0.5 hover:shadow-xl hover:shadow-brand-blue/30"
          >
            <Plus className="h-4 w-4" /> {addLabel}
          </a>
        </div>
      ) : (
        <div className="overflow-hidden rounded-2xl border border-[var(--border)] bg-white/70 backdrop-blur-sm">
          <ul className="divide-y divide-[var(--border)]">
            {items.map((it) => (
              <li
                key={it.id}
                className="flex flex-wrap items-center gap-4 px-6 py-4 transition-colors hover:bg-blue-50/60"
              >
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="truncate font-display font-semibold text-[var(--text)]">{it.title}</span>
                    {it.meta && (
                      <span className="shrink-0 rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-brand-blue">
                        {it.meta}
                      </span>
                    )}
                  </div>
                  {it.subtitle && (
                    <p className="mt-0.5 line-clamp-1 text-sm text-[var(--text-soft)]">{it.subtitle}</p>
                  )}
                </div>
                <div className="flex items-center gap-1">
                  <a
                    href={`${editBase}/${it.id}`}
                    className="inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-semibold text-brand-blue transition-colors hover:bg-blue-100"
                  >
                    <Pencil className="h-3.5 w-3.5" /> Modifier
                  </a>
                  <DeleteButton collection={collection} id={it.id} path={path} />
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
