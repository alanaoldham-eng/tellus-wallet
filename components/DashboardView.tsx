"use client";

import { useEffect, useState } from "react";
import { getMe, patchMe, type MeResponse } from "@/lib/wallet-api";

export function DashboardView() {
  const [me, setMe] = useState<MeResponse | null>(null);
  const [username, setUsername] = useState("");
  const [status, setStatus] = useState("");

  useEffect(() => {
    async function load() {
      const result = await getMe();
      setMe(result);
      setUsername(result.username ?? "");
    }
    load().catch((err) => setStatus(err instanceof Error ? err.message : "Failed to load profile"));
  }, []);

  async function saveProfile() {
    try {
      const updated = await patchMe({ username });
      setMe(updated);
      setStatus("Profile updated");
    } catch (err) {
      setStatus(err instanceof Error ? err.message : "Failed to update profile");
    }
  }

  return (
    <main className="mx-auto max-w-6xl px-6 py-10">
      <div className="mb-8 flex items-start justify-between gap-4">
        <div>
          <h1 className="text-3xl font-semibold">Tellus Wallet Dashboard</h1>
          <p className="mt-2 text-tellus-muted">Standalone validation shell before CAPIT integration.</p>
        </div>

        <span className="rounded-full border border-tellus-border px-3 py-1 text-xs text-tellus-muted">
          Base Sepolia
        </span>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <section className="rounded-3xl border border-tellus-border bg-tellus-surface p-6 md:col-span-2">
          <div className="mb-4 text-sm text-tellus-muted">Environment</div>
          <div className="mb-2 text-4xl font-semibold">Pre-CAPIT Test</div>
          <div className="text-sm text-tellus-muted">
            Token balances are intentionally not wired yet. Use this screen to validate auth, profile persistence, and deployment.
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <div className="rounded-2xl border border-tellus-border p-4">
              <div className="text-sm text-tellus-muted">Network</div>
              <div className="mt-1 font-medium">{me?.environment ?? "Base Sepolia"}</div>
            </div>
            <div className="rounded-2xl border border-tellus-border p-4">
              <div className="text-sm text-tellus-muted">KYC status</div>
              <div className="mt-1 font-medium">{me?.kyc_status ?? "loading..."}</div>
            </div>
          </div>
        </section>

        <section className="rounded-3xl border border-tellus-border bg-tellus-surface p-6">
          <div className="mb-4 text-sm text-tellus-muted">Account</div>
          <div className="space-y-3 text-sm">
            <div>
              <div className="text-tellus-muted">Email</div>
              <div>{me?.email ?? "—"}</div>
            </div>
            <div>
              <div className="text-tellus-muted">Wallet</div>
              <div className="break-all">{me?.wallet_address ?? "—"}</div>
            </div>
          </div>
        </section>
      </div>

      <section className="mt-6 rounded-3xl border border-tellus-border bg-tellus-surface p-6">
        <h2 className="mb-4 text-xl font-semibold">Profile</h2>

        <div className="max-w-md space-y-4">
          <div>
            <label className="mb-2 block text-sm text-tellus-muted">Username</label>
            <input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Choose a username"
              className="w-full rounded-xl border border-tellus-border bg-tellus-bg px-4 py-3"
            />
          </div>

          <button onClick={saveProfile} className="rounded-xl bg-white px-4 py-2 text-black">
            Save profile
          </button>

          {status ? <p className="text-sm text-tellus-muted">{status}</p> : null}
        </div>
      </section>
    </main>
  );
}
