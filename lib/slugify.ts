export function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // accents
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")
    .slice(0, 80);
}

/** Hook Payload réutilisable : renseigne `slug` depuis `titleField` s'il est vide. */
export function autoSlugHook(titleField: string) {
  return ({ data }: { data: Record<string, unknown> }) => {
    if (data && !data.slug && typeof data[titleField] === "string" && data[titleField]) {
      data.slug = slugify(data[titleField] as string);
    }
    return data;
  };
}
