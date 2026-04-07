import { createThirdwebClient } from "thirdweb";
import { baseSepolia } from "thirdweb/chains";
import { inAppWallet } from "thirdweb/wallets";

const secretKey = process.env.THIRDWEB_SECRET_KEY;
const clientId = process.env.NEXT_PUBLIC_THIRDWEB_CLIENT_ID;

if (!secretKey && !clientId) {
  throw new Error("Missing thirdweb credentials. Set THIRDWEB_SECRET_KEY or NEXT_PUBLIC_THIRDWEB_CLIENT_ID.");
}

export const client = createThirdwebClient(secretKey ? { secretKey } : { clientId: clientId! });
export const chain = baseSepolia;
export const wallets = [inAppWallet({ auth: { options: ["email"] } })];
