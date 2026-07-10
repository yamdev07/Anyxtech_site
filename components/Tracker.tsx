"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/** Envoie une visite anonyme à /api/track à chaque changement de page. */
export default function Tracker() {
  const pathname = usePathname();

  useEffect(() => {
    fetch("/api/track", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ path: pathname, referrer: document.referrer || "" }),
      keepalive: true,
    }).catch(() => {});
  }, [pathname]);

  return null;
}
