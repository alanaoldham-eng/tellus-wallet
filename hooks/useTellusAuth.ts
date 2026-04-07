"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useActiveAccount, ConnectButton } from "thirdweb/react";
import { signLoginPayload } from "thirdweb/auth";
import { getUserEmail } from "thirdweb/wallets/in-app";
import { client, chain, wallets } from "@/lib/thirdweb";
import { getLoginPayload, getSessionStatus, logoutSession, verifyAndExchange } from "@/lib/auth-client";

export function useTellusAuth() {
  const account = useActiveAccount();
  const [email, setEmail] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const walletAddress = useMemo(() => account?.address ?? null, [account]);

  useEffect(() => {
    let cancelled = false;
    async function loadSession() {
      try {
        const session = await getSessionStatus();
        if (!cancelled) setIsAuthenticated(!!session.authenticated);
      } catch {
        if (!cancelled) setIsAuthenticated(false);
      }
    }
    loadSession();
    return () => { cancelled = true; };
  }, []);

  useEffect(() => {
    let cancelled = false;
    async function loadEmail() {
      if (!account) {
        setEmail(null);
        return;
      }
      try {
        const value = await getUserEmail({ client });
        if (!cancelled) setEmail(value ?? null);
      } catch {
        if (!cancelled) setEmail(null);
      }
    }
    loadEmail();
    return () => { cancelled = true; };
  }, [account]);

  const login = useCallback(async () => {
    if (!account) throw new Error("No connected account");
    setIsLoading(true);
    try {
  const payload = await getLoginPayload(account.address);
  const signed = await signLoginPayload({ payload, account });

  const session = await verifyAndExchange({
    payload: signed.payload,
    signature: signed.signature,
    email,
  });
      setIsAuthenticated(!!session.authenticated);
    } finally {
      setIsLoading(false);
    }
  }, [account, email]);

  const logout = useCallback(async () => {
    await logoutSession();
    setIsAuthenticated(false);
  }, []);

  return {
    ConnectButton,
    client,
    chain,
    wallets,
    walletAddress,
    email,
    isLoading,
    isAuthenticated,
    login,
    logout,
  };
}
