"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { CharacterCustomizer } from "@/components/character-customizer";
import { Footer } from "@/components/footer";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Send,
  Loader2,
  Mail,
  MapPin,
  ArrowRight,
  Menu,
  X,
  Star,
  Check,
  ExternalLink,
  Box,
  Volume2,
  Layers,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Award,
  Users,
  Package,
  Clock,
  Palette,
  ShieldCheck,
  Gamepad2,
  Sparkles,
  Zap,
} from "lucide-react";

/* ─────────────────────────────────────────────────────────────
   DATA
───────────────────────────────────────────────────────────── */

const PORTFOLIO_ITEMS = [
  {
    id: 1,
    slug: "last-signal-glitch-ui-pack",
    category: "ui",
    title: "Last Signal — Glitch UI Pack",
    tagline: "Cyberpunk-ready interface kit",
    desc: "Koleksi UI kit futuristik dengan 80+ komponen siap pakai: panel HUD animasi, tombol neon, ikon sci-fi retro, dan 24 efek suara sintetis berkualitas tinggi.",
    price: "Rp 49.000",
    badge: "UI & Audio",
    tags: ["HUD Elements", "Sound FX", "Glitch Effects"],
    gradient: "from-indigo-600 via-indigo-700 to-violet-800",
    iconBg: "bg-indigo-500/20 border-indigo-500/30",
    icon: <Layers className="h-8 w-8 text-indigo-300" />,
    accentColor: "text-indigo-400",
    ctaBorderDetail: "border-indigo-500/30 bg-indigo-500/10 text-indigo-300 hover:bg-indigo-500 hover:border-indigo-500 hover:text-white",
  },
  {
    id: 2,
    slug: "dungeon-crawler-tileset",
    category: "2d",
    title: "Dungeon Crawler Tileset",
    tagline: "16-bit pixel art dungeon collection",
    desc: "340+ tile sprite berkualitas tinggi bertema kastil gotik & dungeon medieval. Tersedia animasi pintu, jebakan bergerak, dan sistem pencahayaan berbasis tile.",
    price: "Rp 29.000",
    badge: "Pixel Art",
    tags: ["340+ Sprites", "Animated", "Layer System"],
    gradient: "from-amber-600 via-orange-700 to-red-800",
    iconBg: "bg-amber-500/20 border-amber-500/30",
    icon: <Palette className="h-8 w-8 text-amber-300" />,
    accentColor: "text-amber-400",
    ctaBorderDetail: "border-amber-500/30 bg-amber-500/10 text-amber-300 hover:bg-amber-500 hover:border-amber-500 hover:text-white",
  },
  {
    id: 3,
    slug: "sci-fi-starfighter-pack",
    category: "3d",
    title: "Sci-Fi Starfighter Pack",
    tagline: "Low-poly 3D spacecraft collection",
    desc: "12 model pesawat luar angkasa low-poly siap pakai dalam format FBX & OBJ. UV-unwrapped dan dilengkapi tekstur PBR 2K, dioptimalkan untuk Unity & Godot.",
    price: "Rp 99.000",
    badge: "3D Models",
    tags: ["12 Models", "FBX & OBJ", "PBR Textures"],
    gradient: "from-violet-600 via-purple-700 to-indigo-800",
    iconBg: "bg-violet-500/20 border-violet-500/30",
    icon: <Box className="h-8 w-8 text-violet-300" />,
    accentColor: "text-violet-400",
    ctaBorderDetail: "border-violet-500/30 bg-violet-500/10 text-violet-300 hover:bg-violet-500 hover:border-violet-500 hover:text-white",
  },
  {
    id: 4,
    slug: "medieval-weapons-3d-pack",
    category: "3d",
    title: "Medieval Weapons 3D Pack",
    tagline: "Stylized low-poly armory collection",
    desc: "Koleksi 28 model 3D senjata abad pertengahan kustom: pedang, tameng, kapak, busur, dan gada yang dioptimalkan untuk performa game RPG.",
    price: "Rp 39.000",
    badge: "3D Models",
    tags: ["28 Weapons", "Low-Poly", "FBX + OBJ"],
    gradient: "from-teal-600 via-emerald-700 to-green-800",
    iconBg: "bg-teal-500/20 border-teal-500/30",
    icon: <Box className="h-8 w-8 text-teal-300" />,
    accentColor: "text-teal-400",
    ctaBorderDetail: "border-teal-500/30 bg-teal-500/10 text-teal-300 hover:bg-teal-500 hover:border-teal-500 hover:text-white",
  },
  {
    id: 5,
    slug: "retro-rpg-hud-theme",
    category: "ui",
    title: "Retro RPG HUD Theme",
    tagline: "Classic pixel art game interfaces",
    desc: "Paket aset antarmuka game (HUD) bertema retro RPG pixel art lengkap dengan frame jendela dialog, bar status, icon item, dan kursor kustom.",
    price: "Rp 34.000",
    badge: "UI Design",
    tags: ["Pixel Art", "120+ Elements", "HUD & UI"],
    gradient: "from-rose-600 via-pink-700 to-red-800",
    iconBg: "bg-rose-500/20 border-rose-500/30",
    icon: <Layers className="h-8 w-8 text-rose-300" />,
    accentColor: "text-rose-400",
    ctaBorderDetail: "border-rose-500/30 bg-rose-500/10 text-rose-300 hover:bg-rose-500 hover:border-rose-500 hover:text-white",
  },
];



const NAV_LINKS = [
  { href: "#home", label: "Beranda" },
  { href: "#about", label: "Tentang" },
  { href: "#customizer", label: "Customizer" },
  { href: "#catalog", label: "Katalog" },
  { href: "#pricing", label: "Harga" },
  { href: "#contact", label: "Kontak" },
];

const STATS = [
  { value: "26+", label: "Paket Aset" },
  { value: "4", label: "Expert Creators" },
  { value: "3", label: "Kategori Produk" },
  { value: "100%", label: "Karya Original" },
];

