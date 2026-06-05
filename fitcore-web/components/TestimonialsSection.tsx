"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";

const TESTIMONIALS = [
  {
    name: "Carlos Mendoza",
    role: "Miembro PRO · 8 meses",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    quote:
      "FitCore cambió completamente mi forma de entrenar. El contador de repeticiones con IA es una locura, no tengo que pensar en contar, solo en ejecutar bien el movimiento. Gané 8 kg de músculo en 6 meses.",
    stars: 5,
    highlight: "Gané 8 kg de músculo",
  },
  {
    name: "Ana García",
    role: "Miembro Elite · 1 año",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    quote:
      "Las instalaciones son de otro nivel, pero lo que me enamoró fue la app. Mis rutinas personalizadas con IA son perfectas para mi cuerpo y objetivos. El entrenador personal los domingos es el bonus perfecto.",
    stars: 5,
    highlight: "App con IA personalizada",
  },
  {
    name: "Diego Ramírez",
    role: "Miembro PRO · 5 meses",
    avatar: "https://randomuser.me/api/portraits/men/67.jpg",
    quote:
      "Venía de otro gym y la diferencia es abismal. Los gráficos de progreso en la app me mantienen motivado constantemente. Ver cómo suben mis cargas semana a semana es adictivo.",
    stars: 5,
    highlight: "Progreso visible semana a semana",
  },
  {
    name: "Valeria Torres",
    role: "Miembro Básico · 3 meses",
    avatar: "https://randomuser.me/api/portraits/women/23.jpg",
    quote:
      "Empecé con el plan básico y ya me pasé al PRO porque la app vale la pena. La zona de cardio es increíble y la comunidad de FitCore te impulsa a no fallar ningún día.",
    stars: 5,
    highlight: "Comunidad que impulsa",
  },
  {
    name: "Rodrigo Soto",
    role: "Miembro Elite · 2 años",
    avatar: "https://randomuser.me/api/portraits/men/15.jpg",
    quote:
      "Dos años y sigo sorprendiéndome. La app se ha actualizado constantemente y cada vez es mejor. El nutricionista del plan Elite me ayudó a bajar 15 kg sin perder músculo. 100% recomendado.",
    stars: 5,
    highlight: "Bajé 15 kg sin perder músculo",
  },
];

export default function TestimonialsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setCurrent((c) => (c + 1) % TESTIMONIALS.length), 5000);
    return () => clearInterval(t);
  }, []);

  const prev = () => setCurrent((c) => (c - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  const next = () => setCurrent((c) => (c + 1) % TESTIMONIALS.length);

  return (
    <section ref={ref} className="py-24 lg:py-32 relative overflow-hidden bg-dark-2">
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 right-0 h-px neon-line opacity-20" />
        <div className="absolute top-1/2 right-0 w-80 h-80 bg-neon/4 rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-14">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            className="inline-block text-neon font-inter font-semibold text-sm tracking-widest uppercase mb-4"
          >
            — Testimonios
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1 }}
            className="font-poppins font-black text-4xl sm:text-5xl text-white"
          >
            Ellos ya lo
            <br />
            <span className="text-gradient">transformaron</span>
          </motion.h2>
        </div>

        {/* Main testimonial */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2 }}
          className="max-w-4xl mx-auto"
        >
          <div className="relative rounded-3xl p-8 sm:p-12 overflow-hidden"
            style={{
              background: "linear-gradient(135deg, rgba(183,255,60,0.04) 0%, rgba(255,255,255,0.02) 100%)",
              border: "1px solid rgba(183,255,60,0.12)",
              boxShadow: "0 0 60px rgba(183,255,60,0.05)",
            }}
          >
            {/* Large quote mark */}
            <div className="absolute top-6 left-8 font-poppins text-[120px] leading-none text-neon/5 select-none">
              &ldquo;
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={current}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
                className="relative z-10"
              >
                {/* Stars */}
                <div className="flex gap-1 mb-6">
                  {[...Array(TESTIMONIALS[current].stars)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-neon fill-neon" />
                  ))}
                </div>

                {/* Highlight pill */}
                <span className="inline-block glass-neon rounded-full px-4 py-1.5 text-neon text-xs font-inter font-semibold mb-5">
                  ✓ {TESTIMONIALS[current].highlight}
                </span>

                {/* Quote */}
                <blockquote className="font-inter text-xl sm:text-2xl text-white/80 leading-relaxed mb-8 font-light">
                  &ldquo;{TESTIMONIALS[current].quote}&rdquo;
                </blockquote>

                {/* Author */}
                <div className="flex items-center gap-4">
                  <div className="relative w-14 h-14 rounded-2xl overflow-hidden border-2 border-neon/20">
                    <Image
                      src={TESTIMONIALS[current].avatar}
                      alt={TESTIMONIALS[current].name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <p className="font-poppins font-bold text-white text-base">
                      {TESTIMONIALS[current].name}
                    </p>
                    <p className="text-white/40 text-sm font-inter">
                      {TESTIMONIALS[current].role}
                    </p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-between mt-8">
            {/* Dots */}
            <div className="flex gap-2">
              {TESTIMONIALS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`transition-all duration-300 rounded-full cursor-pointer ${
                    i === current ? "w-8 h-2 bg-neon" : "w-2 h-2 bg-white/20 hover:bg-white/40"
                  }`}
                />
              ))}
            </div>

            {/* Arrow buttons */}
            <div className="flex gap-3">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={prev}
                className="w-11 h-11 rounded-2xl glass border border-white/10 hover:border-neon/30 flex items-center justify-center cursor-pointer transition-all"
                aria-label="Previous"
              >
                <ChevronLeft className="w-5 h-5 text-white/60" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={next}
                className="w-11 h-11 rounded-2xl glass border border-white/10 hover:border-neon/30 flex items-center justify-center cursor-pointer transition-all"
                aria-label="Next"
              >
                <ChevronRight className="w-5 h-5 text-white/60" />
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
