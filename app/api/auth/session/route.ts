import { cookies } from "next/headers";
import { jwtDecode } from "jwt-decode";

const cookieName = process.env.APP_SESSION_COOKIE_NAME || "tellus_wallet_session";

type JwtPayload = { sub?: string; exp?: number };

export async function GET() {
  const cookieStore = await cookies();
  const token = cookieStore.get(cookieName)?.value;
  if (!token) return new Response("Not authenticated", { status: 401 });

  try {
    const decoded = jwtDecode<JwtPayload>(token);
    if (!decoded.sub) return new Response("Invalid session token", { status: 401 });
    return Response.json({ authenticated: true, user_id: decoded.sub });
  } catch {
    return new Response("Invalid session token", { status: 401 });
  }
}
