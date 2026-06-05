"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import Image from "next/image";

const INSTALLATIONS = [
  {
    id: 1,
    label: "Zona de Pesas",
    tag: "Fuerza",
    img: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=600&q=80",
    span: "col-span-2 row-span-2",
  },
  {
    id: 2,
    label: "Cardio Zone",
    tag: "Cardio",
    img: "https://images.unsplash.com/photo-1540497077202-7c8a3999166f?w=400&q=80",
    span: "col-span-1 row-span-1",
  },
  {
    id: 3,
    label: "CrossFit Box",
    tag: "CrossFit",
    img: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=400&q=80",
    span: "col-span-1 row-span-1",
  },
  {
    id: 4,
    label: "Área Funcional",
    tag: "Funcional",
    img: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=500&q=80",
    span: "col-span-1 row-span-1",
  },
  {
    id: 5,
    label: "Vestuarios Premium",
    tag: "Premium",
    img: "https://images.unsplash.com/photo-1594381898411-846e7d193883?w=500&q=80",
    span: "col-span-2 row-span-1",
  },
];

export default function InstallationsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <section id="instalaciones" ref={ref} className="py-24 lg:py-32 relative overflow-hidden bg-dark-2">
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 right-0 h-px neon-line opacity-20" />
        <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-neon/3 rounded-full blur-[140px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-14">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            className="inline-block text-neon font-inter font-semibold text-sm tracking-widest uppercase mb-4"
          >
            — Nuestras Instalaciones
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1 }}
            className="font-poppins font-black text-4xl sm:text-5xl lg:text-6xl text-white"
          >
            Espacios diseñados
            <br />
            <span className="text-gradient">para ganar</span>
          </motion.h2>
        </div>

        {/* Masonry grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.3 }}
          className="grid grid-cols-3 grid-rows-3 gap-4 h-[600px]"
        >
          {INSTALLATIONS.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.1 * i + 0.3 }}
              className={`${item.span} relative overflow-hidden rounded-3xl group cursor-pointer`}
              onMouseEnter={() => setHovered(item.id)}
              onMouseLeave={() => setHovered(null)}
            >
              <Image
                src={item.img}
                alt={item.label}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
                sizes="(max-width: 768px) 100vw, 50vw"
              />

              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent transition-opacity duration-300" />

              {/* Hover overlay */}
              <AnimatePresence>
                {hovered === item.id && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 bg-neon/10 border-2 border-neon/40 rounded-3xl"
                  />
                )}
              </AnimatePresence>

              {/* Labels */}
              <div className="absolute bottom-4 left-4 right-4">
                <span className="inline-block glass-neon rounded-full px-3 py-1 text-neon text-xs font-inter font-semibold mb-2">
                  {item.tag}
                </span>
                <p className="font-poppins font-bold text-white text-base">{item.label}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
