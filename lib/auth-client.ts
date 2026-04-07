export async function getLoginPayload(address: string) {
  const res = await fetch("/api/auth/payload", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ address })
  });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}

export async function verifyAndExchange(params: {
  payload: unknown;
  signature: string;
  email?: string | null;
}) {
  const res = await fetch("/api/auth/verify", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(params),
    credentials: "include"
  });
  if (!res.ok) throw new Error(await res.text());
  return res.json() as Promise<{ authenticated: boolean; user_id: string; wallet_address: string }>;
}

export async function getSessionStatus() {
  const res = await fetch("/api/auth/session", { credentials: "include" });
  if (res.status === 401) return { authenticated: false };
  if (!res.ok) throw new Error(await res.text());
  return res.json() as Promise<{ authenticated: boolean; user_id: string }>;
}

export async function logoutSession() {
  const res = await fetch("/api/auth/logout", { method: "POST", credentials: "include" });
  if (!res.ok) throw new Error(await res.text());
}

export async function apiGet<T>(path: string): Promise<T> {
  const res = await fetch(path, { credentials: "include" });
  if (!res.ok) throw new Error(await res.text());
  return res.json() as Promise<T>;
}

export async function apiPatch<T>(path: string, body: unknown): Promise<T> {
  const res = await fetch(path, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(body)
  });
  if (!res.ok) throw new Error(await res.text());
  return res.json() as Promise<T>;
}
