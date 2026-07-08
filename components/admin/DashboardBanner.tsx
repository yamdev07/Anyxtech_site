export default function DashboardBanner() {
  return (
    <div style={{ position: "relative" }}>
      {/* Main banner */}
      <div
        style={{
          position: "relative",
          background: "linear-gradient(135deg, rgba(15,23,42,0.85), rgba(11,17,32,0.95))",
          WebkitBackdropFilter: "blur(24px) saturate(1.5)",
          backdropFilter: "blur(24px) saturate(1.5)",
          border: "1px solid rgba(29,185,255,0.15)",
          borderRadius: "20px",
          padding: "32px 36px",
          marginBottom: "28px",
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
                fontSize: "22px",
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
                marginTop: "6px",
                fontSize: "13px",
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

        <div style={{ display: "flex", alignItems: "center", gap: "10px", position: "relative", zIndex: 1, flexWrap: "wrap" }}>
          <a
            href="/dashboard"
            style={{
              background: "linear-gradient(135deg, #1f429b, #1db9ff)",
              color: "#fff",
              fontWeight: 600,
              fontSize: "13px",
              fontFamily: "'Poppins', system-ui, sans-serif",
              padding: "10px 22px",
              borderRadius: "12px",
              textDecoration: "none",
              whiteSpace: "nowrap",
              boxShadow: "0 6px 20px -4px rgba(29,185,255,0.5)",
              transition: "all 0.3s cubic-bezier(0.22, 1, 0.36, 1)",
              border: "none",
              cursor: "pointer",
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
            }}
            className="banner-btn"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>
            Dashboard
          </a>
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              background: "rgba(29,185,255,0.08)",
              color: "#1db9ff",
              fontWeight: 600,
              fontSize: "13px",
              fontFamily: "'Poppins', system-ui, sans-serif",
              padding: "10px 22px",
              borderRadius: "12px",
              textDecoration: "none",
              whiteSpace: "nowrap",
              border: "1px solid rgba(29,185,255,0.2)",
              transition: "all 0.3s cubic-bezier(0.22, 1, 0.36, 1)",
              cursor: "pointer",
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
            }}
            className="banner-btn-ghost"
          >
            Voir le site ↗
          </a>
        </div>
      </div>

      {/* Quick stats row */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
          gap: "12px",
          marginBottom: "28px",
        }}
      >
        {[
          { label: "Services", icon: "⚙", color: "#1db9ff", href: "/admin/collections/services" },
          { label: "Offres", icon: "💼", color: "#a78bfa", href: "/admin/collections/jobs" },
          { label: "Partenaires", icon: "🤝", color: "#fbbf24", href: "/admin/collections/partners" },
          { label: "Actualités", icon: "📰", color: "#34d399", href: "/admin/collections/news" },
          { label: "Messages", icon: "📬", color: "#f87171", href: "/admin/collections/submissions" },
        ].map((item) => (
          <a
            key={item.label}
            href={item.href}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              padding: "14px 16px",
              borderRadius: "14px",
              background: "rgba(15,23,42,0.55)",
              border: "1px solid rgba(148,163,184,0.1)",
              backdropFilter: "blur(12px)",
              WebkitBackdropFilter: "blur(12px)",
              textDecoration: "none",
              transition: "all 0.3s cubic-bezier(0.22, 1, 0.36, 1)",
              cursor: "pointer",
            }}
            className="quick-stat-card"
          >
            <span
              style={{
                display: "grid",
                placeItems: "center",
                width: "36px",
                height: "36px",
                borderRadius: "10px",
                background: `${item.color}18`,
                fontSize: "16px",
                flexShrink: 0,
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
              style={{ marginLeft: "auto", flexShrink: 0 }}
            >
              <path d="m9 18 6-6-6-6" />
            </svg>
          </a>
        ))}
      </div>

      <style>{`
        @keyframes orb-float {
          0%, 100% { transform: translateY(0px) scale(1); }
          50% { transform: translateY(-12px) scale(1.05); }
        }
        .banner-btn:hover {
          transform: translateY(-2px) scale(1.02) !important;
          box-shadow: 0 12px 32px -4px rgba(29,185,255,0.7) !important;
        }
        .banner-btn-ghost:hover {
          background: rgba(29,185,255,0.15) !important;
          border-color: rgba(29,185,255,0.4) !important;
          box-shadow: 0 4px 16px -4px rgba(29,185,255,0.3) !important;
        }
        .quick-stat-card:hover {
          border-color: rgba(29,185,255,0.3) !important;
          transform: translateY(-2px);
          box-shadow: 0 12px 32px -8px rgba(29,185,255,0.15);
        }
        .quick-stat-card:hover svg:last-child {
          stroke: #1db9ff !important;
        }
      `}</style>
    </div>
  );
}
