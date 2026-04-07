import { cookies } from "next/headers";

const backendBase = process.env.NEXT_PUBLIC_BACKEND_URL || "";
const cookieName = process.env.APP_SESSION_COOKIE_NAME || "tellus_wallet_session";

export async function GET() {
  const cookieStore = await cookies();
  const token = cookieStore.get(cookieName)?.value;
  if (!token) return new Response("Not authenticated", { status: 401 });

  const res = await fetch(`${backendBase}/api/v1/me`, {
    headers: { Authorization: `Bearer ${token}` },
    cache: "no-store",
  });

  return new Response(await res.text(), {
    status: res.status,
    headers: { "Content-Type": "application/json" },
  });
}

export async function PATCH(req: Request) {
  const cookieStore = await cookies();
  const token = cookieStore.get(cookieName)?.value;
  if (!token) return new Response("Not authenticated", { status: 401 });

  const body = await req.text();
  const res = await fetch(`${backendBase}/api/v1/me`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body,
  });

  return new Response(await res.text(), {
    status: res.status,
    headers: { "Content-Type": "application/json" },
  });
}
