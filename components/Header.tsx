"use client";

import Link from "next/link";
import { useTellusAuth } from "@/hooks/useTellusAuth";

export function Header() {
  const { ConnectButton, client, chain, wallets, isAuthenticated } = useTellusAuth();

  return (
    <header className="border-b border-tellus-border bg-tellus-bg/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="text-lg font-semibold tracking-wide">
          Tellus Wallet <span className="text-tellus-muted text-sm font-normal">Test Shell</span>
        </Link>

        <div className="flex items-center gap-3">
          <span className="rounded-full border border-tellus-border px-3 py-1 text-xs text-tellus-muted">
            Base Sepolia
          </span>

          {isAuthenticated ? (
            <Link href="/dashboard" className="rounded-xl border border-tellus-border px-4 py-2 text-sm">
              Dashboard
            </Link>
          ) : (
            <ConnectButton client={client} chain={chain} wallets={wallets} />
          )}
        </div>
      </div>
    </header>
  );
}
