"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Zap } from "lucide-react";
import Link from "next/link";

const NAV_LINKS = [
  { label: "Inicio", href: "#inicio" },
  { label: "Instalaciones", href: "#instalaciones" },
  { label: "Entrenadores", href: "#beneficios" },
  { label: "Planes", href: "#planes" },
  { label: "App", href: "#app" },
  { label: "Contacto", href: "#contacto" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setMenuOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-dark/80 backdrop-blur-xl border-b border-white/5 shadow-[0_0_40px_rgba(0,0,0,0.8)]"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="flex items-center gap-2 cursor-pointer"
              onClick={() => handleNavClick("#inicio")}
            >
              <div className="relative">
                <div className="w-8 h-8 bg-neon rounded-lg flex items-center justify-center shadow-neon">
                  <Zap className="w-5 h-5 text-dark" strokeWidth={2.5} />
                </div>
                <div className="absolute inset-0 bg-neon rounded-lg blur-md opacity-40 -z-10" />
              </div>
              <span className="font-poppins font-bold text-lg tracking-tight">
                FIT<span className="text-neon">CORE</span>
                <span className="text-white/60 text-sm font-medium ml-1">GYM</span>
              </span>
            </motion.div>

            {/* Desktop nav */}
            <nav className="hidden lg:flex items-center gap-1">
              {NAV_LINKS.map((link) => (
                <button
                  key={link.href}
                  onClick={() => handleNavClick(link.href)}
                  className="relative px-4 py-2 text-sm font-inter font-medium text-white/70 hover:text-white transition-colors duration-200 group cursor-pointer"
                >
                  {link.label}
                  <span className="absolute bottom-1 left-4 right-4 h-px bg-neon scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                </button>
              ))}
            </nav>

            {/* CTA + mobile toggle */}
            <div className="flex items-center gap-3">
              <Link
                href="/rutina"
                className="hidden sm:flex items-center gap-1.5 border border-[#B7FF3C]/40 text-[#B7FF3C] font-poppins font-bold text-xs px-4 py-2 rounded-full hover:bg-[#B7FF3C]/10 transition-all duration-200"
              >
                💪 Crear rutina
              </Link>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => handleNavClick("#planes")}
                className="hidden sm:flex items-center gap-2 bg-neon text-dark font-poppins font-bold text-sm px-5 py-2.5 rounded-full hover:shadow-neon transition-all duration-300 cursor-pointer"
              >
                <Zap className="w-4 h-4" strokeWidth={2.5} />
                ÚNETE AHORA
              </motion.button>
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="lg:hidden p-2 text-white/70 hover:text-white transition-colors cursor-pointer"
                aria-label="Toggle menu"
              >
                {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-x-0 top-16 z-40 bg-dark-2/95 backdrop-blur-2xl border-b border-white/5 lg:hidden"
          >
            <div className="px-6 py-6 flex flex-col gap-2">
              {NAV_LINKS.map((link, i) => (
                <motion.button
                  key={link.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  onClick={() => handleNavClick(link.href)}
                  className="py-3 text-left text-base font-medium text-white/80 hover:text-neon border-b border-white/5 last:border-0 transition-colors cursor-pointer"
                >
                  {link.label}
                </motion.button>
              ))}
              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.35 }}
                onClick={() => handleNavClick("#planes")}
                className="mt-4 bg-neon text-dark font-poppins font-bold py-3 rounded-xl cursor-pointer"
              >
                ÚNETE AHORA
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
