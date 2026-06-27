import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowLeft,
  Check,
  ChevronRight,
  Download,
  Layers,
  Package,
  Send,
  ShieldCheck,
  Star,
  Box,
  Palette,
  Volume2,
  Clock,
  Mail,
  Gamepad2,
  Cpu,
  Zap,
} from "lucide-react";
import {
  getCategoryLabel,
  type Product,
} from "@/data/products";
import {
  getProductsFromDb,
  getProductBySlugFromDb,
  getRelatedProductsFromDb,
} from "@/lib/products";
import { Footer } from "@/components/footer";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://satugama.studio";

/* ─── Static Generation ─── */

export async function generateStaticParams() {
  const products = await getProductsFromDb();
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlugFromDb(slug);
  if (!product) return { title: "Produk Tidak Ditemukan" };

  return {
    title: product.title,
    description: product.shortDesc,
    openGraph: {
      title: `${product.title} | SatuGama Studio`,
      description: product.shortDesc,
      url: `${siteUrl}/catalog/${product.slug}`,
      siteName: "SatuGama Studio",
    },
    alternates: { canonical: `${siteUrl}/catalog/${product.slug}` },
  };
}

/* ─── Per-category styling maps ─── */

type CategoryColors = {
  accent: string;
  accentBg: string;
  accentBorder: string;
  label: string;
  check: string;
};

const CATEGORY_COLORS: Record<string, CategoryColors> = {
  ui: {
    accent: "text-indigo-400",
    accentBg: "bg-indigo-500/10",
    accentBorder: "border-indigo-500/25",
    label: "text-indigo-400",
    check: "text-indigo-400",
  },
  "2d": {
    accent: "text-amber-400",
    accentBg: "bg-amber-500/10",
    accentBorder: "border-amber-500/25",
    label: "text-amber-400",
    check: "text-amber-400",
  },
  "3d": {
    accent: "text-violet-400",
    accentBg: "bg-violet-500/10",
    accentBorder: "border-violet-500/25",
    label: "text-violet-400",
    check: "text-violet-400",
  },
};

const CATEGORY_ICONS: Record<string, React.ReactNode> = {
  ui: <Layers className="h-8 w-8 text-indigo-300" />,
  "2d": <Palette className="h-8 w-8 text-amber-300" />,
  "3d": <Box className="h-8 w-8 text-violet-300" />,
};

/* ─── Related Product Card ─── */
function RelatedCard({ product }: { product: Product }) {
  const c = CATEGORY_COLORS[product.category];
  return (
    <Link
      href={`/catalog/${product.slug}`}
      className="group rounded-2xl overflow-hidden border border-white/8 bg-[#0e1020]/80 card-hover flex flex-col"
    >
      <div
        className={`relative h-36 bg-gradient-to-br ${product.gradient} flex items-center justify-center overflow-hidden`}
      >
        <div className="absolute inset-0 bg-black/25" />
        <div className="relative z-10 flex flex-col items-center gap-2">
          <div className={`w-12 h-12 rounded-xl border ${product.iconBg} flex items-center justify-center`}>
            {CATEGORY_ICONS[product.category]}
          </div>
          <span className="px-2.5 py-0.5 rounded-full bg-black/40 border border-white/15 text-[9px] font-bold tracking-widest uppercase text-white/90">
            {product.badge}
          </span>
        </div>
      </div>
      <div className="p-5 flex-1 flex flex-col gap-2">
        <p className="text-xs text-slate-500">{product.tagline}</p>
        <h3
          className={`font-bold text-white group-hover:${c.accent} transition-colors text-base leading-snug`}
          style={{ fontFamily: "var(--font-sora)" }}
        >
          {product.title}
        </h3>
        <p className="text-slate-500 text-xs leading-relaxed flex-1 line-clamp-2">{product.shortDesc}</p>
        <div className="flex items-center justify-between pt-3 border-t border-white/6 mt-auto">
          <span className="text-amber-400 font-bold text-base">{product.price}</span>
          <span className={`text-xs font-semibold ${c.accent} flex items-center gap-1`}>
            Lihat Detail <ChevronRight className="h-3.5 w-3.5" />
          </span>
        </div>
      </div>
    </Link>
  );
}

