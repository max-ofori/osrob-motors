import { cookies } from "next/headers";
import crypto from "crypto";

const COOKIE_NAME = "shop_admin_session";
const SESSION_MAX_AGE_SECONDS = 60 * 60 * 12; // 12 hours

function getSecret(): string {
  const secret = process.env.ADMIN_CODE;
  if (!secret) {
    throw new Error(
      "ADMIN_CODE is not set. Add it to your environment variables (see .env.example)."
    );
  }
  return secret;
}

/**
 * We never store the admin code itself in the cookie. Instead we store a
 * signed token derived from it, so the code never appears in the browser
 * or in frontend JavaScript.
 */
function signToken(): string {
  const secret = getSecret();
  const issuedAt = Date.now().toString();
  const hmac = crypto.createHmac("sha256", secret).update(issuedAt).digest("hex");
  return `${issuedAt}.${hmac}`;
}

function isTokenValid(token: string): boolean {
  try {
    const [issuedAt, hmac] = token.split(".");
    if (!issuedAt || !hmac) return false;

    const secret = getSecret();
    const expected = crypto.createHmac("sha256", secret).update(issuedAt).digest("hex");

    const valid =
      expected.length === hmac.length &&
      crypto.timingSafeEqual(Buffer.from(expected), Buffer.from(hmac));

    if (!valid) return false;

    const age = Date.now() - Number(issuedAt);
    return age >= 0 && age <= SESSION_MAX_AGE_SECONDS * 1000;
  } catch {
    return false;
  }
}

export function checkAdminCode(submittedCode: string): boolean {
  const secret = getSecret();
  const a = Buffer.from(submittedCode);
  const b = Buffer.from(secret);
  if (a.length !== b.length) return false;
  return crypto.timingSafeEqual(a, b);
}

export async function createAdminSession() {
  const store = await cookies();
  store.set(COOKIE_NAME, signToken(), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: SESSION_MAX_AGE_SECONDS,
  });
}

export async function destroyAdminSession() {
  const store = await cookies();
  store.delete(COOKIE_NAME);
}

export async function isAdminAuthenticated(): Promise<boolean> {
  const store = await cookies();
  const token = store.get(COOKIE_NAME)?.value;
  if (!token) return false;
  return isTokenValid(token);
}

export const ADMIN_COOKIE_NAME = COOKIE_NAME;
