"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

export const useAdmin = () => {
  const [admin, setAdmin] = useState<{
    email: string;
    password: string;
  } | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const stored = localStorage.getItem("admin");
    if (stored) {
      setAdmin(JSON.parse(stored));
    }
  }, []);

  const login = async (email: string, password: string) => {
    setError("");
    setLoading(true);
    try {
      const res = await axios.post("/api/admin", { email, password });
      if (res.data.success) {
        const credentials = { email, password };
        localStorage.setItem("admin", JSON.stringify(credentials));
        setAdmin(credentials);
        router.push("/admindashboard");
      } else {
        setError(res.data.message || "Invalid credentials");
      }
    } catch {
      setError("Server error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem("admin");
    setAdmin(null);
    router.push("/admin/login");
  };

  return { admin, login, logout, error, loading };
};
