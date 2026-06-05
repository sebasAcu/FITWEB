"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Camera, BarChart2, Brain, History, RefreshCw, BellRing } from "lucide-react";

const FEATURES = [
  { icon: Brain, label: "IA detecta movimientos en tiempo real" },
  { icon: Camera, label: "Cuenta repeticiones automáticamente con la cámara" },
  { icon: History, label: "Guarda pesos y volumen de cada sesión" },
  { icon: BarChart2, label: "Historial completo de entrenamientos" },
  { icon: RefreshCw, label: "Gráficos de progreso semanales y mensuales" },
  { icon: BellRing, label: "Sincronización en tiempo real con la nube" },
];

const SCREENS = [
  {
    id: "home",
    label: "Inicio",
    bg: "from-[#0f1f00] to-[#050505]",
    content: (
      <div className="flex flex-col h-full p-4 pt-10">
        <div className="mb-4">
          <p className="text-white/40 text-[9px] font-inter">Buenos días</p>
          <p className="text-white font-poppins font-bold text-sm">Sebastián 👋</p>
        </div>
        <div className="grid grid-cols-2 gap-2 mb-3">
          {[
            { v: "4", l: "Sesiones" },
            { v: "🔥14", l: "Días racha" },
            { v: "12.4K", l: "Kg vol." },
            { v: "92%", l: "Asistencia" },
          ].map((s) => (
            <div key={s.l} className="rounded-xl p-2.5" style={{ background: "rgba(183,255,60,0.07)", border: "1px solid rgba(183,255,60,0.12)" }}>
              <p className="text-neon font-poppins font-bold text-base leading-none">{s.v}</p>
              <p className="text-white/40 text-[8px] mt-0.5">{s.l}</p>
            </div>
          ))}
        </div>
        <div className="rounded-xl p-2.5 flex-1" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)" }}>
          <p className="text-white/50 text-[9px] mb-2">Hoy · Día 3</p>
          <p className="text-white font-poppins font-semibold text-xs mb-2">Push — Pecho & Tríceps</p>
          {["Press Banca 4×10", "Fondos 3×15", "Press Inclinado 3×12"].map((ex) => (
            <div key={ex} className="flex items-center gap-1.5 py-1">
              <div className="w-1 h-1 rounded-full bg-neon/50" />
              <span className="text-white/60 text-[9px]">{ex}</span>
            </div>
          ))}
        </div>
      </div>
    ),
  },
  {
    id: "ai",
    label: "IA Reps",
    bg: "from-[#001a0f] to-[#050505]",
    content: (
      <div className="flex flex-col h-full p-4 pt-10 items-center">
        <p className="text-white/50 text-[9px] mb-1">Press Banca · Serie 2/4</p>
        <p className="text-white font-poppins font-bold text-xs mb-4">60 kg</p>
        {/* Camera view */}
        <div className="relative w-full aspect-square rounded-2xl overflow-hidden mb-3" style={{ background: "linear-gradient(135deg, #0a1a05, #050505)" }}>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="absolute inset-4 border border-neon/20 rounded-xl" />
            <div className="absolute top-4 left-4 w-6 h-6 border-t-2 border-l-2 border-neon" />
            <div className="absolute top-4 right-4 w-6 h-6 border-t-2 border-r-2 border-neon" />
            <div className="absolute bottom-4 left-4 w-6 h-6 border-b-2 border-l-2 border-neon" />
            <div className="absolute bottom-4 right-4 w-6 h-6 border-b-2 border-r-2 border-neon" />
            {/* Skeleton overlay */}
            <div className="flex flex-col items-center gap-1">
              <div className="w-6 h-6 rounded-full border-2 border-neon/60" />
              <div className="w-8 h-10 border border-neon/40 rounded" />
              <div className="flex gap-2">
                <div className="w-3 h-8 border border-neon/30 rounded" />
                <div className="w-3 h-8 border border-neon/30 rounded" />
              </div>
            </div>
          </div>
          <div className="absolute top-2 left-2 glass-neon rounded-lg px-2 py-1">
            <span className="text-neon text-[8px] font-bold">🤖 IA ON</span>
          </div>
        </div>
        {/* Counter */}
        <div className="relative w-20 h-20 mb-3">
          <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
            <circle cx="50" cy="50" r="42" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="7" />
            <circle cx="50" cy="50" r="42" fill="none" stroke="#B7FF3C" strokeWidth="7"
              strokeLinecap="round"
              strokeDasharray={`${2 * Math.PI * 42}`}
              strokeDashoffset={`${2 * Math.PI * 42 * 0.25}`}
              style={{ filter: "drop-shadow(0 0 8px #B7FF3C)" }}
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="font-poppins font-black text-3xl text-neon leading-none">8</span>
            <span className="text-white/30 text-[9px]">/ 10</span>
          </div>
        </div>
        <div className="flex gap-2">
          <div className="glass rounded-lg px-2 py-1 text-center">
            <p className="text-neon font-bold text-xs">Buena</p>
            <p className="text-white/30 text-[8px]">Forma</p>
          </div>
          <div className="glass rounded-lg px-2 py-1 text-center">
            <p className="text-white font-bold text-xs">1.2s</p>
            <p className="text-white/30 text-[8px]">Tempo</p>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: "stats",
    label: "Progreso",
    bg: "from-[#0a0a1a] to-[#050505]",
    content: (
      <div className="flex flex-col h-full p-4 pt-10">
        <p className="text-white font-poppins font-bold text-sm mb-1">Dashboard</p>
        <p className="text-white/40 text-[9px] mb-3">Últimas 4 semanas</p>
        {/* Progress chart */}
        <div className="rounded-xl p-3 mb-3" style={{ background: "rgba(183,255,60,0.04)", border: "1px solid rgba(183,255,60,0.1)" }}>
          <div className="flex justify-between items-end h-16 gap-1">
            {[55, 70, 60, 85, 72, 90, 80].map((h, i) => (
              <div key={i} className="flex-1 rounded-sm relative" style={{
                height: `${h}%`,
                background: i === 5 ? "linear-gradient(180deg, #B7FF3C, #7DD100)" : "rgba(183,255,60,0.15)",
              }}>
                {i === 5 && <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-neon rounded-full" style={{ boxShadow: "0 0 6px #B7FF3C" }} />}
              </div>
            ))}
          </div>
          <div className="flex justify-between mt-1">
            {["L","M","X","J","V","S","D"].map((d) => (
              <span key={d} className="flex-1 text-center text-[7px] text-white/20">{d}</span>
            ))}
          </div>
        </div>
        {/* Metrics */}
        {[
          { label: "Fuerza", value: "+12%", up: true },
          { label: "Resistencia", value: "+8%", up: true },
          { label: "Masa muscular", value: "+2.3 kg", up: true },
        ].map((m) => (
          <div key={m.label} className="flex items-center justify-between py-2 border-b border-white/5 last:border-0">
            <span className="text-white/60 text-[9px] font-inter">{m.label}</span>
            <span className="text-neon font-poppins font-bold text-[10px]">↑ {m.value}</span>
          </div>
        ))}
      </div>
    ),
  },
];

export default function AppSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="app" ref={ref} className="py-24 lg:py-32 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-dark via-dark-2 to-dark" />
        <div className="absolute top-0 left-0 right-0 h-px neon-line opacity-30" />
        <div className="absolute bottom-0 left-0 right-0 h-px neon-line opacity-30" />
        <div className="absolute top-1/2 left-0 w-96 h-96 bg-neon/5 rounded-full blur-[120px] -translate-y-1/2" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: copy */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7 }}
          >
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1 }}
              className="inline-block text-neon font-inter font-semibold text-sm tracking-widest uppercase mb-4"
            >
              — Aplicación FitCore
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.15 }}
              className="font-poppins font-black text-4xl sm:text-5xl lg:text-6xl text-white leading-tight mb-6"
            >
              Tu entrenador
              <br />
              <span className="text-gradient">en el bolsillo</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2 }}
              className="text-white/60 text-lg leading-relaxed mb-10 max-w-lg"
            >
              FitCore App combina inteligencia artificial con tu rutina de entrenamiento.
              Deja que la tecnología cuente tus reps mientras tú te enfocas en el rendimiento.
            </motion.p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
              {FEATURES.map((feat, i) => (
                <motion.div
                  key={feat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.25 + i * 0.07 }}
                  className="flex items-start gap-3 group"
                >
                  <div className="w-9 h-9 rounded-xl bg-neon/10 border border-neon/20 flex items-center justify-center flex-shrink-0 group-hover:bg-neon/20 group-hover:border-neon/40 transition-all duration-300">
                    <feat.icon className="w-4 h-4 text-neon" />
                  </div>
                  <span className="text-sm text-white/70 font-inter leading-tight pt-1">{feat.label}</span>
                </motion.div>
              ))}
            </div>

            {/* Download buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <AppStoreButton store="apple" />
              <AppStoreButton store="google" />
            </motion.div>
          </motion.div>

          {/* Right: 3 floating phones */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative flex justify-center items-center min-h-[520px]"
          >
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-72 h-72 bg-neon/8 rounded-full blur-[100px]" />
            </div>

            {/* Left phone */}
            <div className="absolute left-0 top-8 z-10 animate-float-delay" style={{ transform: "rotate(-8deg) scale(0.85)" }}>
              <SmallPhone screen={SCREENS[0]} />
            </div>

            {/* Center phone */}
            <div className="relative z-20 animate-float">
              <SmallPhone screen={SCREENS[1]} large />
            </div>

            {/* Right phone */}
            <div className="absolute right-0 top-8 z-10 animate-float-delay2" style={{ transform: "rotate(8deg) scale(0.85)" }}>
              <SmallPhone screen={SCREENS[2]} />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function SmallPhone({ screen, large = false }: { screen: typeof SCREENS[number]; large?: boolean }) {
  const w = large ? "w-52" : "w-44";
  const h = large ? "h-[440px]" : "h-[370px]";
  return (
    <div
      className={`${w} ${h} rounded-[2rem] overflow-hidden relative`}
      style={{
        background: "linear-gradient(160deg, #181818, #0a0a0a)",
        border: large ? "2px solid rgba(183,255,60,0.35)" : "1.5px solid rgba(255,255,255,0.08)",
        boxShadow: large
          ? "0 40px 100px rgba(0,0,0,0.8), 0 0 40px rgba(183,255,60,0.1)"
          : "0 20px 60px rgba(0,0,0,0.7)",
      }}
    >
      {/* Dynamic island */}
      <div className="absolute top-2.5 left-1/2 -translate-x-1/2 w-14 h-3.5 bg-black rounded-full z-10 flex items-center justify-center gap-1">
        <div className="w-2 h-2 rounded-full bg-[#1a1a1a]" />
        <div className="w-1 h-1 rounded-full bg-[#333]" />
      </div>
      <div className={`absolute inset-0 bg-gradient-to-b ${screen.bg}`} />
      {screen.content}
      {/* Home indicator */}
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-16 h-1 bg-white/15 rounded-full" />
    </div>
  );
}

function AppStoreButton({ store }: { store: "apple" | "google" }) {
  return (
    <motion.button
      whileHover={{ scale: 1.03, y: -2 }}
      whileTap={{ scale: 0.97 }}
      className="flex items-center gap-3 glass border border-white/10 hover:border-neon/30 rounded-2xl px-5 py-3 transition-all duration-300 cursor-pointer group"
    >
      <div className="text-white/80 group-hover:text-white transition-colors">
        {store === "apple" ? (
          <svg viewBox="0 0 24 24" className="w-7 h-7" fill="currentColor">
            <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
          </svg>
        ) : (
          <svg viewBox="0 0 24 24" className="w-7 h-7" fill="currentColor">
            <path d="M3.18 23.76c.3.17.65.19.96.06l11.79-6.9-2.61-2.61-10.14 9.45zM.5 1.28C.19 1.6 0 2.1 0 2.73v18.54c0 .63.19 1.13.5 1.45l.08.07 10.39-10.39v-.24L.58 1.21.5 1.28zM19.43 10.2l-2.95-1.73-2.94 2.94 2.94 2.94 2.95-1.73c.84-.49.84-1.39 0-1.88v.46zM4.14.24L15.93 7.14l-2.61 2.61L3.18.3C3.49.17 3.84.11 4.14.24z" />
          </svg>
        )}
      </div>
      <div className="text-left">
        <p className="text-white/50 text-[10px] font-inter leading-none">
          {store === "apple" ? "Disponible en" : "Descárgalo en"}
        </p>
        <p className="text-white font-poppins font-bold text-sm mt-0.5 leading-none">
          {store === "apple" ? "App Store" : "Google Play"}
        </p>
      </div>
    </motion.button>
  );
}
