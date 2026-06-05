"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Dumbbell, MapPin, Brain, Award } from "lucide-react";

const BENEFITS = [
  {
    icon: Dumbbell,
    title: "Las Mejores Máquinas",
    desc: "Equipos de última generación para que entrenes con la mejor tecnología y logres resultados más rápido.",
    color: "#B7FF3C",
  },
  {
    icon: MapPin,
    title: "Excelente Ubicación",
    desc: "Estratégicamente ubicados para que llegar al gym nunca sea una excusa. Accesible y con fácil parqueo.",
    color: "#B7FF3C",
  },
  {
    icon: Brain,
    title: "Rutinas Creadas por IA",
    desc: "La IA genera tu rutina personalizada según tu objetivo, nivel y disponibilidad. Gym o en casa.",
    color: "#B7FF3C",
  },
  {
    icon: Award,
    title: "Excelentes Entrenadores",
    desc: "Entrenadores certificados y apasionados listos para guiarte, motivarte y llevar tu rendimiento al máximo.",
    color: "#B7FF3C",
  },
];

export default function FeaturesSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="beneficios" ref={ref} className="py-24 lg:py-32 relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-dark" />
        <div className="absolute top-0 left-0 right-0 h-px neon-line opacity-20" />
        <div className="absolute top-1/2 right-0 w-80 h-80 bg-neon/4 rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            className="inline-block text-neon font-inter font-semibold text-sm tracking-widest uppercase mb-4"
          >
            — Por qué elegirnos
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1 }}
            className="font-poppins font-black text-4xl sm:text-5xl lg:text-6xl text-white leading-tight"
          >
            Todo lo que necesitas
            <br />
            <span className="text-gradient">en un solo lugar</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.15 }}
            className="text-white/50 text-lg mt-6 max-w-2xl mx-auto"
          >
            Combinamos las mejores instalaciones con tecnología de punta para que alcances tus objetivos más rápido.
          </motion.p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {BENEFITS.map((b, i) => (
            <motion.div
              key={b.title}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.08 + 0.2, duration: 0.5 }}
            >
              <BenefitCard {...b} index={i} />
            </motion.div>
          ))}
        </div>

        {/* Bottom ticker */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.8 }}
          className="mt-20 overflow-hidden"
        >
          <div className="flex gap-8 animate-marquee whitespace-nowrap">
            {[...Array(2)].flatMap(() =>
              [
                "FUERZA", "·", "RESISTENCIA", "·", "DISCIPLINA", "·",
                "NUTRICIÓN", "·", "PROGRESO", "·", "COMUNIDAD", "·",
                "IA FITNESS", "·", "RESULTADOS", "·",
              ].map((word, j) => (
                <span
                  key={`${word}-${j}`}
                  className={`font-poppins font-black text-xl tracking-wider ${
                    word === "·" ? "text-neon" : "text-white/10"
                  }`}
                >
                  {word}
                </span>
              ))
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function BenefitCard({
  icon: Icon,
  title,
  desc,
  index,
}: {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  desc: string;
  color: string;
  index: number;
}) {
  return (
    <motion.div
      whileHover={{ y: -6, scale: 1.02 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="group relative rounded-3xl p-6 h-full cursor-default"
      style={{
        background: "linear-gradient(135deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.01) 100%)",
        border: "1px solid rgba(255,255,255,0.06)",
        backdropFilter: "blur(10px)",
      }}
    >
      {/* Hover neon border */}
      <div
        className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: "linear-gradient(135deg, rgba(183,255,60,0.08) 0%, transparent 100%)",
          border: "1px solid rgba(183,255,60,0.2)",
        }}
      />

      {/* Number */}
      <div className="absolute top-6 right-6 font-poppins font-black text-5xl text-white/[0.03] select-none">
        {String(index + 1).padStart(2, "0")}
      </div>

      <div className="relative z-10">
        {/* Icon */}
        <div className="w-12 h-12 rounded-2xl bg-neon/10 border border-neon/20 flex items-center justify-center mb-5 group-hover:bg-neon/20 group-hover:border-neon/40 group-hover:shadow-neon transition-all duration-300">
          <Icon className="w-6 h-6 text-neon" />
        </div>

        <h3 className="font-poppins font-bold text-lg text-white mb-3">{title}</h3>
        <p className="text-white/50 font-inter text-sm leading-relaxed">{desc}</p>

        {/* Bottom accent */}
        <div className="mt-5 h-px w-0 group-hover:w-full bg-gradient-to-r from-neon/50 to-transparent transition-all duration-500" />
      </div>
    </motion.div>
  );
}
