"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useSession } from "next-auth/react";
import { Sparkles, Dumbbell, RotateCcw, ChevronRight, Check, Calendar, Youtube } from "lucide-react";

function ytUrl(name: string, machine: string) {
  return `https://www.youtube.com/results?search_query=${encodeURIComponent(name + " " + machine + " tutorial gym")}`;
}

interface Exercise { id: string; name: string; machine: string; sets: number; reps: number; tip?: string; }
type Phase = "ai" | "preview" | "workout" | "done";
interface WorkoutState { exerciseIndex: number; setIndex: number; repsDone: number; }

const DAYS_LABEL: Record<string, string> = {
  lunes: "Lunes", martes: "Martes", miercoles: "Miércoles",
  jueves: "Jueves", viernes: "Viernes", sabado: "Sábado", domingo: "Domingo",
};

const SUGGESTIONS = {
  gym: [
    "Quiero ganar masa muscular en piernas",
    "Rutina de pecho y tríceps para principiantes",
    "Espalda ancha con máquinas",
    "Brazos definidos, nivel intermedio",
    "Hombros fuertes sin lesionarme",
    "Cardio y tonificación con máquinas",
  ],
  home: [
    "Rutina de abdomen en casa sin equipos",
    "Piernas y glúteos solo con peso corporal",
    "Pecho y brazos en casa, nivel principiante",
    "Cardio intenso en casa sin saltar mucho",
    "Rutina completa de 30 minutos en casa",
    "Espalda y postura sin equipamiento",
  ],
};

function planKey(email: string) { return `fitcore_plan_${email}`; }
function progressKey(email: string) { return `fitcore_progress_${email}`; }
function todayStr() { return new Date().toISOString().split("T")[0]; }

