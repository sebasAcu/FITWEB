"use client";

import { motion } from "framer-motion";
import { Zap, Instagram, Twitter, Youtube, Facebook } from "lucide-react";

const LINKS = {
  Gimnasio: ["Instalaciones", "Entrenadores", "Clases", "Horarios", "Nutrición"],
  Membresías: ["Plan Básico", "Plan PRO", "Plan Elite", "Empresas", "Estudiantes"],
  App: ["Funciones IA", "Rutinas con IA", "Changelog", "Soporte"],
  Empresa: ["Sobre FitCore", "Blog", "Prensa", "Trabaja con nosotros", "Contacto"],
};

const SOCIALS = [
  { icon: Instagram, label: "Instagram" },
  { icon: Twitter, label: "Twitter / X" },
  { icon: Youtube, label: "YouTube" },
  { icon: Facebook, label: "Facebook" },
];

export default function Footer() {
  return (
    <footer className="relative bg-dark-2 border-t border-white/5 overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px neon-line opacity-30" />
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-neon/3 rounded-full blur-[140px] -translate-y-1/2" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main footer */}
        <div className="py-16 grid grid-cols-2 lg:grid-cols-6 gap-10">
          {/* Brand column */}
          <div className="col-span-2">
            {/* Logo */}
            <div className="flex items-center gap-2 mb-5">
              <div className="relative">
                <div className="w-9 h-9 bg-neon rounded-xl flex items-center justify-center shadow-neon">
                  <Zap className="w-5 h-5 text-dark" strokeWidth={2.5} />
                </div>
                <div className="absolute inset-0 bg-neon rounded-xl blur-md opacity-40 -z-10" />
              </div>
              <span className="font-poppins font-black text-xl">
                FIT<span className="text-neon">CORE</span>
                <span className="text-white/40 text-sm font-medium ml-1">GYM</span>
              </span>
            </div>

            <p className="text-white/50 font-inter text-sm leading-relaxed max-w-xs mb-6">
              El gimnasio del futuro. Tecnología IA + instalaciones premium para que alcances tus objetivos más rápido.
            </p>

            {/* Socials */}
            <div className="flex gap-3">
              {SOCIALS.map(({ icon: Icon, label }) => (
                <motion.button
                  key={label}
                  whileHover={{ scale: 1.15, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label={label}
                  className="w-10 h-10 rounded-xl glass border border-white/8 hover:border-neon/30 flex items-center justify-center cursor-pointer transition-all duration-300 group"
                >
                  <Icon className="w-4 h-4 text-white/50 group-hover:text-neon transition-colors" />
                </motion.button>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(LINKS).map(([title, items]) => (
            <div key={title}>
              <p className="font-poppins font-bold text-white text-sm mb-4">{title}</p>
              <ul className="flex flex-col gap-2.5">
                {items.map((item) => (
                  <li key={item}>
                    <button className="text-white/40 hover:text-neon font-inter text-sm transition-colors duration-200 cursor-pointer text-left">
                      {item}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>


        {/* Bottom bar */}
        <div className="py-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-white/30 font-inter text-sm">
            © 2025 FitCore Gym. Todos los derechos reservados.
          </p>
          <div className="flex gap-6">
            {["Privacidad", "Términos", "Cookies"].map((l) => (
              <button
                key={l}
                className="text-white/30 hover:text-white/60 font-inter text-sm transition-colors cursor-pointer"
              >
                {l}
              </button>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

function AppBadge({ store }: { store: "apple" | "google" }) {
  return (
    <motion.button
      whileHover={{ scale: 1.05, y: -2 }}
      whileTap={{ scale: 0.97 }}
      className="flex items-center gap-2.5 glass border border-white/8 hover:border-neon/20 rounded-2xl px-4 py-2.5 transition-all duration-300 cursor-pointer group"
    >
      <div className="text-white/60 group-hover:text-white transition-colors">
        {store === "apple" ? (
          <svg viewBox="0 0 24 24" className="w-6 h-6" fill="currentColor">
            <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
          </svg>
        ) : (
          <svg viewBox="0 0 24 24" className="w-6 h-6" fill="currentColor">
            <path d="M3.18 23.76c.3.17.65.19.96.06l11.79-6.9-2.61-2.61-10.14 9.45zM.5 1.28C.19 1.6 0 2.1 0 2.73v18.54c0 .63.19 1.13.5 1.45l.08.07 10.39-10.39v-.24L.58 1.21.5 1.28zM19.43 10.2l-2.95-1.73-2.94 2.94 2.94 2.94 2.95-1.73c.84-.49.84-1.39 0-1.88v.46zM4.14.24L15.93 7.14l-2.61 2.61L3.18.3C3.49.17 3.84.11 4.14.24z" />
          </svg>
        )}
      </div>
      <div className="text-left">
        <p className="text-white/40 text-[9px] font-inter leading-none">
          {store === "apple" ? "App Store" : "Google Play"}
        </p>
        <p className="text-white font-poppins font-semibold text-xs mt-0.5 leading-none group-hover:text-neon transition-colors">
          {store === "apple" ? "iOS" : "Android"}
        </p>
      </div>
    </motion.button>
  );
}
