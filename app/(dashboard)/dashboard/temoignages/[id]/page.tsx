import { notFound } from "next/navigation";
import { getPayloadClient } from "@/lib/payload";
import TestimonialForm from "@/components/dashboard/TestimonialForm";

export const dynamic = "force-dynamic";
export const metadata = { title: "Modifier le témoignage" };

export default async function EditTestimonialPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const payload = await getPayloadClient();

  let testimonial;
  try {
    testimonial = await payload.findByID({ collection: "testimonials", id, depth: 1 });
  } catch {
    notFound();
  }
  if (!testimonial) notFound();

  const avatar = testimonial.avatar as { url?: string } | string | null | undefined;

  return (
    <div className="p-5 md:p-8 lg:p-10">
      <header className="mb-8">
        <h1 className="font-display text-2xl font-bold sm:text-3xl">Modifier le témoignage</h1>
        <p className="mt-1 text-soft">{testimonial.author as string}</p>
      </header>
      <TestimonialForm
        testimonial={{
          id,
          author: testimonial.author as string,
          role: testimonial.role as string,
          company: testimonial.company as string,
          quote: testimonial.quote as string,
          rating: testimonial.rating as number,
          featured: testimonial.featured as boolean,
          avatarUrl: avatar && typeof avatar === "object" ? avatar.url : undefined,
        }}
      />
    </div>
  );
}
