"use client";

import { useSession, signOut } from "next-auth/react";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Plus, Trash2, Play, LogOut, User, Sparkles, CheckCircle2, Circle, Flame } from "lucide-react";

const DAYS = [
  { key: "lunes",     label: "Lunes",     short: "LUN" },
  { key: "martes",    label: "Martes",    short: "MAR" },
  { key: "miercoles", label: "Miércoles", short: "MIÉ" },
  { key: "jueves",    label: "Jueves",    short: "JUE" },
  { key: "viernes",   label: "Viernes",   short: "VIE" },
  { key: "sabado",    label: "Sábado",    short: "SÁB" },
  { key: "domingo",   label: "Domingo",   short: "DOM" },
];

interface Exercise { id: string; name: string; machine: string; sets: number; reps: number; tip?: string; }
interface DayPlan { name: string; exercises: Exercise[]; }
interface DayProgress { completed: boolean; routineName: string; day: string; completedAt: string; }
type WeeklyPlan = Record<string, DayPlan | null>;
type ProgressLog = Record<string, DayProgress>;

function planKey(email: string) { return `fitcore_plan_${email}`; }
function progressKey(email: string) { return `fitcore_progress_${email}`; }

function getWeekDates() {
  const today = new Date();
  const dow = today.getDay(); // 0=dom
  const monday = new Date(today);
  monday.setDate(today.getDate() - (dow === 0 ? 6 : dow - 1));
  return Array.from({ length: 7 }, (_, i) => {
    const d = new Date(monday);
    d.setDate(monday.getDate() + i);
    return d.toISOString().split("T")[0];
  });
}

function calcStreak(progress: ProgressLog): number {
  let streak = 0;
  const today = new Date();
  for (let i = 0; i < 30; i++) {
    const d = new Date(today);
    d.setDate(today.getDate() - i);
    const key = d.toISOString().split("T")[0];
    if (progress[key]?.completed) streak++;
    else if (i > 0) break;
  }
  return streak;
}

