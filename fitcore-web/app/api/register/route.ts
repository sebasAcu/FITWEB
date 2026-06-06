import { NextRequest, NextResponse } from "next/server";
import { createUser } from "@/lib/users";

export async function POST(req: NextRequest) {
  const { name, email, password } = await req.json();
  if (!name || !email || !password) {
    return NextResponse.json({ error: "Todos los campos son requeridos" }, { status: 400 });
  }
  try {
    await createUser(name, email, password);
    return NextResponse.json({ ok: true });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Error al registrar";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
