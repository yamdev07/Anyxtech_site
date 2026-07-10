/* THIS FILE WAS GENERATED FOR PAYLOAD ADMIN. */
import type { Metadata } from "next";
import { redirect } from "next/navigation";

export const generateMetadata = (): Promise<Metadata> =>
  Promise.resolve({ title: "Tableau de bord" });

const Page = async () => {
  redirect("/dashboard/login");
};

export default Page;
