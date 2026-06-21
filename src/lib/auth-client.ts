import { createAuthClient } from "better-auth/react";

// Inisialisasi auth client untuk digunakan di komponen Client ("use client")
export const authClient = createAuthClient({
  baseURL: typeof window !== "undefined" 
    ? window.location.origin 
    : (process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"),
});
