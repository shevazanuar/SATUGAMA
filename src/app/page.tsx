"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { CharacterCustomizer } from "@/components/character-customizer";
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
  Sparkles,
  ShieldCheck,
  Send,
  Loader2,
  Mail,
  MapPin,
  Flame,
  Zap,
  Target,
  ArrowRight,
  Monitor,
  Menu,
  X,
  Gamepad2,
  Star,
  Check,
  ExternalLink,
  Palette,
  Box,
  Volume2,
  Layers,
  ChevronDown,
  Award,
  Users,
  Package,
  Clock,
} from "lucide-react";

/* ─────────────────────────────────────────────────────────────
   DATA
───────────────────────────────────────────────────────────── */

const PORTFOLIO_ITEMS = [
  {
    id: 1,
    category: "ui",
    title: "Last Signal — Glitch UI Pack",
    tagline: "Cyberpunk-ready interface kit",
    desc: "Koleksi UI kit futuristik dengan 80+ komponen: efek glitch animasi, ikon sci-fi retro, tombol neon, panel HUD, dan 24 efek suara sintetis. Dirancang khusus untuk game sci-fi & cyberpunk.",
    price: "Rp 49.000",
    badge: "UI & Audio",
    accent: "#00f0ff",
    tags: ["HUD Elements", "Sound FX", "Glitch Effects"],
    svg: (
      <svg width="100%" height="100%" viewBox="0 0 320 210" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="g1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#0d0420" />
            <stop offset="100%" stopColor="#1a0835" />
          </linearGradient>
        </defs>
        <rect width="320" height="210" fill="url(#g1)" />
        {/* Grid lines */}
        <g opacity="0.15" stroke="#00f0ff" strokeWidth="0.5">
          {[40, 80, 120, 160, 200, 240, 280].map(x => <line key={x} x1={x} y1="0" x2={x} y2="210" />)}
          {[42, 84, 126, 168].map(y => <line key={y} x1="0" y1={y} x2="320" y2={y} />)}
        </g>
        {/* Main title */}
        <text x="160" y="68" fill="#ff007a" fontSize="22" fontFamily="monospace" fontWeight="900" textAnchor="middle" letterSpacing="4">LAST SIGNAL</text>
        <text x="160" y="88" fill="#00f0ff" fontSize="9" fontFamily="monospace" textAnchor="middle" letterSpacing="6" opacity="0.8">GLITCH UI ASSET PACK</text>
        {/* Divider */}
        <line x1="40" y1="100" x2="280" y2="100" stroke="#bd00ff" strokeWidth="1.5" />
        <circle cx="40" cy="100" r="2.5" fill="#bd00ff" />
        <circle cx="280" cy="100" r="2.5" fill="#bd00ff" />
        {/* Tags */}
        {[
          { x: 52, label: "HUD" },
          { x: 108, label: "SFX" },
          { x: 164, label: "UI" },
          { x: 218, label: "GLI-TCH" },
        ].map(t => (
          <g key={t.label}>
            <rect x={t.x - 18} y="112" width={t.label.length * 7 + 8} height="18" rx="2" fill="rgba(0,240,255,0.07)" stroke="#00f0ff" strokeWidth="0.8" />
            <text x={t.x} y="124" fill="#00f0ff" fontSize="8" fontFamily="monospace" textAnchor="middle">{t.label}</text>
          </g>
        ))}
        {/* Preview elements */}
        <rect x="40" y="145" width="110" height="42" rx="3" fill="rgba(255,0,122,0.08)" stroke="#ff007a" strokeWidth="1" />
        <text x="95" y="162" fill="#ff007a" fontSize="8" fontFamily="monospace" textAnchor="middle" opacity="0.9">BUTTON PRIMARY</text>
        <text x="95" y="178" fill="#ff007a" fontSize="7" fontFamily="monospace" textAnchor="middle" opacity="0.5">[ ACTIVATE ]</text>
        <rect x="168" y="145" width="110" height="42" rx="3" fill="rgba(0,240,255,0.06)" stroke="#00f0ff" strokeWidth="1" />
        <text x="223" y="162" fill="#00f0ff" fontSize="8" fontFamily="monospace" textAnchor="middle" opacity="0.9">HUD PANEL</text>
        <text x="223" y="174" fill="#00f0ff" fontSize="7" fontFamily="monospace" textAnchor="middle" opacity="0.5">━━━━━━━━━━</text>
        <text x="223" y="184" fill="#00f0ff" fontSize="6" fontFamily="monospace" textAnchor="middle" opacity="0.4">HP ████████░░ 80%</text>
      </svg>
    )
  },
  {
    id: 2,
    category: "2d",
    title: "Dungeon Crawler Tileset",
    tagline: "16-bit pixel art dungeon collection",
    desc: "340+ tile sprite berkualitas tinggi bertema kastil gotik & dungeon. Termasuk layer dinding, lantai, langit-langit, pintu animasi, jebakan bergerak, dan sistem pencahayaan berbasis tile.",
    price: "Rp 29.000",
    badge: "Pixel Art",
    accent: "#ffd700",
    tags: ["340+ Sprites", "Animated", "Layer System"],
    svg: (
      <svg width="100%" height="100%" viewBox="0 0 320 210" xmlns="http://www.w3.org/2000/svg">
        <rect width="320" height="210" fill="#0d0d0d" />
        {/* Pixel grid */}
        <g stroke="#1a1a1a" strokeWidth="1">
          {[0, 16, 32, 48, 64, 80, 96, 112, 128, 144, 160, 176, 192, 208, 224, 240, 256, 272, 288, 304, 320].map(x =>
            <line key={x} x1={x} y1="0" x2={x} y2="210" />
          )}
          {[0, 16, 32, 48, 64, 80, 96, 112, 128, 144, 160, 176, 192, 208].map(y =>
            <line key={y} x1="0" y1={y} x2="320" y2={y} />
          )}
        </g>
        {/* Wall pattern */}
        <g fill="#2a2218" stroke="#3d3020" strokeWidth="1">
          {[0, 48, 96, 144, 192, 240, 288].map(x => <rect key={x} x={x} y="0" width="48" height="32" />)}
          {[24, 72, 120, 168, 216, 264].map(x => <rect key={x} x={x} y="32" width="48" height="32" />)}
          {[0, 48, 96, 144, 192, 240, 288].map(x => <rect key={x} x={x} y="64" width="48" height="32" />)}
        </g>
        {/* Highlighted tiles */}
        <rect x="96" y="64" width="48" height="32" fill="#3d3020" stroke="#ffd700" strokeWidth="1.5" />
        <rect x="144" y="32" width="48" height="32" fill="#3d3020" stroke="#ffd700" strokeWidth="1.5" />
        {/* Treasure chest */}
        <g transform="translate(132, 100)">
          <rect x="0" y="14" width="56" height="38" rx="2" fill="#6b3a1f" stroke="#ffd700" strokeWidth="2" />
          <rect x="0" y="6" width="56" height="14" rx="2" fill="#8b4513" stroke="#ffd700" strokeWidth="2" />
          <rect x="24" y="16" width="8" height="12" rx="1" fill="#ffd700" />
          <circle cx="28" cy="22" r="2" fill="#3d2000" />
          <rect x="4" y="30" width="8" height="8" rx="1" fill="#ffd700" opacity="0.3" />
          <rect x="44" y="30" width="8" height="8" rx="1" fill="#ffd700" opacity="0.3" />
        </g>
        {/* Torches */}
        <g fill="#ff6600">
          <rect x="48" y="78" width="6" height="8" rx="1" fill="#8b4513" />
          <ellipse cx="51" cy="75" rx="5" ry="7" fill="rgba(255,150,0,0.8)" />
          <ellipse cx="51" cy="73" rx="3" ry="4" fill="#ffff00" />
          <rect x="252" y="78" width="6" height="8" rx="1" fill="#8b4513" />
          <ellipse cx="255" cy="75" rx="5" ry="7" fill="rgba(255,150,0,0.8)" />
          <ellipse cx="255" cy="73" rx="3" ry="4" fill="#ffff00" />
        </g>
        {/* Floor */}
        <rect x="0" y="150" width="320" height="60" fill="#1a1400" />
        <g fill="#221c05" stroke="#332b08" strokeWidth="0.5">
          {[0, 64, 128, 192, 256].map(x => <rect key={x} x={x} y="150" width="64" height="30" />)}
          {[32, 96, 160, 224, 288].map(x => <rect key={x} x={x} y="180" width="64" height="30" />)}
        </g>
        {/* Label */}
        <rect x="4" y="4" width="90" height="16" rx="2" fill="rgba(255,215,0,0.15)" stroke="#ffd700" strokeWidth="0.8" />
        <text x="49" y="15" fill="#ffd700" fontSize="7" fontFamily="monospace" textAnchor="middle" fontWeight="bold">DUNGEON TILESET</text>
      </svg>
    )
  },
  {
    id: 3,
    category: "3d",
    title: "Sci-Fi Starfighter Pack",
    tagline: "Low-poly 3D spacecraft collection",
    desc: "12 model pesawat luar angkasa low-poly siap pakai dalam format FBX & OBJ. Dioptimalkan untuk mobile & PC dengan polygon count efisien, UV-unwrapped, dan tekstur PBR 2K termasuk.",
    price: "Rp 99.000",
    badge: "3D Models",
    accent: "#a855f7",
    tags: ["12 Models", "FBX & OBJ", "PBR Textures"],
    svg: (
      <svg width="100%" height="100%" viewBox="0 0 320 210" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="spaceGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#050818" />
            <stop offset="100%" stopColor="#0c1530" />
          </linearGradient>
        </defs>
        <rect width="320" height="210" fill="url(#spaceGrad)" />
        {/* Stars */}
        {[[15, 20], [45, 55], [80, 15], [110, 70], [140, 30], [175, 80], [210, 12], [250, 45], [285, 25], [300, 80], [30, 110], [65, 130], [105, 95], [145, 140], [185, 110], [220, 135], [260, 95], [295, 140]].map(([x, y], i) => (
          <circle key={i} cx={x} cy={y} r={Math.random() > 0.6 ? 1.5 : 0.8} fill="white" opacity={0.4 + Math.random() * 0.5} />
        ))}
        {/* Planet / moon */}
        <circle cx="270" cy="55" r="35" fill="#1a2545" stroke="#2a3a6a" strokeWidth="1" />
        <circle cx="270" cy="55" r="35" fill="none" stroke="#3a5090" strokeWidth="0.5" strokeDasharray="2,4" />
        <ellipse cx="265" cy="45" rx="12" ry="6" fill="#243060" opacity="0.6" />
        <ellipse cx="278" cy="62" rx="8" ry="4" fill="#243060" opacity="0.4" />
        {/* Main ship */}
        <g transform="translate(160, 105)">
          <polygon points="0,-55 -35,35 0,20 35,35" fill="#c4b5fd" opacity="0.9" stroke="#7c3aed" strokeWidth="1.5" />
          <polygon points="0,-55 0,20 8,-5" fill="#a78bfa" opacity="0.7" />
          <polygon points="-35,35 -55,45 -40,25" fill="#8b5cf6" stroke="#7c3aed" strokeWidth="1" />
          <polygon points="35,35 55,45 40,25" fill="#8b5cf6" stroke="#7c3aed" strokeWidth="1" />
          <ellipse cx="0" cy="-10" rx="6" ry="8" fill="#e9d5ff" opacity="0.9" />
          {/* Engine glow */}
          <ellipse cx="0" cy="32" rx="8" ry="12" fill="#7c3aed" opacity="0.6" />
          <ellipse cx="0" cy="38" rx="5" ry="8" fill="#a855f7" opacity="0.8" />
          <ellipse cx="0" cy="45" rx="3" ry="6" fill="#e9d5ff" opacity="0.9" />
        </g>
        {/* Side ships (smaller) */}
        <g transform="translate(70, 130) scale(0.5)">
          <polygon points="0,-45 -28,28 0,16 28,28" fill="#67e8f9" opacity="0.7" stroke="#06b6d4" strokeWidth="2" />
          <ellipse cx="0" cy="30" rx="6" ry="9" fill="#06b6d4" opacity="0.7" />
        </g>
        <g transform="translate(250, 125) scale(0.45)">
          <polygon points="0,-45 -28,28 0,16 28,28" fill="#67e8f9" opacity="0.7" stroke="#06b6d4" strokeWidth="2" />
          <ellipse cx="0" cy="30" rx="6" ry="9" fill="#06b6d4" opacity="0.7" />
        </g>
        {/* Label */}
        <rect x="4" y="4" width="88" height="16" rx="2" fill="rgba(168,85,247,0.15)" stroke="#a855f7" strokeWidth="0.8" />
        <text x="48" y="15" fill="#c4b5fd" fontSize="7" fontFamily="monospace" textAnchor="middle" fontWeight="bold">3D STARFIGHTER</text>
      </svg>
    )
  }
];

