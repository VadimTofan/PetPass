"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext({
  user: null,
  loading: true,
  refresh: async () => {},
  logout: async () => {},
});

// use relative paths so Next rewrites proxy to your Express API
const ME_URL = "/auth/me";
const LOGOUT_URL = "/auth/logout"; // adjust method to match your server

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  async function refresh() {
    try {
      const res = await fetch(ME_URL, {
        credentials: "include",
        cache: "no-store",
      });
      console.log("[AuthProvider] /auth/me status:", res.status);
      if (!res.ok) throw new Error("not ok");
      const data = await res.json();
      console.log("[AuthProvider] /auth/me payload:", data);
      setUser(data.user || null);
    } catch (e) {
      console.warn("[AuthProvider] /auth/me failed:", e);
      setUser(null);
    } finally {
      setLoading(false);
    }
  }

  async function logout() {
    try {
      const res = await fetch(LOGOUT_URL, {
        method: "POST", // change to "GET" if your route is GET
        credentials: "include",
      });
      console.log("[AuthProvider] /auth/logout status:", res.status);
    } finally {
      setUser(null);
    }
  }

  useEffect(() => {
    refresh();
  }, []);

  return <AuthContext.Provider value={{ user, loading, refresh, logout }}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}
