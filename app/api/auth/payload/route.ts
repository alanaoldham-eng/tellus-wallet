import { createAuth } from "thirdweb/auth";
import { privateKeyToAccount } from "thirdweb/wallets";
import { client } from "@/lib/thirdweb";

const privateKey = process.env.AUTH_PRIVATE_KEY || "";
const domain = process.env.NEXT_PUBLIC_THIRDWEB_AUTH_DOMAIN || "";

const thirdwebAuth = createAuth({
  domain,
  client,
  adminAccount: privateKeyToAccount({ client, privateKey }),
});

export async function POST(req: Request) {
  const { address } = await req.json();
  if (!address) return new Response("Missing address", { status: 400 });
  const payload = await thirdwebAuth.generatePayload({ address });
  return Response.json(payload);
}
