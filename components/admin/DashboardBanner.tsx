export default function DashboardBanner() {
  return (
    <div
      style={{
        position: "relative",
        background: "linear-gradient(135deg, rgba(15,23,42,0.8), rgba(11,17,32,0.9))",
        WebkitBackdropFilter: "blur(20px) saturate(1.5)",
        backdropFilter: "blur(20px) saturate(1.5)",
        border: "1px solid rgba(29,185,255,0.15)",
        borderRadius: "20px",
        padding: "32px 36px",
        marginBottom: "32px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: "24px",
        flexWrap: "wrap",
        overflow: "hidden",
        boxShadow: "0 24px 60px -20px rgba(29,185,255,0.2), inset 0 1px 0 rgba(255,255,255,0.04)",
      }}
    >
      {/* Decorative gradient orbs */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          right: "-60px",
          top: "-80px",
          width: "280px",
          height: "280px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(29,185,255,0.15), transparent 70%)",
          filter: "blur(40px)",
        }}
      />
      <div
        aria-hidden
        style={{
          position: "absolute",
          left: "-40px",
          bottom: "-60px",
          width: "200px",
          height: "200px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(34,211,238,0.1), transparent 70%)",
          filter: "blur(30px)",
        }}
      />

      {/* Grid pattern overlay */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "linear-gradient(rgba(148,163,184,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(148,163,184,0.04) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
          borderRadius: "inherit",
        }}
      />

      <div style={{ display: "flex", alignItems: "center", gap: "18px", position: "relative", zIndex: 1 }}>
        <div
          style={{
            background: "linear-gradient(135deg, #1f429b, #1db9ff)",
            borderRadius: "14px",
            padding: "12px 16px",
            display: "grid",
            placeItems: "center",
            boxShadow: "0 8px 24px -6px rgba(29,185,255,0.5)",
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/logo-removebg-preview.png"
            alt="AnyxTech"
            style={{ height: "32px", width: "auto", objectFit: "contain" }}
          />
        </div>
        <div>
          <div
            style={{
              fontSize: "22px",
              fontWeight: 700,
              lineHeight: 1.2,
              letterSpacing: "-0.01em",
              background: "linear-gradient(120deg, #598bff, #1db9ff, #67e8f9)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Bienvenue sur votre espace AnyxTech
          </div>
          <div style={{ color: "#94a3b8", marginTop: "6px", fontSize: "14px", lineHeight: 1.5 }}>
            Gérez le contenu de votre site : services, offres d&apos;emploi, partenaires,
            actualités, témoignages et messages reçus.
          </div>
        </div>
      </div>
      <a
        href="/"
        target="_blank"
        rel="noopener noreferrer"
        style={{
          position: "relative",
          zIndex: 1,
          background: "linear-gradient(135deg, #1f429b, #1db9ff)",
          color: "#fff",
          fontWeight: 600,
          fontSize: "14px",
          padding: "12px 24px",
          borderRadius: "999px",
          textDecoration: "none",
          whiteSpace: "nowrap",
          boxShadow: "0 8px 24px -6px rgba(29,185,255,0.5)",
          transition: "all 0.3s cubic-bezier(0.22, 1, 0.36, 1)",
        }}
      >
        Voir le site ↗
      </a>
    </div>
  );
}
