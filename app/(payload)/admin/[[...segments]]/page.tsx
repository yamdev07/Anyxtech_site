/* THIS FILE WAS GENERATED FOR PAYLOAD ADMIN. */
import type { Metadata } from "next";
import { redirect } from "next/navigation";

type Args = {
  params: Promise<{ segments: string[] }>;
  searchParams: Promise<{ [key: string]: string | string[] }>;
};

export const generateMetadata = (): Promise<Metadata> =>
  Promise.resolve({ title: "Tableau de bord" });

const Page = async ({ params }: Args) => {
  const { segments } = await params;
  if (!segments || segments.length === 0) {
    redirect("/dashboard");
  }
  redirect("/dashboard");
};

export default Page;
