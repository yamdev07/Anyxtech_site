export default function DashboardBanner() {
  return (
    <div style={{ position: "relative" }}>
      <div
        style={{
          position: "relative",
          borderRadius: "1rem",
          padding: "2.5rem",
          marginBottom: "24px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "24px",
          flexWrap: "wrap",
          overflow: "hidden",
          background: "linear-gradient(135deg, #4F46E5 0%, #818CF8 50%, #22D3EE 100%)",
          boxShadow: "0 28px 70px -18px rgba(79,70,229,0.4)",
        }}
      >
        <div
          aria-hidden
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(ellipse 60% 80% at 85% 15%, rgba(255,255,255,0.12), transparent)," +
              "radial-gradient(ellipse 40% 60% at 15% 85%, rgba(34,211,238,0.15), transparent)",
            pointerEvents: "none",
          }}
        />
        <div
          aria-hidden
          style={{
            position: "absolute",
            top: "-100px",
            right: "-80px",
            width: "320px",
            height: "320px",
            borderRadius: "50%",
            background: "rgba(255,255,255,0.06)",
            filter: "blur(60px)",
            pointerEvents: "none",
          }}
        />

        <div style={{ display: "flex", alignItems: "center", gap: "20px", position: "relative", zIndex: 1 }}>
          <div
            style={{
              background: "rgba(255,255,255,0.15)",
              backdropFilter: "blur(12px)",
              borderRadius: "16px",
              padding: "14px 18px",
              display: "grid",
              placeItems: "center",
              boxShadow: "0 8px 24px -6px rgba(0,0,0,0.2)",
            }}
          >
            <img
              src="/images/logo-removebg-preview.png"
              alt="AnyxTech"
              style={{ height: "32px", width: "auto", objectFit: "contain" }}
            />
          </div>
          <div>
            <div
              style={{
                fontSize: "24px",
                fontWeight: 800,
                lineHeight: 1.15,
                letterSpacing: "-0.03em",
                fontFamily: "'Space Grotesk', 'Poppins', system-ui, sans-serif",
                color: "#fff",
                textShadow: "0 2px 12px rgba(0,0,0,0.15)",
              }}
            >
              Bienvenue sur votre espace AnyxTech
            </div>
            <div
              style={{
                color: "rgba(255,255,255,0.8)",
                marginTop: "8px",
                fontSize: "14px",
                lineHeight: 1.6,
                maxWidth: "520px",
              }}
            >
              Gérez le contenu de votre site : services, offres d&apos;emploi, partenaires,
              actualités, témoignages et messages reçus.
            </div>
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "10px", position: "relative", zIndex: 1, flexWrap: "wrap" }}>
          <a
            href="/dashboard"
            style={{
              background: "#fff",
              color: "#4F46E5",
              fontWeight: 700,
              fontSize: "13px",
              padding: "11px 24px",
              borderRadius: "12px",
              textDecoration: "none",
              whiteSpace: "nowrap",
              boxShadow: "0 8px 24px -4px rgba(0,0,0,0.2)",
              transition: "all 0.35s cubic-bezier(0.22, 1, 0.36, 1)",
              border: "none",
              cursor: "pointer",
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
            }}
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>
            Dashboard
          </a>
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              background: "rgba(255,255,255,0.12)",
              backdropFilter: "blur(8px)",
              color: "#fff",
              fontWeight: 600,
              fontSize: "13px",
              padding: "11px 24px",
              borderRadius: "12px",
              textDecoration: "none",
              whiteSpace: "nowrap",
              border: "1px solid rgba(255,255,255,0.25)",
              transition: "all 0.35s cubic-bezier(0.22, 1, 0.36, 1)",
              cursor: "pointer",
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
            }}
          >
            Voir le site ↗
          </a>
        </div>
      </div>
    </div>
  );
}
