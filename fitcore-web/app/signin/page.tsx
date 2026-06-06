"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";
import { Zap } from "lucide-react";
import Link from "next/link";

export default function SignInPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleCredentials(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    const res = await signIn("credentials", {
      email,
      password,
      callbackUrl: "/planner",
      redirect: false,
    });
    setLoading(false);
    if (res?.error) {
      setError("Email o contraseña incorrectos");
    } else if (res?.url) {
      window.location.href = res.url;
    }
  }

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
        <div className="bg-white/[0.03] border border-white/[0.08] rounded-3xl p-8 space-y-5">
          <div className="text-center">
            <h2 className="text-2xl font-black font-['Poppins',sans-serif]">
              Inicia <span className="text-[#B7FF3C]">sesión</span>
            </h2>
            <p className="text-white/40 text-sm mt-2">
              Accede para guardar tus rutinas semanales
            </p>
          </div>

          {/* Credentials form */}
          <form onSubmit={handleCredentials} className="space-y-3">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full bg-white/[0.05] border border-white/[0.1] rounded-2xl px-4 py-3 text-white text-sm placeholder-white/30 focus:outline-none focus:border-[#B7FF3C]/50"
            />
            <input
              type="password"
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full bg-white/[0.05] border border-white/[0.1] rounded-2xl px-4 py-3 text-white text-sm placeholder-white/30 focus:outline-none focus:border-[#B7FF3C]/50"
            />
            {error && (
              <p className="text-red-400 text-xs text-center">{error}</p>
            )}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#B7FF3C] text-[#050505] font-bold py-4 rounded-2xl hover:bg-[#c8ff5a] transition-all text-sm disabled:opacity-50"
            >
              {loading ? "Entrando..." : "Entrar"}
            </button>
          </form>

          <p className="text-center text-white/40 text-sm">
            ¿No tienes cuenta?{" "}
            <Link href="/register" className="text-[#B7FF3C] hover:underline">
              Regístrate
            </Link>
          </p>

          <p className="text-center text-white/20 text-xs">
            Al continuar aceptas los términos de uso de FitCore
          </p>
        </div>
      </div>
    </div>
  );
}
