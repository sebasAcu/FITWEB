"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowRight, Download, Zap } from "lucide-react";

export default function CTASection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="contacto" ref={ref} className="py-24 lg:py-32 relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-dark" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_50%,rgba(183,255,60,0.07),transparent)]" />
        <div className="absolute top-0 left-0 right-0 h-px neon-line opacity-30" />

        {/* Grid lines */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(183,255,60,1) 1px, transparent 1px), linear-gradient(90deg, rgba(183,255,60,1) 1px, transparent 1px)",
            backgroundSize: "80px 80px",
          }}
        />

        {/* Orbs */}
        <div className="absolute top-1/4 left-1/4 w-80 h-80 bg-neon/6 rounded-full blur-[120px] animate-float" />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-neon/4 rounded-full blur-[100px] animate-float-delay" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          className="inline-flex items-center gap-2 glass-neon rounded-full px-5 py-2 mb-8"
        >
          <Zap className="w-4 h-4 text-neon" />
          <span className="text-neon font-inter font-semibold text-sm tracking-wider">
            Empieza tu transformación hoy
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.1 }}
          className="font-poppins font-black text-4xl sm:text-5xl lg:text-7xl text-white leading-tight mb-6"
        >
          ¿Listo para convertirte
          <br />
          en tu{" "}
          <span className="text-gradient glow-text">mejor versión?</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2 }}
          className="text-white/50 text-xl max-w-2xl mx-auto mb-12 font-inter leading-relaxed"
        >
          Únete a más de 5,000 atletas que ya están superando sus límites con
          FitCore Gym y la app de entrenamiento más avanzada.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-5 justify-center mb-16"
        >
          <motion.button
            whileHover={{ scale: 1.06, boxShadow: "0 0 60px rgba(183,255,60,0.5)" }}
            whileTap={{ scale: 0.97 }}
            onClick={() => document.querySelector("#planes")?.scrollIntoView({ behavior: "smooth" })}
            className="group flex items-center justify-center gap-3 bg-neon text-dark font-poppins font-black text-lg px-10 py-5 rounded-full transition-all duration-300 cursor-pointer"
          >
            <Zap className="w-6 h-6" strokeWidth={2.5} />
            Únete Ahora
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </motion.button>

        </motion.div>

        {/* Trust stats row */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.5 }}
          className="flex flex-wrap justify-center gap-8 text-center"
        >
          {[
            { value: "7 días", label: "prueba gratis" },
            { value: "Sin contratos", label: "cancela cuando quieras" },
            { value: "5,000+", label: "miembros felices" },
            { value: "IA integrada", label: "en tu entrenamiento" },
          ].map((item) => (
            <div key={item.label} className="flex flex-col items-center">
              <span className="font-poppins font-bold text-neon text-base">{item.value}</span>
              <span className="text-white/30 text-xs font-inter mt-0.5">{item.label}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