export default function PlannerPage() {
  const { data: session } = useSession();
  const router = useRouter();
  const [plan, setPlan] = useState<WeeklyPlan>({});
  const [progress, setProgress] = useState<ProgressLog>({});
  const [today] = useState(() => {
    const d = new Date().getDay();
    const map: Record<number, string> = { 0:"domingo", 1:"lunes", 2:"martes", 3:"miercoles", 4:"jueves", 5:"viernes", 6:"sabado" };
    return map[d];
  });

  useEffect(() => {
    if (!session?.user?.email) return;
    const raw = localStorage.getItem(planKey(session.user.email));
    if (raw) setPlan(JSON.parse(raw));
    const rawP = localStorage.getItem(progressKey(session.user.email));
    if (rawP) setProgress(JSON.parse(rawP));
  }, [session]);

  const saveDay = (day: string, data: DayPlan | null) => {
    if (!session?.user?.email) return;
    const next = { ...plan, [day]: data };
    setPlan(next);
    localStorage.setItem(planKey(session.user.email), JSON.stringify(next));
  };

  const clearDay = (day: string) => saveDay(day, null);

  const totalDays = DAYS.filter(d => plan[d.key]).length;

  return (
    <div className="min-h-screen bg-[#050505] text-white font-['Inter',sans-serif] relative overflow-hidden">
      <div className="pointer-events-none fixed inset-0 z-0">
        <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] rounded-full bg-[#B7FF3C] opacity-[0.04] blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] rounded-full bg-[#B7FF3C] opacity-[0.03] blur-[100px]" />
      </div>

      <div className="relative z-10 max-w-2xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            {session?.user?.image && (
              <img src={session.user.image} alt="" className="w-9 h-9 rounded-full border border-white/10" />
            )}
            <div>
              <p className="text-xs text-white/40">Bienvenido</p>
              <p className="text-sm font-bold">{session?.user?.name?.split(" ")[0]}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Link href="/perfil" className="p-2 rounded-xl border border-white/10 text-white/40 hover:text-[#B7FF3C] hover:border-[#B7FF3C]/30 transition-all">
              <User className="w-4 h-4" />
            </Link>
            <button onClick={() => signOut({ callbackUrl: "/" })} className="p-2 rounded-xl border border-white/10 text-white/40 hover:text-red-400 hover:border-red-400/30 transition-all">
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Title */}
        <div className="mb-8">
          <h1 className="text-3xl font-black font-['Poppins',sans-serif]">
            Mi plan <span className="text-[#B7FF3C]">semanal</span>
          </h1>
          <p className="text-white/40 text-sm mt-1">
            {totalDays === 0
              ? "Agrega rutinas a tus días de entrenamiento"
              : `${totalDays} de 7 días con rutina asignada`}
          </p>
        </div>

        {/* ── PROGRESO SEMANAL ── */}
        {(() => {
          const weekDates = getWeekDates();
          const completedThisWeek = weekDates.filter(d => progress[d]?.completed).length;
          const daysWithPlan = DAYS.filter(d => plan[d.key]).length;
          const streak = calcStreak(progress);
          const todayDate = new Date().toISOString().split("T")[0];
          const completedToday = progress[todayDate]?.completed;

          return (
            <div className="mb-8 space-y-4">
              {/* Stats row */}
              <div className="grid grid-cols-3 gap-3">
                <div className="bg-white/[0.03] border border-white/[0.07] rounded-2xl p-4 text-center">
                  <p className="text-2xl font-black font-['Poppins',sans-serif] text-[#B7FF3C]">{completedThisWeek}<span className="text-white/30 text-sm font-normal">/{daysWithPlan || 7}</span></p>
                  <p className="text-[10px] text-white/40 mt-1 uppercase tracking-widest">Esta semana</p>
                </div>
                <div className="bg-white/[0.03] border border-white/[0.07] rounded-2xl p-4 text-center">
                  <p className="text-2xl font-black font-['Poppins',sans-serif] text-[#B7FF3C] flex items-center justify-center gap-1">
                    {streak > 0 && <Flame className="w-5 h-5" />}{streak}
                  </p>
                  <p className="text-[10px] text-white/40 mt-1 uppercase tracking-widest">Racha días</p>
                </div>
                <div className={`border rounded-2xl p-4 text-center ${completedToday ? "bg-[#B7FF3C]/10 border-[#B7FF3C]/30" : "bg-white/[0.03] border-white/[0.07]"}`}>
                  <p className="text-2xl font-black font-['Poppins',sans-serif]">
                    {completedToday ? <CheckCircle2 className="w-7 h-7 text-[#B7FF3C] mx-auto" /> : <Circle className="w-7 h-7 text-white/20 mx-auto" />}
                  </p>
                  <p className="text-[10px] text-white/40 mt-1 uppercase tracking-widest">Hoy</p>
                </div>
              </div>

              {/* Week dots */}
              <div className="bg-white/[0.03] border border-white/[0.07] rounded-2xl p-4">
                <p className="text-[10px] text-white/30 uppercase tracking-widest mb-3">Progreso diario</p>
                <div className="flex justify-between items-center">
                  {DAYS.map((day, i) => {
                    const dateStr = weekDates[i];
                    const done = progress[dateStr]?.completed;
                    const isToday = day.key === today;
                    return (
                      <div key={day.key} className="flex flex-col items-center gap-1.5">
                        <span className={`text-[9px] font-bold ${isToday ? "text-[#B7FF3C]" : "text-white/25"}`}>{day.short}</span>
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center border transition-all ${
                          done
                            ? "bg-[#B7FF3C] border-[#B7FF3C] shadow-[0_0_10px_rgba(183,255,60,0.4)]"
                            : isToday
                            ? "border-[#B7FF3C]/40 bg-[#B7FF3C]/5"
                            : "border-white/10 bg-white/[0.02]"
                        }`}>
                          {done
                            ? <CheckCircle2 className="w-4 h-4 text-[#050505]" />
                            : <Circle className={`w-3 h-3 ${isToday ? "text-[#B7FF3C]/40" : "text-white/10"}`} />
                          }
                        </div>
                        {plan[day.key] && !done && (
                          <div className="w-1.5 h-1.5 rounded-full bg-white/20" />
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          );
        })()}

        {/* Plan bar */}
        <div className="mb-6">
          <div className="h-1 bg-white/5 rounded-full overflow-hidden">
            <div className="h-full bg-[#B7FF3C] rounded-full transition-all duration-500" style={{ width: `${(totalDays / 7) * 100}%` }} />
          </div>
        </div>

        {/* Day cards */}
        <div className="space-y-3">
          {DAYS.map((day, i) => {
            const dayPlan = plan[day.key];
            const isToday = day.key === today;
            const weekDates = getWeekDates();
            const dateStr = weekDates[i];
            const isCompleted = progress[dateStr]?.completed;

            return (
              <div
                key={day.key}
                className={`rounded-2xl border transition-all ${
                  isCompleted
                    ? "border-[#B7FF3C]/40 bg-[#B7FF3C]/[0.04]"
                    : isToday
                    ? "border-[#B7FF3C]/20 bg-[#B7FF3C]/[0.02]"
                    : "border-white/[0.07] bg-white/[0.02]"
                }`}
              >
                <div className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className={`text-xs font-black tracking-widest w-8 ${isToday ? "text-[#B7FF3C]" : "text-white/30"}`}>
                        {day.short}
                      </span>
                      <div>
                        <p className={`text-sm font-bold ${isToday ? "text-white" : "text-white/70"}`}>
                          {day.label}
                          {isToday && <span className="ml-2 text-[10px] text-[#B7FF3C] font-normal tracking-widest uppercase">Hoy</span>}
                          {isCompleted && <span className="ml-2 text-[10px] text-[#B7FF3C] font-normal tracking-widest uppercase">✓ Completado</span>}
                        </p>
                        {dayPlan && (
                          <p className="text-xs text-white/35 mt-0.5">{dayPlan.exercises.length} ejercicios</p>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      {dayPlan ? (
                        <>
                          <Link
                            href={`/rutina?day=${day.key}`}
                            className="p-2 rounded-xl border border-white/10 text-white/40 hover:text-[#B7FF3C] hover:border-[#B7FF3C]/30 transition-all"
                            title="Cambiar rutina"
                          >
                            <Sparkles className="w-3.5 h-3.5" />
                          </Link>
                          <Link
                            href={`/rutina?day=${day.key}&start=1`}
                            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#B7FF3C]/10 border border-[#B7FF3C]/20 text-[#B7FF3C] text-xs font-bold hover:bg-[#B7FF3C]/20 transition-all"
                          >
                            <Play className="w-3 h-3" /> Iniciar
                          </Link>
                          <button onClick={() => clearDay(day.key)} className="p-2 rounded-xl border border-white/10 text-white/20 hover:text-red-400 hover:border-red-400/20 transition-all">
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </>
                      ) : (
                        <Link
                          href={`/rutina?day=${day.key}`}
                          className="flex items-center gap-1.5 px-3 py-2 rounded-xl border border-white/[0.08] text-white/40 hover:border-[#B7FF3C]/40 hover:text-[#B7FF3C] text-xs font-semibold transition-all"
                        >
                          <Plus className="w-3.5 h-3.5" /> Agregar rutina
                        </Link>
                      )}
                    </div>
                  </div>

                  {/* Routine preview */}
                  {dayPlan && (
                    <div className="mt-3 pt-3 border-t border-white/[0.05]">
                      <p className="text-xs font-semibold text-white/60 mb-2">{dayPlan.name}</p>
                      <div className="flex flex-wrap gap-1.5">
                        {dayPlan.exercises.slice(0, 4).map((ex) => (
                          <span key={ex.id} className="text-[10px] px-2 py-1 rounded-full bg-white/[0.04] border border-white/[0.06] text-white/40">
                            {ex.name}
                          </span>
                        ))}
                        {dayPlan.exercises.length > 4 && (
                          <span className="text-[10px] px-2 py-1 rounded-full bg-white/[0.04] border border-white/[0.06] text-white/25">
                            +{dayPlan.exercises.length - 4}
                          </span>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Quick add all */}
        {totalDays === 0 && (
          <div className="mt-8 text-center">
            <Link
              href="/rutina"
              className="inline-flex items-center gap-2 bg-[#B7FF3C] text-[#050505] font-black text-sm px-6 py-3.5 rounded-2xl hover:brightness-110 transition-all shadow-[0_0_30px_#B7FF3C33]"
            >
              <Sparkles className="w-4 h-4" />
              Generar primera rutina con IA
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
