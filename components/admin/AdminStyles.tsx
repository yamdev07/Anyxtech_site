export default function AdminStyles() {
  return (
    <style dangerouslySetInnerHTML={{ __html: `
      /* ── AnyxTech Glassmorphic Admin Theme ── */
      @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap');

      :root {
        --anyx-bg: #070b18;
        --anyx-bg-soft: #0b1120;
        --anyx-card: rgba(15, 23, 42, 0.65);
        --anyx-border: rgba(148, 163, 184, 0.12);
        --anyx-border-glow: rgba(29, 185, 255, 0.35);
        --anyx-text: #e2e8f0;
        --anyx-text-soft: #94a3b8;
        --anyx-text-muted: #475569;
        --anyx-blue: #1f429b;
        --anyx-cyan: #1db9ff;
        --anyx-cyan-light: #22d3ee;
      }

      /* Background */
      body, html, .app, [class*="template-default"] {
        background-color: var(--anyx-bg) !important;
        color: var(--anyx-text) !important;
        font-family: 'Inter', system-ui, sans-serif !important;
      }

      /* Aurora background */
      .app::before {
        content: '';
        position: fixed;
        inset: 0;
        pointer-events: none;
        z-index: 0;
        background: radial-gradient(ellipse at 20% 20%, rgba(31,66,155,0.18), transparent 60%),
                    radial-gradient(ellipse at 80% 80%, rgba(29,185,255,0.12), transparent 60%);
        animation: anyx-drift 20s ease-in-out infinite;
      }
      @keyframes anyx-drift {
        0%, 100% { transform: translate(0,0) scale(1); }
        33% { transform: translate(30px, 20px) scale(1.02); }
        66% { transform: translate(-20px, 30px) scale(0.98); }
      }

      /* Sidebar */
      .template-default__nav,
      nav[class*="nav"],
      aside, .nav, .payload-admin__nav {
        background: rgba(7, 11, 24, 0.92) !important;
        backdrop-filter: blur(24px) !important;
        -webkit-backdrop-filter: blur(24px) !important;
        border-right: 1px solid var(--anyx-border) !important;
      }

      /* Nav items */
      .payload-admin__nav-item,
      nav a, nav button, .nav-item,
      [class*="nav"] a, [class*="nav"] button {
        color: var(--anyx-text-soft) !important;
        border-radius: 10px !important;
        transition: all 0.2s ease !important;
        font-size: 13px !important;
        font-weight: 500 !important;
      }
      .payload-admin__nav-item:hover,
      nav a:hover, nav button:hover, .nav-item:hover,
      [class*="nav"] a:hover, [class*="nav"] button:hover {
        background: rgba(29,185,255,0.08) !important;
        color: var(--anyx-text) !important;
      }
      .payload-admin__nav-item--active,
      nav a[class*="active"], nav a[aria-current],
      [class*="nav"] a[class*="active"] {
        background: linear-gradient(90deg, rgba(31,66,155,0.35), rgba(29,185,255,0.12)) !important;
        color: var(--anyx-cyan) !important;
        border: 1px solid rgba(29,185,255,0.2) !important;
      }

      /* Header */
      .app-header, header, [class*="header"] {
        background: rgba(7, 11, 24, 0.85) !important;
        backdrop-filter: blur(20px) !important;
        -webkit-backdrop-filter: blur(20px) !important;
        border-bottom: 1px solid var(--anyx-border) !important;
        color: var(--anyx-text) !important;
      }

      /* Cards & Panels */
      .card, [class*="card"], [class*="panel"], [class*="field"], [class*="group"],
      .list, [class*="list"], [class*="table"], .render-body,
      [class*="document"], [class*="edit"] {
        background: var(--anyx-card) !important;
        border-color: var(--anyx-border) !important;
        color: var(--anyx-text) !important;
        border-radius: 16px !important;
        backdrop-filter: blur(16px) !important;
        -webkit-backdrop-filter: blur(16px) !important;
      }

      /* Input fields */
      input, textarea, select {
        background: rgba(15, 23, 42, 0.5) !important;
        border: 1px solid var(--anyx-border) !important;
        color: var(--anyx-text) !important;
        border-radius: 10px !important;
        transition: border-color 0.2s, box-shadow 0.2s !important;
      }
      input:focus, textarea:focus, select:focus {
        border-color: var(--anyx-border-glow) !important;
        box-shadow: 0 0 0 3px rgba(29,185,255,0.1) !important;
        outline: none !important;
      }
      input::placeholder, textarea::placeholder {
        color: var(--anyx-text-muted) !important;
      }

      /* Buttons */
      .btn, button[type="submit"], [class*="btn-primary"],
      a[class*="btn"], .payload__btn {
        background: linear-gradient(120deg, var(--anyx-blue), var(--anyx-cyan)) !important;
        color: #fff !important;
        border: none !important;
        border-radius: 10px !important;
        font-weight: 600 !important;
        box-shadow: 0 6px 20px -6px rgba(29,185,255,0.5) !important;
        transition: all 0.25s cubic-bezier(0.4,0,0.2,1) !important;
      }
      .btn:hover, button[type="submit"]:hover, [class*="btn-primary"]:hover,
      a[class*="btn"]:hover, .payload__btn:hover {
        transform: translateY(-1px) !important;
        box-shadow: 0 10px 28px -6px rgba(29,185,255,0.7) !important;
      }

      /* Text colors */
      h1, h2, h3, h4, h5, h6, label, .label, [class*="label"] {
        color: var(--anyx-text) !important;
      }
      p, span, div {
        color: inherit;
      }

      /* Scrollbar */
      ::-webkit-scrollbar { width: 6px; }
      ::-webkit-scrollbar-track { background: transparent; }
      ::-webkit-scrollbar-thumb {
        background: linear-gradient(180deg, var(--anyx-blue), var(--anyx-cyan));
        border-radius: 999px;
      }

      /* Links */
      a { color: var(--anyx-cyan) !important; }
      a:hover { color: var(--anyx-cyan-light) !important; }

      /* Selection */
      ::selection {
        background: rgba(29,185,255,0.28) !important;
        color: inherit !important;
      }

      /* Tables */
      table, thead, tbody, tr, td, th {
        border-color: var(--anyx-border) !important;
        color: var(--anyx-text-soft) !important;
      }
      thead th {
        color: var(--anyx-text-muted) !important;
        text-transform: uppercase !important;
        font-size: 11px !important;
        letter-spacing: 0.06em !important;
      }
      tbody tr:hover {
        background: rgba(29,185,255,0.04) !important;
      }

      /* Badge / Status */
      .badge, [class*="status"], [class*="pill"] {
        border-radius: 999px !important;
        font-size: 11px !important;
        font-weight: 600 !important;
      }
    ` }} />
  );
}
