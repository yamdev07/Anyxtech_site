/* THIS FILE WAS GENERATED FOR PAYLOAD ADMIN. */
import { redirect } from "next/navigation";

type Args = {
  params: Promise<{ segments: string[] }>;
  searchParams: Promise<{ [key: string]: string | string[] }>;
};

const NotFound = async () => {
  redirect("/dashboard");
};

export default NotFound;
