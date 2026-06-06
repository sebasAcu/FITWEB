import { createHash } from "crypto";
import { SignJWT, importPKCS8 } from "jose";

const SHEET_ID = process.env.GOOGLE_SHEET_ID!;
const AUTH_SHEET = "Auth";

async function getAccessToken() {
  const privateKey = process.env.GOOGLE_SERVICE_ACCOUNT_KEY!.replace(/\\n/g, "\n");
  const email = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL!;
  const now = Math.floor(Date.now() / 1000);
  const key = await importPKCS8(privateKey, "RS256");
  const jwt = await new SignJWT({ scope: "https://www.googleapis.com/auth/spreadsheets" })
    .setProtectedHeader({ alg: "RS256" })
    .setIssuer(email)
    .setAudience("https://oauth2.googleapis.com/token")
    .setIssuedAt(now)
    .setExpirationTime(now + 3600)
    .sign(key);

  const res = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
      assertion: jwt,
    }),
  });
  const data = await res.json();
  return data.access_token as string;
}

export function hashPassword(password: string) {
  return createHash("sha256").update(password + "fitcore_salt_2024").digest("hex");
}

export async function findUser(email: string) {
  const token = await getAccessToken();
  const res = await fetch(
    `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${AUTH_SHEET}!A:D`,
    { headers: { Authorization: `Bearer ${token}` } }
  );
  const data = await res.json();
  const rows: string[][] = data.values ?? [];
  const row = rows.find((r) => r[0]?.toLowerCase() === email.toLowerCase());
  if (!row) return null;
  return { email: row[0], name: row[1], passwordHash: row[2] };
}

export async function createUser(name: string, email: string, password: string) {
  const existing = await findUser(email);
  if (existing) throw new Error("Email ya registrado");

  const token = await getAccessToken();
  const fecha = new Date().toLocaleString("es-CL", { timeZone: "America/Santiago" });

  await fetch(
    `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${AUTH_SHEET}!A:D:append?valueInputOption=USER_ENTERED`,
    {
      method: "POST",
      headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
      body: JSON.stringify({ values: [[email, name, hashPassword(password), fecha]] }),
    }
  );
}
