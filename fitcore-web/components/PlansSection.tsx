"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Check, Star, GraduationCap } from "lucide-react";

const PLANS = [
  {
    id: "estudiantil",
    name: "ESTUDIANTIL",
    price: "18.000",
    period: "mes",
    currency: "₡",
    icon: GraduationCap,
    desc: "Exclusivo para estudiantes con carné",
    featured: false,
    badge: null,
    features: [
      "Acceso completo al gimnasio",
      "Horario completo 6am–11pm",
      "Casillero personal",
      "WiFi Premium",
      "Comunidad FitCore",
      "App básica (solo registro)",
      "Requiere carné estudiantil vigente",
    ],
    cta: "Soy Estudiante",
  },
  {
    id: "basic",
    name: "BÁSICO",
    price: "20.000",
    period: "mes",
    currency: "₡",
    icon: Star,
    desc: "Ideal para empezar tu transformación",
    featured: false,
    badge: null,
    features: [
      "Acceso completo al gimnasio",
      "Horario completo 6am–11pm",
      "Casillero personal",
      "WiFi Premium",
      "Comunidad FitCore",
      "App básica (solo registro)",
    ],
    cta: "Comenzar",
  },
];

export default function PlansSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="planes" ref={ref} className="py-24 lg:py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-dark">
        <div className="absolute top-0 left-0 right-0 h-px neon-line opacity-20" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_100%,rgba(183,255,60,0.04),transparent)]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            className="inline-block text-neon font-inter font-semibold text-sm tracking-widest uppercase mb-4"
          >
            — Membresías
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1 }}
            className="font-poppins font-black text-4xl sm:text-5xl lg:text-6xl text-white"
          >
            Elige tu plan.
            <br />
            <span className="text-gradient">Empieza hoy.</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.2 }}
            className="text-white/50 text-lg mt-4"
          >
            Sin permanencia. Cancela cuando quieras.
          </motion.p>
        </div>

        {/* Plans grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-start max-w-2xl mx-auto w-full">
          {PLANS.map((plan, i) => (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.12 + 0.2 }}
              className={plan.featured ? "md:-mt-4 md:mb-4" : ""}
            >
              <PlanCard plan={plan} />
            </motion.div>
          ))}
        </div>

        {/* Trust badge */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.7 }}
          className="text-center text-white/30 text-sm font-inter mt-10"
        >
          ✓ Sin contratos · ✓ Pago seguro · ✓ Cancela en cualquier momento · ✓ 7 días de prueba gratis
        </motion.p>
      </div>
    </section>
  );
}

function PlanCard({ plan }: { plan: (typeof PLANS)[number] }) {
  const Icon = plan.icon;
  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="relative rounded-3xl overflow-hidden h-full"
      style={
        plan.featured
          ? {
              background: "linear-gradient(160deg, #1a2e00 0%, #0d1a00 100%)",
              border: "2px solid rgba(183,255,60,0.4)",
              boxShadow: "0 0 60px rgba(183,255,60,0.12), 0 30px 80px rgba(0,0,0,0.5)",
            }
          : {
              background: "linear-gradient(160deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.01) 100%)",
              border: "1px solid rgba(255,255,255,0.08)",
            }
      }
    >
      {/* Featured badge */}
      {plan.featured && (
        <div className="absolute top-0 left-0 right-0 h-1 bg-neon" style={{ boxShadow: "0 0 20px rgba(183,255,60,0.8)" }} />
      )}
      {plan.featured && (
        <div className="absolute top-5 right-5">
          <span className="bg-neon text-dark font-poppins font-black text-xs px-3 py-1 rounded-full">
            MÁS POPULAR
          </span>
        </div>
      )}

      <div className="p-8">
        {/* Icon + name */}
        <div className="flex items-center gap-3 mb-6">
          <div
            className="w-10 h-10 rounded-2xl flex items-center justify-center"
            style={
              plan.featured
                ? { background: "rgba(183,255,60,0.2)", border: "1px solid rgba(183,255,60,0.4)" }
                : { background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)" }
            }
          >
            <Icon className={`w-5 h-5 ${plan.featured ? "text-neon" : "text-white/60"}`} />
          </div>
          <div>
            <p className={`font-poppins font-black text-lg leading-none ${plan.featured ? "text-neon" : "text-white"}`}>
              {plan.name}
            </p>
            <p className="text-white/40 text-xs font-inter mt-0.5">{plan.desc}</p>
          </div>
        </div>

        {/* Price */}
        <div className="mb-8">
          <div className="flex items-end gap-1">
            <span className="text-white/40 font-inter text-lg">{plan.currency}</span>
            <span className={`font-poppins font-black text-5xl leading-none ${plan.featured ? "text-neon" : "text-white"}`}>
              {plan.price}
            </span>
            <span className="text-white/40 font-inter text-base mb-2">/ {plan.period}</span>
          </div>
        </div>

        {/* Features */}
        <ul className="flex flex-col gap-3 mb-8">
          {plan.features.map((feat) => (
            <li key={feat} className="flex items-start gap-3">
              <Check className={`w-4 h-4 flex-shrink-0 mt-0.5 ${plan.featured ? "text-neon" : "text-white/40"}`} />
              <span className={`text-sm font-inter ${plan.featured ? "text-white/90" : "text-white/60"}`}>{feat}</span>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          className={`w-full py-4 rounded-2xl font-poppins font-bold text-base transition-all duration-300 cursor-pointer ${
            plan.featured
              ? "bg-neon text-dark hover:shadow-neon-lg"
              : "bg-white/5 border border-white/10 text-white hover:bg-white/10 hover:border-white/20"
          }`}
        >
          {plan.cta}
        </motion.button>
      </div>
    </motion.div>
  );
}
