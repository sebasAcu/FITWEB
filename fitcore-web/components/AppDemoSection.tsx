"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Play, Pause, RotateCcw } from "lucide-react";

const TABS = ["Conteo IA", "Progreso", "Rutina Diaria"] as const;
type Tab = typeof TABS[number];

export default function AppDemoSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [activeTab, setActiveTab] = useState<Tab>("Conteo IA");

  return (
    <section ref={ref} className="py-24 lg:py-32 relative overflow-hidden bg-dark-2">
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 right-0 h-px neon-line opacity-20" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-neon/4 rounded-full blur-[150px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-14">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            className="inline-block text-neon font-inter font-semibold text-sm tracking-widest uppercase mb-4"
          >
            — Demo Interactiva
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1 }}
            className="font-poppins font-black text-4xl sm:text-5xl text-white"
          >
            Ve la app en acción
          </motion.h2>
        </div>

        {/* Tab buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2 }}
          className="flex justify-center gap-3 mb-12 flex-wrap"
        >
          {TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-3 rounded-full font-poppins font-semibold text-sm transition-all duration-300 cursor-pointer ${
                activeTab === tab
                  ? "bg-neon text-dark shadow-neon"
                  : "glass border border-white/10 text-white/60 hover:text-white hover:border-white/20"
              }`}
            >
              {tab}
            </button>
          ))}
        </motion.div>

        {/* Demo phone */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ delay: 0.3 }}
          className="flex justify-center"
        >
          <div className="relative">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-80 h-80 bg-neon/10 rounded-full blur-[80px]" />
            </div>
            <DemoPhone tab={activeTab} />
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function DemoPhone({ tab }: { tab: Tab }) {
  return (
    <div
      className="relative w-72 h-[580px] rounded-[3rem] overflow-hidden"
      style={{
        background: "linear-gradient(160deg, #1a1a1a, #080808)",
        border: "2px solid rgba(183,255,60,0.3)",
        boxShadow: "0 0 60px rgba(183,255,60,0.15), 0 40px 100px rgba(0,0,0,0.8)",
      }}
    >
      {/* Dynamic Island */}
      <div className="absolute top-3 left-1/2 -translate-x-1/2 w-20 h-5 bg-black rounded-full z-10 flex items-center justify-center gap-1.5">
        <div className="w-2.5 h-2.5 rounded-full bg-[#1a1a1a]" />
        <div className="w-1.5 h-1.5 rounded-full bg-[#2a2a2a]" />
      </div>

      {/* Status bar */}
      <div className="absolute top-10 left-5 right-5 flex justify-between z-10">
        <span className="text-[10px] text-white/40">9:41</span>
        <span className="text-[10px] text-white/40">●●● 100%</span>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={tab}
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -30 }}
          transition={{ duration: 0.3 }}
          className="absolute inset-0 pt-16"
        >
          {tab === "Conteo IA" && <RepCounterDemo />}
          {tab === "Progreso" && <ProgressDemo />}
          {tab === "Rutina Diaria" && <RoutineDemo />}
        </motion.div>
      </AnimatePresence>

      {/* Home indicator */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 w-24 h-1 bg-white/20 rounded-full z-10" />
    </div>
  );
}

