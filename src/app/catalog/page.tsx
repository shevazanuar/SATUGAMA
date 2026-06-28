import type { Metadata } from "next";
import Link from "next/link";
import { Package, Palette, Box, Layers, ChevronRight, Home } from "lucide-react";
import { getProductsFromDb } from "@/lib/products";
import { Footer } from "@/components/footer";
import { CatalogClient } from "./catalog-client";

export const metadata: Metadata = {
  title: "Katalog Aset Game | SatuGama Studio",
  description:
    "Jelajahi koleksi lengkap aset game premium SatuGama Studio — 2D Pixel Art, model 3D low-poly, UI Kit, dan Audio SFX. Cari, filter, dan sortir produk sesuai kebutuhan game Anda.",
  openGraph: {
    title: "Katalog Aset Game | SatuGama Studio",
    description: "Jelajahi 26+ paket aset game premium: 2D Pixel Art, 3D Models, UI Kit, dan Audio SFX.",
    siteName: "SatuGama Studio",
  },
};

const STAT_ITEMS = [
  { icon: <Package   className="h-4 w-4 text-indigo-400" />, label: "Paket Aset",      value: "26+" },
  { icon: <Palette   className="h-4 w-4 text-amber-400"  />, label: "2D & Pixel Art",  value: "10+" },
  { icon: <Box       className="h-4 w-4 text-violet-400" />, label: "3D Models",       value: "8+"  },
  { icon: <Layers    className="h-4 w-4 text-cyan-400"   />, label: "UI & Audio Kit",  value: "8+"  },
];

export default async function CatalogPage() {
  const products = await getProductsFromDb();

  return (
    <div className="bg-[#090a14] text-slate-100 min-h-screen antialiased">

      {/* Ambient orbs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10" aria-hidden="true">
        <div className="orb-indigo w-[700px] h-[700px] -top-64 -left-40 opacity-40" />
        <div className="orb-amber w-[400px] h-[400px] top-[40%] -right-40 opacity-25" />
      </div>

      {/* ── Header ── */}
      <header className="fixed top-0 left-0 right-0 z-50 border-b border-white/[0.08] bg-[#0c0d1b]/95 backdrop-blur-md">
        <div className="max-w-6xl mx-auto px-5 h-16 flex items-center justify-between gap-6">
          <Link href="/" className="group shrink-0 block select-none" aria-label="SatuGama Studio — Beranda">
            <div className="font-extrabold text-[19px] tracking-tight text-white leading-none" style={{ fontFamily: "var(--font-sora)" }}>
              Satu<span className="text-indigo-400 drop-shadow-[0_0_8px_rgba(99,102,241,0.3)]">Gama</span>
            </div>
          </Link>

          {/* Breadcrumb */}
          <nav className="hidden md:flex items-center gap-1.5 text-sm text-slate-500 flex-1 min-w-0" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-slate-300 transition-colors flex items-center gap-1 shrink-0">
              <Home className="h-3.5 w-3.5" aria-hidden="true" /> Beranda
            </Link>
            <ChevronRight className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
            <span className="text-slate-300">Katalog</span>
          </nav>

          <Link
            href="/#contact"
            className="hidden sm:flex items-center gap-2 px-4 py-2 btn-primary text-white font-semibold text-sm rounded-xl shrink-0"
          >
            Pesan Sekarang
          </Link>
        </div>
      </header>

      <main className="pt-24 pb-20">

        {/* ── Hero Banner ── */}
        <section className="max-w-6xl mx-auto px-5 py-16 text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-amber-500/30 bg-amber-500/8 text-amber-300 text-xs font-medium">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" aria-hidden="true" />
            {products.length}+ Paket Tersedia — Siap Pakai
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-white leading-tight tracking-tight" style={{ fontFamily: "var(--font-sora)" }}>
            Katalog <span className="text-gradient-indigo">Aset Game</span>
            <br />Premium SatuGama
          </h1>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto leading-relaxed font-light">
            Jelajahi koleksi lengkap paket aset 2D, 3D, UI Kit, dan Audio SFX untuk mempercepat pengembangan game Anda.
            Semua tersedia dengan lisensi komersial inklusif.
          </p>

          {/* Stats */}
          <div className="flex flex-wrap justify-center gap-4 pt-4">
            {STAT_ITEMS.map(s => (
              <div key={s.label} className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl bg-white/4 border border-white/8">
                {s.icon}
                <div className="text-left">
                  <div className="font-black text-white text-lg leading-none" style={{ fontFamily: "var(--font-sora)" }}>{s.value}</div>
                  <div className="text-slate-500 text-[11px] mt-0.5">{s.label}</div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── Catalog Content ── */}
        <section className="max-w-6xl mx-auto px-5 border-t border-white/[0.04] pt-12">
          <CatalogClient products={products} />
        </section>

        {/* ── Bottom CTA ── */}
        <section className="max-w-6xl mx-auto px-5 pt-20">
          <div className="relative rounded-3xl border border-indigo-500/20 bg-indigo-500/5 px-8 py-16 text-center overflow-hidden">
            <div className="absolute inset-0 bg-dot-pattern opacity-15" aria-hidden="true" />
            <div className="relative z-10 space-y-5 max-w-lg mx-auto">
              <div className="text-4xl" aria-hidden="true">🎮</div>
              <h2 className="text-3xl font-bold text-white" style={{ fontFamily: "var(--font-sora)" }}>
                Butuh Aset <span className="text-gradient">Kustom?</span>
              </h2>
              <p className="text-slate-400 leading-relaxed">
                Tidak menemukan yang cocok? Tim SatuGama siap membuat aset eksklusif sesuai kebutuhan game Anda mulai dari Rp 99.000.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
                <a
                  href="https://wa.me/62882005486575?text=Halo%20SatuGama!%20%F0%9F%91%8B%20Saya%20ingin%20konsultasi%20aset%20kustom%20untuk%20game%20saya.%20Bisa%20kita%20diskusikan%3F%20%F0%9F%8E%AE"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-7 py-3.5 btn-primary text-white font-bold rounded-2xl text-sm"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="h-4 w-4 fill-current" aria-hidden="true">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                  Hubungi via WhatsApp
                </a>
                <Link
                  href="/"
                  className="inline-flex items-center justify-center gap-2 px-7 py-3.5 border border-white/12 bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white font-medium rounded-2xl transition-all text-sm"
                >
                  Kembali ke Beranda
                </Link>
              </div>
            </div>
          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
}