const TEAM_MEMBERS = [
  {
    name: "Biges",
    role: "CEO & Business Strategist",
    bio: "Memimpin strategi bisnis dan pengembangan SatuGama. Bertanggung jawab atas perencanaan produk, kemitraan strategis, dan menyusun pitch deck yang menarik investor.",
    avatar: "B",
    photo: "/team-biges.png",
    color: "from-amber-500 to-orange-500",
    borderColor: "border-amber-500/30",
    glowColor: "shadow-amber-500/10",
    skills: [{ name: "Business Strategy", pct: 94 }, { name: "Leadership", pct: 91 }],
  },
  {
    name: "Dai",
    role: "Lead Software Architect",
    bio: "Arsitek utama platform web SatuGama. Merancang sistem backend, mengintegrasikan character customizer, dan memastikan performa aplikasi yang optimal di semua perangkat.",
    avatar: "D",
    photo: "/team-dai.png",
    color: "from-cyan-500 to-blue-500",
    borderColor: "border-cyan-500/30",
    glowColor: "shadow-cyan-500/10",
    skills: [{ name: "System Architecture", pct: 97 }, { name: "Frontend Dev", pct: 93 }],
  },
  {
    name: "Ravie",
    role: "Lead 3D Artist (Blender)",
    bio: "Seniman 3D utama yang menghasilkan model dan aset visual berkualitas tinggi menggunakan Blender. Ahli dalam low-poly modeling, rigging, dan texturing untuk kebutuhan game.",
    avatar: "R",
    photo: "/team-ravie.png",
    color: "from-purple-500 to-pink-500",
    borderColor: "border-purple-500/30",
    glowColor: "shadow-purple-500/10",
    skills: [{ name: "Blender 3D", pct: 96 }, { name: "Visual Design", pct: 90 }],
  },
  {
    name: "Sheva",
    role: "UI/UX & Frontend Engineer",
    bio: "Mendesain dan membangun antarmuka landing page SatuGama yang premium. Berfokus pada pengalaman pengguna yang intuitif, aksesibilitas, dan estetika visual yang konsisten.",
    avatar: "S",
    photo: "/team-sheva.png",
    color: "from-emerald-500 to-teal-500",
    borderColor: "border-emerald-500/30",
    glowColor: "shadow-emerald-500/10",
    skills: [{ name: "UI/UX Design", pct: 93 }, { name: "React / Next.js", pct: 95 }],
  },
];

