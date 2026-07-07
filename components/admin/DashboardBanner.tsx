export default function DashboardBanner() {
  return (
    <div
      style={{
        position: "relative",
        background: "linear-gradient(135deg, rgba(15,23,42,0.85), rgba(11,17,32,0.95))",
        WebkitBackdropFilter: "blur(24px) saturate(1.5)",
        backdropFilter: "blur(24px) saturate(1.5)",
        border: "1px solid rgba(29,185,255,0.15)",
        borderRadius: "20px",
        padding: "36px 40px",
        marginBottom: "36px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: "24px",
        flexWrap: "wrap",
        overflow: "hidden",
        boxShadow:
          "0 24px 60px -20px rgba(29,185,255,0.2), 0 0 80px -40px rgba(29,185,255,0.1), inset 0 1px 0 rgba(255,255,255,0.05)",
      }}
    >
      {/* Decorative gradient orbs */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          right: "-60px",
          top: "-80px",
          width: "300px",
          height: "300px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(29,185,255,0.18), transparent 70%)",
          filter: "blur(40px)",
          animation: "orb-float 8s ease-in-out infinite",
        }}
      />
      <div
        aria-hidden
        style={{
          position: "absolute",
          left: "-50px",
          bottom: "-70px",
          width: "220px",
          height: "220px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(34,211,238,0.12), transparent 70%)",
          filter: "blur(35px)",
          animation: "orb-float 10s ease-in-out infinite reverse",
        }}
      />
      <div
        aria-hidden
        style={{
          position: "absolute",
          right: "30%",
          bottom: "-40px",
          width: "160px",
          height: "160px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(89,139,255,0.1), transparent 70%)",
          filter: "blur(30px)",
          animation: "orb-float 12s ease-in-out infinite 2s",
        }}
      />

      {/* Grid pattern overlay */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "linear-gradient(rgba(148,163,184,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(148,163,184,0.03) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
          borderRadius: "inherit",
        }}
      />

      <div style={{ display: "flex", alignItems: "center", gap: "20px", position: "relative", zIndex: 1 }}>
        <div
          style={{
            background: "linear-gradient(135deg, #1f429b, #1db9ff)",
            borderRadius: "16px",
            padding: "14px 18px",
            display: "grid",
            placeItems: "center",
            boxShadow: "0 8px 24px -6px rgba(29,185,255,0.5), 0 0 40px -10px rgba(29,185,255,0.3)",
            position: "relative",
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/logo-removebg-preview.png"
            alt="AnyxTech"
            style={{ height: "32px", width: "auto", objectFit: "contain" }}
          />
          <div
            aria-hidden
            style={{
              position: "absolute",
              inset: "-4px",
              borderRadius: "18px",
              background: "linear-gradient(135deg, rgba(29,185,255,0.25), rgba(34,211,238,0.15))",
              filter: "blur(8px)",
              opacity: 0.6,
            }}
          />
        </div>
        <div>
          <div
            style={{
              fontSize: "24px",
              fontWeight: 700,
              lineHeight: 1.2,
              letterSpacing: "-0.02em",
              fontFamily: "'Space Grotesk', 'Poppins', system-ui, sans-serif",
              background: "linear-gradient(120deg, #598bff 0%, #1db9ff 45%, #67e8f9 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Bienvenue sur votre espace AnyxTech
          </div>
          <div
            style={{
              color: "#94a3b8",
              marginTop: "8px",
              fontSize: "14px",
              lineHeight: 1.6,
              fontFamily: "'Poppins', system-ui, sans-serif",
              maxWidth: "480px",
            }}
          >
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
          fontFamily: "'Poppins', system-ui, sans-serif",
          padding: "12px 28px",
          borderRadius: "999px",
          textDecoration: "none",
          whiteSpace: "nowrap",
          boxShadow: "0 8px 24px -6px rgba(29,185,255,0.5)",
          transition: "all 0.3s cubic-bezier(0.22, 1, 0.36, 1)",
          border: "none",
          cursor: "pointer",
        }}
        className="banner-cta"
      >
        Voir le site ↗
      </a>

      <style>{`
        @keyframes orb-float {
          0%, 100% { transform: translateY(0px) scale(1); }
          50% { transform: translateY(-12px) scale(1.05); }
        }
        .banner-cta:hover {
          transform: translateY(-2px) scale(1.02);
          box-shadow: 0 12px 32px -4px rgba(29,185,255,0.7) !important;
        }
      `}</style>
    </div>
  );
}