function RepCounterDemo() {
  const [reps, setReps] = useState(0);
  const [running, setRunning] = useState(false);
  const target = 10;

  useEffect(() => {
    if (!running) return;
    if (reps >= target) { setRunning(false); return; }
    const t = setTimeout(() => setReps((r) => r + 1), 900);
    return () => clearTimeout(t);
  }, [running, reps]);

  const reset = () => { setReps(0); setRunning(false); };

  return (
    <div className="flex flex-col h-full p-5 items-center">
      <p className="text-white/50 text-[10px] font-inter mb-0.5">Curl Bíceps · Serie 2 de 4</p>
      <p className="text-white font-poppins font-bold text-sm mb-4">60 kg</p>

      {/* Camera mockup */}
      <div
        className="w-full aspect-video rounded-2xl mb-4 relative overflow-hidden flex items-center justify-center"
        style={{ background: "linear-gradient(135deg, #0a1500, #050905)" }}
      >
        <div className="absolute inset-3 border border-neon/20 rounded-xl" />
        <div className="absolute top-3 left-3 w-5 h-5 border-t-2 border-l-2 border-neon/70" />
        <div className="absolute top-3 right-3 w-5 h-5 border-t-2 border-r-2 border-neon/70" />
        <div className="absolute bottom-3 left-3 w-5 h-5 border-b-2 border-l-2 border-neon/70" />
        <div className="absolute bottom-3 right-3 w-5 h-5 border-b-2 border-r-2 border-neon/70" />

        {/* Skeleton body */}
        <div className="flex flex-col items-center gap-1 opacity-60">
          <div className="w-5 h-5 rounded-full border-2 border-neon" />
          <div className="w-7 h-8 border border-neon/60 rounded" />
          <div className="flex gap-2">
            <motion.div
              animate={running ? { rotate: [0, -60, 0] } : { rotate: 0 }}
              transition={{ duration: 0.9, repeat: running ? Infinity : 0 }}
              className="w-2.5 h-7 border border-neon/50 rounded origin-top"
            />
            <motion.div
              animate={running ? { rotate: [0, -60, 0] } : { rotate: 0 }}
              transition={{ duration: 0.9, repeat: running ? Infinity : 0, delay: 0.05 }}
              className="w-2.5 h-7 border border-neon/50 rounded origin-top"
            />
          </div>
        </div>

        <div className="absolute top-2 right-2 glass-neon rounded-md px-1.5 py-0.5">
          <span className="text-neon text-[8px] font-bold">🤖 IA</span>
        </div>

        {running && (
          <div className="absolute bottom-2 left-2 right-2 h-0.5 bg-neon/10 rounded">
            <motion.div
              className="h-full bg-neon rounded"
              animate={{ scaleX: [0, 1, 0] }}
              transition={{ duration: 0.9, repeat: Infinity }}
              style={{ transformOrigin: "left" }}
            />
          </div>
        )}
      </div>

      {/* Counter ring */}
      <div className="relative w-28 h-28 mb-4">
        <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
          <circle cx="50" cy="50" r="42" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="6" />
          <motion.circle
            cx="50" cy="50" r="42" fill="none" stroke="#B7FF3C" strokeWidth="6"
            strokeLinecap="round"
            animate={{ strokeDashoffset: 2 * Math.PI * 42 * (1 - reps / target) }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            style={{
              strokeDasharray: 2 * Math.PI * 42,
              filter: "drop-shadow(0 0 6px #B7FF3C)",
            }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <motion.span
            key={reps}
            initial={{ scale: 1.4, color: "#B7FF3C" }}
            animate={{ scale: 1, color: "#B7FF3C" }}
            transition={{ duration: 0.3 }}
            className="font-poppins font-black text-4xl text-neon leading-none"
          >
            {reps}
          </motion.span>
          <span className="text-white/30 text-[10px]">/ {target} reps</span>
        </div>
      </div>

      {/* Controls */}
      <div className="flex gap-3">
        <button
          onClick={reset}
          className="w-10 h-10 rounded-xl glass border border-white/10 flex items-center justify-center cursor-pointer hover:border-neon/30 transition-colors"
        >
          <RotateCcw className="w-4 h-4 text-white/60" />
        </button>
        <button
          onClick={() => setRunning(!running)}
          className="flex items-center gap-2 bg-neon text-dark font-poppins font-bold text-sm px-6 py-2.5 rounded-xl cursor-pointer"
        >
          {running ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
          {running ? "Pausar" : reps > 0 ? "Continuar" : "Iniciar"}
        </button>
      </div>
    </div>
  );
}

function ProgressDemo() {
  const data = [45, 55, 50, 70, 60, 85, 75, 90, 80, 95, 88, 100];
  const labels = ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"];

  return (
    <div className="flex flex-col h-full p-5">
      <p className="text-white font-poppins font-bold text-sm mb-1">Progreso 2025</p>
      <p className="text-white/40 text-[10px] mb-5">Volumen de entrenamiento (kg)</p>

      {/* Line chart */}
      <div className="relative h-36 mb-5">
        <svg viewBox="0 0 300 120" className="w-full h-full" preserveAspectRatio="none">
          <defs>
            <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#B7FF3C" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#B7FF3C" stopOpacity="0" />
            </linearGradient>
          </defs>
          <motion.path
            d={`M ${data.map((d, i) => `${(i / (data.length - 1)) * 300},${120 - d}`).join(" L ")}`}
            fill="none"
            stroke="#B7FF3C"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            style={{ filter: "drop-shadow(0 0 4px #B7FF3C)" }}
          />
          <motion.path
            d={`M 0,120 ${data.map((d, i) => `L ${(i / (data.length - 1)) * 300},${120 - d}`).join(" ")} L 300,120 Z`}
            fill="url(#chartGrad)"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.8 }}
          />
        </svg>
        <div className="absolute bottom-0 left-0 right-0 flex justify-between">
          {labels.map((l, i) => (
            <span key={l} className={`text-[7px] ${i % 3 === 0 ? "text-white/30" : "text-transparent"}`}>{l}</span>
          ))}
        </div>
      </div>

      {/* Stats cards */}
      <div className="grid grid-cols-2 gap-2 mb-4">
        {[
          { label: "Mejor semana", value: "5 sesiones" },
          { label: "Racha actual", value: "🔥 14 días" },
          { label: "PR Press Banca", value: "100 kg" },
          { label: "Vol. total", value: "48,200 kg" },
        ].map((s) => (
          <div key={s.label} className="rounded-xl p-2.5" style={{ background: "rgba(183,255,60,0.05)", border: "1px solid rgba(183,255,60,0.1)" }}>
            <p className="text-white/40 text-[8px] font-inter">{s.label}</p>
            <p className="text-white font-poppins font-bold text-xs mt-0.5">{s.value}</p>
          </div>
        ))}
      </div>

      <div className="rounded-xl p-3" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}>
        <div className="flex justify-between items-center mb-1">
          <span className="text-white/50 text-[9px]">Progreso objetivo: 100 kg press</span>
          <span className="text-neon font-bold text-[10px]">85%</span>
        </div>
        <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-neon rounded-full"
            initial={{ width: 0 }}
            animate={{ width: "85%" }}
            transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
          />
        </div>
      </div>
    </div>
  );
}

