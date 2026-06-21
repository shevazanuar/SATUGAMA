import Image from "next/image";
import { ChevronRight, Send, ArrowLeft } from "lucide-react";

export default function Loading() {
  return (
    <div className="bg-[#090a14] text-slate-100 min-h-screen antialiased">
      {/* Ambient orbs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10" aria-hidden="true">
        <div className="orb-indigo w-[700px] h-[700px] -top-64 -left-40 opacity-30" />
        <div className="orb-amber w-[400px] h-[400px] top-[50%] -right-40 opacity-15" />
      </div>

      {/* HEADER NAV */}
      <header className="sticky top-0 z-50 border-b border-white/[0.06] bg-[#090a14]/92 backdrop-blur-2xl">
        <div className="max-w-6xl mx-auto px-5 h-16 flex items-center justify-between gap-6">
          {/* Logo */}
          <div className="flex items-center gap-3 shrink-0">
            <div className="h-8 w-8 overflow-hidden rounded-xl bg-indigo-500/10 border border-indigo-500/20 p-0.5">
              <Image src="/logo.png" alt="SatuGama" width={28} height={28} className="object-cover rounded-lg" />
            </div>
            <span className="font-bold text-[15px] text-white" style={{ fontFamily: "var(--font-sora)" }}>
              Satu<span className="text-indigo-400">Gama</span>
            </span>
          </div>

          {/* Breadcrumb */}
          <nav className="hidden md:flex items-center gap-1.5 text-sm text-slate-500 flex-1 min-w-0" aria-label="Breadcrumb">
            <span className="text-slate-500">Beranda</span>
            <ChevronRight className="h-3.5 w-3.5 shrink-0" />
            <span className="text-slate-500">Katalog</span>
            <ChevronRight className="h-3.5 w-3.5 shrink-0" />
            <div className="h-4 w-24 bg-white/5 rounded animate-pulse" />
          </nav>

          {/* CTA */}
          <div className="hidden sm:flex items-center gap-2 px-4 py-2 bg-indigo-600/50 border border-indigo-500/20 text-white font-semibold text-sm rounded-xl shrink-0 opacity-50">
            <Send className="h-3.5 w-3.5" />
            Pesan Sekarang
          </div>
        </div>
      </header>

      <main className="animate-pulse">
        {/* HERO SECTION */}
        <section className="pt-14 pb-24 relative">
          <div className="max-w-6xl mx-auto px-5">
            {/* Back link */}
            <div className="inline-flex items-center gap-2 text-sm text-slate-500 mb-10">
              <ArrowLeft className="h-4 w-4" />
              Kembali ke Katalog
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
              {/* Left Info Skeleton */}
              <div className="space-y-7">
                {/* Badge + category */}
                <div className="flex items-center gap-3 flex-wrap">
                  <div className="h-6 w-20 bg-white/5 rounded-full" />
                  <div className="h-4 w-24 bg-white/5 rounded" />
                </div>

                {/* Title + tagline */}
                <div className="space-y-3">
                  <div className="h-12 w-3/4 bg-white/5 rounded" />
                  <div className="h-6 w-1/2 bg-white/5 rounded" />
                </div>

                {/* Meta pills */}
                <div className="flex flex-wrap gap-2">
                  <div className="h-7 w-20 bg-white/5 rounded-lg" />
                  <div className="h-7 w-24 bg-white/5 rounded-lg" />
                  <div className="h-7 w-20 bg-white/5 rounded-lg" />
                </div>

                {/* Price */}
                <div className="space-y-2">
                  <div className="h-3 w-16 bg-white/5 rounded" />
                  <div className="h-10 w-40 bg-white/5 rounded" />
                </div>

                {/* Feature tags */}
                <div className="flex flex-wrap gap-2">
                  <div className="h-6 w-16 bg-white/5 rounded-md" />
                  <div className="h-6 w-20 bg-white/5 rounded-md" />
                  <div className="h-6 w-24 bg-white/5 rounded-md" />
                </div>

                {/* CTAs */}
                <div className="flex flex-wrap gap-3 pt-1">
                  <div className="h-12 w-36 bg-white/5 rounded-2xl" />
                  <div className="h-12 w-36 bg-white/5 rounded-2xl" />
                </div>

                {/* Guarantee note */}
                <div className="h-4 w-64 bg-white/5 rounded" />
              </div>

              {/* Right Visual Card Skeleton */}
              <div className="relative">
                <div className="relative rounded-3xl border border-white/8 bg-[#0e1020]/90 p-6 space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-2xl bg-white/5" />
                    <div className="space-y-2">
                      <div className="h-3.5 w-16 bg-white/5 rounded" />
                      <div className="h-4.5 w-32 bg-white/5 rounded" />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    {[...Array(4)].map((_, i) => (
                      <div key={i} className="p-4 rounded-xl border border-white/5 bg-white/5 h-20 space-y-2">
                        <div className="h-6 w-6 bg-white/5 rounded" />
                        <div className="h-3.5 w-16 bg-white/5 rounded" />
                      </div>
                    ))}
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-white/6">
                    <div className="h-4 w-28 bg-white/5 rounded" />
                    <div className="flex items-center gap-0.5">
                      {[...Array(5)].map((_, i) => (
                        <div key={i} className="h-3 w-3 rounded-full bg-white/5" />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* DETAILS SECTION */}
        <section className="py-20 border-t border-white/[0.04]">
          <div className="max-w-6xl mx-auto px-5">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              {/* Description paragraphs */}
              <div className="lg:col-span-2 space-y-5">
                <div className="h-4 w-32 bg-white/5 rounded" />
                <div className="space-y-2">
                  <div className="h-4 w-full bg-white/5 rounded" />
                  <div className="h-4 w-11/12 bg-white/5 rounded" />
                  <div className="h-4 w-10/12 bg-white/5 rounded" />
                </div>
              </div>

              {/* Sidebar stats */}
              <div className="space-y-4">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="p-5 rounded-2xl border border-white/5 bg-white/5 h-20" />
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
