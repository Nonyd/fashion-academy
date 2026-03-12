"use client";

import React, { createContext, useCallback, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type Session = {
  userId: string;
  email: string;
  role: string;
  firstName?: string;
  lastName?: string;
};

type ManagementContextValue = {
  session: Session | null;
  user: Session | null;
  loading: boolean;
  apiFetch: (path: string, options?: RequestInit) => Promise<Response>;
  setSession: (s: Session | null) => void;
  logout: () => void;
};

const ManagementContext = createContext<ManagementContextValue | null>(null);

const TOKEN_KEY = "pfa_token";
const SESSION_KEY = "pfa_session";

export function ManagementProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [session, setSessionState] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  const setSession = useCallback((s: Session | null) => {
    setSessionState(s);
    if (typeof window !== "undefined") {
      if (s) {
        try {
          localStorage.setItem(SESSION_KEY, JSON.stringify(s));
        } catch {}
      } else {
        localStorage.removeItem(SESSION_KEY);
        localStorage.removeItem(TOKEN_KEY);
      }
    }
  }, []);

  const apiFetch = useCallback(
    async (path: string, options: RequestInit = {}) => {
      const token = typeof window !== "undefined" ? localStorage.getItem(TOKEN_KEY) : null;
      const res = await fetch(path.startsWith("http") ? path : `/api/v1${path.startsWith("/") ? path : `/${path}`}`, {
        ...options,
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
          ...options.headers,
        },
      });
      if (res.status === 401) {
        setSessionState(null);
        localStorage.removeItem(TOKEN_KEY);
        localStorage.removeItem(SESSION_KEY);
        router.push("/auth/login?from=" + encodeURIComponent(typeof window !== "undefined" ? window.location.pathname : ""));
      }
      return res;
    },
    [router]
  );

  const logout = useCallback(() => {
    setSessionState(null);
    if (typeof window !== "undefined") {
      localStorage.removeItem(TOKEN_KEY);
      localStorage.removeItem(SESSION_KEY);
    }
    router.push("/auth/login");
  }, [router]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const stored = localStorage.getItem(SESSION_KEY);
    const token = localStorage.getItem(TOKEN_KEY);
    if (stored && token) {
      try {
        const s = JSON.parse(stored) as Session;
        if (s.role === "MANAGEMENT") setSessionState(s);
      } catch {}
    }
    setLoading(false);
  }, []);

  const value: ManagementContextValue = {
    session,
    user: session,
    loading,
    apiFetch,
    setSession,
    logout,
  };

  return (
    <ManagementContext.Provider value={value}>
      {children}
    </ManagementContext.Provider>
  );
}

export function useManagement() {
  const ctx = useContext(ManagementContext);
  if (!ctx) throw new Error("useManagement must be used within ManagementProvider");
  return ctx;
}

export function setAuthToken(token: string) {
  if (typeof window !== "undefined") localStorage.setItem(TOKEN_KEY, token);
}
