import { apiGet, apiPatch } from "@/lib/auth-client";

export type MeResponse = {
  user_id: string;
  email: string | null;
  username: string | null;
  wallet_address: string;
  environment: string;
  kyc_status: string;
};

export function getMe() {
  return apiGet<MeResponse>("/api/proxy/me");
}

export function patchMe(payload: { username?: string }) {
  return apiPatch<MeResponse>("/api/proxy/me", payload);
}
