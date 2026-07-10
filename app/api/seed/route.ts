import { NextResponse } from "next/server";
import config from "@payload-config";
import { getPayload } from "payload";

export const dynamic = "force-dynamic";

export async function GET() {
  const payload = await getPayload({ config });

  const partners = [
    { name: "Moov Africa", website: "https://moov-africa.bj", description: "Opérateur de télécommunications au Bénin", order: 1, showOnSite: true },
    { name: "MTN Bénin", website: "https://mtn.com/benin", description: "Réseau mobile et services numériques", order: 2, showOnSite: true },
    { name: "Celtis Bénin", website: "https://celtisinternational.com", description: "Solutions de paiement mobile", order: 3, showOnSite: true },
    { name: "EtriLabs", website: "https://etrilabs.com", description: "Incubateur et accélérateur tech au Bénin", order: 4, showOnSite: true },
    { name: "Joko", website: "https://joko.bj", description: "Plateforme de services numériques", order: 5, showOnSite: true },
    { name: "PayerNet", website: "https://payernet.com", description: "Solutions de paiement électronique", order: 6, showOnSite: true },
  ];

  const jobs = [
    {
      title: "Développeur Web Full Stack",
      slug: "developpeur-web-full-stack",
      location: "Cotonou, Bénin",
      type: "CDI",
      department: "Technologie",
      excerpt: "Rejoignez notre équipe technique pour développer des solutions web innovantes utilisant Next.js, React et Node.js.",
      status: "open" as const,
      showOnSite: true,
      publishedAt: new Date().toISOString(),
    },
    {
      title: "Ingénieur Réseau & Systèmes",
      slug: "ingenieur-reseau-systemes",
      location: "Cotonou, Bénin",
      type: "CDI",
      department: "Infrastructure",
      excerpt: "Concevez et maintenez les infrastructures réseau et serveurs de nos clients entreprise au Bénin.",
      status: "open" as const,
      showOnSite: true,
      publishedAt: new Date().toISOString(),
    },
    {
      title: "Chargé de Communication Digitale",
      slug: "charge-communication-digitale",
      location: "Cotonou, Bénin",
      type: "CDD",
      department: "Marketing",
      excerpt: "Pilotez la stratégie de communication digitale et les campagnes publicitaires de nos clients.",
      status: "open" as const,
      showOnSite: true,
      publishedAt: new Date().toISOString(),
    },
    {
      title: "Stage en Développement Mobile",
      slug: "stage-developpement-mobile",
      location: "Cotonou, Bénin",
      type: "Stage",
      department: "Technologie",
      excerpt: "Stage de 6 mois en développement d'applications mobiles avec React Native et Flutter.",
      status: "open" as const,
      showOnSite: true,
      publishedAt: new Date().toISOString(),
    },
  ];

  let partnerCount = 0;
  for (const p of partners) {
    const existing = await payload.find({ collection: "partners", where: { name: { equals: p.name } }, limit: 1 });
    if (existing.docs.length === 0) {
      await payload.create({ collection: "partners", data: p });
      partnerCount++;
    }
  }

  let jobCount = 0;
  for (const j of jobs) {
    const existing = await payload.find({ collection: "jobs", where: { slug: { equals: j.slug } }, limit: 1 });
    if (existing.docs.length === 0) {
      await payload.create({ collection: "jobs", data: j });
      jobCount++;
    }
  }

  return NextResponse.json({ ok: true, partners: partnerCount, jobs: jobCount });
}
