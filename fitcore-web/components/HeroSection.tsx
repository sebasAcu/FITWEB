"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, CheckCircle2, ChevronDown, Dumbbell } from "lucide-react";

const FEATURES = [
  "Rutinas Inteligentes con IA",
  "Rutinas Personalizadas con IA",
  "Seguimiento de Progreso",
  "Estadísticas Avanzadas",
  "Recordatorios Automáticos",
];

const PHONE_SCREENS = [
  {
    title: "Rutina del Día",
    icon: "💪",
    content: [
      { name: "Sentadillas", sets: "4×12", done: true },
      { name: "Press Banca", sets: "3×10", done: true },
      { name: "Peso Muerto", sets: "4×8", done: false },
      { name: "Remo Barra", sets: "3×12", done: false },
    ],
  },
  {
    title: "IA Conteo Reps",
    icon: "🤖",
    reps: 8,
    total: 12,
    exercise: "Curl Bíceps",
  },
  {
    title: "Progreso",
    icon: "📈",
    stats: [
      { label: "Esta Semana", value: "4 sesiones" },
      { label: "Volumen", value: "12,400 kg" },
      { label: "Racha", value: "🔥 14 días" },
    ],
  },
];

export default function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  const yParallax = useTransform(scrollY, [0, 600], [0, 120]);
  const opacityParallax = useTransform(scrollY, [0, 400], [1, 0]);

  return (
    <section
      id="inicio"
      ref={containerRef}
      className="relative min-h-screen flex items-center pt-20 overflow-hidden"
    >
      {/* Background video */}
      <div className="absolute inset-0 z-0">
        {/* Video */}
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
          style={{ opacity: 0.25 }}
        >
          <source src="/gym.mp4" type="video/mp4" />
        </video>
        {/* Overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#050505]/60 via-[#050505]/50 to-[#050505] z-10" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(183,255,60,0.06)_0%,_transparent_70%)] z-10" />
        {/* Animated orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-neon/5 rounded-full blur-[120px] animate-float z-10" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-neon/3 rounded-full blur-[100px] animate-float-delay z-10" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center py-4 lg:py-8">
          {/* Left: Text content */}
          <motion.div style={{ y: yParallax, opacity: opacityParallax }}>
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 glass-neon rounded-full px-4 py-2 mb-8"
            >
              <span className="w-2 h-2 bg-neon rounded-full animate-pulse" />
              <span className="text-xs font-inter font-semibold text-neon tracking-widest uppercase">
                Tecnología IA · Fitness Premium
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="font-poppins font-black leading-[1.05] mb-6"
            >
              <span className="block text-4xl sm:text-5xl lg:text-6xl xl:text-7xl text-white">
                ¿Listo para
              </span>
              <span className="block text-4xl sm:text-5xl lg:text-6xl xl:text-7xl text-white">
                convertirte en
              </span>
              <span className="block text-4xl sm:text-5xl lg:text-6xl xl:text-7xl text-gradient glow-text">
                tu mejor versión?
              </span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-white/60 text-lg sm:text-xl font-inter leading-relaxed mb-10 max-w-lg"
            >
              No solo transformamos tu cuerpo.
              <br />
              <span className="text-white/80 font-medium">
                Transformamos tu disciplina.
              </span>
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-col sm:flex-row flex-wrap gap-4 mb-12"
            >
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: "0 0 40px rgba(183,255,60,0.5)" }}
                whileTap={{ scale: 0.97 }}
                onClick={() => document.querySelector("#planes")?.scrollIntoView({ behavior: "smooth" })}
                className="group flex items-center justify-center gap-2 bg-neon text-dark font-poppins font-bold text-base px-8 py-4 rounded-full transition-all duration-300 cursor-pointer"
              >
                Comenzar Ahora
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </motion.button>
              <Link href="/rutina">
                <motion.div
                  whileHover={{ scale: 1.03, boxShadow: "0 0 24px rgba(183,255,60,0.2)" }}
                  whileTap={{ scale: 0.97 }}
                  className="group flex items-center justify-center gap-2 border border-neon/40 hover:border-neon/80 hover:bg-neon/10 text-neon font-poppins font-semibold text-base px-8 py-4 rounded-full transition-all duration-300 cursor-pointer"
                >
                  <Dumbbell className="w-5 h-5" />
                  Crear Rutina
                </motion.div>
              </Link>
            </motion.div>

            {/* Feature list */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="flex flex-col gap-2"
            >
              {FEATURES.map((feat, i) => (
                <motion.div
                  key={feat}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 + i * 0.08 }}
                  className="flex items-center gap-3"
                >
                  <CheckCircle2 className="w-4 h-4 text-neon flex-shrink-0" />
                  <span className="text-sm text-white/70 font-inter">{feat}</span>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right: Phone mockups */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, delay: 0.2, ease: "easeOut" }}
            className="relative flex justify-center items-center"
          >
            {/* Glow orb behind phones */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-80 h-80 bg-neon/10 rounded-full blur-[80px] animate-glow-pulse" />
            </div>

            {/* Central phone */}
            <div className="relative z-20 animate-float">
              <PhoneMockup screen={PHONE_SCREENS[0]} primary />
            </div>

            {/* Left phone */}
            <div className="absolute -left-4 lg:-left-12 top-8 z-10 scale-[0.82] origin-right animate-float-delay hidden sm:block">
              <PhoneMockup screen={PHONE_SCREENS[1]} />
            </div>

            {/* Right phone */}
            <div className="absolute -right-4 lg:-right-12 top-8 z-10 scale-[0.82] origin-left animate-float-delay2 hidden sm:block">
              <PhoneMockup screen={PHONE_SCREENS[2]} />
            </div>

            {/* Floating stat pills */}
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="flex justify-center pb-8"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="flex flex-col items-center gap-2 text-white/30 cursor-pointer"
            onClick={() => document.querySelector("#app")?.scrollIntoView({ behavior: "smooth" })}
          >
            <span className="text-xs font-inter tracking-widest uppercase">Descubrir más</span>
            <ChevronDown className="w-5 h-5" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

function PhoneMockup({
  screen,
  primary = false,
}: {
  screen: (typeof PHONE_SCREENS)[number];
  primary?: boolean;
}) {
  return (
    <div
      className={`relative rounded-[2.5rem] overflow-hidden ${
        primary ? "w-56 h-[480px] shadow-[0_30px_80px_rgba(0,0,0,0.8)]" : "w-48 h-[400px]"
      }`}
      style={{
        background: "linear-gradient(160deg, #1a1a1a 0%, #0d0d0d 100%)",
        border: primary ? "2px solid rgba(183,255,60,0.3)" : "1.5px solid rgba(255,255,255,0.08)",
        boxShadow: primary
          ? "0 0 40px rgba(183,255,60,0.15), inset 0 1px 0 rgba(255,255,255,0.1)"
          : "0 20px 60px rgba(0,0,0,0.6)",
      }}
    >
      {/* Notch */}
      <div className="absolute top-3 left-1/2 -translate-x-1/2 w-16 h-4 bg-black rounded-full z-10" />

      {/* Screen content */}
      <div className="absolute inset-0 p-4 pt-10 flex flex-col">
        {/* Status bar */}
        <div className="flex justify-between items-center mb-3">
          <span className="text-[10px] text-white/40 font-inter">9:41</span>
          <span className="text-[10px] text-neon font-inter font-semibold">FitCore</span>
          <span className="text-[10px] text-white/40 font-inter">●●●</span>
        </div>

        {/* Header */}
        <div className="flex items-center gap-2 mb-4">
          <span className="text-xl">{screen.icon}</span>
          <span
            className="font-poppins font-bold text-white text-sm"
            style={{ fontSize: primary ? "13px" : "11px" }}
          >
            {screen.title}
          </span>
        </div>

        {/* Content varies by screen */}
        {"content" in screen && screen.content && (
          <div className="flex flex-col gap-2 flex-1">
            {screen.content.map((item) => (
              <div
                key={item.name}
                className={`flex items-center justify-between rounded-xl px-3 py-2 ${
                  item.done
                    ? "bg-neon/10 border border-neon/20"
                    : "bg-white/5 border border-white/5"
                }`}
              >
                <span
                  className={`font-inter text-[10px] font-medium ${
                    item.done ? "text-neon" : "text-white/70"
                  }`}
                >
                  {item.name}
                </span>
                <span className="text-[10px] text-white/40">{item.sets}</span>
                {item.done && <span className="text-neon text-[10px]">✓</span>}
              </div>
            ))}
          </div>
        )}

        {"reps" in screen && typeof screen.reps === "number" && (
          <div className="flex flex-col items-center flex-1 justify-center gap-3">
            <p className="text-white/50 text-[10px] font-inter">{screen.exercise}</p>
            <div className="relative w-24 h-24">
              <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
                <circle cx="50" cy="50" r="42" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="6" />
                <circle
                  cx="50" cy="50" r="42" fill="none"
                  stroke="#B7FF3C" strokeWidth="6"
                  strokeLinecap="round"
                  strokeDasharray={`${2 * Math.PI * 42}`}
                  strokeDashoffset={`${2 * Math.PI * 42 * (1 - screen.reps / screen.total)}`}
                  style={{ filter: "drop-shadow(0 0 6px #B7FF3C)" }}
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="font-poppins font-black text-2xl text-neon leading-none">{screen.reps}</span>
                <span className="text-white/40 text-[8px]">/ {screen.total}</span>
              </div>
            </div>
            <div className="glass-neon rounded-xl px-3 py-1">
              <span className="text-neon text-[10px] font-semibold">🤖 IA Activa</span>
            </div>
          </div>
        )}

        {"stats" in screen && screen.stats && (
          <div className="flex flex-col gap-2 flex-1 justify-center">
            {screen.stats.map((s) => (
              <div key={s.label} className="glass rounded-xl px-3 py-2.5">
                <p className="text-white/40 text-[9px] font-inter mb-0.5">{s.label}</p>
                <p className="text-white font-poppins font-bold text-xs">{s.value}</p>
              </div>
            ))}
            {/* Mini chart */}
            <div className="mt-2 h-12 flex items-end gap-1 px-1">
              {[40, 65, 50, 80, 60, 90, 75].map((h, i) => (
                <div
                  key={i}
                  className="flex-1 rounded-sm"
                  style={{
                    height: `${h}%`,
                    background: i === 5 ? "#B7FF3C" : "rgba(183,255,60,0.2)",
                  }}
                />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Bottom bar */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 w-20 h-1 bg-white/20 rounded-full" />
    </div>
  );
}