const NAV_LINKS = [
  { href: "#home", label: "Beranda" },
  { href: "#about", label: "Tentang" },
  { href: "#customizer", label: "Customizer" },
  { href: "#catalog", label: "Katalog" },
  { href: "#team", label: "Tim" },
  { href: "#pricing", label: "Harga" },
  { href: "#contact", label: "Kontak" },
];

const CORE_VALUES = [
  {
    letter: "C",
    title: "Creative",
    desc: "Setiap aset dirancang dengan pendekatan artistik tinggi — bukan sekadar file, melainkan karya visual yang memiliki jiwa dan identitas unik.",
    color: "text-cyan-400",
    bg: "bg-cyan-500/8",
    border: "border-cyan-500/20",
    hoverBorder: "hover:border-cyan-500/50",
    accent: "bg-cyan-500",
  },
  {
    letter: "O",
    title: "Optimized",
    desc: "Semua aset kami dioptimalkan untuk performa — polygon count efisien, ukuran file terkompresi, dan kompatibel dengan engine populer seperti Unity & Godot.",
    color: "text-violet-400",
    bg: "bg-violet-500/8",
    border: "border-violet-500/20",
    hoverBorder: "hover:border-violet-500/50",
    accent: "bg-violet-500",
  },
  {
    letter: "R",
    title: "Reliable",
    desc: "Konsistensi kualitas di setiap produk. Kami menjamin setiap aset melewati quality control ketat sebelum dirilis, lengkap dengan dokumentasi penggunaan.",
    color: "text-pink-400",
    bg: "bg-pink-500/8",
    border: "border-pink-500/20",
    hoverBorder: "hover:border-pink-500/50",
    accent: "bg-pink-500",
  },
  {
    letter: "E",
    title: "Expert",
    desc: "Tim kami terdiri dari creator yang berdedikasi di bidangnya. Dari pixel art hingga 3D sculpting, setiap karya dihasilkan oleh tangan yang terlatih.",
    color: "text-emerald-400",
    bg: "bg-emerald-500/8",
    border: "border-emerald-500/20",
    hoverBorder: "hover:border-emerald-500/50",
    accent: "bg-emerald-500",
  },
];