function RoutineDemo() {
  const [completed, setCompleted] = useState<number[]>([0, 1]);
  const exercises = [
    { name: "Sentadilla", sets: "4 × 8", weight: "100 kg", done: false },
    { name: "Press Banca", sets: "4 × 10", weight: "80 kg", done: false },
    { name: "Peso Muerto", sets: "3 × 6", weight: "120 kg", done: false },
    { name: "Fondos", sets: "3 × 15", weight: "Peso corporal", done: false },
    { name: "Curl Bíceps", sets: "3 × 12", weight: "20 kg", done: false },
  ];

  const toggle = (i: number) => {
    setCompleted((prev) =>
      prev.includes(i) ? prev.filter((x) => x !== i) : [...prev, i]
    );
  };

  return (
    <div className="flex flex-col h-full p-5">
      <div className="flex items-center justify-between mb-1">
        <p className="text-white font-poppins font-bold text-sm">Hoy · Lunes</p>
        <span className="glass-neon rounded-full px-2 py-0.5 text-neon text-[9px] font-bold">
          {completed.length}/{exercises.length}
        </span>
      </div>
      <p className="text-white/40 text-[10px] mb-4">Día de Fuerza — Push A</p>

      {/* Progress bar */}
      <div className="h-1 bg-white/10 rounded-full mb-5 overflow-hidden">
        <motion.div
          className="h-full bg-neon rounded-full"
          animate={{ width: `${(completed.length / exercises.length) * 100}%` }}
          transition={{ duration: 0.5 }}
        />
      </div>

      <div className="flex flex-col gap-2 flex-1 overflow-hidden">
        {exercises.map((ex, i) => {
          const done = completed.includes(i);
          return (
            <motion.button
              key={ex.name}
              onClick={() => toggle(i)}
              whileTap={{ scale: 0.97 }}
              className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-left cursor-pointer transition-all duration-300"
              style={{
                background: done ? "rgba(183,255,60,0.08)" : "rgba(255,255,255,0.04)",
                border: done ? "1px solid rgba(183,255,60,0.2)" : "1px solid rgba(255,255,255,0.06)",
              }}
            >
              <div
                className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all duration-300 ${
                  done ? "bg-neon border-neon" : "border-white/20"
                }`}
              >
                {done && <span className="text-dark text-[10px] font-black">✓</span>}
              </div>
              <div className="flex-1 min-w-0">
                <p className={`font-poppins font-semibold text-[11px] leading-none ${done ? "text-neon" : "text-white/80"}`}>
                  {ex.name}
                </p>
                <p className="text-white/30 text-[9px] mt-0.5">{ex.sets} · {ex.weight}</p>
              </div>
              {done && <span className="text-neon text-[9px] font-bold">✓</span>}
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
