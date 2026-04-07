import { cookies } from "next/headers";
import { createAuth } from "thirdweb/auth";
import { privateKeyToAccount } from "thirdweb/wallets";
import { client } from "@/lib/thirdweb";

const privateKey = process.env.AUTH_PRIVATE_KEY || "";
const domain = process.env.NEXT_PUBLIC_THIRDWEB_AUTH_DOMAIN || "";
const backendBase = process.env.NEXT_PUBLIC_BACKEND_URL || "";
const cookieName = process.env.APP_SESSION_COOKIE_NAME || "tellus_wallet_session";
const cookieSecure = (process.env.APP_SESSION_COOKIE_SECURE || "false").toLowerCase() === "true";

const thirdwebAuth = createAuth({
  domain,
  client,
  adminAccount: privateKeyToAccount({ client, privateKey }),
});

export async function POST(req: Request) {
  const { payload, signature, email } = await req.json();
  const verified = await thirdwebAuth.verifyPayload({ payload, signature });

  if (!verified.valid) return new Response("Invalid thirdweb auth payload", { status: 401 });

  const exchangeRes = await fetch(`${backendBase}/api/v1/auth/exchange`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ wallet_address: payload.address, email }),
  });

  if (!exchangeRes.ok) return new Response(await exchangeRes.text(), { status: exchangeRes.status });

  const appSession = await exchangeRes.json();
  const cookieStore = await cookies();
  cookieStore.set({
    name: cookieName,
    value: appSession.access_token,
    httpOnly: true,
    secure: cookieSecure,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });

  return Response.json({
    authenticated: true,
    user_id: appSession.user_id,
    wallet_address: appSession.wallet_address,
  });
}
