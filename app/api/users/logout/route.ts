import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import type { NextRequest } from "next/server";

/**
 * GET /api/users/logout
 * Clears all payload-* session cookies and redirects to the login page.
 */
export async function GET(_req: NextRequest) {
  const cookieStore = await cookies();
  const allCookies = cookieStore.getAll();

  for (const { name } of allCookies) {
    if (name.startsWith("payload-")) {
      cookieStore.delete(name);
    }
  }

  redirect("/dashboard/login");
}
