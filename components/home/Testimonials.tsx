import { Star, Quote } from "lucide-react";
import { getPayloadClient } from "@/lib/payload";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import AdminEdit from "@/components/admin/AdminEdit";

interface TestimonialDoc {
  id: string | number;
  author: string;
  role?: string | null;
  company?: string | null;
  quote: string;
  rating?: number | null;
}

export default async function Testimonials() {
  const payload = await getPayloadClient();
  const { docs } = await payload.find({
    collection: "testimonials",
    where: { featured: { equals: true } },
    limit: 6,
    depth: 0,
  });
  const items = docs as unknown as TestimonialDoc[];
  if (items.length === 0) return null;

  return (
    <section className="container-x py-20 md:py-28">
      <SectionHeading
        eyebrow="Témoignages"
        title={<>Ils parlent de <span className="text-gradient">nous</span></>}
        subtitle="La satisfaction de nos clients au Bénin est notre meilleure référence."
      />
      <div className="mt-4 text-center">
        <AdminEdit href="/dashboard/edit/testimonials" label="Gérer les témoignages" />
      </div>
      <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {items.map((t, i) => (
          <Reveal key={t.id} delay={i % 3} className="h-full">
            <figure className="flex h-full flex-col rounded-2xl border border-[var(--border)] bg-[var(--card)] p-7 shadow-card">
              <Quote className="h-8 w-8 text-brand-light/40" />
              <div className="mt-3 flex gap-0.5">
                {Array.from({ length: 5 }).map((_, s) => (
                  <Star
                    key={s}
                    className={`h-4 w-4 ${s < (t.rating ?? 5) ? "fill-amber-400 text-amber-400" : "text-[var(--border)]"}`}
                  />
                ))}
              </div>
              <blockquote className="mt-4 flex-1 leading-relaxed text-soft">
                &laquo;&nbsp;{t.quote}&nbsp;&raquo;
              </blockquote>
              <figcaption className="mt-5 border-t border-[var(--border)] pt-4">
                <div className="font-display font-semibold">{t.author}</div>
                <div className="text-sm text-soft">
                  {[t.role, t.company].filter(Boolean).join(" · ")}
                </div>
              </figcaption>
            </figure>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
