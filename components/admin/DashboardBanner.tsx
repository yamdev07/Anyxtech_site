export default function DashboardBanner() {
  return (
    <div style={{ position: "relative" }}>
      {/* ═══ Main hero banner ═══ */}
      <div
        style={{
          position: "relative",
          borderRadius: "20px",
          padding: "36px 40px",
          marginBottom: "24px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "24px",
          flexWrap: "wrap",
          overflow: "hidden",
          background: "linear-gradient(135deg, #1f429b 0%, #1db9ff 55%, #22d3ee 100%)",
          boxShadow: "0 28px 70px -18px rgba(29,185,255,0.45), 0 0 100px -30px rgba(29,185,255,0.15)",
        }}
      >
        {/* Decorative orbs */}
        <div
          aria-hidden
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(ellipse 60% 80% at 85% 15%, rgba(255,255,255,0.18), transparent)," +
              "radial-gradient(ellipse 40% 60% at 15% 85%, rgba(34,211,238,0.25), transparent)",
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
        <div
          aria-hidden
          style={{
            position: "absolute",
            bottom: "-60px",
            left: "20%",
            width: "200px",
            height: "200px",
            borderRadius: "50%",
            background: "rgba(34,211,238,0.15)",
            filter: "blur(50px)",
            pointerEvents: "none",
            animation: "banner-orb 12s ease-in-out infinite",
          }}
        />

        {/* Grid pattern */}
        <div
          aria-hidden
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
            borderRadius: "inherit",
            pointerEvents: "none",
          }}
        />

        {/* Left: logo + text */}
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
              position: "relative",
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/logo-removebg-preview.png"
              alt="AnyxTech"
              style={{ height: "32px", width: "auto", objectFit: "contain", position: "relative", zIndex: 1 }}
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
                fontFamily: "'Poppins', system-ui, sans-serif",
                maxWidth: "520px",
              }}
            >
              Gérez le contenu de votre site : services, offres d&apos;emploi, partenaires,
              actualités, témoignages et messages reçus.
            </div>
          </div>
        </div>

        {/* Right: action buttons */}
        <div style={{ display: "flex", alignItems: "center", gap: "10px", position: "relative", zIndex: 1, flexWrap: "wrap" }}>
          <a
            href="/dashboard"
            style={{
              background: "#fff",
              color: "#1f429b",
              fontWeight: 700,
              fontSize: "13px",
              fontFamily: "'Poppins', system-ui, sans-serif",
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
            className="banner-hero-btn"
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
              fontFamily: "'Poppins', system-ui, sans-serif",
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
            className="banner-ghost-btn"
          >
            Voir le site ↗
          </a>
        </div>
      </div>

      {/* ═══ Quick stat cards ═══ */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(170px, 1fr))",
          gap: "12px",
          marginBottom: "28px",
        }}
      >
        {[
          { label: "Services", icon: "⚙", gradient: "linear-gradient(135deg, #22d3ee, #06b6d4)", href: "/admin/collections/services" },
          { label: "Offres", icon: "💼", gradient: "linear-gradient(135deg, #a78bfa, #7c3aed)", href: "/admin/collections/jobs" },
          { label: "Partenaires", icon: "🤝", gradient: "linear-gradient(135deg, #fbbf24, #f59e0b)", href: "/admin/collections/partners" },
          { label: "Actualités", icon: "📰", gradient: "linear-gradient(135deg, #1db9ff, #1f429b)", href: "/admin/collections/news" },
          { label: "Messages", icon: "📬", gradient: "linear-gradient(135deg, #f87171, #ef4444)", href: "/admin/collections/submissions" },
        ].map((item) => (
          <a
            key={item.label}
            href={item.href}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              padding: "16px 18px",
              borderRadius: "14px",
              background: "rgba(15,23,42,0.45)",
              border: "1px solid rgba(255,255,255,0.06)",
              backdropFilter: "blur(12px)",
              WebkitBackdropFilter: "blur(12px)",
              textDecoration: "none",
              transition: "all 0.35s cubic-bezier(0.22, 1, 0.36, 1)",
              cursor: "pointer",
              position: "relative",
              overflow: "hidden",
            }}
            className="admin-stat-card"
          >
            <span
              style={{
                display: "grid",
                placeItems: "center",
                width: "40px",
                height: "40px",
                borderRadius: "12px",
                background: item.gradient,
                fontSize: "18px",
                flexShrink: 0,
                boxShadow: `0 6px 16px -4px ${item.gradient.includes('#22d3ee') ? 'rgba(34,211,238,0.4)' : item.gradient.includes('#a78bfa') ? 'rgba(167,139,250,0.4)' : item.gradient.includes('#fbbf24') ? 'rgba(251,191,36,0.4)' : item.gradient.includes('#1db9ff') ? 'rgba(29,185,255,0.4)' : 'rgba(248,113,113,0.4)'}`,
              }}
            >
              {item.icon}
            </span>
            <span
              style={{
                fontSize: "13px",
                fontWeight: 600,
                color: "#e2e8f0",
                fontFamily: "'Poppins', system-ui, sans-serif",
              }}
            >
              {item.label}
            </span>
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#475569"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{ marginLeft: "auto", flexShrink: 0, transition: "all 0.3s ease" }}
              className="stat-chevron"
            >
              <path d="m9 18 6-6-6-6" />
            </svg>
          </a>
        ))}
      </div>

      <style>{`
        @keyframes banner-orb {
          0%, 100% { transform: translateY(0) scale(1); }
          50% { transform: translateY(-15px) scale(1.08); }
        }
        .banner-hero-btn {
          transform: translateY(0);
        }
        .banner-hero-btn:hover {
          transform: translateY(-3px) scale(1.03) !important;
          box-shadow: 0 14px 40px -4px rgba(0,0,0,0.3) !important;
        }
        .banner-ghost-btn:hover {
          background: rgba(255,255,255,0.22) !important;
          border-color: rgba(255,255,255,0.45) !important;
          box-shadow: 0 6px 20px -4px rgba(29,185,255,0.3) !important;
          transform: translateY(-2px) !important;
        }
        .admin-stat-card {
          transform: translateY(0);
        }
        .admin-stat-card:hover {
          border-color: rgba(29,185,255,0.3) !important;
          transform: translateY(-4px) !important;
          box-shadow: 0 16px 40px -10px rgba(29,185,255,0.15), inset 0 1px 0 rgba(255,255,255,0.05) !important;
        }
        .admin-stat-card:hover .stat-chevron {
          stroke: #1db9ff !important;
          transform: translateX(2px);
        }
      `}</style>
    </div>
  );
}
