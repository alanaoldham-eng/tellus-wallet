import { cookies } from "next/headers";

const cookieName = process.env.APP_SESSION_COOKIE_NAME || "tellus_wallet_session";
const cookieSecure = (process.env.APP_SESSION_COOKIE_SECURE || "false").toLowerCase() === "true";

export async function POST() {
  const cookieStore = await cookies();
  cookieStore.set({
    name: cookieName,
    value: "",
    httpOnly: true,
    secure: cookieSecure,
    sameSite: "lax",
    path: "/",
    maxAge: 0,
  });
  return Response.json({ authenticated: false });
}