/* ─── Main Page ─── */

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = await getProductBySlugFromDb(slug);
  if (!product) notFound();

  const relatedProducts = await getRelatedProductsFromDb(product);
  const c = CATEGORY_COLORS[product.category];
  const categoryIcon = CATEGORY_ICONS[product.category];

  return (
    <div className="bg-[#090a14] text-slate-100 min-h-screen antialiased">

      {/* Ambient orbs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10" aria-hidden="true">
        <div className="orb-indigo w-[700px] h-[700px] -top-64 -left-40 opacity-50" />
        <div className="orb-amber w-[400px] h-[400px] top-[50%] -right-40 opacity-30" />
      </div>

      {/* ═══════════════════════════════════════
          HEADER NAV
      ═══════════════════════════════════════ */}
      <header className="fixed top-0 left-0 right-0 z-50 border-b border-white/[0.08] bg-[#0c0d1b]/95 backdrop-blur-md">
        <div className="max-w-6xl mx-auto px-5 h-16 flex items-center justify-between gap-6">

          {/* Logo */}
          <Link href="/" className="group shrink-0 block select-none" aria-label="SatuGama Studio — Beranda">
            <div
              className="font-extrabold text-[19px] tracking-tight text-white leading-none"
              style={{ fontFamily: "var(--font-sora)" }}
            >
              Satu<span className="text-indigo-400 drop-shadow-[0_0_8px_rgba(99,102,241,0.3)]">Gama</span>
            </div>
          </Link>

          {/* Breadcrumb */}
          <nav
            className="hidden md:flex items-center gap-1.5 text-sm text-slate-500 flex-1 min-w-0"
            aria-label="Breadcrumb"
          >
            <Link href="/" className="hover:text-slate-300 transition-colors shrink-0">Beranda</Link>
            <ChevronRight className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
            <Link href="/#catalog" className="hover:text-slate-300 transition-colors shrink-0">Katalog</Link>
            <ChevronRight className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
            <span className="text-slate-300 truncate">{product.title}</span>
          </nav>

          {/* CTA */}
          <a
            href="/#contact"
            className="hidden sm:flex items-center gap-2 px-4 py-2 btn-primary text-white font-semibold text-sm rounded-xl shrink-0"
          >
            <Send className="h-3.5 w-3.5" aria-hidden="true" />
            Pesan Sekarang
          </a>
        </div>
      </header>

      <main>

        {/* ═══════════════════════════════════════
            HERO
        ═══════════════════════════════════════ */}
        <section className="pt-24 pb-24 relative">
          <div className="max-w-6xl mx-auto px-5">

            {/* Back link */}
            <Link
              href="/#catalog"
              className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-slate-300 transition-colors mb-10 group"
            >
              <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" aria-hidden="true" />
              Kembali ke Katalog
            </Link>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">

              {/* Left: Product info */}
              <div className="space-y-7">

                {/* Badge + category */}
                <div className="flex items-center gap-3 flex-wrap">
                  <span className={`px-3 py-1 rounded-full border text-[10px] font-bold tracking-widest uppercase ${c.accentBg} ${c.accentBorder} ${c.accent}`}>
                    {product.badge}
                  </span>
                  <span className="text-slate-600 text-xs">{getCategoryLabel(product.category)}</span>
                </div>

                {/* Title + tagline */}
                <div className="space-y-3">
                  <h1
                    className="text-4xl md:text-5xl font-black text-white leading-tight tracking-tight"
                    style={{ fontFamily: "var(--font-sora)" }}
                  >
                    {product.title}
                  </h1>
                  <p className="text-xl text-slate-400 font-light leading-relaxed">{product.tagline}</p>
                </div>

                {/* Meta pills */}
                <div className="flex flex-wrap gap-2">
                  {[
                    { icon: <Package className="h-3 w-3" aria-hidden="true" />, label: `v${product.version}` },
                    { icon: <Clock className="h-3 w-3" aria-hidden="true" />, label: product.releaseDate },
                    { icon: <Download className="h-3 w-3" aria-hidden="true" />, label: product.fileSize },
                  ].map((m) => (
                    <span
                      key={m.label}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 border border-white/8 text-slate-400 text-xs font-medium"
                    >
                      {m.icon} {m.label}
                    </span>
                  ))}
                </div>

                {/* Price */}
                <div className="space-y-1">
                  <div className="text-xs text-slate-500 font-medium">Harga Mulai</div>
                  <div
                    className="text-5xl font-black text-amber-400"
                    style={{ fontFamily: "var(--font-sora)" }}
                    aria-label={`Harga: ${product.price}`}
                  >
                    {product.price}
                  </div>
                </div>

                {/* Feature tags */}
                <div className="flex flex-wrap gap-2">
                  {product.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2.5 py-1 rounded-md text-xs font-medium bg-white/5 border border-white/8 text-slate-400"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* CTAs */}
                <div className="flex flex-wrap gap-3 pt-1">
                  <a
                    href="/#contact"
                    className="inline-flex items-center gap-2.5 px-7 py-3.5 btn-primary text-white font-bold rounded-2xl text-sm"
                  >
                    <Send className="h-4 w-4" aria-hidden="true" />
                    Pesan Sekarang
                  </a>
                  <a
                    href="#spesifikasi"
                    className="inline-flex items-center gap-2.5 px-7 py-3.5 border border-white/12 bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white font-medium rounded-2xl transition-all text-sm"
                  >
                    Lihat Spesifikasi
                  </a>
                </div>

                {/* Guarantee note */}
                <p className="flex items-center gap-2 text-sm text-slate-500">
                  <ShieldCheck className="h-4 w-4 text-emerald-400 shrink-0" aria-hidden="true" />
                  Lisensi komersial inklusif · Respon dalam 1×24 jam kerja
                </p>
              </div>

              {/* Right: Visual preview card */}
              <div className="relative">
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${product.gradient} opacity-10 rounded-3xl blur-3xl scale-110`}
                  aria-hidden="true"
                />
                <div className="relative rounded-3xl border border-white/8 bg-[#0e1020]/90 p-6 shadow-2xl shadow-black/50">

                  {/* Card header */}
                  <div className="flex items-center gap-4 mb-6">
                    <div className={`w-14 h-14 rounded-2xl border ${product.iconBg} flex items-center justify-center`}>
                      {categoryIcon}
                    </div>
                    <div>
                      <div className={`text-[10px] font-bold uppercase tracking-widest ${c.accent} mb-0.5`}>
                        {product.badge}
                      </div>
                      <div className="text-white font-bold text-sm leading-snug max-w-[210px]">{product.title}</div>
                    </div>
                  </div>

                  {/* Feature preview 2×2 */}
                  <div className="grid grid-cols-2 gap-3">
                    {product.whatYouGet.map((feat, i) => (
                      <div
                        key={i}
                        className={`p-4 rounded-xl border ${c.accentBorder} ${c.accentBg} hover:scale-[1.02] transition-transform`}
                      >
                        <div className="text-2xl mb-2" aria-hidden="true">{feat.icon}</div>
                        <div className="text-white text-xs font-semibold leading-snug">{feat.title}</div>
                      </div>
                    ))}
                  </div>

                  {/* Bottom strip */}
                  <div className="flex items-center justify-between mt-5 pt-4 border-t border-white/6">
                    <span className={`text-xs font-semibold ${c.accent}`}>
                      {product.features.length}+ fitur termasuk
                    </span>
                    <div className="flex items-center gap-0.5" aria-label="Rating 5 bintang">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-3 w-3 text-amber-400 fill-amber-400" aria-hidden="true" />
                      ))}
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════
            DESCRIPTION
        ═══════════════════════════════════════ */}
        <section className="py-20 border-t border-white/[0.04]">
          <div className="max-w-6xl mx-auto px-5">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

              {/* Description paragraphs */}
              <div className="lg:col-span-2 space-y-5">
                <p className={`section-label ${c.label}`}>Tentang Produk Ini</p>
                {product.longDesc.map((para, i) => (
                  <p key={i} className="text-slate-400 leading-relaxed text-base font-light">
                    {para}
                  </p>
                ))}
              </div>

              {/* Sidebar stats */}
              <div className="space-y-4">
                {[
                  { value: `${product.features.length}+`, label: "Fitur Termasuk", icon: <Package className="h-4 w-4" aria-hidden="true" /> },
                  { value: product.compatibility.length.toString(), label: "Engine Kompatibel", icon: <Cpu className="h-4 w-4" aria-hidden="true" /> },
                  { value: `v${product.version}`, label: "Versi Terbaru", icon: <Zap className="h-4 w-4" aria-hidden="true" /> },
                ].map((stat) => (
                  <div
                    key={stat.label}
                    className={`p-5 rounded-2xl border ${c.accentBorder} ${c.accentBg} flex items-center gap-4`}
                  >
                    <div className={`w-9 h-9 rounded-xl border ${c.accentBorder} flex items-center justify-center ${c.accent}`}>
                      {stat.icon}
                    </div>
                    <div>
                      <div
                        className="text-xl font-black text-white"
                        style={{ fontFamily: "var(--font-sora)" }}
                      >
                        {stat.value}
                      </div>
                      <div className="text-xs text-slate-500">{stat.label}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════
            WHAT YOU GET
        ═══════════════════════════════════════ */}
        <section className="py-20 border-t border-white/[0.04]">
          <div className="max-w-6xl mx-auto px-5">
            <div className="text-center mb-14">
              <p className={`section-label ${c.label}`}>Overview Konten</p>
              <h2
                className="text-3xl md:text-4xl font-bold text-white"
                style={{ fontFamily: "var(--font-sora)" }}
              >
                Apa yang Anda Dapatkan
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {product.whatYouGet.map((feat, i) => (
                <div
                  key={i}
                  className={`p-7 rounded-2xl border ${c.accentBorder} ${c.accentBg} card-hover`}
                >
                  <div className="text-4xl mb-4" aria-hidden="true">{feat.icon}</div>
                  <h3
                    className="text-lg font-bold text-white mb-2"
                    style={{ fontFamily: "var(--font-sora)" }}
                  >
                    {feat.title}
                  </h3>
                  <p className="text-slate-500 text-sm leading-relaxed">{feat.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════
            INCLUDES CHECKLIST
        ═══════════════════════════════════════ */}
        <section className="py-20 border-t border-white/[0.04]">
          <div className="max-w-6xl mx-auto px-5">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">

              {/* Checklist */}
              <div>
                <p className={`section-label ${c.label}`}>Yang Termasuk dalam Pack</p>
                <h2
                  className="text-3xl md:text-4xl font-bold text-white mb-8"
                  style={{ fontFamily: "var(--font-sora)" }}
                >
                  Semua yang Anda Butuhkan
                </h2>
                <ul className="space-y-3" role="list">
                  {product.features.map((feat, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <div
                        className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 mt-0.5 ${c.accentBg} ${c.accentBorder}`}
                        aria-hidden="true"
                      >
                        <Check className={`h-3 w-3 ${c.check}`} />
                      </div>
                      <span className="text-slate-300 text-sm leading-relaxed">{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Summary card */}
              <div className="space-y-4 lg:pt-16">
                <div className="rounded-2xl border border-white/8 bg-[#0e1020]/80 overflow-hidden">
                  <div className="px-5 pt-5 pb-3">
                    <div className="text-xs font-semibold text-slate-400 uppercase tracking-widest">
                      Ringkasan Pack
                    </div>
                  </div>
                  <div>
                    {[
                      {
                        label: "Total Fitur",
                        value: `${product.features.length}+ item`,
                      },
                      { label: "Ukuran Download", value: product.fileSize },
                      {
                        label: "Format Tersedia",
                        value:
                          product.specs.find((s) => s.label === "Format File")?.value ??
                          product.specs[0]?.value ??
                          "—",
                      },
                      { label: "Lisensi", value: "Komersial Inklusif" },
                      { label: "Dirilis", value: product.releaseDate },
                    ].map((row) => (
                      <div
                        key={row.label}
                        className="flex items-center justify-between px-5 py-3 border-t border-white/6"
                      >
                        <span className="text-slate-500 text-sm">{row.label}</span>
                        <span className="text-slate-300 text-sm font-medium text-right max-w-[180px]">
                          {row.value}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <a
                  href="/#contact"
                  className="w-full flex items-center justify-center gap-2.5 py-3.5 btn-primary text-white font-bold text-sm rounded-2xl"
                >
                  <Send className="h-4 w-4" aria-hidden="true" />
                  Pesan Pack Ini — {product.price}
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════
            SPECS & COMPATIBILITY
        ═══════════════════════════════════════ */}
        <section id="spesifikasi" className="py-20 border-t border-white/[0.04]">
          <div className="max-w-6xl mx-auto px-5">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

              {/* Specs table */}
              <div>
                <p className={`section-label ${c.label}`}>Detail Teknis</p>
                <h2
                  className="text-3xl md:text-4xl font-bold text-white mb-8"
                  style={{ fontFamily: "var(--font-sora)" }}
                >
                  Spesifikasi
                </h2>
                <div className="rounded-2xl border border-white/8 bg-[#0e1020]/80 overflow-hidden">
                  <table className="w-full text-sm" aria-label="Spesifikasi teknis produk">
                    <tbody>
                      {product.specs.map((spec, i) => (
                        <tr key={i} className="border-b border-white/6 last:border-0">
                          <td className="px-5 py-3.5 text-slate-500 font-medium w-2/5 align-top">{spec.label}</td>
                          <td className="px-5 py-3.5 text-slate-300 align-top">{spec.value}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Compatibility */}
              <div>
                <p className={`section-label ${c.label}`}>Dukungan Engine & Platform</p>
                <h2
                  className="text-3xl md:text-4xl font-bold text-white mb-8"
                  style={{ fontFamily: "var(--font-sora)" }}
                >
                  Kompatibilitas
                </h2>
                <div className="flex flex-wrap gap-3 mb-8">
                  {product.compatibility.map((engine) => (
                    <div
                      key={engine}
                      className={`px-5 py-2.5 rounded-xl border ${c.accentBorder} ${c.accentBg} flex items-center gap-2.5`}
                    >
                      <div className={`w-2 h-2 rounded-full ${c.accent.replace("text-", "bg-")} shrink-0`} aria-hidden="true" />
                      <span className="text-slate-300 text-sm font-medium">{engine}</span>
                    </div>
                  ))}
                </div>

                {/* Quality guarantee */}
                <div className="p-5 rounded-2xl border border-emerald-500/20 bg-emerald-500/5">
                  <div className="flex items-start gap-3">
                    <ShieldCheck className="h-5 w-5 text-emerald-400 shrink-0 mt-0.5" aria-hidden="true" />
                    <div>
                      <div className="font-semibold text-white text-sm mb-1.5">Kualitas Dijamin</div>
                      <p className="text-slate-500 text-xs leading-relaxed">
                        Setiap produk SatuGama melewati quality control ketat sebelum dirilis, dan dilengkapi dokumentasi penggunaan yang jelas. Jika ada pertanyaan, tim kami siap membantu.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════
            CONTACT / ORDER CTA
        ═══════════════════════════════════════ */}
        <section className="py-20 border-t border-white/[0.04]">
          <div className="max-w-6xl mx-auto px-5">
            <div className="relative rounded-3xl border border-indigo-500/20 bg-indigo-500/5 px-8 py-14 md:py-20 overflow-hidden text-center">
              <div className="absolute inset-0 bg-dot-pattern opacity-15" aria-hidden="true" />
              <div className="relative z-10 space-y-6 max-w-xl mx-auto">
                <div className="text-5xl" aria-hidden="true">🎮</div>
                <h2
                  className="text-3xl md:text-4xl font-bold text-white leading-tight"
                  style={{ fontFamily: "var(--font-sora)" }}
                >
                  Siap Menggunakan{" "}
                  <span className="text-gradient">{product.title}?</span>
                </h2>
                <p className="text-slate-400 leading-relaxed">
                  Isi formulir kontak kami dan tim SatuGama akan mengirimkan detail pembelian serta instruksi download ke email Anda dalam 1×24 jam kerja.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <a
                    href="/#contact"
                    className="inline-flex items-center justify-center gap-2.5 px-7 py-3.5 btn-primary text-white font-bold rounded-2xl text-sm"
                  >
                    <Send className="h-4 w-4" aria-hidden="true" />
                    Hubungi Kami Sekarang
                  </a>
                  <a
                    href="mailto:satuggama@gmail.com"
                    className="inline-flex items-center justify-center gap-2.5 px-7 py-3.5 border border-white/12 bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white font-medium rounded-2xl transition-all text-sm"
                  >
                    <Mail className="h-4 w-4" aria-hidden="true" />
                    satuggama@gmail.com
                  </a>
                </div>
                <p className="text-slate-600 text-xs">
                  Respon 1×24 jam · Lisensi komersial inklusif · Harga mulai{" "}
                  <strong className="text-amber-500">{product.price}</strong>
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════
            RELATED PRODUCTS
        ═══════════════════════════════════════ */}
        {relatedProducts.length > 0 && (
          <section className="py-20 border-t border-white/[0.04]">
            <div className="max-w-6xl mx-auto px-5">
              <div className="flex items-center justify-between mb-10">
                <div>
                  <p className="section-label text-slate-500">Rekomendasi</p>
                  <h2
                    className="text-2xl md:text-3xl font-bold text-white"
                    style={{ fontFamily: "var(--font-sora)" }}
                  >
                    Produk Lainnya
                  </h2>
                </div>
                <Link
                  href="/#catalog"
                  className="hidden sm:flex items-center gap-1.5 text-sm text-indigo-400 hover:text-indigo-300 transition-colors font-medium"
                >
                  Lihat Semua <ChevronRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {relatedProducts.map((rel) => (
                  <RelatedCard key={rel.id} product={rel} />
                ))}
              </div>
            </div>
          </section>
        )}

      </main>

      <Footer />

    </div>
  );
}
