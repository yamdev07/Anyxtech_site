/* Bannière d'accueil de marque affichée en haut du tableau de bord Payload. */
export default function DashboardBanner() {
  return (
    <div
      style={{
        background: "linear-gradient(120deg, #1f429b 0%, #1db9ff 100%)",
        color: "#fff",
        borderRadius: "18px",
        padding: "28px 32px",
        marginBottom: "28px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: "24px",
        flexWrap: "wrap",
        boxShadow: "0 24px 48px -22px rgba(29,185,255,0.65)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        aria-hidden
        style={{
          position: "absolute",
          right: "-40px",
          top: "-60px",
          width: "220px",
          height: "220px",
          borderRadius: "50%",
          background: "rgba(255,255,255,0.12)",
        }}
      />
      <div style={{ display: "flex", alignItems: "center", gap: "18px", position: "relative" }}>
        <div
          style={{
            background: "#fff",
            borderRadius: "14px",
            padding: "10px 14px",
            display: "grid",
            placeItems: "center",
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/logo-removebg-preview.png"
            alt="AnyxTech"
            style={{ height: "34px", width: "auto", objectFit: "contain" }}
          />
        </div>
        <div>
          <div style={{ fontSize: "22px", fontWeight: 700, lineHeight: 1.2 }}>
            Bienvenue sur votre espace AnyxTech 👋
          </div>
          <div style={{ opacity: 0.9, marginTop: "4px", fontSize: "14px" }}>
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
          background: "#fff",
          color: "#1f429b",
          fontWeight: 600,
          fontSize: "14px",
          padding: "11px 20px",
          borderRadius: "999px",
          textDecoration: "none",
          whiteSpace: "nowrap",
        }}
      >
        Voir le site ↗
      </a>
    </div>
  );
}
