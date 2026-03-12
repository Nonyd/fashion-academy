"use client";

import { useManagement } from "@/context/ManagementContext";

export function useManagementHook() {
  return useManagement();
}

export async function apiFetch(path: string, options?: RequestInit) {
  const token = typeof window !== "undefined" ? localStorage.getItem("pfa_token") : null;
  const url = path.startsWith("http") ? path : `/api/v1${path.startsWith("/") ? path : `/${path}`}`;
  const res = await fetch(url, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options?.headers,
    },
  });
  return res;
}
