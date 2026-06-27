import { headers } from "next/headers";
import Link from "next/link";
import { auth } from "@/lib/auth";
import { db } from "@/db";
import { products, inquiries, testimonials } from "@/db/schema";
import { count, desc } from "drizzle-orm";
import {
  Package,
  Mail,
  Users,
  MessageSquare,
  ArrowRight,
  Clock,
  User,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";

export default async function AdminDashboardPage() {
  // Ambil sesi secara aman di server side
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  // Query agregasi data secara langsung di server
  const [productsCountResult] = await db.select({ value: count() }).from(products);
  const [inquiriesCountResult] = await db.select({ value: count() }).from(inquiries);
  const [testimonialsCountResult] = await db.select({ value: count() }).from(testimonials);

  // Ambil 5 inquiries / pesan terbaru
  const recentInquiries = await db
    .select()
    .from(inquiries)
    .orderBy(desc(inquiries.createdAt))
    .limit(5);

  const stats = [
    {
      label: "Total Produk",
      value: productsCountResult?.value ?? 0,
      icon: <Package className="h-5 w-5 text-indigo-400" />,
      href: "/admin/products",
      bg: "bg-indigo-500/10 border-indigo-500/20",
    },
    {
      label: "Pesan Masuk (Inquiries)",
      value: inquiriesCountResult?.value ?? 0,
      icon: <Mail className="h-5 w-5 text-amber-400" />,
      href: "/admin/inquiries",
      bg: "bg-amber-500/10 border-amber-500/20",
    },

    {
      label: "Testimonial",
      value: testimonialsCountResult?.value ?? 0,
      icon: <MessageSquare className="h-5 w-5 text-emerald-400" />,
      href: "/admin/testimonials",
      bg: "bg-emerald-500/10 border-emerald-500/20",
    },
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Header */}
      <div>
        <h1
          className="text-3xl font-black text-white tracking-tight"
          style={{ fontFamily: "var(--font-sora)" }}
        >
          Halo, {session?.user.name}!
        </h1>
        <p className="text-slate-500 text-sm">Berikut ringkasan performa dan aktivitas SatuGama Studio hari ini.</p>
      </div>

      {/* Grid Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {stats.map((stat) => (
          <Link
            key={stat.label}
            href={stat.href}
            className={`p-6 rounded-2xl border ${stat.bg} hover:scale-[1.02] hover:bg-[#0c0d1b] transition-all flex flex-col justify-between h-36 group`}
          >
            <div className="flex items-center justify-between">
              <span className="text-slate-400 text-xs font-semibold uppercase tracking-wider">
                {stat.label}
              </span>
              <div className="p-2 rounded-xl bg-white/5">{stat.icon}</div>
            </div>
            <div className="flex items-end justify-between mt-4">
              <span
                className="text-3xl font-black text-white"
                style={{ fontFamily: "var(--font-sora)" }}
              >
                {stat.value}
              </span>
              <span className="text-xs text-indigo-400 font-semibold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                Kelola <ArrowRight className="h-3 w-3" />
              </span>
            </div>
          </Link>
        ))}
      </div>

      {/* Recent Activity Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left: 5 Recent Inquiries */}
        <div className="lg:col-span-2 rounded-2xl border border-white/[0.06] bg-[#0c0d1b]/60 overflow-hidden flex flex-col">
          <div className="px-6 py-5 border-b border-white/[0.06] flex items-center justify-between">
            <h2
              className="text-base font-bold text-white"
              style={{ fontFamily: "var(--font-sora)" }}
            >
              Inquiries Terbaru
            </h2>
            <Link
              href="/admin/inquiries"
              className="text-indigo-400 text-xs font-semibold hover:underline flex items-center gap-1"
            >
              Lihat Semua <ArrowRight className="h-3 w-3" />
            </Link>
          </div>

          <div className="divide-y divide-white/[0.04] flex-1">
            {recentInquiries.length === 0 ? (
              <div className="p-8 text-center text-slate-500 text-sm">
                Belum ada pesan masuk dari form kontak.
              </div>
            ) : (
              recentInquiries.map((inq) => (
                <div key={inq.id} className="p-6 flex items-start justify-between gap-4 hover:bg-white/[0.01] transition-colors">
                  <div className="space-y-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-bold text-sm text-white truncate max-w-[150px]">
                        {inq.name}
                      </span>
                      <span className="text-slate-500 text-xs truncate max-w-[200px]">
                        ({inq.email})
                      </span>
                    </div>
                    <p className="text-slate-400 text-xs line-clamp-1 italic">
                      "{inq.message}"
                    </p>
                    <div className="flex items-center gap-3 pt-1 text-[10px] text-slate-500">
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {new Date(inq.createdAt).toLocaleDateString("id-ID", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })}
                      </span>
                      {inq.assetStyle && (
                        <span className="px-1.5 py-0.5 rounded bg-white/5 border border-white/8 text-[9px]">
                          Style: {inq.assetStyle}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Status Badge */}
                  <div>
                    {inq.status === "new" && (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-amber-500/10 border border-amber-500/20 text-amber-400 text-[10px] font-bold uppercase tracking-wider">
                        <AlertCircle className="h-2.5 w-2.5" /> Baru
                      </span>
                    )}
                    {inq.status === "in_progress" && (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-[10px] font-bold uppercase tracking-wider">
                        <Clock className="h-2.5 w-2.5" /> Diproses
                      </span>
                    )}
                    {inq.status === "done" && (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] font-bold uppercase tracking-wider">
                        <CheckCircle2 className="h-2.5 w-2.5" /> Selesai
                      </span>
                    )}
                    {inq.status === "rejected" && (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-slate-500/10 border border-white/8 text-slate-400 text-[10px] font-bold uppercase tracking-wider">
                        Ditolak
                      </span>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Right: Quick Settings / System Info */}
        <div className="rounded-2xl border border-white/[0.06] bg-[#0c0d1b]/60 p-6 space-y-6">
          <h2
            className="text-base font-bold text-white"
            style={{ fontFamily: "var(--font-sora)" }}
          >
            Sistem Konsol
          </h2>
          
          <div className="space-y-4 text-xs">
            <div className="flex items-center justify-between py-2 border-b border-white/[0.04]">
              <span className="text-slate-500">Database Driver</span>
              <span className="text-slate-300 font-mono">Neon serverless HTTP</span>
            </div>
            <div className="flex items-center justify-between py-2 border-b border-white/[0.04]">
              <span className="text-slate-500">ORM</span>
              <span className="text-slate-300 font-mono">Drizzle ORM</span>
            </div>
            <div className="flex items-center justify-between py-2 border-b border-white/[0.04]">
              <span className="text-slate-500">Auth Engine</span>
              <span className="text-slate-300 font-mono">Better Auth</span>
            </div>
            <div className="flex items-center justify-between py-2 border-b border-white/[0.04]">
              <span className="text-slate-500">Penyimpanan File</span>
              <span className="text-slate-300 font-mono">Uploadthing</span>
            </div>
            <div className="flex items-center justify-between py-2">
              <span className="text-slate-500">Framework</span>
              <span className="text-slate-300 font-mono">Next.js 16.2.6 (Turbopack)</span>
            </div>
          </div>

          <div className="pt-4 border-t border-white/[0.06] text-[11px] text-slate-500 leading-relaxed">
            Pesan dan aktivitas pelanggan yang masuk melalui situs web utama akan langsung dicatat secara real-time di database Neon dan muncul di console ini.
          </div>
        </div>
      </div>
    </div>
  );
}