export default function RutinaPage() {
  const { data: session } = useSession();
  const router = useRouter();
  const searchParams = useSearchParams();
  const dayParam = searchParams.get("day") ?? "";
  const autoStart = searchParams.get("start") === "1";

  const [phase, setPhase] = useState<Phase>("ai");
  const [goal, setGoal] = useState("");
  const [workoutType, setWorkoutType] = useState<"gym" | "home">("gym");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [routineName, setRoutineName] = useState("");
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [saved, setSaved] = useState(false);
  const [dayAlreadyHasRoutine, setDayAlreadyHasRoutine] = useState(false);

  const [ws, setWs] = useState<WorkoutState>({ exerciseIndex: 0, setIndex: 0, repsDone: 0 });
  const [restTimer, setRestTimer] = useState<number | null>(null);

  // Detectar si el día ya tiene rutina guardada
  useEffect(() => {
    if (!dayParam || !session?.user?.email) return;
    const raw = localStorage.getItem(planKey(session.user.email));
    if (!raw) return;
    const plan = JSON.parse(raw);
    setDayAlreadyHasRoutine(!!plan[dayParam]);
  }, [dayParam, session]);

  // If coming from planner with start=1, load saved routine and go straight to workout
  useEffect(() => {
    if (!autoStart || !dayParam || !session?.user?.email) return;
    const raw = localStorage.getItem(planKey(session.user.email));
    if (!raw) return;
    const plan = JSON.parse(raw);
    const dayPlan = plan[dayParam];
    if (!dayPlan) return;
    setRoutineName(dayPlan.name);
    setExercises(dayPlan.exercises);
    setWs({ exerciseIndex: 0, setIndex: 0, repsDone: 0 });
    setPhase("workout");
  }, [autoStart, dayParam, session]);

  const generate = async (query = goal, type = workoutType) => {
    if (!query.trim()) return;
    setLoading(true);
    setError("");
    setSaved(false);
    try {
      const res = await fetch("/api/rutina", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ goal: query, type }),
      });
      const data = await res.json();
      if (!res.ok || data.error) throw new Error(data.error || "Error generando rutina");
      setRoutineName(data.name);
      setExercises(data.exercises);
      setPhase("preview");
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Error al generar. Intenta de nuevo.");
    } finally {
      setLoading(false);
    }
  };

  const saveToDay = (day: string) => {
    if (!session?.user?.email) return;
    const key = planKey(session.user.email);
    const existing = localStorage.getItem(key);
    const plan = existing ? JSON.parse(existing) : {};

    // Si ya hay una rutina guardada en ese día, pide confirmación
    if (plan[day]) {
      const ok = window.confirm(
        `El ${DAYS_LABEL[day]} ya tiene una rutina guardada ("${plan[day].name}").\n\n¿Quieres reemplazarla con la nueva?`
      );
      if (!ok) return;
    }

    plan[day] = { name: routineName, exercises };
    localStorage.setItem(key, JSON.stringify(plan));
    setSaved(true);
  };

  const startWorkout = () => {
    if (exercises.length === 0) return;
    setWs({ exerciseIndex: 0, setIndex: 0, repsDone: 0 });
    setRestTimer(null);
    setPhase("workout");
  };

  const currentEx = exercises[ws.exerciseIndex];
  const restIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const startRest = useCallback(() => {
    if (restIntervalRef.current) clearInterval(restIntervalRef.current);
    let secs = 60;
    setRestTimer(secs);
    restIntervalRef.current = setInterval(() => {
      secs -= 1;
      setRestTimer(secs);
      if (secs <= 0) {
        clearInterval(restIntervalRef.current!);
        restIntervalRef.current = null;
        setRestTimer(null);
      }
    }, 1000);
  }, []);

  const skipRest = useCallback(() => {
    if (restIntervalRef.current) {
      clearInterval(restIntervalRef.current);
      restIntervalRef.current = null;
    }
    setRestTimer(null);
  }, []);

  const countRep = useCallback(() => {
    if (restTimer !== null) return;
    const newReps = ws.repsDone + 1;
    if (newReps < currentEx.reps) {
      setWs({ ...ws, repsDone: newReps });
      return;
    }
    const nextSet = ws.setIndex + 1;
    if (nextSet < currentEx.sets) {
      setWs({ ...ws, repsDone: 0, setIndex: nextSet });
      startRest();
      return;
    }
    const nextEx = ws.exerciseIndex + 1;
    if (nextEx < exercises.length) {
      setWs({ exerciseIndex: nextEx, setIndex: 0, repsDone: 0 });
      startRest();
      return;
    }
    if (session?.user?.email) {
      const pKey = progressKey(session.user.email);
      const existing = localStorage.getItem(pKey);
      const prog = existing ? JSON.parse(existing) : {};
      prog[todayStr()] = { completed: true, routineName, day: dayParam || "libre", completedAt: new Date().toISOString() };
      localStorage.setItem(pKey, JSON.stringify(prog));
    }
    setPhase("done");
  }, [ws, currentEx, exercises.length, restTimer, startRest, session, routineName, dayParam]);
  const resetToAi = () => { setPhase("ai"); setGoal(""); setExercises([]); setWs({ exerciseIndex: 0, setIndex: 0, repsDone: 0 }); setRestTimer(null); setSaved(false); };

  const repPct = currentEx ? (ws.repsDone / currentEx.reps) * 100 : 0;
  const totalSets = exercises.reduce((s, e) => s + e.sets, 0);
  const doneSets = exercises.slice(0, ws.exerciseIndex).reduce((s, e) => s + e.sets, 0) + ws.setIndex;
  const overallPct = totalSets > 0 ? (doneSets / totalSets) * 100 : 0;

  return (
    <div className="min-h-screen bg-[#050505] text-white font-['Inter',sans-serif] relative overflow-hidden">
      <div className="pointer-events-none fixed inset-0 z-0">
        <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] rounded-full bg-[#B7FF3C] opacity-[0.04] blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] rounded-full bg-[#B7FF3C] opacity-[0.03] blur-[100px]" />
      </div>

      <div className="relative z-10 max-w-2xl mx-auto px-4 py-10">
        {/* Top bar */}
        <div className="flex items-center justify-between mb-10">
          <Link href="/planner" className="text-white/40 hover:text-[#B7FF3C] transition-colors text-sm flex items-center gap-1.5">
            ← Mi plan
          </Link>
          <div className="flex items-center gap-2">
            {dayParam && (
              <span className="text-xs px-3 py-1 rounded-full border border-[#B7FF3C]/30 text-[#B7FF3C]">
                <Calendar className="w-3 h-3 inline mr-1" />
                {DAYS_LABEL[dayParam] ?? dayParam}
              </span>
            )}
            <span className="text-[#B7FF3C] text-xs font-bold tracking-[3px] uppercase flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" /> FitCore IA
            </span>
          </div>
        </div>

        {/* ══════════ PHASE: AI ══════════ */}
        {phase === "ai" && (
          <div className="space-y-8">
            <div>
              <h1 className="text-4xl font-black tracking-tight font-['Poppins',sans-serif]">
                ¿Qué quieres{" "}
                <span className="text-[#B7FF3C]">trabajar{dayParam ? ` el ${DAYS_LABEL[dayParam]?.toLowerCase()}` : " hoy"}?</span>
              </h1>
              <p className="text-white/40 mt-2 text-sm">La IA crea tu rutina personalizada.</p>
            </div>

            {/* Tipo de rutina */}
            <div className="flex gap-3">
              <button
                onClick={() => setWorkoutType("gym")}
                className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl border text-sm font-bold transition-all ${
                  workoutType === "gym"
                    ? "bg-[#B7FF3C]/10 border-[#B7FF3C]/50 text-[#B7FF3C]"
                    : "border-white/10 text-white/40 hover:border-white/20"
                }`}
              >
                🏋️ Gym con máquinas
              </button>
              <button
                onClick={() => setWorkoutType("home")}
                className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl border text-sm font-bold transition-all ${
                  workoutType === "home"
                    ? "bg-[#B7FF3C]/10 border-[#B7FF3C]/50 text-[#B7FF3C]"
                    : "border-white/10 text-white/40 hover:border-white/20"
                }`}
              >
                🏠 En casa
              </button>
            </div>

            <div className="relative">
              <textarea
                value={goal}
                onChange={(e) => setGoal(e.target.value)}
                onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); generate(); } }}
                placeholder="Ej. Quiero ganar masa en piernas, soy principiante y tengo 1 hora..."
                rows={3}
                className="w-full bg-white/[0.04] border border-white/10 rounded-2xl px-5 py-4 text-white placeholder-white/20 focus:outline-none focus:border-[#B7FF3C]/60 focus:bg-[#B7FF3C]/[0.03] transition-all resize-none text-sm leading-relaxed"
              />
              {error && <p className="mt-2 text-red-400 text-xs">{error}</p>}
            </div>

            <div>
              <p className="text-xs text-white/25 uppercase tracking-widest mb-3">Sugerencias</p>
              <div className="flex flex-wrap gap-2">
                {SUGGESTIONS[workoutType].map((s) => (
                  <button key={s} onClick={() => { setGoal(s); generate(s, workoutType); }}
                    className="text-xs px-3.5 py-2 rounded-full border border-white/[0.08] text-white/50 hover:border-[#B7FF3C]/40 hover:text-[#B7FF3C] hover:bg-[#B7FF3C]/[0.05] transition-all">
                    {s}
                  </button>
                ))}
              </div>
            </div>

            <button onClick={() => generate()} disabled={!goal.trim() || loading}
              className="w-full py-4 rounded-2xl font-black text-base tracking-[2px] uppercase flex items-center justify-center gap-3 bg-[#B7FF3C] text-[#050505] hover:brightness-110 disabled:opacity-30 disabled:cursor-not-allowed transition-all shadow-[0_0_30px_#B7FF3C33]">
              {loading ? (
                <><svg className="animate-spin w-5 h-5" viewBox="0 0 24 24" fill="none"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"/></svg>Generando rutina...</>
              ) : (
                <><Sparkles className="w-5 h-5" />Crear rutina con IA</>
              )}
            </button>
          </div>
        )}

        {/* ══════════ PHASE: PREVIEW ══════════ */}
        {phase === "preview" && (
          <div className="space-y-6">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs text-[#B7FF3C]/60 uppercase tracking-widest mb-1 flex items-center gap-1.5">
                  <Sparkles className="w-3 h-3" /> Rutina generada por IA
                </p>
                <h1 className="text-3xl font-black font-['Poppins',sans-serif]">{routineName}</h1>
              </div>
              <button onClick={resetToAi} className="shrink-0 p-2 rounded-xl border border-white/10 text-white/40 hover:text-[#B7FF3C] hover:border-[#B7FF3C]/30 transition-all" title="Generar otra">
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3">
              {exercises.map((ex, i) => (
                <div key={ex.id} className="bg-white/[0.03] border border-white/[0.07] rounded-2xl p-4 space-y-2">
                  <div className="flex items-center gap-3">
                    <span className="text-[#B7FF3C]/40 text-xs font-mono w-5 shrink-0">{String(i + 1).padStart(2, "0")}</span>
                    <div className="flex-1">
                      <p className="font-semibold text-white text-sm">{ex.name}</p>
                      <p className="text-xs text-white/35 flex items-center gap-1 mt-0.5"><Dumbbell className="w-3 h-3" />{ex.machine}</p>
                    </div>
                    <span className="text-sm font-bold text-[#B7FF3C] shrink-0">{ex.sets} × {ex.reps}</span>
                  </div>
                  {ex.tip && <p className="text-xs text-white/30 pl-8 leading-relaxed">💡 {ex.tip}</p>}
                  <div className="pl-8">
                    <a
                      href={ytUrl(ex.name, ex.machine)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-[11px] px-3 py-1.5 rounded-full border border-red-400/20 text-red-400/70 hover:text-red-400 hover:border-red-400/40 hover:bg-red-400/5 transition-all"
                    >
                      <Youtube className="w-3 h-3" /> ¿No sabes cómo hacerlo? Ver video
                    </a>
                  </div>
                </div>
              ))}
            </div>

            {/* Save to day */}
            {dayParam && (
              <button
                onClick={() => { saveToDay(dayParam); setDayAlreadyHasRoutine(true); }}
                disabled={saved}
                className={`w-full py-3 rounded-xl text-sm font-bold flex items-center justify-center gap-2 border transition-all ${
                  saved
                    ? "border-[#B7FF3C]/30 text-[#B7FF3C] bg-[#B7FF3C]/5"
                    : dayAlreadyHasRoutine
                    ? "border-yellow-500/30 text-yellow-400 hover:border-yellow-400/60"
                    : "border-white/10 text-white/50 hover:border-[#B7FF3C]/40 hover:text-[#B7FF3C]"
                }`}
              >
                {saved
                  ? <><Check className="w-4 h-4" /> Guardado en {DAYS_LABEL[dayParam]}</>
                  : dayAlreadyHasRoutine
                  ? <><Calendar className="w-4 h-4" /> Reemplazar rutina del {DAYS_LABEL[dayParam]}</>
                  : <><Calendar className="w-4 h-4" /> Guardar en {DAYS_LABEL[dayParam]}</>
                }
              </button>
            )}

            <div className="flex gap-3">
              <button onClick={resetToAi}
                className="flex-1 py-3.5 rounded-xl text-sm font-semibold border border-white/10 text-white/50 hover:border-[#B7FF3C]/30 hover:text-[#B7FF3C] transition-all flex items-center justify-center gap-2">
                <RotateCcw className="w-4 h-4" /> Otra rutina
              </button>
              <button onClick={startWorkout}
                className="flex-1 py-3.5 rounded-xl font-black text-sm tracking-wider bg-[#B7FF3C] text-[#050505] hover:brightness-110 transition-all shadow-[0_0_20px_#B7FF3C33] flex items-center justify-center gap-2">
                Iniciar <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            {saved && (
              <Link href="/planner" className="block text-center text-xs text-white/30 hover:text-[#B7FF3C] transition-colors underline underline-offset-4">
                ← Volver a mi plan semanal
              </Link>
            )}
          </div>
        )}

        {/* ══════════ PHASE: WORKOUT ══════════ */}
        {phase === "workout" && currentEx && (
          <div className="space-y-6">
            <div>
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-sm font-bold text-white/40 uppercase tracking-widest truncate pr-4">{routineName}</h2>
                <span className="text-xs text-white/30 shrink-0">{Math.round(overallPct)}%</span>
              </div>
              <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                <div className="h-full bg-[#B7FF3C] rounded-full transition-all duration-500" style={{ width: `${overallPct}%` }} />
              </div>
            </div>

            <div className="text-center">
              <p className="text-xs text-white/30 uppercase tracking-widest mb-1">Ejercicio {ws.exerciseIndex + 1} / {exercises.length}</p>
              <h1 className="text-3xl font-black font-['Poppins',sans-serif] text-white">{currentEx.name}</h1>
              <p className="text-white/35 text-xs mt-1 flex items-center justify-center gap-1"><Dumbbell className="w-3 h-3" />{currentEx.machine}</p>
              <p className="text-[#B7FF3C] text-sm mt-2 font-semibold">Serie {ws.setIndex + 1} de {currentEx.sets}</p>
            </div>

            <div className="flex flex-col items-center gap-6 py-4">
              <div className="relative w-[min(220px,80vw)] aspect-square">
                <svg viewBox="0 0 220 220" className="-rotate-90 w-full h-full">
                  <circle cx="110" cy="110" r="96" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="8" />
                  <circle cx="110" cy="110" r="96" fill="none" stroke="#B7FF3C" strokeWidth="8" strokeLinecap="round"
                    strokeDasharray={`${2 * Math.PI * 96}`}
                    strokeDashoffset={`${2 * Math.PI * 96 * (1 - repPct / 100)}`}
                    style={{ transition: "stroke-dashoffset 0.25s ease", filter: "drop-shadow(0 0 8px #B7FF3C88)" }} />
                </svg>
                <button onClick={countRep} disabled={restTimer !== null}
                  className="absolute inset-0 flex flex-col items-center justify-center rounded-full active:scale-[0.94] transition-transform disabled:cursor-not-allowed select-none">
                  {restTimer !== null ? (
                    <><span className="text-5xl font-black text-[#B7FF3C]">{restTimer}</span><span className="text-xs text-white/40 mt-1 tracking-widest uppercase">descanso</span></>
                  ) : (
                    <><span className="text-6xl font-black text-white leading-none">{ws.repsDone}</span><span className="text-sm text-white/40 mt-1">/ {currentEx.reps} reps</span><span className="text-[10px] text-[#B7FF3C]/60 mt-3 tracking-widest uppercase">toca para contar</span></>
                  )}
                </button>
              </div>
              {restTimer !== null && (
                <button onClick={skipRest} className="text-xs text-white/30 hover:text-[#B7FF3C] transition-colors underline underline-offset-4 tracking-widest uppercase">Saltar descanso</button>
              )}
            </div>

            {currentEx.tip && (
              <div className="bg-white/[0.02] border border-white/[0.05] rounded-xl px-4 py-3 text-xs text-white/30 flex items-center justify-between gap-3">
                <span>💡 {currentEx.tip}</span>
                <a
                  href={ytUrl(currentEx.name, currentEx.machine)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="shrink-0 flex items-center gap-1 px-2.5 py-1 rounded-full border border-red-400/20 text-red-400/60 hover:text-red-400 hover:border-red-400/40 transition-all text-[10px]"
                >
                  <Youtube className="w-3 h-3" />
                  ¿Cómo se hace?
                </a>
              </div>
            )}

            <div className="flex justify-center gap-2">
              {Array.from({ length: currentEx.sets }).map((_, i) => (
                <div key={i} className={`w-2.5 h-2.5 rounded-full transition-all ${i < ws.setIndex ? "bg-[#B7FF3C]" : i === ws.setIndex ? "bg-[#B7FF3C]/50 scale-125" : "bg-white/10"}`} />
              ))}
            </div>

            {ws.exerciseIndex + 1 < exercises.length && (
              <div className="bg-white/[0.02] border border-white/[0.05] rounded-xl px-4 py-3">
                <p className="text-xs text-white/20 uppercase tracking-widest mb-2">A continuación</p>
                <div className="space-y-1.5">
                  {exercises.slice(ws.exerciseIndex + 1, ws.exerciseIndex + 3).map((ex) => (
                    <div key={ex.id} className="flex justify-between text-sm">
                      <span className="text-white/50">{ex.name}</span>
                      <span className="text-white/25">{ex.sets} × {ex.reps}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <button onClick={() => setPhase("preview")} className="w-full py-3 rounded-xl text-sm text-white/30 hover:text-white/60 transition-colors border border-white/5 hover:border-white/10">
              ← Ver rutina completa
            </button>
          </div>
        )}

        {/* ══════════ PHASE: DONE ══════════ */}
        {phase === "done" && (
          <div className="flex flex-col items-center justify-center min-h-[60vh] text-center space-y-8">
            <div className="relative"><div className="text-8xl">🏆</div><div className="absolute inset-0 blur-3xl bg-[#B7FF3C] opacity-10 rounded-full" /></div>
            <div>
              <h1 className="text-4xl font-black font-['Poppins',sans-serif] text-[#B7FF3C] mb-2">¡Rutina completa!</h1>
              <p className="text-white/40 text-sm">{exercises.length} ejercicios · {totalSets} series en total</p>
            </div>
            <div className="w-full bg-white/[0.03] border border-white/[0.07] rounded-2xl p-5 space-y-2 text-left">
              {exercises.map((ex) => (
                <div key={ex.id} className="flex justify-between text-sm">
                  <span className="text-white/70 flex items-center gap-2"><span className="text-[#B7FF3C] text-xs">✓</span>{ex.name}</span>
                  <span className="text-white/30">{ex.sets} × {ex.reps}</span>
                </div>
              ))}
            </div>
            <div className="flex gap-3 w-full">
              <button onClick={startWorkout} className="flex-1 py-3.5 rounded-xl font-bold text-sm tracking-wider bg-[#B7FF3C] text-[#050505] hover:brightness-110 transition-all shadow-[0_0_20px_#B7FF3C33]">Repetir rutina</button>
              <Link href="/planner" className="flex-1 py-3.5 rounded-xl font-bold text-sm tracking-wider border border-white/10 text-white/60 hover:border-[#B7FF3C]/30 hover:text-[#B7FF3C] transition-all flex items-center justify-center">Mi plan semanal</Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
