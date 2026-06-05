"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Sparkles, Dumbbell, Zap, LogOut } from "lucide-react";
import { useSession, signIn } from "next-auth/react";

const features = [
  { icon: <Sparkles className="w-4 h-4" />, label: "Rutinas con IA" },
  { icon: <Dumbbell className="w-4 h-4" />, label: "Gym o en casa" },
  { icon: <Zap className="w-4 h-4" />, label: "Seguimiento en vivo" },
];

export default function Home() {
  const { data: session } = useSession();

  return (
    <main className="min-h-screen bg-[#050505] text-white flex flex-col items-center justify-center px-6 relative overflow-hidden">

      {/* Orbs de fondo */}
      <div className="pointer-events-none absolute inset-0">
        <motion.div
          className="absolute top-[-15%] left-[-10%] w-[500px] h-[500px] rounded-full bg-[#B7FF3C] opacity-[0.06] blur-[130px]"
          animate={{ scale: [1, 1.15, 1], opacity: [0.06, 0.09, 0.06] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-[-10%] right-[-10%] w-[400px] h-[400px] rounded-full bg-[#B7FF3C] opacity-[0.04] blur-[110px]"
          animate={{ scale: [1, 1.2, 1], opacity: [0.04, 0.07, 0.04] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        />
      </div>

      <div className="relative z-10 flex flex-col items-center text-center max-w-lg w-full gap-10">

        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-2 px-4 py-2 rounded-full border border-[#B7FF3C]/25 bg-[#B7FF3C]/[0.05] text-[#B7FF3C] text-xs font-bold tracking-[2px] uppercase"
        >
          <Sparkles className="w-3.5 h-3.5" />
          Entrenamiento con inteligencia artificial
        </motion.div>

        {/* Título */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <h1 className="text-6xl font-black tracking-tight font-['Poppins',sans-serif] leading-none">
            Fit<span className="text-[#B7FF3C]">Core</span>
          </h1>
          <p className="text-white/40 mt-4 text-base leading-relaxed">
            {session?.user?.name
              ? `Hola, ${session.user.name.split(" ")[0]} 👋 — listo para entrenar?`
              : "Tu rutina personalizada, generada al instante."}
          </p>
        </motion.div>

        {/* Features */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="flex gap-3 flex-wrap justify-center"
        >
          {features.map((f, i) => (
            <motion.div
              key={f.label}
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: 0.3 + i * 0.08 }}
              className="flex items-center gap-2 px-4 py-2 rounded-full border border-white/[0.08] bg-white/[0.03] text-white/50 text-xs font-medium"
            >
              <span className="text-[#B7FF3C]">{f.icon}</span>
              {f.label}
            </motion.div>
          ))}
        </motion.div>

        {/* Botón principal */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.45 }}
          className="w-full flex flex-col items-center gap-3"
        >
          {session ? (
            <div className="w-full flex flex-col gap-3">
              <Link href="/planner" className="w-full">
                <motion.button
                  whileHover={{ scale: 1.02, filter: "brightness(1.12)" }}
                  whileTap={{ scale: 0.97 }}
                  className="w-full py-5 rounded-2xl font-black text-lg tracking-[2px] uppercase bg-[#B7FF3C] text-[#050505] shadow-[0_0_40px_#B7FF3C44] flex items-center justify-center gap-3"
                >
                  <Dumbbell className="w-5 h-5" />
                  Mi plan semanal
                </motion.button>
              </Link>
              <Link href="/rutina" className="w-full">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                  className="w-full py-4 rounded-2xl font-bold text-sm tracking-wider border border-white/10 text-white/60 hover:border-[#B7FF3C]/40 hover:text-[#B7FF3C] transition-all flex items-center justify-center gap-2"
                >
                  <Sparkles className="w-4 h-4" />
                  Crear rutina ahora
                </motion.button>
              </Link>
            </div>
          ) : (
            <motion.button
              whileHover={{ scale: 1.02, filter: "brightness(1.12)" }}
              whileTap={{ scale: 0.97 }}
              onClick={() => signIn("google", { callbackUrl: "/rutina" })}
              className="w-full py-5 rounded-2xl font-black text-lg tracking-[2px] uppercase bg-[#B7FF3C] text-[#050505] shadow-[0_0_40px_#B7FF3C44] flex items-center justify-center gap-3"
            >
              <Sparkles className="w-5 h-5" />
              Comenzar ahora
            </motion.button>
          )}
          <p className="text-white/20 text-xs">
            {session ? "Tu IA de entrenamiento personal" : "Inicia sesión con Google · Es gratis"}
          </p>

          {session && (
            <Link href="/signout" className="flex items-center gap-1.5 text-white/20 hover:text-white/50 text-xs transition-colors">
              <LogOut className="w-3 h-3" />
              Cerrar sesión
            </Link>
          )}
        </motion.div>

      </div>
    </main>
  );
}
