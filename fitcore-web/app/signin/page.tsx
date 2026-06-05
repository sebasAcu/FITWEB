"use client";

import { signIn } from "next-auth/react";
import { Zap, Sparkles } from "lucide-react";

export default function SignInPage() {
  return (
    <div className="min-h-screen bg-[#050505] flex items-center justify-center px-4 relative overflow-hidden">
      {/* Blobs */}
      <div className="pointer-events-none fixed inset-0 z-0">
        <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] rounded-full bg-[#B7FF3C] opacity-[0.04] blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] rounded-full bg-[#B7FF3C] opacity-[0.03] blur-[100px]" />
      </div>

      <div className="relative z-10 w-full max-w-md">
        {/* Logo */}
        <div className="flex flex-col items-center mb-10">
          <div className="relative mb-4">
            <div className="w-14 h-14 bg-[#B7FF3C] rounded-2xl flex items-center justify-center shadow-[0_0_40px_rgba(183,255,60,0.4)]">
              <Zap className="w-8 h-8 text-[#050505]" strokeWidth={2.5} />
            </div>
            <div className="absolute inset-0 bg-[#B7FF3C] rounded-2xl blur-xl opacity-20 -z-10" />
          </div>
          <h1 className="font-['Poppins',sans-serif] font-black text-2xl tracking-tight">
            FIT<span className="text-[#B7FF3C]">CORE</span>
          </h1>
          <p className="text-white/40 text-sm mt-1">Tu entrenador personal con IA</p>
        </div>

        {/* Card */}
        <div className="bg-white/[0.03] border border-white/[0.08] rounded-3xl p-8 space-y-6">
          <div className="text-center">
            <h2 className="text-2xl font-black font-['Poppins',sans-serif]">
              Crea tu <span className="text-[#B7FF3C]">plan semanal</span>
            </h2>
            <p className="text-white/40 text-sm mt-2">
              Inicia sesión para guardar tus rutinas de lunes a domingo
            </p>
          </div>

          {/* Features */}
          <div className="space-y-3">
            {[
              { icon: "🤖", text: "Rutinas generadas por IA con máquinas de gym" },
              { icon: "📅", text: "Plan semanal personalizado de lunes a domingo" },
              { icon: "💾", text: "Tus rutinas guardadas en tu perfil" },
              { icon: "🔥", text: "Rutinas personalizadas con IA" },
            ].map((f) => (
              <div key={f.text} className="flex items-center gap-3 text-sm text-white/60">
                <span className="text-base">{f.icon}</span>
                {f.text}
              </div>
            ))}
          </div>

          {/* Google button */}
          <button
            onClick={() => signIn("google", { callbackUrl: "/planner" })}
            className="w-full flex items-center justify-center gap-3 bg-white text-[#050505] font-bold py-4 rounded-2xl hover:bg-white/90 transition-all shadow-[0_0_30px_rgba(255,255,255,0.1)] text-sm"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
            </svg>
            Continuar con Google
          </button>

          <p className="text-center text-white/20 text-xs">
            Al continuar aceptas los términos de uso de FitCore
          </p>
        </div>
      </div>
    </div>
  );
}
