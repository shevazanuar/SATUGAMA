"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import { Loader2, Lock, Mail, ArrowRight, ShieldAlert } from "lucide-react";

export default function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  // Monitor sesi klien, jika sudah login arahkan langsung ke dashboard admin
  const { data: session } = authClient.useSession();

  useEffect(() => {
    if (session) {
      router.push("/admin");
      router.refresh();
    }
  }, [session, router]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const { data, error: authError } = await authClient.signIn.email({
        email,
        password,
        callbackURL: "/admin",
      });

      if (authError) {
        setError(authError.message || "Gagal masuk. Silakan periksa kembali email & password Anda.");
      } else {
        // Berhasil login, arahkan ke dashboard admin
        router.push("/admin");
        router.refresh();
      }
    } catch (err) {
      setError("Terjadi kesalahan sistem. Silakan coba lagi.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#090a14] text-slate-100 min-h-screen flex items-center justify-center relative p-5 antialiased overflow-hidden">
      {/* Ambient Orbs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden -z-10" aria-hidden="true">
        <div className="orb-indigo w-[600px] h-[600px] -top-80 -left-40 opacity-40" />
        <div className="orb-amber w-[400px] h-[400px] -bottom-40 -right-40 opacity-30" />
      </div>

      <div className="w-full max-w-md relative z-10">
        {/* Logo & Header */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-3 group mb-4">
            <div className="h-10 w-10 overflow-hidden rounded-xl bg-indigo-500/10 border border-indigo-500/20 p-0.5 group-hover:border-indigo-500/50 transition-all">
              <Image src="/logo.png" alt="SatuGama" width={36} height={36} className="object-cover rounded-lg" />
            </div>
            <span className="font-bold text-xl text-white" style={{ fontFamily: "var(--font-sora)" }}>
              Satu<span className="text-indigo-400">Gama</span>
            </span>
          </Link>
          <h1 className="text-2xl font-bold text-white leading-tight" style={{ fontFamily: "var(--font-sora)" }}>
            Admin Panel
          </h1>
          <p className="text-xs text-slate-500 mt-1">Kelola portofolio, produk, dan pesan masuk SatuGama Studio</p>
        </div>

        {/* Card */}
        <div className="rounded-2xl border border-white/[0.08] bg-[#0e1020]/80 p-8 shadow-2xl backdrop-blur-xl">
          {error && (
            <div className="mb-6 flex items-start gap-3 p-4 rounded-xl border border-rose-500/20 bg-rose-500/5 text-rose-300 text-sm">
              <ShieldAlert className="h-5 w-5 shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-5">
            {/* Email Field */}
            <div className="space-y-1.5">
              <label htmlFor="email" className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Email Address
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-500" aria-hidden="true">
                  <Mail className="h-4 w-4" />
                </span>
                <input
                  id="email"
                  type="email"
                  required
                  disabled={loading}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@satugama.studio"
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-white/8 bg-[#090a14]/60 text-slate-100 placeholder-slate-600 focus:outline-none focus:border-indigo-500 transition-colors text-sm"
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-1.5">
              <label htmlFor="password" className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Password
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-500" aria-hidden="true">
                  <Lock className="h-4 w-4" />
                </span>
                <input
                  id="password"
                  type="password"
                  required
                  disabled={loading}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-white/8 bg-[#090a14]/60 text-slate-100 placeholder-slate-600 focus:outline-none focus:border-indigo-500 transition-colors text-sm"
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 py-3.5 mt-2 btn-primary text-white font-bold rounded-xl text-sm transition-all shadow-lg hover:shadow-indigo-500/10 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Memproses Masuk...
                </>
              ) : (
                <>
                  Masuk Sekarang
                  <ArrowRight className="h-4 w-4" />
                </>
              )}
            </button>
          </form>
        </div>

        {/* Footer */}
        <p className="text-center text-xs text-slate-600 mt-6">
          Kembali ke{" "}
          <Link href="/" className="text-indigo-400 hover:underline">
            Situs Utama
          </Link>
        </p>
      </div>
    </div>
  );
}
