import Groq from "groq-sdk";
import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { logToSheet } from "@/lib/sheets";

const client = new Groq({ apiKey: process.env.GROQ_API_KEY });

export async function POST(req: NextRequest) {
  const session = await auth();
  const { goal, type } = await req.json();
  if (!goal?.trim()) {
    return NextResponse.json({ error: "Falta el objetivo" }, { status: 400 });
  }

  const isHome = type === "home";

  const systemPrompt = isHome
    ? "Eres un entrenador personal experto en rutinas de ejercicio en casa sin equipamiento. Respondes SOLO con JSON válido, sin texto adicional ni markdown."
    : "Eres un entrenador personal experto en gimnasios con máquinas. Respondes SOLO con JSON válido, sin texto adicional ni markdown.";

  const exerciseField = isHome
    ? `"equipment": "Sin equipamiento / objeto del hogar"`
    : `"machine": "Nombre exacto de la máquina de gym"`;

  const rules = isHome
    ? `- 5 a 7 ejercicios sin máquinas ni pesas
- Usa ejercicios con peso corporal (flexiones, sentadillas, burpees, etc.)
- Puedes mencionar objetos del hogar (silla, pared, mochila con peso)
- En el campo "machine" pon el equipo o escribe "Sin equipamiento"
- Ajusta series/reps al nivel y objetivo
- Tips prácticos de 1 línea en español`
    : `- 5 a 7 ejercicios
- Usa máquinas de gym reales (prensa de piernas, polea alta, máquina Smith, etc.)
- Ajusta series/reps al nivel y objetivo mencionado
- Tips prácticos de 1 línea en español`;

  const completion = await client.chat.completions.create({
    model: "llama-3.1-8b-instant",
    max_tokens: 1024,
    messages: [
      { role: "system", content: systemPrompt },
      {
        role: "user",
        content: `El usuario busca: "${goal}"

Genera una rutina ${isHome ? "en casa sin máquinas" : "de gym con máquinas"} específica para ese objetivo.
Responde SOLO con este JSON exacto:
{
  "name": "Nombre descriptivo de la rutina en español",
  "exercises": [
    {
      "id": "1",
      "name": "Nombre del ejercicio",
      "machine": "Equipo necesario o Sin equipamiento",
      "sets": 3,
      "reps": 12,
      "tip": "Consejo técnico breve en español"
    }
  ]
}

Reglas:
${rules}`,
      },
    ],
  });

  const text = completion.choices[0]?.message?.content ?? "";

  try {
    const json = JSON.parse(text.trim());
    await logToSheet(
      session?.user?.name ?? "Anónimo",
      session?.user?.email ?? "Sin email",
      "Creó rutina",
      `${goal} (${type === "home" ? "Casa" : "Gym"})`
    );
    return NextResponse.json(json);
  } catch {
    const match = text.match(/\{[\s\S]*\}/);
    if (match) {
      return NextResponse.json(JSON.parse(match[0]));
    }
    return NextResponse.json(
      { error: "No se pudo generar la rutina. Intenta de nuevo." },
      { status: 500 }
    );
  }
}
