"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";

const STATS = [
  { value: 5000, suffix: "+", label: "Miembros Activos", prefix: "" },
  { value: 250000, suffix: "+", label: "Entrenamientos", prefix: "" },
  { value: 12000, suffix: "+", label: "Rutinas Completadas", prefix: "" },
  { value: 95, suffix: "%", label: "Satisfacción", prefix: "" },
];

function useCounter(target: number, inView: boolean, duration = 2000) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const start = performance.now();
    const step = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [inView, target, duration]);

  return count;
}

function StatCard({
  value,
  suffix,
  prefix,
  label,
  inView,
  index,
}: {
  value: number;
  suffix: string;
  prefix: string;
  label: string;
  inView: boolean;
  index: number;
}) {
  const count = useCounter(value, inView, 2000 + index * 200);

  const display =
    value >= 1000
      ? count >= 1000
        ? `${(count / 1000).toFixed(0)}K`
        : "0K"
      : count;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.12, duration: 0.6 }}
      className="relative text-center group"
    >
      <div
        className="relative rounded-3xl p-8 lg:p-10 transition-all duration-300 group-hover:border-neon/30"
        style={{
          background: "rgba(255,255,255,0.02)",
          border: "1px solid rgba(255,255,255,0.06)",
        }}
      >
        {/* Glow on hover */}
        <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-[radial-gradient(ellipse_at_center,rgba(183,255,60,0.05),transparent)]" />

        <div className="relative z-10">
          <p className="font-poppins font-black text-5xl sm:text-6xl lg:text-7xl text-neon leading-none mb-3 glow-text">
            {prefix}{display}{suffix}
          </p>
          <p className="text-white/50 font-inter text-sm tracking-wide">{label}</p>
        </div>
      </div>
    </motion.div>
  );
}

export default function StatsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-24 relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-dark" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_50%,rgba(183,255,60,0.04),transparent)]" />
        <div className="absolute top-0 left-0 right-0 h-px neon-line opacity-20" />
        <div className="absolute bottom-0 left-0 right-0 h-px neon-line opacity-20" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <motion.span
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            className="inline-block text-neon font-inter font-semibold text-sm tracking-widest uppercase mb-4"
          >
            — Números que hablan
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1 }}
            className="font-poppins font-black text-4xl sm:text-5xl text-white"
          >
            La comunidad más fuerte
            <br />
            <span className="text-gradient">de la ciudad</span>
          </motion.h2>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
          {STATS.map((stat, i) => (
            <StatCard key={stat.label} {...stat} inView={inView} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
