"use client";

import { signOut } from "next-auth/react";
import { motion } from "framer-motion";
import { LogOut, Zap } from "lucide-react";
import { useSession } from "next-auth/react";
import Image from "next/image";

export default function SignOutPage() {
  const { data: session } = useSession();

  return (
    <div className="min-h-screen bg-[#050505] flex items-center justify-center px-4 relative overflow-hidden">
      <div className="pointer-events-none fixed inset-0 z-0">
        <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] rounded-full bg-[#B7FF3C] opacity-[0.04] blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] rounded-full bg-[#B7FF3C] opacity-[0.03] blur-[100px]" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 w-full max-w-sm"
      >
        {/* Logo */}
        <div className="flex flex-col items-center mb-8">
          <div className="w-14 h-14 bg-[#B7FF3C] rounded-2xl flex items-center justify-center shadow-[0_0_40px_rgba(183,255,60,0.3)] mb-4">
            <Zap className="w-8 h-8 text-[#050505]" strokeWidth={2.5} />
          </div>
          <h1 className="font-['Poppins',sans-serif] font-black text-2xl tracking-tight">
            FIT<span className="text-[#B7FF3C]">CORE</span>
          </h1>
        </div>

        {/* Card */}
        <div className="bg-white/[0.03] border border-white/[0.08] rounded-3xl p-8 space-y-6 text-center">

          {/* Avatar + nombre */}
          {session?.user && (
            <div className="flex flex-col items-center gap-3">
              {session.user.image ? (
                <Image
                  src={session.user.image}
                  alt={session.user.name ?? ""}
                  width={56}
                  height={56}
                  className="rounded-full border-2 border-[#B7FF3C]/30"
                />
              ) : (
                <div className="w-14 h-14 rounded-full bg-[#B7FF3C]/10 border border-[#B7FF3C]/20 flex items-center justify-center text-[#B7FF3C] font-black text-xl">
                  {session.user.name?.[0] ?? "?"}
                </div>
              )}
              <div>
                <p className="font-bold text-white">{session.user.name}</p>
                <p className="text-white/30 text-xs">{session.user.email}</p>
              </div>
            </div>
          )}

          <div>
            <h2 className="text-xl font-black font-['Poppins',sans-serif]">¿Cerrar sesión?</h2>
            <p className="text-white/40 text-sm mt-1">Puedes volver cuando quieras.</p>
          </div>

          <div className="flex flex-col gap-3">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => signOut({ callbackUrl: "/" })}
              className="w-full flex items-center justify-center gap-2 py-4 rounded-2xl font-bold text-sm bg-white/[0.05] border border-white/10 text-white/70 hover:border-red-400/40 hover:text-red-400 hover:bg-red-400/5 transition-all"
            >
              <LogOut className="w-4 h-4" />
              Sí, cerrar sesión
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => window.history.back()}
              className="w-full py-4 rounded-2xl font-black text-sm tracking-wider bg-[#B7FF3C] text-[#050505] hover:brightness-110 transition-all shadow-[0_0_30px_#B7FF3C33]"
            >
              Cancelar
            </motion.button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
