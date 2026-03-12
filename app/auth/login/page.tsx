"use client";

import { useRouter } from "next/navigation";
import { ManagementProvider, useManagement, setAuthToken } from "@/context/ManagementContext";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/sections/Footer";
import LoginPageContent from "@/components/sections/LoginPageContent";

function LoginForm() {
  const router = useRouter();
  const { setSession } = useManagement();

  async function handleLogin(email: string, password: string) {
    const res = await fetch("/api/v1/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json();
    if (!res.ok) {
      return { ok: false as const, error: data.message ?? data.error ?? "Login failed" };
    }
    if (data.data?.token) {
      setAuthToken(data.data.token);
      setSession(data.data.user);
      const role = data.data.user?.role;
      if (role === "MANAGEMENT") router.push("/management");
      else if (role === "TEACHER") router.push("/teacher");
      else if (role === "STUDENT") router.push("/student");
      else router.push("/");
      return { ok: true as const };
    }
    return { ok: false as const, error: "Login failed" };
  }

  return (
    <>
      <Navbar />
      <main>
        <LoginPageContent onSubmit={handleLogin} />
      </main>
      <Footer />
    </>
  );
}

export default function LoginPage() {
  return (
    <ManagementProvider>
      <LoginForm />
    </ManagementProvider>
  );
}