/* ─────────────────────────────────────────────────────────────
   COMPONENT
───────────────────────────────────────────────────────────── */

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState("all");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [assetStyle, setAssetStyle] = useState("2d-pixel");
  const [budget, setBudget] = useState("50k-100k");
  const [message, setMessage] = useState("");
  const [submitStatus, setSubmitStatus] = useState<{
    type: "success" | "error" | "loading" | null;
    text: string;
  }>({ type: null, text: "" });

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

  const filteredItems = PORTFOLIO_ITEMS.filter(
    (i) => activeFilter === "all" || i.category === activeFilter
  );

  return (
    <div className="bg-[#0f1117] text-slate-100 min-h-screen antialiased overflow-x-hidden">

      {/* ── Ambient background orbs ── */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
        <div className="orb-cyan w-[700px] h-[700px] -top-60 -left-40 opacity-60" />
        <div className="orb-violet w-[600px] h-[600px] top-[40%] -right-40 opacity-50" />
        <div className="orb-cyan w-[500px] h-[500px] bottom-0 left-[30%] opacity-30" />
      </div>

      {/* ═══════════════════════════════════════════
          NAVBAR
      ══════════════════════════════════════════ */}
      <header className="sticky top-0 z-50 border-b border-white/[0.06] bg-[#0f1117]/80 backdrop-blur-xl">
        <div className="max-w-6xl mx-auto px-5 h-16 flex items-center justify-between gap-6">

          {/* Logo */}
          <a href="#home" className="flex items-center gap-3 group shrink-0">
            <div className="relative h-9 w-9 overflow-hidden rounded-xl bg-gradient-to-br from-cyan-500/20 to-violet-500/20 border border-white/10 p-0.5 group-hover:border-cyan-500/40 transition-all duration-300">
              <Image src="/logo.png" alt="SatuGama" width={32} height={32} className="object-cover rounded-lg" />
            </div>
            <div className="flex flex-col leading-none">
              <span className="font-semibold text-[15px] tracking-tight text-white" style={{ fontFamily: "var(--font-sora)" }}>
                Satu<span className="text-cyan-400">Gama</span>
              </span>
              <span className="text-[9px] text-slate-500 tracking-widest uppercase">Game Studio</span>
            </div>
          </a>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-1">
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

          {/* CTA */}
          <div className="hidden lg:flex items-center gap-3">
            <a
              href="#contact"
              className="text-sm text-slate-400 hover:text-white transition-colors font-medium"
            >
              Hubungi Kami
            </a>
            <a
              href="#customizer"
              className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-cyan-500 to-violet-600 hover:from-cyan-400 hover:to-violet-500 text-white font-semibold text-sm rounded-xl transition-all duration-200 btn-glow-cyan"
            >
              <Sparkles className="h-3.5 w-3.5" />
              Coba Customizer
            </a>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 transition-colors"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {/* Mobile drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-white/[0.06] bg-[#0f1117]/95 backdrop-blur-xl">
            <div className="max-w-6xl mx-auto px-5 py-4 flex flex-col gap-1">
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
                href="#customizer"
                onClick={() => setMobileMenuOpen(false)}
                className="mt-2 flex items-center justify-center gap-2 py-3 bg-gradient-to-r from-cyan-500 to-violet-600 text-white font-semibold text-sm rounded-xl"
              >
                <Sparkles className="h-4 w-4" /> Coba Customizer
              </a>
            </div>
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
              {/* Badge */}
              <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full border border-cyan-500/25 bg-cyan-500/8 text-cyan-400 text-xs font-semibold tracking-widest uppercase">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 dot-pulse" />
                Technopreneurship · Kelompok 1 · Polines 2025
              </div>

              {/* Headline */}
              <div className="space-y-4">
                <h1 className="text-5xl md:text-6xl lg:text-[4.25rem] font-bold leading-[1.05] tracking-tight">
                  <span className="text-white">Aset Game</span>
                  <br />
                  <span className="text-gradient-cyan">Premium & Siap</span>
                  <br />
                  <span className="text-white">Pakai</span>
                </h1>
                <p className="text-lg text-slate-400 leading-relaxed max-w-lg font-light">
                  SatuGama adalah studio kreatif spesialis game asset di Indonesia. Kami menghasilkan aset 2D pixel art, model 3D Blender, UI kit, dan audio SFX profesional untuk mempercepat pengembangan game indie Anda.
                </p>
              </div>

              {/* CTA buttons */}
              <div className="flex flex-wrap gap-4">
                <a
                  href="#customizer"
                  className="inline-flex items-center gap-2.5 px-6 py-3.5 bg-gradient-to-r from-cyan-500 to-violet-600 hover:from-cyan-400 hover:to-violet-500 text-white font-semibold rounded-2xl transition-all duration-200 btn-glow-cyan text-sm"
                >
                  Coba Customizer Gratis
                  <ArrowRight className="h-4 w-4" />
                </a>
                <a
                  href="#catalog"
                  className="inline-flex items-center gap-2.5 px-6 py-3.5 border border-white/12 bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white font-medium rounded-2xl transition-all duration-200 text-sm"
                >
                  Lihat Katalog Aset
                </a>
              </div>

              {/* Trust indicators */}
              <div className="flex flex-wrap items-center gap-6 pt-2">
                {[
                  { icon: <Package className="h-4 w-4 text-cyan-400" />, label: "26+ Paket Aset" },
                  { icon: <Users className="h-4 w-4 text-violet-400" />, label: "4 Expert Creators" },
                  { icon: <Star className="h-4 w-4 text-amber-400 fill-amber-400" />, label: "100% Original" },
                ].map((item) => (
                  <div key={item.label} className="flex items-center gap-2 text-sm text-slate-400">
                    {item.icon}
                    <span className="font-medium">{item.label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right — Hero visual */}
            <div className="relative hidden lg:flex items-center justify-center">
              {/* Glow behind */}
              <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/10 via-transparent to-violet-500/10 rounded-3xl blur-3xl" />

              {/* Main card */}
              <div className="relative w-full max-w-[480px] aspect-square rounded-3xl overflow-hidden border border-white/8 bg-[#1a1d27]/80 backdrop-blur-sm shadow-2xl">
                {/* Dot pattern inside */}
                <div className="absolute inset-0 bg-dot-pattern opacity-40" />

                {/* Synthwave scene */}
                <svg viewBox="0 0 480 480" className="w-full h-full relative z-10" xmlns="http://www.w3.org/2000/svg">
                  <defs>
                    <linearGradient id="heroSky" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#07020f" />
                      <stop offset="50%" stopColor="#120633" />
                      <stop offset="100%" stopColor="#1a0845" />
                    </linearGradient>
                    <radialGradient id="sunGlow" cx="50%" cy="45%">
                      <stop offset="0%" stopColor="#ff007a" stopOpacity="0.5" />
                      <stop offset="100%" stopColor="#ff007a" stopOpacity="0" />
                    </radialGradient>
                  </defs>
                  <rect width="480" height="480" fill="url(#heroSky)" />
                  {/* Sun glow */}
                  <circle cx="240" cy="200" r="120" fill="url(#sunGlow)" />
                  <circle cx="240" cy="200" r="72" fill="#1b0c36" />
                  <circle cx="240" cy="200" r="72" fill="none" stroke="#ff007a" strokeWidth="3" strokeDasharray="12 6" />
                  <circle cx="240" cy="200" r="60" fill="none" stroke="#ff007a" strokeWidth="1.5" opacity="0.4" />
                  <circle cx="240" cy="200" r="48" fill="none" stroke="#ff007a" strokeWidth="1" opacity="0.25" />
                  {/* Stars */}
                  {[[40, 30], [80, 20], [100, 60], [150, 15], [200, 35], [300, 18], [350, 45], [420, 28], [450, 70], [30, 80], [380, 12]].map(([x, y], i) =>
                    <circle key={i} cx={x} cy={y} r="1.2" fill="white" opacity={0.5 + i * 0.04} />
                  )}
                  {/* Perspective grid */}
                  <path d="M 240,270 L 0,480 M 240,270 L 80,480 M 240,270 L 160,480 M 240,270 L 320,480 M 240,270 L 400,480 M 240,270 L 480,480" stroke="#00f0ff" strokeWidth="1.5" opacity="0.2" />
                  <path d="M 0,340 H 480 M 0,380 H 480 M 0,420 H 480 M 0,455 H 480" stroke="#00f0ff" strokeWidth="1" opacity="0.15" />
                  {/* City silhouette */}
                  <path d="M 0,275 V 230 H 50 V 255 H 90 V 210 H 140 V 248 H 180 V 195 H 250 V 255 H 300 V 218 H 360 V 240 H 400 V 205 H 480 V 275 Z" fill="#0a0318" />
                  {/* City lights */}
                  {[[105, 218], [125, 225], [198, 205], [220, 215], [310, 228], [375, 215], [410, 214]].map(([x, y], i) =>
                    <rect key={i} x={x} y={y} width={i % 2 === 0 ? 5 : 4} height={i % 2 === 0 ? 8 : 6} fill={i % 3 === 0 ? "#00f0ff" : i % 3 === 1 ? "#ff007a" : "#ffd700"} opacity="0.7" />
                  )}
                  {/* Foreground game object */}
                  <g transform="translate(192, 300)">
                    <rect x="0" y="0" width="96" height="100" rx="12" fill="rgba(8,5,18,0.92)" stroke="#00f0ff" strokeWidth="2" />
                    <line x1="12" y1="25" x2="84" y2="25" stroke="#ff007a" strokeWidth="1.5" opacity="0.9" />
                    <text x="48" y="18" fontFamily="monospace" fontSize="9" fill="#00f0ff" textAnchor="middle" opacity="0.7">SATUGAMA.EXE</text>
                    <text x="48" y="62" fontFamily="monospace" fontSize="36" textAnchor="middle">🎮</text>
                    <line x1="12" y1="80" x2="84" y2="80" stroke="#00f0ff" strokeWidth="1.5" opacity="0.9" />
                    <text x="48" y="94" fontFamily="monospace" fontSize="8" fill="#bd00ff" textAnchor="middle" opacity="0.7">LEVEL UP ASSETS</text>
                  </g>
                  {/* Corner decorations */}
                  <g stroke="#00f0ff" strokeWidth="2" opacity="0.5">
                    <path d="M 16,16 L 44,16 M 16,16 L 16,44" />
                    <path d="M 464,16 L 436,16 M 464,16 L 464,44" />
                    <path d="M 16,464 L 44,464 M 16,464 L 16,436" />
                    <path d="M 464,464 L 436,464 M 464,464 L 464,436" />
                  </g>
                </svg>

                {/* Floating stat badges */}
                <div className="absolute top-5 right-5 glass-card rounded-xl px-3 py-2 text-center border-cyan-500/20">
                  <div className="text-xl font-bold text-cyan-400" style={{ fontFamily: "var(--font-sora)" }}>26+</div>
                  <div className="text-[10px] text-slate-500 uppercase tracking-wider">Paket Aset</div>
                </div>
                <div className="absolute bottom-5 left-5 glass-card rounded-xl px-3 py-2 text-center border-violet-500/20">
                  <div className="text-xl font-bold text-violet-400" style={{ fontFamily: "var(--font-sora)" }}>100%</div>
                  <div className="text-[10px] text-slate-500 uppercase tracking-wider">Original</div>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Scroll hint */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-slate-600 animate-bounce">
          <ChevronDown className="h-5 w-5" />
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          ABOUT — Jenis Bisnis & CORE Values
      ══════════════════════════════════════════ */}
      <section id="about" className="py-28 relative">
        <div className="max-w-6xl mx-auto px-5">

          {/* Section intro */}
          <div className="text-center mb-20 space-y-4">
            <div className="inline-flex items-center gap-2 section-tag border-violet-500/30 bg-violet-500/8 text-violet-400">
              <Layers className="h-3.5 w-3.5" />
              Tentang SatuGama
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight">
              Studio Game Asset <span className="text-gradient-cyan">Terpercaya</span>
            </h2>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto leading-relaxed font-light">
              Didirikan oleh mahasiswa D3 Teknik Informatika Politeknik Negeri Semarang, SatuGama hadir sebagai solusi nyata bagi game developer yang membutuhkan aset visual berkualitas dengan harga terjangkau.
            </p>
          </div>

          {/* C-O-R-E values */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {CORE_VALUES.map((val) => (
              <div
                key={val.letter}
                className={`relative p-6 rounded-2xl border ${val.border} ${val.bg} ${val.hoverBorder} card-hover group overflow-hidden`}
              >
                {/* Letter background */}
                <div className={`absolute -right-3 -top-3 text-8xl font-bold ${val.color} opacity-[0.06] select-none leading-none`}
                  style={{ fontFamily: "var(--font-sora)" }}>
                  {val.letter}
                </div>
                {/* Content */}
                <div className={`w-10 h-10 rounded-xl ${val.bg} border ${val.border} flex items-center justify-center mb-4`}>
                  <span className={`text-lg font-black ${val.color}`} style={{ fontFamily: "var(--font-sora)" }}>{val.letter}</span>
                </div>
                <h3 className={`text-base font-semibold text-white mb-2 group-hover:${val.color} transition-colors`}
                  style={{ fontFamily: "var(--font-sora)" }}>
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
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

            {/* Left */}
            <div className="space-y-8">
              <div>
                <div className="inline-flex items-center gap-2 section-tag border-pink-500/30 bg-pink-500/8 text-pink-400 mb-5">
                  <Target className="h-3.5 w-3.5" />
                  Visi & Misi
                </div>
                <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight">
                  Membangun Masa Depan<br />
                  <span className="text-gradient-cyan">Game Asset Indonesia</span>
                </h2>
              </div>

              {/* Visi card */}
              <div className="relative p-7 rounded-2xl bg-gradient-to-br from-violet-500/10 to-transparent border border-violet-500/20 overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-violet-500/8 rounded-full blur-3xl" />
                <div className="flex items-start gap-4 relative">
                  <div className="w-10 h-10 rounded-xl bg-violet-500/15 border border-violet-500/30 flex items-center justify-center shrink-0">
                    <Target className="h-5 w-5 text-violet-400" />
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-violet-400 tracking-widest uppercase mb-2">Visi Kami</div>
                    <p className="text-white font-medium leading-relaxed">
                      Menjadi studio game asset kreatif paling terpercaya di Indonesia, yang memungkinkan ribuan developer indie mewujudkan visi game mereka dengan aset visual berkualitas dunia.
                    </p>
                  </div>
                </div>
              </div>

              <p className="text-slate-400 leading-relaxed">
                Kami percaya bahwa keterbatasan aset tidak seharusnya menjadi hambatan kreativitas. Dengan harga yang demokratis dan kualitas yang tidak berkompromi, SatuGama hadir untuk semua.
              </p>
            </div>

            {/* Right — Misi list */}
            <div className="space-y-4">
              {[
                { num: "01", icon: <Palette className="h-5 w-5" />, title: "Kreativitas Tanpa Batas", desc: "Menyediakan aset 2D dan 3D yang kreatif, ekspresif, dan mampu membawa visi artistik setiap game developer ke kehidupan nyata.", color: "cyan" },
                { num: "02", icon: <Award className="h-5 w-5" />, title: "Standar Kualitas Tinggi", desc: "Setiap produk melewati proses quality control ketat. Kami tidak merilis sesuatu yang tidak kami banggakan sendiri.", color: "violet" },
                { num: "03", icon: <Users className="h-5 w-5" />, title: "Kolaborasi Tim yang Kuat", desc: "Membangun budaya kerja yang solid, di mana setiap anggota tim dapat berkembang dan menghasilkan karya terbaik mereka.", color: "pink" },
                { num: "04", icon: <Box className="h-5 w-5" />, title: "Ekosistem Digital Berkelanjutan", desc: "Membangun brand SatuGama sebagai identitas digital yang kuat dan dikenal di kalangan komunitas game developer Asia Tenggara.", color: "emerald" },
              ].map((misi) => (
                <div
                  key={misi.num}
                  className={`flex gap-5 p-5 rounded-xl border border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.04] hover:border-${misi.color}-500/30 transition-all duration-200 group card-hover`}
                >
                  <div className={`w-10 h-10 rounded-xl bg-${misi.color}-500/10 border border-${misi.color}-500/20 flex items-center justify-center shrink-0 text-${misi.color}-400`}>
                    {misi.icon}
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1.5">
                      <span className={`text-[10px] font-bold text-${misi.color}-400 font-mono`}>{misi.num}</span>
                      <h5 className="font-semibold text-white text-sm">{misi.title}</h5>
                    </div>
                    <p className="text-slate-500 text-xs leading-relaxed">{misi.desc}</p>
                  </div>
                </div>
              ))}
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
            <div className="inline-flex items-center gap-2 section-tag border-cyan-500/30 bg-cyan-500/8 text-cyan-400">
              <Sparkles className="h-3.5 w-3.5" />
              Demo Editor
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-white">
              Buat Karakter Anda <span className="text-gradient-cyan">Sendiri</span>
            </h2>
            <p className="text-slate-400 text-lg max-w-xl mx-auto leading-relaxed font-light">
              Rasakan langsung kualitas aset kami. Kustomisasi sprite karakter RPG retro secara real-time dan unduh hasilnya dalam format SVG secara gratis.
            </p>
          </div>

          <div className="rounded-3xl border border-white/8 bg-[#1a1d27]/60 backdrop-blur-sm p-6 md:p-10 shadow-2xl">
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
            <div className="inline-flex items-center gap-2 section-tag border-violet-500/30 bg-violet-500/8 text-violet-400">
              <Package className="h-3.5 w-3.5" />
              Katalog Produk
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-white">
              Portofolio & Showcase <span className="text-gradient-cyan">Karya</span>
            </h2>
            <p className="text-slate-400 text-lg max-w-xl mx-auto font-light">
              Koleksi aset pack pilihan yang kami kerjakan dengan penuh dedikasi. Setiap produk dirancang untuk langsung dapat digunakan dalam game Anda.
            </p>
          </div>

          {/* Filter tabs */}
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            {[
              { key: "all", label: "Semua Produk", icon: <Package className="h-3.5 w-3.5" /> },
              { key: "2d", label: "2D & Pixel Art", icon: <Palette className="h-3.5 w-3.5" /> },
              { key: "3d", label: "3D Models", icon: <Box className="h-3.5 w-3.5" /> },
              { key: "ui", label: "UI & Audio", icon: <Volume2 className="h-3.5 w-3.5" /> },
            ].map((f) => (
              <button
                key={f.key}
                onClick={() => setActiveFilter(f.key)}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${activeFilter === f.key
                  ? "bg-gradient-to-r from-cyan-500 to-violet-600 text-white shadow-lg shadow-cyan-500/20"
                  : "border border-white/8 bg-white/4 text-slate-400 hover:text-white hover:border-white/15 hover:bg-white/8"
                  }`}
              >
                {f.icon} {f.label}
              </button>
            ))}
          </div>

          {/* Products grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {filteredItems.map((item) => (
              <div
                key={item.id}
                className="group rounded-2xl overflow-hidden border border-white/8 bg-[#1a1d27]/80 card-hover flex flex-col"
              >
                {/* Thumbnail */}
                <div className="relative aspect-[3/2] overflow-hidden bg-black">
                  <div className="w-full h-full transform group-hover:scale-105 transition-transform duration-700 ease-out">
                    {item.svg}
                  </div>
                  {/* Overlay on hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  {/* Badge */}
                  <div
                    className="absolute top-4 left-4 px-3 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase border"
                    style={{ color: item.accent, borderColor: item.accent + "55", background: item.accent + "18" }}
                  >
                    {item.badge}
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 flex flex-col flex-1 gap-4">
                  <div>
                    <p className="text-xs text-slate-500 mb-1 font-medium">{item.tagline}</p>
                    <h3 className="font-semibold text-white text-base group-hover:text-cyan-400 transition-colors leading-snug"
                      style={{ fontFamily: "var(--font-sora)" }}>
                      {item.title}
                    </h3>
                  </div>

                  <p className="text-slate-500 text-sm leading-relaxed flex-1">{item.desc}</p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5">
                    {item.tags.map((t) => (
                      <span key={t} className="px-2.5 py-1 rounded-md text-[10px] font-medium bg-white/5 border border-white/8 text-slate-400">
                        {t}
                      </span>
                    ))}
                  </div>

                  {/* Price + CTA */}
                  <div className="flex items-center justify-between pt-3 border-t border-white/6">
                    <div>
                      <div className="text-[10px] text-slate-600 mb-0.5">Mulai dari</div>
                      <div className="text-xl font-bold text-white" style={{ fontFamily: "var(--font-sora)" }}>{item.price}</div>
                    </div>
                    <a
                      href="#contact"
                      className="flex items-center gap-2 px-4 py-2 rounded-xl border border-white/10 bg-white/5 hover:bg-cyan-500 hover:border-cyan-500 hover:text-white text-slate-400 text-xs font-semibold transition-all duration-200"
                    >
                      Pesan Sekarang
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ═══════════════════════════════════════════
          TEAM
      ══════════════════════════════════════════ */}
      <section id="team" className="py-28 border-t border-white/[0.04] relative">
        <div className="max-w-6xl mx-auto px-5">

          <div className="text-center mb-16 space-y-4">
            <div className="inline-flex items-center gap-2 section-tag border-pink-500/30 bg-pink-500/8 text-pink-400">
              <Users className="h-3.5 w-3.5" />
              Tim Kami
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-white">
              Kreator di Balik <span className="text-gradient-cyan">SatuGama</span>
            </h2>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto font-light leading-relaxed">
              Empat mahasiswa berdedikasi dari Prodi D3 Teknik Informatika Politeknik Negeri Semarang, bersatu dalam satu misi: membuat game development lebih mudah dan terjangkau.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {TEAM_MEMBERS.map((member) => (
              <div
                key={member.name}
                className={`group relative p-6 rounded-2xl border ${member.borderColor} bg-[#1a1d27]/60 card-hover overflow-hidden flex flex-col gap-5`}
              >
                {/* Gradient glow on hover */}
                <div className={`absolute inset-0 bg-gradient-to-b ${member.color} opacity-0 group-hover:opacity-[0.04] transition-opacity duration-500 rounded-2xl`} />

                {/* Avatar + info */}
                <div className="flex items-center gap-4 relative">
                  <div className={`relative h-14 w-14 rounded-2xl overflow-hidden bg-gradient-to-br ${member.color} shadow-lg ring-2 ring-white/10 group-hover:ring-white/25 transition-all`}>
                    <Image src={member.photo} alt={member.name} fill className="object-cover" />
                  </div>
                  <div>
                    <div className="font-semibold text-white text-base group-hover:text-cyan-300 transition-colors"
                      style={{ fontFamily: "var(--font-sora)" }}>
                      {member.name}
                    </div>
                    <div className="text-xs text-slate-500">{member.role.split(" ")[0]}</div>
                  </div>
                </div>

                {/* Role */}
                <div className={`inline-flex w-fit px-3 py-1.5 rounded-lg border ${member.borderColor} bg-white/4 text-xs font-medium text-slate-300`}>
                  {member.role}
                </div>

                <p className="text-slate-500 text-xs leading-relaxed flex-1">{member.bio}</p>

                {/* Skills */}
                <div className="space-y-3 pt-2 border-t border-white/6">
                  <div className="text-[9px] font-semibold text-slate-600 uppercase tracking-widest">Keahlian Utama</div>
                  {member.skills.map((skill) => (
                    <div key={skill.name}>
                      <div className="flex justify-between text-[11px] mb-1.5">
                        <span className="text-slate-400 font-medium">{skill.name}</span>
                        <span className="text-slate-500 font-mono">{skill.pct}%</span>
                      </div>
                      <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                        <div
                          className={`h-full bg-gradient-to-r ${member.color} rounded-full progress-fill`}
                          style={{ width: `${skill.pct}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ═══════════════════════════════════════════
          PRICING
      ══════════════════════════════════════════ */}
      <section id="pricing" className="py-28 border-t border-white/[0.04] relative">
        <div className="max-w-6xl mx-auto px-5">

          <div className="text-center mb-16 space-y-4">
            <div className="inline-flex items-center gap-2 section-tag border-emerald-500/30 bg-emerald-500/8 text-emerald-400">
              <Zap className="h-3.5 w-3.5" />
              Harga & Lisensi
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-white">
              Pilih Paket yang <span className="text-gradient-cyan">Tepat untuk Anda</span>
            </h2>
            <p className="text-slate-400 text-lg max-w-xl mx-auto font-light">
              Harga transparan, tanpa biaya tersembunyi. Semua paket termasuk lisensi komersial untuk game Anda.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">

            {/* Indie Pack */}
            <div className="relative p-8 rounded-2xl border border-white/8 bg-[#1a1d27]/60 flex flex-col gap-6 card-hover">
              <div>
                <div className="text-xs font-semibold text-slate-500 uppercase tracking-widest mb-2">Indie Pack</div>
                <h3 className="text-2xl font-bold text-white mb-1" style={{ fontFamily: "var(--font-sora)" }}>Rp 29.000</h3>
                <p className="text-slate-500 text-sm">/ paket aset • Untuk solo developer</p>
              </div>
              <ul className="space-y-3 flex-1">
                {[
                  "Akses 1 paket aset pilihan",
                  "Format lengkap (PNG, SVG, OBJ)",
                  "Lisensi komersial (1 game)",
                  "Update gratis selamanya",
                ].map((f) => (
                  <li key={f} className="flex items-start gap-3 text-sm">
                    <Check className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span className="text-slate-400">{f}</span>
                  </li>
                ))}
              </ul>
              <a href="#contact" className="flex items-center justify-center gap-2 py-3 rounded-xl border border-white/12 bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white font-semibold text-sm transition-all duration-200">
                Pilih Paket Ini
              </a>
            </div>

            {/* Starter Pack — Featured */}
            <div className="relative p-8 rounded-2xl border border-cyan-500/30 bg-gradient-to-b from-cyan-500/8 to-violet-500/5 flex flex-col gap-6 shadow-2xl shadow-cyan-500/10 scale-[1.02]">
              {/* Popular badge */}
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full bg-gradient-to-r from-cyan-500 to-violet-600 text-white text-[10px] font-bold tracking-widest uppercase shadow-lg shadow-cyan-500/30">
                ⭐ Paling Populer
              </div>
              <div>
                <div className="text-xs font-semibold text-cyan-400 uppercase tracking-widest mb-2">Starter Pack</div>
                <h3 className="text-2xl font-bold text-white mb-1" style={{ fontFamily: "var(--font-sora)" }}>Rp 49.000</h3>
                <p className="text-slate-400 text-sm">/ paket aset • Untuk tim kecil</p>
              </div>
              <ul className="space-y-3 flex-1">
                {[
                  "Akses 3 paket aset pilihan",
                  "Kustomisasi warna & gaya via editor",
                  "Lisensi komersial (hingga 3 game)",
                  "Format lengkap + FBX (Low-Poly)",
                  "Update gratis selama 1 tahun",
                ].map((f) => (
                  <li key={f} className="flex items-start gap-3 text-sm">
                    <Check className="h-4 w-4 text-cyan-400 shrink-0 mt-0.5" />
                    <span className="text-slate-300">{f}</span>
                  </li>
                ))}
              </ul>
              <a href="#contact" className="flex items-center justify-center gap-2 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-violet-600 hover:from-cyan-400 hover:to-violet-500 text-white font-bold text-sm transition-all duration-200 btn-glow-cyan">
                Mulai Sekarang
              </a>
            </div>

            {/* Custom Pack */}
            <div className="relative p-8 rounded-2xl border border-white/8 bg-[#1a1d27]/60 flex flex-col gap-6 card-hover">
              <div>
                <div className="text-xs font-semibold text-slate-500 uppercase tracking-widest mb-2">Custom Pack</div>
                <h3 className="text-2xl font-bold text-white mb-1" style={{ fontFamily: "var(--font-sora)" }}>Mulai 99k</h3>
                <p className="text-slate-500 text-sm">/ request • Aset eksklusif kustom</p>
              </div>
              <ul className="space-y-3 flex-1">
                {[
                  "100% aset eksklusif (tidak dijual ulang)",
                  "Pengerjaan di Blender / Pixel Art",
                  "Hingga 3× revisi gratis",
                  "Hak cipta penuh milik Anda",
                ].map((f) => (
                  <li key={f} className="flex items-start gap-3 text-sm">
                    <Check className="h-4 w-4 text-violet-400 shrink-0 mt-0.5" />
                    <span className="text-slate-400">{f}</span>
                  </li>
                ))}
              </ul>
              <a href="#contact" className="flex items-center justify-center gap-2 py-3 rounded-xl border border-violet-500/30 bg-violet-500/8 hover:bg-violet-500/15 text-violet-300 hover:text-white font-semibold text-sm transition-all duration-200">
                Diskusi Kebutuhan
              </a>
            </div>

          </div>

          {/* Guarantee strip */}
          <div className="mt-12 flex flex-wrap justify-center gap-8 text-sm text-slate-500">
            {[
              { icon: <ShieldCheck className="h-4 w-4 text-emerald-400" />, text: "Lisensi komersial inklusif" },
              { icon: <Clock className="h-4 w-4 text-cyan-400" />, text: "Respon dalam 24 jam" },
              { icon: <Star className="h-4 w-4 text-amber-400 fill-amber-400" />, text: "Kualitas dijamin" },
            ].map((g) => (
              <div key={g.text} className="flex items-center gap-2">
                {g.icon} <span>{g.text}</span>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ═══════════════════════════════════════════
          CONTACT
      ══════════════════════════════════════════ */}
      <section id="contact" className="py-28 border-t border-white/[0.04] relative">
        <div className="max-w-6xl mx-auto px-5">

          <div className="text-center mb-16 space-y-4">
            <div className="inline-flex items-center gap-2 section-tag border-cyan-500/30 bg-cyan-500/8 text-cyan-400">
              <Mail className="h-3.5 w-3.5" />
              Hubungi Kami
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-white">
              Mulai Proyek <span className="text-gradient-cyan">Game Anda</span>
            </h2>
            <p className="text-slate-400 text-lg max-w-lg mx-auto font-light">
              Punya pertanyaan atau ingin order aset kustom? Isi formulir dan tim kami akan membalas dalam 1×24 jam kerja.
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
                  color: "cyan",
                },
                {
                  icon: <MapPin className="h-5 w-5" />,
                  title: "Lokasi Studio",
                  lines: ["Jalan Garuda No 45, Banyumanik", "Semarang, Jawa Tengah"],
                  color: "violet",
                },
                {
                  icon: <ExternalLink className="h-5 w-5" />,
                  title: "Repository",
                  lines: ["github.com/shevazanuar/SATUGAMA"],
                  color: "emerald",
                  link: "https://github.com/shevazanuar/SATUGAMA",
                },
              ].map((c) => (
                <div
                  key={c.title}
                  className={`p-5 rounded-2xl border border-${c.color}-500/15 bg-${c.color}-500/5 flex gap-4 hover:border-${c.color}-500/30 transition-all duration-200`}
                >
                  <div className={`w-10 h-10 rounded-xl bg-${c.color}-500/10 border border-${c.color}-500/20 flex items-center justify-center text-${c.color}-400 shrink-0`}>
                    {c.icon}
                  </div>
                  <div>
                    <div className="font-semibold text-white text-sm mb-1.5">{c.title}</div>
                    {c.lines.map((l, i) => (
                      c.link
                        ? <a key={i} href={c.link} target="_blank" rel="noopener noreferrer" className={`block text-xs text-slate-400 hover:text-${c.color}-400 transition-colors`}>{l}</a>
                        : <p key={i} className="text-xs text-slate-400 leading-relaxed">{l}</p>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Form */}
            <div className="lg:col-span-3 p-8 rounded-2xl border border-white/8 bg-[#1a1d27]/60 backdrop-blur-sm">
              <form onSubmit={handleContactSubmit} className="space-y-5">

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Nama Lengkap</label>
                    <Input
                      id="name"
                      type="text"
                      placeholder="Nama Anda"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="bg-white/5 border-white/10 hover:border-white/20 focus:border-cyan-500/50 text-white placeholder:text-slate-600 h-11 rounded-xl text-sm"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Email Aktif</label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="nama@email.com"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="bg-white/5 border-white/10 hover:border-white/20 focus:border-cyan-500/50 text-white placeholder:text-slate-600 h-11 rounded-xl text-sm"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Jenis Aset</label>
                    <Select value={assetStyle} onValueChange={(v) => setAssetStyle(v || "2d-pixel")}>
                      <SelectTrigger className="bg-white/5 border-white/10 hover:border-white/20 text-slate-300 h-11 rounded-xl text-sm">
                        <SelectValue placeholder="Pilih jenis aset" />
                      </SelectTrigger>
                      <SelectContent className="bg-[#1a1d27] border-white/10 text-slate-300 rounded-xl">
                        <SelectItem value="2d-pixel">2D Pixel Art</SelectItem>
                        <SelectItem value="2d-vector">2D Vector Art</SelectItem>
                        <SelectItem value="3d-lowpoly">3D Low-Poly (Blender)</SelectItem>
                        <SelectItem value="3d-stylized">3D Stylized (Blender)</SelectItem>
                        <SelectItem value="ui-sound">UI Design & Audio SFX</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Budget Estimasi</label>
                    <Select value={budget} onValueChange={(v) => setBudget(v || "50k-100k")}>
                      <SelectTrigger className="bg-white/5 border-white/10 hover:border-white/20 text-slate-300 h-11 rounded-xl text-sm">
                        <SelectValue placeholder="Pilih range budget" />
                      </SelectTrigger>
                      <SelectContent className="bg-[#1a1d27] border-white/10 text-slate-300 rounded-xl">
                        <SelectItem value="50k-100k">Rp 50.000 – 100.000</SelectItem>
                        <SelectItem value="100k-200k">Rp 100.000 – 200.000</SelectItem>
                        <SelectItem value="200k-300k">Rp 200.000 – 300.000</SelectItem>
                        <SelectItem value="above-300k">&gt; Rp 300.000</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="message" className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Deskripsi Kebutuhan Anda</label>
                  <Textarea
                    id="message"
                    required
                    placeholder="Ceritakan detail kebutuhan aset Anda: tema game, jumlah aset, gaya visual, resolusi, engine yang digunakan, dan estimasi deadline..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="bg-white/5 border-white/10 hover:border-white/20 focus:border-cyan-500/50 text-white placeholder:text-slate-600 rounded-xl text-sm min-h-[130px] resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={submitStatus.type === "loading"}
                  className="w-full h-12 flex items-center justify-center gap-2.5 bg-gradient-to-r from-cyan-500 to-violet-600 hover:from-cyan-400 hover:to-violet-500 text-white font-semibold text-sm rounded-xl transition-all duration-200 btn-glow-cyan disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {submitStatus.type === "loading" ? (
                    <><Loader2 className="h-4 w-4 animate-spin" /> Mengirim Pesan...</>
                  ) : (
                    <><Send className="h-4 w-4" /> Kirim Request Penawaran</>
                  )}
                </button>

                {submitStatus.type && (
                  <div
                    className={`p-4 rounded-xl text-sm leading-relaxed border ${submitStatus.type === "success"
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

      {/* ═══════════════════════════════════════════
          FOOTER
      ══════════════════════════════════════════ */}
      <footer className="border-t border-white/[0.06] bg-[#0d0f15]">
        <div className="max-w-6xl mx-auto px-5 py-12">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">

            {/* Brand */}
            <div className="flex items-center gap-3">
              <div className="relative h-9 w-9 rounded-xl overflow-hidden border border-white/10 bg-gradient-to-br from-cyan-500/15 to-violet-500/15 p-0.5">
                <Image src="/logo.png" alt="SatuGama" width={32} height={32} className="object-cover rounded-lg" />
              </div>
              <div>
                <div className="font-semibold text-white text-base" style={{ fontFamily: "var(--font-sora)" }}>
                  Satu<span className="text-cyan-400">Gama</span> Studio
                </div>
                <div className="text-[11px] text-slate-600">Game Asset Maker</div>
              </div>
            </div>

            {/* Nav links */}
            <div className="flex flex-wrap gap-x-6 gap-y-2">
              {NAV_LINKS.map((link) => (
                <a key={link.href} href={link.href} className="text-sm text-slate-500 hover:text-slate-300 transition-colors">
                  {link.label}
                </a>
              ))}
            </div>

          </div>

          {/* Bottom */}
          <div className="mt-10 pt-6 border-t border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-600">
            <span>© 2026 SatuGama Studio.</span>
            <div className="flex items-center gap-1.5">
              <Gamepad2 className="h-3.5 w-3.5 text-slate-700" />
              <span>Crafted with passion for indie game developers</span>
            </div>
          </div>
        </div>
      </footer>

    </div>
  );
}