/* ─────────────────────────────────────────────────────────────
   COMPONENT
───────────────────────────────────────────────────────────── */

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState("all");
  const [productIndex, setProductIndex] = useState(0);

  useEffect(() => {
    setProductIndex(0);
  }, [activeFilter]);
  const [scrolled, setScrolled] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [assetStyle, setAssetStyle] = useState("2d-pixel");
  const [budget, setBudget] = useState("50k-100k");
  const [message, setMessage] = useState("");
  const [submitStatus, setSubmitStatus] = useState<{
    type: "success" | "error" | "loading" | null;
    text: string;
  }>({ type: null, text: "" });

  const [portfolioItems, setPortfolioItems] = useState(PORTFOLIO_ITEMS);
  const [testimonialsList, setTestimonialsList] = useState<any[]>([
    {
      id: 1,
      reviewerName: "Zahwa Herdan",
      reviewerCompany: "Arcane Studios",
      content: "UI kit Last Signal benar-benar mempermudah pengembangan game sci-fi kami. Efek suara yang disertakan sangat membantu menghemat waktu!",
      rating: 5,
    },
    {
      id: 2,
      reviewerName: "Budi Santoso",
      reviewerCompany: "Indie Dev Semarang",
      content: "Tileset Dungeon Crawler sangat rapi dan mudah digunakan dengan Unity. Desain pixel art-nya sangat konsisten dan berkarakter.",
      rating: 5,
    },
    {
      id: 3,
      reviewerName: "Siti Rahma",
      reviewerCompany: "Nusantara Games",
      content: "Model low-poly dari Sci-Fi Starfighter Pack sangat teroptimasi untuk mobile game. Penggunaan tekstur PBR membuat aset tampak berkualitas premium.",
      rating: 5,
    },
    {
      id: 4,
      reviewerName: "Rian Hidayat",
      reviewerCompany: "Garuda Game Dev",
      content: "Sangat terbantu dengan layanan aset kustom SatuGama. Pengerjaan model 3D rapi, cepat, dan integrasi ke Unreal Engine berjalan lancar.",
      rating: 5,
    },
    {
      id: 5,
      reviewerName: "Amelia Putri",
      reviewerCompany: "Studio Chibi",
      content: "Koleksi aset UI dan audio mereka berkualitas sangat premium. Asset kit Last Signal membuat prototipe game kami langsung terlihat profesional.",
      rating: 5,
    }
  ]);

  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 20);
      setShowBackToTop(y > 700);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("/api/products");
        const data = await res.json();
        if (data.success && data.products && data.products.length > 0) {
          const getIconForCategory = (category: string) => {
            switch (category) {
              case "ui":
                return <Layers className="h-8 w-8 text-indigo-300" />;
              case "2d":
                return <Palette className="h-8 w-8 text-amber-300" />;
              case "3d":
                return <Box className="h-8 w-8 text-violet-300" />;
              default:
                return <Layers className="h-8 w-8 text-indigo-300" />;
            }
          };

          let mapped = data.products.map((p: any) => ({
            id: p.id,
            slug: p.slug,
            category: p.category,
            title: p.title,
            tagline: p.tagline,
            desc: p.shortDesc,
            price: p.price,
            badge: p.badge,
            tags: p.tags.map((t: any) => t.tag),
            gradient: p.gradient,
            iconBg: p.iconBg,
            icon: getIconForCategory(p.category),
            accentColor: p.accentColor,
            ctaBorderDetail: p.ctaBorder || "border-indigo-500/30 bg-indigo-500/10 text-indigo-300 hover:bg-indigo-500 hover:border-indigo-500 hover:text-white",
          }));

          if (mapped.length < 5) {
            const existingIds = new Set(mapped.map((m: any) => m.id));
            const extra = PORTFOLIO_ITEMS.filter((item) => !existingIds.has(item.id));
            mapped = [...mapped, ...extra];
          }
          setPortfolioItems(mapped);
        }
      } catch (e) {
        console.warn("Gagal fetch produk dari API:", e);
      }
    };

    fetchProducts();
  }, []);

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitStatus({ type: "loading", text: "Mengirim pesan Anda..." });
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, style: assetStyle, budget, message }),
      });
      const data = await response.json();
      if (data.success) {
        setSubmitStatus({
          type: "success",
          text: `Pesan berhasil terkirim! Tim kami akan menghubungi ${email} dalam 1×24 jam kerja.`,
        });
        setName(""); setEmail(""); setMessage("");
      } else {
        setSubmitStatus({ type: "error", text: data.error || "Gagal mengirim pesan. Silakan coba lagi." });
      }
    } catch {
      setSubmitStatus({ type: "error", text: "Terjadi kesalahan jaringan. Mohon periksa koneksi Anda." });
    }
  };

  const filteredItems = portfolioItems.filter(
    (i) => activeFilter === "all" || i.category === activeFilter
  );

  const visibleItems = filteredItems.length <= 3
    ? filteredItems
    : Array.from({ length: 3 }).map((_, i) => filteredItems[(productIndex + i) % filteredItems.length]);

  const nextProduct = () => {
    if (filteredItems.length <= 3) return;
    setProductIndex((prev) => (prev + 1) % filteredItems.length);
  };

  const prevProduct = () => {
    if (filteredItems.length <= 3) return;
    setProductIndex((prev) => (prev - 1 + filteredItems.length) % filteredItems.length);
  };

  return (
    <div className="bg-[#090a14] text-slate-100 min-h-screen antialiased overflow-x-hidden">

      {/* ── Ambient background orbs ── */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
        <div className="orb-indigo w-[900px] h-[900px] -top-80 -left-56 opacity-70" />
        <div className="orb-amber w-[550px] h-[550px] top-[38%] -right-52 opacity-50" />
        <div className="orb-indigo w-[650px] h-[650px] bottom-0 left-[18%] opacity-25" />
      </div>

      {/* ═══════════════════════════════════════════
          NAVBAR
      ══════════════════════════════════════════ */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b bg-[#0c0d1b]/95 backdrop-blur-md ${
          scrolled
            ? "border-white/[0.08] shadow-lg shadow-black/20"
            : "border-white/[0.05]"
        }`}
      >
        <div className="max-w-6xl mx-auto px-5 h-16 flex items-center justify-between gap-6">

          {/* Logo */}
          <a href="#home" className="group shrink-0 block select-none" aria-label="SatuGama Studio — Beranda">
            <div
              className="font-extrabold text-[19px] tracking-tight text-white leading-none"
              style={{ fontFamily: "var(--font-sora)" }}
            >
              Satu<span className="text-indigo-400 drop-shadow-[0_0_8px_rgba(99,102,241,0.3)]">Gama</span>
            </div>
            <div className="text-[9px] text-slate-500 tracking-widest uppercase font-semibold mt-1">
              Game Studio
            </div>
          </a>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-0.5" aria-label="Navigasi utama">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="nav-link px-3.5 py-2 text-sm text-slate-400 hover:text-white rounded-lg hover:bg-white/5 transition-all duration-200 font-medium"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Desktop CTAs */}
          <div className="hidden lg:flex items-center gap-3">
            <a href="#contact" className="text-sm text-slate-400 hover:text-white transition-colors font-medium">
              Hubungi Kami
            </a>
            <a
              href="#catalog"
              className="flex items-center gap-2 px-4 py-2 btn-primary text-white font-semibold text-sm rounded-xl"
            >
              Lihat Katalog
              <ArrowRight className="h-3.5 w-3.5" />
            </a>
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 transition-colors"
            aria-label={mobileMenuOpen ? "Tutup menu" : "Buka menu"}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {/* Mobile drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-white/[0.06] bg-[#090a14]/98 backdrop-blur-2xl">
            <nav className="max-w-6xl mx-auto px-5 py-4 flex flex-col gap-1" aria-label="Navigasi mobile">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-4 py-3 text-slate-300 hover:text-white hover:bg-white/5 rounded-lg text-sm font-medium transition-all"
                >
                  {link.label}
                </a>
              ))}
              <a
                href="#catalog"
                onClick={() => setMobileMenuOpen(false)}
                className="mt-2 flex items-center justify-center gap-2 py-3 btn-primary text-white font-bold text-sm rounded-xl"
              >
                Lihat Katalog <ArrowRight className="h-4 w-4" />
              </a>
            </nav>
          </div>
        )}
      </header>

      {/* ═══════════════════════════════════════════
          HERO
      ══════════════════════════════════════════ */}
      <section id="home" className="relative min-h-[92vh] flex flex-col justify-center py-24">
        <div className="max-w-6xl mx-auto px-5 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

            {/* Left — headline */}
            <div className="space-y-8">
              {/* Live badge */}
              <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full border border-indigo-500/30 bg-indigo-500/8 text-indigo-300 text-xs font-medium tracking-wide">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 dot-pulse" />
                Studio Game Asset · Semarang, Indonesia
              </div>

              {/* Headline */}
              <div className="space-y-3">
                <h1 className="text-5xl md:text-6xl lg:text-[4.5rem] font-black leading-[1.04] tracking-tight">
                  <span className="text-white">Aset Game</span>
                  <br />
                  <span className="text-gradient-indigo">Premium &amp;</span>
                  <br />
                  <span className="text-white">Siap Pakai</span>
                </h1>
                <p className="text-lg text-slate-400 leading-relaxed max-w-lg font-light">
                  SatuGama adalah studio kreatif spesialis{" "}
                  <strong className="text-slate-200 font-medium">game asset</strong> di
                  Indonesia — menghasilkan aset 2D pixel art, model 3D, UI kit, dan audio
                  SFX profesional untuk mempercepat pengembangan game Anda.
                </p>
              </div>

              {/* CTA buttons */}
              <div className="flex flex-wrap gap-4">
                <a
                  href="#catalog"
                  className="inline-flex items-center gap-2.5 px-6 py-3.5 btn-primary text-white font-bold rounded-2xl text-sm"
                >
                  Lihat Katalog Aset
                  <ArrowRight className="h-4 w-4" />
                </a>
                <a
                  href="#customizer"
                  className="inline-flex items-center gap-2.5 px-6 py-3.5 border border-white/12 bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white font-medium rounded-2xl transition-all duration-200 text-sm"
                >
                  <Sparkles className="h-4 w-4 text-amber-400" />
                  Coba Customizer Gratis
                </a>
              </div>

              {/* Trust indicators */}
              <div className="flex flex-wrap items-center gap-6 pt-2">
                {[
                  { icon: <Package className="h-4 w-4 text-indigo-400" />, label: "26+ Paket Aset" },
                  { icon: <Users className="h-4 w-4 text-amber-400" />, label: "4 Expert Creators" },
                  { icon: <Star className="h-4 w-4 text-amber-400 fill-amber-400" />, label: "100% Original" },
                ].map((item) => (
                  <div key={item.label} className="flex items-center gap-2 text-sm text-slate-400">
                    {item.icon}
                    <span className="font-medium">{item.label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right — Product showcase mockup */}
            <div className="relative hidden lg:flex items-center justify-center">
              {/* Background glow */}
              <div className="absolute inset-0 bg-indigo-500/6 rounded-3xl blur-3xl scale-110" />

              {/* Browser-style card */}
              <div className="relative w-full max-w-[480px] rounded-3xl overflow-hidden border border-white/8 bg-[#0e1020]/90 shadow-2xl shadow-black/60 p-6">
                {/* Fake browser bar */}
                <div className="flex items-center gap-3 mb-6">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
                    <div className="w-3 h-3 rounded-full bg-[#febc2e]" />
                    <div className="w-3 h-3 rounded-full bg-[#28c840]" />
                  </div>
                  <div className="flex-1 h-7 rounded-lg bg-white/5 border border-white/8 flex items-center px-3 gap-2">
                    <ShieldCheck className="h-3 w-3 text-emerald-400 shrink-0" />
                    <span className="text-[11px] text-slate-500">satugama.studio/catalog</span>
                  </div>
                </div>

                {/* Header label */}
                <div className="flex items-center justify-between mb-4">
                  <p className="text-xs font-semibold text-slate-500 uppercase tracking-widest">Katalog Produk</p>
                  <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-emerald-400 text-[10px] font-medium">
                    ● Live
                  </span>
                </div>

                {/* 2×2 product grid */}
                <div className="grid grid-cols-2 gap-3 mb-5">
                  {[
                    { icon: <Layers className="h-4.5 w-4.5 text-indigo-400" />, title: "UI Kit", sub: "80+ komponen", bg: "bg-indigo-500/10 border-indigo-500/20", filter: "ui" },
                    { icon: <Palette className="h-4.5 w-4.5 text-amber-400" />, title: "2D Pixel Art", sub: "340+ sprites", bg: "bg-amber-500/10 border-amber-500/20", filter: "2d" },
                    { icon: <Box className="h-4.5 w-4.5 text-violet-400" />, title: "3D Models", sub: "FBX & OBJ", bg: "bg-violet-500/10 border-violet-500/20", filter: "3d" },
                    { icon: <Volume2 className="h-4.5 w-4.5 text-emerald-400" />, title: "Audio SFX", sub: "24 efek HD", bg: "bg-emerald-500/10 border-emerald-500/20", filter: "ui" },
                  ].map((card, i) => (
                    <button
                      key={i}
                      onClick={() => {
                        setActiveFilter(card.filter);
                        document.getElementById("catalog")?.scrollIntoView({ behavior: "smooth" });
                      }}
                      className={`p-4 rounded-xl border ${card.bg} hover:scale-[1.03] transition-all cursor-pointer text-left w-full hover:border-white/20`}
                    >
                      <div className={`w-8 h-8 rounded-lg border flex items-center justify-center mb-3 ${card.bg}`}>
                        {card.icon}
                      </div>
                      <div className="text-white text-sm font-semibold leading-tight">{card.title}</div>
                      <div className="text-slate-500 text-xs mt-0.5">{card.sub}</div>
                    </button>
                  ))}
                </div>

                {/* Bottom strip */}
                <div className="flex items-center justify-between pt-4 border-t border-white/6">
                  <div className="text-xs text-slate-500">26+ produk tersedia</div>
                  <button
                    onClick={() => {
                      setActiveFilter("all");
                      document.getElementById("catalog")?.scrollIntoView({ behavior: "smooth" });
                    }}
                    className="px-3 py-1.5 rounded-lg bg-indigo-500/15 border border-indigo-500/25 text-indigo-400 text-xs font-semibold flex items-center gap-1 cursor-pointer hover:bg-indigo-500/25 transition-colors"
                  >
                    Lihat Semua <ArrowRight className="h-3 w-3" />
                  </button>
                </div>
              </div>

              {/* Floating badges */}
              <div className="absolute -top-4 -right-4 glass-card rounded-xl px-4 py-3 text-center float-anim" aria-hidden="true">
                <div className="text-xl font-black text-indigo-400" style={{ fontFamily: "var(--font-sora)" }}>26+</div>
                <div className="text-[9px] text-slate-500 uppercase tracking-wider mt-0.5">Paket Aset</div>
              </div>
              <div className="absolute -bottom-4 -left-4 glass-card rounded-xl px-4 py-3 text-center float-anim-slow" aria-hidden="true">
                <div className="text-xl font-black text-amber-400" style={{ fontFamily: "var(--font-sora)" }}>100%</div>
                <div className="text-[9px] text-slate-500 uppercase tracking-wider mt-0.5">Original</div>
              </div>
            </div>

          </div>
        </div>

        {/* Scroll hint */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-slate-600 animate-bounce" aria-hidden="true">
          <ChevronDown className="h-5 w-5" />
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          STATS BAR
      ══════════════════════════════════════════ */}
      <div className="border-y border-white/[0.05] bg-white/[0.015]" aria-label="Statistik SatuGama">
        <div className="max-w-6xl mx-auto px-5 py-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {STATS.map((stat) => (
              <div key={stat.label} className="flex flex-col items-center text-center gap-1.5">
                <div
                  className="text-3xl md:text-4xl font-black stat-value"
                  style={{ fontFamily: "var(--font-sora)" }}
                  aria-label={`${stat.value} ${stat.label}`}
                >
                  {stat.value}
                </div>
                <div className="text-xs text-slate-500 font-medium tracking-wide">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ═══════════════════════════════════════════
          ABOUT — CORE Values
      ══════════════════════════════════════════ */}
      <section id="about" className="py-28 relative">
        <div className="max-w-6xl mx-auto px-5">

          {/* Section intro */}
          <div className="text-center mb-20 space-y-4">
            <p className="section-label text-indigo-400">Tentang SatuGama</p>
            <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight">
              Studio Game Asset{" "}
              <span className="text-gradient">Terpercaya</span>
            </h2>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto leading-relaxed font-light">
              Didirikan oleh mahasiswa{" "}
              <strong className="text-slate-300 font-medium">
                D3 Teknik Informatika Politeknik Negeri Semarang
              </strong>
              , SatuGama hadir sebagai solusi nyata bagi game developer yang
              membutuhkan aset visual berkualitas dengan harga terjangkau.
            </p>
          </div>

          {/* CORE values — 4 column cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              {
                letter: "C", title: "Creative",
                desc: "Setiap aset dirancang dengan pendekatan artistik tinggi — bukan sekadar file, melainkan karya visual yang memiliki jiwa dan identitas unik.",
                colorText: "text-indigo-400", colorBg: "bg-indigo-500/8", colorBorder: "border-indigo-500/20", accentBar: "bg-indigo-500",
              },
              {
                letter: "O", title: "Optimized",
                desc: "Semua aset dioptimalkan untuk performa — polygon count efisien, ukuran file terkompresi, dan kompatibel dengan Unity & Godot.",
                colorText: "text-amber-400", colorBg: "bg-amber-500/8", colorBorder: "border-amber-500/20", accentBar: "bg-amber-500",
              },
              {
                letter: "R", title: "Reliable",
                desc: "Konsistensi kualitas di setiap produk. Quality control ketat sebelum rilis, lengkap dengan dokumentasi penggunaan yang jelas.",
                colorText: "text-violet-400", colorBg: "bg-violet-500/8", colorBorder: "border-violet-500/20", accentBar: "bg-violet-500",
              },
              {
                letter: "E", title: "Expert",
                desc: "Tim terdiri dari creator berdedikasi di bidangnya. Dari pixel art hingga 3D sculpting, setiap karya dihasilkan oleh tangan yang terlatih.",
                colorText: "text-emerald-400", colorBg: "bg-emerald-500/8", colorBorder: "border-emerald-500/20", accentBar: "bg-emerald-500",
              },
            ].map((val) => (
              <div
                key={val.letter}
                className={`relative p-6 pl-8 rounded-2xl border ${val.colorBorder} ${val.colorBg} card-hover group overflow-hidden`}
              >
                {/* Background letter */}
                <div
                  className={`absolute -right-2 -top-3 text-9xl font-black ${val.colorText} opacity-[0.05] select-none leading-none pointer-events-none`}
                  style={{ fontFamily: "var(--font-sora)" }}
                  aria-hidden="true"
                >
                  {val.letter}
                </div>
                {/* Left accent bar */}
                <div className={`absolute left-0 top-5 bottom-5 w-[3px] ${val.accentBar} rounded-r-full opacity-50 group-hover:opacity-100 transition-opacity duration-300`} aria-hidden="true" />

                {/* Icon badge */}
                <div className={`w-10 h-10 rounded-xl ${val.colorBg} border ${val.colorBorder} flex items-center justify-center mb-4`}>
                  <span className={`text-lg font-black ${val.colorText}`} style={{ fontFamily: "var(--font-sora)" }}>
                    {val.letter}
                  </span>
                </div>
                <h3 className="text-base font-bold text-white mb-2" style={{ fontFamily: "var(--font-sora)" }}>
                  {val.title}
                </h3>
                <p className="text-slate-500 text-sm leading-relaxed">{val.desc}</p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ═══════════════════════════════════════════
          VISI & MISI
      ══════════════════════════════════════════ */}
      <section className="py-28 relative border-t border-white/[0.04]">
        <div className="max-w-6xl mx-auto px-5">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

            {/* Visi */}
            <div className="space-y-6">
              <p className="section-label text-indigo-400">Visi</p>
              <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight">
                Menjadi penyedia jasa desain 2D &amp; 3D{" "}
                <span className="text-gradient">kreatif yang terpercaya.</span>
              </h2>
              <p className="text-slate-400 leading-relaxed text-base font-light">
                Kami percaya bahwa keterbatasan aset tidak seharusnya menjadi hambatan
                kreativitas. Dengan harga yang demokratis dan kualitas yang tidak
                berkompromi, SatuGama hadir untuk semua developer — dari hobbyist hingga
                studio indie profesional.
              </p>
              {/* Specialty tags */}
              <div className="flex flex-wrap gap-2 pt-2">
                {["2D Pixel Art", "3D Modeling", "UI/UX Design", "Audio SFX"].map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1.5 rounded-lg border border-indigo-500/20 bg-indigo-500/8 text-indigo-300 text-xs font-medium"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Misi */}
            <div>
              <p className="section-label text-amber-400">Misi</p>
              <div className="space-y-3">
                {[
                  { num: "01", icon: <Palette className="h-4 w-4" />, title: "Kreativitas Tanpa Batas", desc: "Menyediakan layanan desain 2D dan 3D yang kreatif dan berkualitas tinggi.", colorText: "text-indigo-400", colorBg: "bg-indigo-500/10", colorBorder: "border-indigo-500/20 hover:border-indigo-500/40" },
                  { num: "02", icon: <Award className="h-4 w-4" />, title: "Standar Kualitas Tinggi", desc: "Memberikan pelayanan profesional dan responsif kepada setiap klien.", colorText: "text-amber-400", colorBg: "bg-amber-500/10", colorBorder: "border-amber-500/20 hover:border-amber-500/40" },
                  { num: "03", icon: <Users className="h-4 w-4" />, title: "Kolaborasi Tim yang Kuat", desc: "Meningkatkan kemampuan kreativitas dan kompetensi setiap anggota tim.", colorText: "text-violet-400", colorBg: "bg-violet-500/10", colorBorder: "border-violet-500/20 hover:border-violet-500/40" },
                  { num: "04", icon: <Zap className="h-4 w-4" />, title: "Ekosistem Digital Berkelanjutan", desc: "Membangun branding dan identitas digital SatuGama secara konsisten dan kreatif.", colorText: "text-emerald-400", colorBg: "bg-emerald-500/10", colorBorder: "border-emerald-500/20 hover:border-emerald-500/40" },
                ].map((misi) => (
                  <div
                    key={misi.num}
                    className={`flex gap-4 p-5 rounded-xl border ${misi.colorBorder} bg-white/[0.02] hover:bg-white/[0.04] transition-all duration-200 group`}
                  >
                    <div className={`w-9 h-9 rounded-xl ${misi.colorBg} border ${misi.colorBorder.split(" ")[0]} flex items-center justify-center shrink-0 ${misi.colorText}`}>
                      {misi.icon}
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className={`text-[10px] font-bold ${misi.colorText} font-mono`}>{misi.num}</span>
                        <h4 className="font-semibold text-white text-sm">{misi.title}</h4>
                      </div>
                      <p className="text-slate-500 text-xs leading-relaxed">{misi.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          CUSTOMIZER
      ══════════════════════════════════════════ */}
      <section id="customizer" className="py-28 border-t border-white/[0.04] relative">
        <div className="max-w-6xl mx-auto px-5">

          <div className="text-center mb-16 space-y-4">
            <p className="section-label text-indigo-400">Demo Editor Interaktif</p>
            <h2 className="text-4xl md:text-5xl font-bold text-white">
              Buat Karakter Anda <span className="text-gradient">Sendiri</span>
            </h2>
            <p className="text-slate-400 text-lg max-w-xl mx-auto leading-relaxed font-light">
              Rasakan langsung kualitas aset kami. Kustomisasi sprite karakter RPG retro
              secara real-time dan unduh hasilnya dalam format SVG secara gratis.
            </p>
          </div>

          <div className="rounded-3xl border border-white/8 bg-[#0e1020]/60 backdrop-blur-sm p-6 md:p-10 shadow-2xl shadow-black/40">
            <CharacterCustomizer />
          </div>

        </div>
      </section>

      {/* ═══════════════════════════════════════════
          CATALOG
      ══════════════════════════════════════════ */}
      <section id="catalog" className="py-28 border-t border-white/[0.04] relative">
        <div className="max-w-6xl mx-auto px-5">

          <div className="text-center mb-16 space-y-4">
            <p className="section-label text-amber-400">Katalog Produk</p>
            <h2 className="text-4xl md:text-5xl font-bold text-white">
              Portofolio &amp; Showcase{" "}
              <span className="text-gradient">Karya</span>
            </h2>
            <p className="text-slate-400 text-lg max-w-xl mx-auto font-light">
              Koleksi aset pack pilihan yang kami kerjakan dengan penuh dedikasi.
              Setiap produk dirancang untuk langsung digunakan dalam game Anda.
            </p>
          </div>

          {/* Filter tabs */}
          <div className="flex flex-wrap justify-center gap-2 mb-12" role="group" aria-label="Filter katalog">
            {[
              { key: "all", label: "Semua Produk", icon: <Package className="h-3.5 w-3.5" /> },
              { key: "2d", label: "2D & Pixel Art", icon: <Palette className="h-3.5 w-3.5" /> },
              { key: "3d", label: "3D Models", icon: <Box className="h-3.5 w-3.5" /> },
              { key: "ui", label: "UI & Audio", icon: <Volume2 className="h-3.5 w-3.5" /> },
            ].map((f) => (
              <button
                key={f.key}
                onClick={() => setActiveFilter(f.key)}
                aria-pressed={activeFilter === f.key}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                  activeFilter === f.key
                    ? "bg-indigo-600 text-white shadow-lg shadow-indigo-500/25 border border-indigo-500/50"
                    : "border border-white/8 bg-white/4 text-slate-400 hover:text-white hover:border-white/15 hover:bg-white/8"
                }`}
              >
                {f.icon} {f.label}
              </button>
            ))}
          </div>

          {/* Products carousel container */}
          <div className="relative px-0 md:px-4">
            {/* Left and Right navigation buttons (desktop) */}
            {filteredItems.length > 3 && (
              <>
                <button
                  onClick={prevProduct}
                  className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 -translate-x-12 z-20 p-3.5 rounded-full border border-white/8 bg-[#0c0d1b]/95 text-slate-400 hover:text-white hover:border-white/20 transition-all shadow-2xl backdrop-blur-md cursor-pointer hover:scale-105"
                  aria-label="Produk sebelumnya"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <button
                  onClick={nextProduct}
                  className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 translate-x-12 z-20 p-3.5 rounded-full border border-white/8 bg-[#0c0d1b]/95 text-slate-400 hover:text-white hover:border-white/20 transition-all shadow-2xl backdrop-blur-md cursor-pointer hover:scale-105"
                  aria-label="Produk berikutnya"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </>
            )}

            {/* Products grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {visibleItems.map((item) => (
                <article
                  key={item.id}
                  className="group rounded-2xl overflow-hidden border border-white/8 bg-[#0e1020]/80 card-hover flex flex-col"
                >
                  {/* Thumbnail header — clickable link to detail page */}
                  <Link
                    href={`/catalog/${item.slug}`}
                    className={`relative h-48 bg-gradient-to-br ${item.gradient} flex items-center justify-center overflow-hidden`}
                    aria-label={`Lihat detail ${item.title}`}
                  >
                    <div className="absolute inset-0 bg-black/25" />
                    <div className="absolute inset-0 bg-dot-pattern opacity-15" />
                    {/* Product icon */}
                    <div className="relative z-10 flex flex-col items-center gap-3">
                      <div className={`w-16 h-16 rounded-2xl border ${item.iconBg} flex items-center justify-center backdrop-blur-sm group-hover:scale-105 transition-transform duration-300`}>
                        {item.icon}
                      </div>
                      <span className="px-3 py-1 rounded-full bg-black/40 border border-white/15 text-[10px] font-bold tracking-widest uppercase text-white/90">
                        {item.badge}
                      </span>
                    </div>
                    {/* Price pill */}
                    <div className="absolute bottom-3 right-3 px-3 py-1.5 rounded-lg bg-black/50 border border-white/12 backdrop-blur-sm">
                      <div className="text-[10px] text-white/50 leading-none mb-0.5">Mulai dari</div>
                      <div className="text-sm font-bold text-amber-300">{item.price}</div>
                    </div>
                    {/* Hover overlay */}
                    <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <span className="px-4 py-2 rounded-xl bg-white/15 border border-white/25 text-white text-xs font-bold backdrop-blur-sm flex items-center gap-2">
                        Lihat Detail <ArrowRight className="h-3.5 w-3.5" />
                      </span>
                    </div>
                  </Link>

                  {/* Content */}
                  <div className="p-6 flex flex-col flex-1 gap-4">
                    <div>
                      <p className="text-xs text-slate-500 mb-1 font-medium">{item.tagline}</p>
                      <Link href={`/catalog/${item.slug}`}>
                        <h3
                          className={`font-bold text-white text-base group-hover:${item.accentColor} transition-colors leading-snug hover:underline decoration-dotted underline-offset-2`}
                          style={{ fontFamily: "var(--font-sora)" }}
                        >
                          {item.title}
                        </h3>
                      </Link>
                    </div>

                    <p className="text-slate-500 text-sm leading-relaxed flex-1">{item.desc}</p>

                    {/* Feature tags */}
                    <div className="flex flex-wrap gap-1.5">
                      {item.tags.map((t) => (
                        <span key={t} className="px-2.5 py-1 rounded-md text-[10px] font-medium bg-white/5 border border-white/8 text-slate-400">
                          {t}
                        </span>
                      ))}
                    </div>

                    {/* Dual CTA */}
                    <div className="pt-3 border-t border-white/6 flex gap-2">
                      <Link
                        href={`/catalog/${item.slug}`}
                        className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl btn-primary text-white text-xs font-bold transition-all duration-200"
                      >
                        Lihat Detail
                        <ArrowRight className="h-3 w-3" />
                      </Link>
                      <a
                        href="#contact"
                        className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl border ${item.ctaBorderDetail} text-xs font-semibold transition-all duration-200`}
                      >
                        Pesan
                      </a>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            {/* Mobile navigation controls */}
            {filteredItems.length > 3 && (
              <div className="flex md:hidden items-center justify-center gap-4 mt-8">
                <button
                  onClick={prevProduct}
                  className="p-3 rounded-xl border border-white/8 bg-[#0c0d1b]/95 text-slate-400 hover:text-white transition-colors"
                  aria-label="Sebelumnya"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
                <span className="text-xs text-slate-500 font-mono font-semibold">
                  {productIndex + 1} / {filteredItems.length}
                </span>
                <button
                  onClick={nextProduct}
                  className="p-3 rounded-xl border border-white/8 bg-[#0c0d1b]/95 text-slate-400 hover:text-white transition-colors"
                  aria-label="Berikutnya"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            )}
          </div>

        </div>
      </section>



      {/* ═══════════════════════════════════════════
          PRICING
      ══════════════════════════════════════════ */}
      <section id="pricing" className="py-28 border-t border-white/[0.04] relative">
        <div className="max-w-6xl mx-auto px-5">

          <div className="text-center mb-16 space-y-4">
            <p className="section-label text-emerald-400">Harga &amp; Lisensi</p>
            <h2 className="text-4xl md:text-5xl font-bold text-white">
              Pilih Paket yang{" "}
              <span className="text-gradient">Tepat untuk Anda</span>
            </h2>
            <p className="text-slate-400 text-lg max-w-xl mx-auto font-light">
              Harga transparan, tanpa biaya tersembunyi. Semua paket sudah termasuk
              lisensi komersial untuk digunakan dalam game Anda.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">

            {/* Indie Pack */}
            <div className="relative p-8 rounded-2xl border border-white/8 bg-[#0e1020]/60 flex flex-col gap-6 card-hover">
              <div>
                <div className="text-xs font-semibold text-slate-500 uppercase tracking-widest mb-2">Indie Pack</div>
                <div className="text-3xl font-black text-white mb-1" style={{ fontFamily: "var(--font-sora)" }}>Rp 29.000</div>
                <p className="text-slate-500 text-sm">/ paket aset · Untuk solo developer</p>
              </div>
              <ul className="space-y-3 flex-1" role="list">
                {[
                  "Akses 1 paket aset pilihan",
                  "Format lengkap (PNG, SVG, OBJ)",
                  "Lisensi komersial (1 game)",
                  "Update gratis selamanya",
                ].map((f) => (
                  <li key={f} className="flex items-start gap-3 text-sm">
                    <Check className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" aria-hidden="true" />
                    <span className="text-slate-400">{f}</span>
                  </li>
                ))}
              </ul>
              <a
                href="#contact"
                className="flex items-center justify-center gap-2 py-3 rounded-xl border border-white/12 bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white font-semibold text-sm transition-all duration-200"
              >
                Pilih Paket Ini
              </a>
            </div>

            {/* Starter Pack — Featured */}
            <div className="relative p-8 rounded-2xl border border-indigo-500/40 bg-indigo-500/5 flex flex-col gap-6 shadow-2xl shadow-indigo-500/12 scale-[1.02]">
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full bg-indigo-600 text-white text-[10px] font-bold tracking-widest uppercase shadow-lg shadow-indigo-500/30 whitespace-nowrap">
                ⭐ Paling Populer
              </div>
              <div>
                <div className="text-xs font-semibold text-indigo-400 uppercase tracking-widest mb-2">Starter Pack</div>
                <div className="text-3xl font-black text-white mb-1" style={{ fontFamily: "var(--font-sora)" }}>Rp 49.000</div>
                <p className="text-slate-400 text-sm">/ paket aset · Untuk tim kecil</p>
              </div>
              <ul className="space-y-3 flex-1" role="list">
                {[
                  "Akses 3 paket aset pilihan",
                  "Kustomisasi warna & gaya via editor",
                  "Lisensi komersial (hingga 3 game)",
                  "Format lengkap + FBX (Low-Poly)",
                  "Update gratis selama 1 tahun",
                ].map((f) => (
                  <li key={f} className="flex items-start gap-3 text-sm">
                    <Check className="h-4 w-4 text-indigo-400 shrink-0 mt-0.5" aria-hidden="true" />
                    <span className="text-slate-300">{f}</span>
                  </li>
                ))}
              </ul>
              <a
                href="#contact"
                className="flex items-center justify-center gap-2 py-3 rounded-xl btn-primary text-white font-bold text-sm"
              >
                Mulai Sekarang
              </a>
            </div>

            {/* Custom Pack */}
            <div className="relative p-8 rounded-2xl border border-white/8 bg-[#0e1020]/60 flex flex-col gap-6 card-hover">
              <div>
                <div className="text-xs font-semibold text-slate-500 uppercase tracking-widest mb-2">Custom Pack</div>
                <div className="text-3xl font-black text-white mb-1" style={{ fontFamily: "var(--font-sora)" }}>Mulai 99k</div>
                <p className="text-slate-500 text-sm">/ request · Aset eksklusif kustom</p>
              </div>
              <ul className="space-y-3 flex-1" role="list">
                {[
                  "100% aset eksklusif (tidak dijual ulang)",
                  "Pengerjaan di Blender / Pixel Art",
                  "Hingga 3× revisi gratis",
                  "Hak cipta penuh milik Anda",
                ].map((f) => (
                  <li key={f} className="flex items-start gap-3 text-sm">
                    <Check className="h-4 w-4 text-amber-400 shrink-0 mt-0.5" aria-hidden="true" />
                    <span className="text-slate-400">{f}</span>
                  </li>
                ))}
              </ul>
              <a
                href="#contact"
                className="flex items-center justify-center gap-2 py-3 rounded-xl border border-amber-500/30 bg-amber-500/8 hover:bg-amber-500/15 text-amber-300 hover:text-amber-100 font-semibold text-sm transition-all duration-200"
              >
                Diskusi Kebutuhan
              </a>
            </div>

          </div>

          {/* Guarantee strip */}
          <div className="mt-12 flex flex-wrap justify-center gap-8 text-sm text-slate-500">
            {[
              { icon: <ShieldCheck className="h-4 w-4 text-emerald-400" />, text: "Lisensi komersial inklusif" },
              { icon: <Clock className="h-4 w-4 text-indigo-400" />, text: "Respon dalam 24 jam" },
              { icon: <Star className="h-4 w-4 text-amber-400 fill-amber-400" />, text: "Kualitas dijamin" },
            ].map((g) => (
              <div key={g.text} className="flex items-center gap-2">
                {g.icon}
                <span>{g.text}</span>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ═══════════════════════════════════════════
          TESTIMONIALS
      ══════════════════════════════════════════ */}
      <section id="testimonials" className="py-28 border-t border-white/[0.04] relative">
        <div className="max-w-6xl mx-auto px-5">

          <div className="text-center mb-16 space-y-4">
            <p className="section-label text-indigo-400">Testimoni</p>
            <h2 className="text-4xl md:text-5xl font-bold text-white">
              Apa Kata <span className="text-gradient">Developer Game</span>
            </h2>
            <p className="text-slate-400 text-lg max-w-xl mx-auto font-light">
              Ulasan asli dari para pembuat game indie yang menggunakan aset-aset buatan SatuGama Studio.
            </p>
          </div>

          {/* Testimonial slider / scrollable view */}
          <div className="relative">
            {/* Left and Right navigation buttons (desktop) */}
            <button
              onClick={() => {
                const container = document.getElementById("testimonials-scroll-container");
                if (container) container.scrollBy({ left: -420, behavior: "smooth" });
              }}
              className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 -translate-x-12 z-20 p-3.5 rounded-full border border-white/8 bg-[#0c0d1b]/95 text-slate-400 hover:text-white hover:border-white/20 transition-all shadow-2xl backdrop-blur-md cursor-pointer hover:scale-105"
              aria-label="Sebelumnya"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              onClick={() => {
                const container = document.getElementById("testimonials-scroll-container");
                if (container) container.scrollBy({ left: 420, behavior: "smooth" });
              }}
              className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 translate-x-12 z-20 p-3.5 rounded-full border border-white/8 bg-[#0c0d1b]/95 text-slate-400 hover:text-white hover:border-white/20 transition-all shadow-2xl backdrop-blur-md cursor-pointer hover:scale-105"
              aria-label="Berikutnya"
            >
              <ChevronRight className="h-5 w-5" />
            </button>

            <div className="flex gap-6 overflow-x-auto snap-x snap-mandatory pb-8 scroll-smooth scrollbar-none" id="testimonials-scroll-container">
              {testimonialsList.map((t, idx) => (
                <div
                  key={t.id || idx}
                  className="bg-[#0c0d1b]/60 backdrop-blur-xl border border-white/8 p-8 rounded-2xl flex flex-col justify-between min-w-[290px] sm:min-w-[350px] md:min-w-[400px] max-w-[420px] snap-center relative shrink-0"
                >
                  {/* Glowing card border detail */}
                  <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-indigo-500 to-violet-500 opacity-60 rounded-t-2xl" />
                  
                  <div className="space-y-4">
                    {/* Stars */}
                    <div className="flex gap-1">
                      {Array.from({ length: t.rating || 5 }).map((_, i) => (
                        <Star key={i} className="h-4.5 w-4.5 text-amber-400 fill-amber-400 drop-shadow-[0_0_6px_rgba(245,158,11,0.5)]" />
                      ))}
                    </div>
                    {/* Content */}
                    <p className="text-slate-300 text-sm leading-relaxed italic">
                      "{t.content}"
                    </p>
                  </div>

                  {/* Profile info */}
                  <div className="flex items-center gap-3 pt-6 mt-6 border-t border-white/6">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-violet-500 flex items-center justify-center font-bold text-white text-sm shadow-md shadow-indigo-500/10 shrink-0">
                      {t.reviewerName.charAt(0)}
                    </div>
                    <div>
                      <h4 className="font-bold text-white text-sm" style={{ fontFamily: "var(--font-sora)" }}>
                        {t.reviewerName}
                      </h4>
                      <p className="text-slate-500 text-xs mt-0.5">
                        {t.reviewerCompany}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Mobile navigation controls */}
            <div className="flex md:hidden items-center justify-center gap-4 mt-6">
              <button
                onClick={() => {
                  const container = document.getElementById("testimonials-scroll-container");
                  if (container) container.scrollBy({ left: -320, behavior: "smooth" });
                }}
                className="p-3 rounded-xl border border-white/8 bg-[#0c0d1b]/95 text-slate-400 hover:text-white transition-colors cursor-pointer hover:border-white/20"
                aria-label="Sebelumnya"
              >
                <ChevronLeft className="h-4.5 w-4.5" />
              </button>
              <button
                onClick={() => {
                  const container = document.getElementById("testimonials-scroll-container");
                  if (container) container.scrollBy({ left: 320, behavior: "smooth" });
                }}
                className="p-3 rounded-xl border border-white/8 bg-[#0c0d1b]/95 text-slate-400 hover:text-white transition-colors cursor-pointer hover:border-white/20"
                aria-label="Berikutnya"
              >
                <ChevronRight className="h-4.5 w-4.5" />
              </button>
            </div>
          </div>


        </div>
      </section>

      {/* ═══════════════════════════════════════════
          CONTACT
      ══════════════════════════════════════════ */}
      <section id="contact" className="py-28 border-t border-white/[0.04] relative">
        <div className="max-w-6xl mx-auto px-5">

          <div className="text-center mb-16 space-y-4">
            <p className="section-label text-indigo-400">Hubungi Kami</p>
            <h2 className="text-4xl md:text-5xl font-bold text-white">
              Mulai Proyek <span className="text-gradient">Game Anda</span>
            </h2>
            <p className="text-slate-400 text-lg max-w-lg mx-auto font-light">
              Punya pertanyaan atau ingin order aset kustom? Isi formulir dan tim kami
              akan membalas dalam 1×24 jam kerja.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">

            {/* Info sidebar */}
            <div className="lg:col-span-2 space-y-4">
              {[
                {
                  icon: <Mail className="h-5 w-5" />,
                  title: "Email",
                  lines: ["satuggama@gmail.com"],
                  colorText: "text-indigo-400",
                  colorBg: "bg-indigo-500/10",
                  colorBorder: "border-indigo-500/20",
                  hoverBorder: "hover:border-indigo-500/35",
                  colorCard: "bg-indigo-500/5",
                },
                {
                  icon: <MapPin className="h-5 w-5" />,
                  title: "Lokasi Studio",
                  lines: ["Jalan Garuda No 45, Banyumanik", "Semarang, Jawa Tengah"],
                  colorText: "text-amber-400",
                  colorBg: "bg-amber-500/10",
                  colorBorder: "border-amber-500/20",
                  hoverBorder: "hover:border-amber-500/35",
                  colorCard: "bg-amber-500/5",
                },
                {
                  icon: <ExternalLink className="h-5 w-5" />,
                  title: "Repository",
                  lines: ["github.com/shevazanuar/SATUGAMA"],
                  colorText: "text-violet-400",
                  colorBg: "bg-violet-500/10",
                  colorBorder: "border-violet-500/20",
                  hoverBorder: "hover:border-violet-500/35",
                  colorCard: "bg-violet-500/5",
                  link: "https://github.com/shevazanuar/SATUGAMA",
                },
              ].map((c) => (
                <div
                  key={c.title}
                  className={`p-5 rounded-2xl border ${c.colorBorder} ${c.colorCard} flex gap-4 ${c.hoverBorder} transition-all duration-200`}
                >
                  <div className={`w-10 h-10 rounded-xl ${c.colorBg} border ${c.colorBorder} flex items-center justify-center ${c.colorText} shrink-0`}>
                    {c.icon}
                  </div>
                  <div>
                    <div className="font-semibold text-white text-sm mb-1.5">{c.title}</div>
                    {c.lines.map((l, i) =>
                      c.link ? (
                        <a
                          key={i}
                          href={c.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`block text-xs text-slate-400 hover:${c.colorText} transition-colors`}
                        >
                          {l}
                        </a>
                      ) : (
                        <p key={i} className="text-xs text-slate-400 leading-relaxed">{l}</p>
                      )
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-3 p-8 rounded-2xl border border-white/8 bg-[#0e1020]/60 backdrop-blur-sm">
              <form onSubmit={handleContactSubmit} className="space-y-5" noValidate>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <label htmlFor="contact-name" className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                      Nama Lengkap
                    </label>
                    <Input
                      id="contact-name"
                      type="text"
                      placeholder="Nama Anda"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="bg-white/5 border-white/10 hover:border-white/20 focus:border-indigo-500/50 text-white placeholder:text-slate-600 h-11 rounded-xl text-sm"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="contact-email" className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                      Email Aktif
                    </label>
                    <Input
                      id="contact-email"
                      type="email"
                      placeholder="nama@email.com"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="bg-white/5 border-white/10 hover:border-white/20 focus:border-indigo-500/50 text-white placeholder:text-slate-600 h-11 rounded-xl text-sm"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <label htmlFor="contact-asset" className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                      Jenis Aset
                    </label>
                    <Select value={assetStyle} onValueChange={(v) => setAssetStyle(v || "2d-pixel")}>
                      <SelectTrigger id="contact-asset" className="bg-white/5 border-white/10 hover:border-white/20 text-slate-300 h-11 rounded-xl text-sm">
                        <SelectValue placeholder="Pilih jenis aset" />
                      </SelectTrigger>
                      <SelectContent className="bg-[#0e1020] border-white/10 text-slate-300 rounded-xl">
                        <SelectItem value="2d-pixel">2D Pixel Art</SelectItem>
                        <SelectItem value="2d-vector">2D Vector Art</SelectItem>
                        <SelectItem value="3d-lowpoly">3D Low-Poly (Blender)</SelectItem>
                        <SelectItem value="3d-stylized">3D Stylized (Blender)</SelectItem>
                        <SelectItem value="ui-sound">UI Design &amp; Audio SFX</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="contact-budget" className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                      Budget Estimasi
                    </label>
                    <Select value={budget} onValueChange={(v) => setBudget(v || "50k-100k")}>
                      <SelectTrigger id="contact-budget" className="bg-white/5 border-white/10 hover:border-white/20 text-slate-300 h-11 rounded-xl text-sm">
                        <SelectValue placeholder="Pilih range budget" />
                      </SelectTrigger>
                      <SelectContent className="bg-[#0e1020] border-white/10 text-slate-300 rounded-xl">
                        <SelectItem value="50k-100k">Rp 50.000 – 100.000</SelectItem>
                        <SelectItem value="100k-200k">Rp 100.000 – 200.000</SelectItem>
                        <SelectItem value="200k-300k">Rp 200.000 – 300.000</SelectItem>
                        <SelectItem value="above-300k">&gt; Rp 300.000</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="contact-message" className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                    Deskripsi Kebutuhan
                  </label>
                  <Textarea
                    id="contact-message"
                    required
                    placeholder="Ceritakan detail kebutuhan aset Anda: tema game, jumlah aset, gaya visual, resolusi, engine yang digunakan, dan estimasi deadline..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="bg-white/5 border-white/10 hover:border-white/20 focus:border-indigo-500/50 text-white placeholder:text-slate-600 rounded-xl text-sm min-h-[130px] resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={submitStatus.type === "loading"}
                  className="w-full h-12 flex items-center justify-center gap-2.5 btn-primary text-white font-bold text-sm rounded-xl disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {submitStatus.type === "loading" ? (
                    <><Loader2 className="h-4 w-4 animate-spin" /> Mengirim Pesan...</>
                  ) : (
                    <><Send className="h-4 w-4" /> Kirim Request Penawaran</>
                  )}
                </button>

                {submitStatus.type && (
                  <div
                    role="alert"
                    className={`p-4 rounded-xl text-sm leading-relaxed border ${
                      submitStatus.type === "success"
                        ? "bg-emerald-500/8 border-emerald-500/25 text-emerald-300"
                        : submitStatus.type === "error"
                          ? "bg-rose-500/8 border-rose-500/25 text-rose-300"
                          : "bg-white/4 border-white/10 text-slate-400"
                    }`}
                  >
                    {submitStatus.text}
                  </div>
                )}
              </form>
            </div>

          </div>
        </div>
      </section>

      <Footer />

      {/* Back to top */}
      {showBackToTop && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed bottom-6 right-6 w-10 h-10 rounded-xl btn-primary text-white flex items-center justify-center shadow-xl z-40"
          aria-label="Kembali ke atas halaman"
        >
          <ChevronDown className="h-4 w-4 rotate-180" aria-hidden="true" />
        </button>
      )}

    </div>
  );
}
