import { services } from "@/lib/services";

const outer = services.slice(0, 3);
const inner = services.slice(3, 6);

export default function OrbitSystem() {
  return (
    <div className="relative mx-auto aspect-square w-full max-w-[520px]">
      {/* Anneaux */}
      <div className="absolute inset-0 rounded-full border border-white/10" />
      <div className="absolute inset-[70px] rounded-full border border-white/10" />
      <div className="absolute inset-[140px] rounded-full border border-dashed border-white/10" />

      {/* Halo central */}
      <div className="absolute inset-0 grid place-items-center">
        <div className="absolute h-52 w-52 rounded-full bg-brand-blue/25 blur-3xl" />
        <div
          className="relative grid h-28 w-28 place-items-center rounded-3xl bg-gradient-to-br from-brand-blue to-brand-light text-white shadow-[0_0_50px_rgba(29,185,255,0.6)]"
          style={{ animation: "pulse-glow 3s ease-in-out infinite" }}
        >
          <span className="font-display text-4xl font-bold">A</span>
        </div>
      </div>

      {/* Anneau externe rotatif */}
      <div className="absolute inset-0" style={{ animation: "spin-slow 26s linear infinite" }}>
        {outer.map((s, i) => {
          const Icon = s.icon;
          return (
            <div
              key={s.slug}
              className="absolute inset-0"
              style={{ transform: `rotate(${i * 120}deg)` }}
            >
              <div className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2">
                <div
                  style={{ animation: "spin-slow 26s linear infinite reverse", transform: `rotate(${-i * 120}deg)` }}
                >
                  <div className={`grid h-14 w-14 place-items-center rounded-2xl border border-white/10 bg-gradient-to-br ${s.color} text-white shadow-[0_0_25px_rgba(29,185,255,0.4)]`}>
                    <Icon className="h-6 w-6" />
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Anneau interne rotatif (sens inverse) */}
      <div className="absolute inset-[70px]" style={{ animation: "spin-slow 20s linear infinite reverse" }}>
        {inner.map((s, i) => {
          const Icon = s.icon;
          return (
            <div
              key={s.slug}
              className="absolute inset-0"
              style={{ transform: `rotate(${i * 120 + 60}deg)` }}
            >
              <div className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2">
                <div style={{ animation: "spin-slow 20s linear infinite", transform: `rotate(${-i * 120 - 60}deg)` }}>
                  <div className={`grid h-11 w-11 place-items-center rounded-xl border border-white/10 bg-gradient-to-br ${s.color} text-white shadow-[0_0_20px_rgba(29,185,255,0.4)]`}>
                    <Icon className="h-5 w-5" />
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
