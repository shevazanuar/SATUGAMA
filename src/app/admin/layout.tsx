"use client";

import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { authClient } from "@/lib/auth-client";
import {
  LayoutDashboard,
  Package,
  Mail,
  Users,
  MessageSquare,
  LogOut,
  Menu,
  X,
  Loader2,
  Globe,
} from "lucide-react";
import { useState } from "react";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Monitor status sesi Better Auth secara reaktif di client-side
  const { data: session, isPending } = authClient.useSession();

  // Jika sedang membuka halaman login, bypass layout admin
  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  // Tampilkan loading spinner yang estetik saat memuat sesi
  if (isPending) {
    return (
      <div className="bg-[#090a14] text-slate-100 min-h-screen flex flex-col items-center justify-center gap-3">
        <Loader2 className="h-8 w-8 text-indigo-500 animate-spin" />
        <span className="text-slate-500 text-xs tracking-wider uppercase font-semibold">Memuat Sesi Admin...</span>
      </div>
    );
  }

  // Jika selesai loading dan tidak memiliki sesi aktif, arahkan ke login (middleware juga memproteksi ini)
  if (!session) {
    return null;
  }

  const menuItems = [
    { href: "/admin", label: "Dashboard", icon: <LayoutDashboard className="h-4 w-4" /> },
    { href: "/admin/products", label: "Produk", icon: <Package className="h-4 w-4" /> },
    { href: "/admin/inquiries", label: "Inquiries (Pesan)", icon: <Mail className="h-4 w-4" /> },
    { href: "/admin/testimonials", label: "Testimonial", icon: <MessageSquare className="h-4 w-4" /> },
  ];

  const handleSignOut = async () => {
    try {
      await authClient.signOut();
      router.push("/admin/login");
      router.refresh();
    } catch (err) {
      console.error("Gagal keluar:", err);
    }
  };

  return (
    <div className="bg-[#090a14] text-slate-100 min-h-screen flex">
      {/* SIDEBAR - DESKTOP */}
      <aside className="hidden lg:flex flex-col w-64 border-r border-white/[0.06] bg-[#0c0d1b] shrink-0">
        {/* Header Sidebar */}
        <div className="h-16 px-6 border-b border-white/[0.06] flex items-center justify-between gap-3">
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="h-7 w-7 rounded-lg overflow-hidden bg-indigo-500/10 border border-indigo-500/20 p-0.5 group-hover:border-indigo-500/40 transition-all">
              <Image src="/logo.png" alt="Logo" width={24} height={24} className="object-cover rounded-md" />
            </div>
            <span className="font-bold text-sm text-white" style={{ fontFamily: "var(--font-sora)" }}>
              Satu<span className="text-indigo-400">Gama</span> <span className="text-[10px] text-slate-500 font-mono">Console</span>
            </span>
          </Link>
          <Link
            href="/"
            title="Kunjungi Beranda Website"
            className="text-slate-500 hover:text-slate-300 transition-colors"
          >
            <Globe className="h-4 w-4" />
          </Link>
        </div>

        {/* Menu Navigasi */}
        <nav className="flex-1 px-4 py-6 space-y-1.5" aria-label="Sidebar navigation">
          {menuItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
                  isActive
                    ? "bg-indigo-500/15 text-indigo-400 border border-indigo-500/15"
                    : "text-slate-400 hover:text-slate-200 hover:bg-white/5 border border-transparent"
                }`}
              >
                {item.icon}
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Info Profil & Logout */}
        <div className="p-4 border-t border-white/[0.06] space-y-3">
          <div className="flex items-center gap-3 px-2 py-1.5">
            <div className="w-9 h-9 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center font-bold text-indigo-400 text-sm">
              {session.user.name.charAt(0).toUpperCase()}
            </div>
            <div className="min-w-0">
              <div className="text-xs font-bold text-white truncate">{session.user.name}</div>
              <div className="text-[10px] text-slate-500 truncate">{session.user.email}</div>
            </div>
          </div>
          <button
            onClick={handleSignOut}
            className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-xs font-semibold text-rose-400 hover:bg-rose-500/10 transition-colors border border-transparent"
          >
            <LogOut className="h-3.5 w-3.5" />
            Keluar (Logout)
          </button>
        </div>
      </aside>

      {/* MOBILE SIDEBAR (Drawer Overlay) */}
      {sidebarOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setSidebarOpen(false)} />
          <aside className="relative flex flex-col w-64 max-w-xs bg-[#0c0d1b] h-full p-5 border-r border-white/10">
            <div className="flex items-center justify-between pb-6 border-b border-white/[0.06] mb-6">
              <span className="font-bold text-sm text-white" style={{ fontFamily: "var(--font-sora)" }}>
                SatuGama Console
              </span>
              <button onClick={() => setSidebarOpen(false)} className="text-slate-400 hover:text-white">
                <X className="h-5 w-5" />
              </button>
            </div>
            <nav className="flex-1 space-y-1.5" aria-label="Mobile navigation">
              {menuItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setSidebarOpen(false)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
                      isActive
                        ? "bg-indigo-500/15 text-indigo-400 border border-indigo-500/15"
                        : "text-slate-400 hover:text-slate-200 hover:bg-white/5 border border-transparent"
                    }`}
                  >
                    {item.icon}
                    {item.label}
                  </Link>
                );
              })}
            </nav>
            <div className="pt-6 border-t border-white/[0.06] space-y-3">
              <div className="text-xs text-slate-500 truncate">User: {session.user.email}</div>
              <button
                onClick={handleSignOut}
                className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-xs font-semibold text-rose-400 hover:bg-rose-500/10 transition-colors"
              >
                <LogOut className="h-3.5 w-3.5" />
                Keluar (Logout)
              </button>
            </div>
          </aside>
        </div>
      )}

      {/* MOBILE HEADER NAVBAR */}
      <div className="flex-1 flex flex-col min-w-0 min-h-screen">
        <header className="lg:hidden h-16 border-b border-white/[0.06] bg-[#0c0d1b] px-5 flex items-center justify-between sticky top-0 z-40">
          <button onClick={() => setSidebarOpen(true)} className="text-slate-400 hover:text-white">
            <Menu className="h-5 w-5" />
          </button>
          <span className="font-bold text-sm text-white" style={{ fontFamily: "var(--font-sora)" }}>
            Satu<span className="text-indigo-400">Gama</span> Console
          </span>
          <div className="w-5" />
        </header>

        {/* CONTAINER KONTEN HALAMAN */}
        <main className="flex-1 p-6 md:p-8 overflow-y-auto max-w-6xl w-full mx-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
