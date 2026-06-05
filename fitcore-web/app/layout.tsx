import type { Metadata } from "next";
import "./globals.css";
import AuthProvider from "@/components/AuthProvider";

export const metadata: Metadata = {
  title: "FITCORE GYM | Entrena Hoy. Supera Mañana.",
  description:
    "Gimnasio premium con tecnología IA. Rutinas inteligentes, contador de repeticiones automático y seguimiento de progreso avanzado. Únete a la revolución del fitness.",
  keywords: "gimnasio, fitness, gym, entrenamiento, IA, rutinas, membresía, FitCore",
  openGraph: {
    title: "FITCORE GYM | Entrena Hoy. Supera Mañana.",
    description: "Gimnasio premium con tecnología IA. Transforma tu cuerpo y tu disciplina.",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className="scroll-smooth">
      <body className="bg-dark text-white font-inter antialiased overflow-x-hidden">
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
