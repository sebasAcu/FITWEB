"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";
import { Zap } from "lucide-react";
import Link from "next/link";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleRegister(e: React.FormEvent) {
    e.preventDefault();
    if (password !== confirm) {
      setError("Las contraseñas no coinciden");
      return;
    }
    if (password.length < 6) {
      setError("La contraseña debe tener al menos 6 caracteres");
      return;
    }
    setLoading(true);
    setError("");

    const res = await fetch("/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    });
    const data = await res.json();

    if (!res.ok) {
      setError(data.error ?? "Error al registrar");
      setLoading(false);
      return;
    }

    // Auto login after register
    const login = await signIn("credentials", {
      email,
      password,
      callbackUrl: "/planner",
      redirect: false,
    });
    setLoading(false);
    if (login?.url) {
      window.location.href = login.url;
    }
  }

  return (
    <div className="min-h-screen bg-[#050505] flex items-center justify-center px-4 relative overflow-hidden">
      <div className="pointer-events-none fixed inset-0 z-0">
        <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] rounded-full bg-[#B7FF3C] opacity-[0.04] blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] rounded-full bg-[#B7FF3C] opacity-[0.03] blur-[100px]" />
      </div>

      <div className="relative z-10 w-full max-w-md">
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

        <div className="bg-white/[0.03] border border-white/[0.08] rounded-3xl p-8 space-y-5">
          <div className="text-center">
            <h2 className="text-2xl font-black font-['Poppins',sans-serif]">
              Crear <span className="text-[#B7FF3C]">cuenta</span>
            </h2>
            <p className="text-white/40 text-sm mt-2">
              Regístrate para guardar tus rutinas
            </p>
          </div>

          <form onSubmit={handleRegister} className="space-y-3">
            <input
              type="text"
              placeholder="Nombre"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full bg-white/[0.05] border border-white/[0.1] rounded-2xl px-4 py-3 text-white text-sm placeholder-white/30 focus:outline-none focus:border-[#B7FF3C]/50"
            />
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
              placeholder="Contraseña (mín. 6 caracteres)"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full bg-white/[0.05] border border-white/[0.1] rounded-2xl px-4 py-3 text-white text-sm placeholder-white/30 focus:outline-none focus:border-[#B7FF3C]/50"
            />
            <input
              type="password"
              placeholder="Confirmar contraseña"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
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
              {loading ? "Creando cuenta..." : "Crear cuenta"}
            </button>
          </form>

          <p className="text-center text-white/40 text-sm">
            ¿Ya tienes cuenta?{" "}
            <Link href="/signin" className="text-[#B7FF3C] hover:underline">
              Inicia sesión
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
