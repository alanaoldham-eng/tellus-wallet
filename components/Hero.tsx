"use client";

import { useRouter } from "next/navigation";
import { useTellusAuth } from "@/hooks/useTellusAuth";

export function Hero() {
  const router = useRouter();
  const { walletAddress, isLoading, login } = useTellusAuth();

  async function handleContinue() {
    await login();
    router.push("/dashboard");
  }

  return (
    <section className="mx-auto grid max-w-6xl gap-10 px-6 py-16 md:grid-cols-2">
      <div>
        <p className="mb-3 text-sm uppercase tracking-[0.2em] text-tellus-muted">Test Before CAPIT Wiring</p>
        <h1 className="mb-4 text-5xl font-semibold leading-tight">
          Tellus Wallet on <span className="text-blue-400">Base Sepolia</span>
        </h1>
        <p className="mb-8 max-w-xl text-lg text-tellus-muted">
          Validate email wallet onboarding, implicit user creation, cookie-based sessions, and a clean dashboard shell before wiring CAPIT production behavior.
        </p>

        <div className="flex flex-wrap gap-3">
          <button
            onClick={handleContinue}
            disabled={!walletAddress || isLoading}
            className="rounded-xl bg-white px-5 py-3 font-medium text-black disabled:opacity-50"
          >
            {isLoading ? "Signing in..." : "Continue with email"}
          </button>

          <a href="/dashboard" className="rounded-xl border border-tellus-border px-5 py-3">
            View dashboard shell
          </a>
        </div>

        <p className="mt-4 text-sm text-tellus-muted">
          This package is profile- and session-first. Token reads and CAPIT-specific purchase flow come after the shell is validated.
        </p>
      </div>

      <div className="rounded-3xl border border-tellus-border bg-tellus-surface p-6 shadow-2xl">
        <div className="mb-5 flex items-center justify-between">
          <span className="text-sm text-tellus-muted">Preview</span>
          <span className="rounded-full border border-tellus-border px-3 py-1 text-xs">Base Sepolia</span>
        </div>

        <div className="rounded-2xl bg-tellus-bg p-5">
          <div className="mb-2 text-sm text-tellus-muted">Tellus Wallet</div>
          <div className="mb-1 text-3xl font-semibold">Session + Profile</div>
          <div className="text-sm text-tellus-muted">Connect with email to create your user record automatically</div>
        </div>

        <div className="mt-5 grid grid-cols-2 gap-3">
          <div className="rounded-2xl border border-tellus-border p-4">
            <div className="text-sm text-tellus-muted">Auth</div>
            <div className="mt-1 font-medium">thirdweb + cookie session</div>
          </div>
          <div className="rounded-2xl border border-tellus-border p-4">
            <div className="text-sm text-tellus-muted">Backend</div>
            <div className="mt-1 font-medium">FastAPI + Postgres</div>
          </div>
        </div>
      </div>
    </section>
  );
}
