// src/data/products.ts
// Extended product data for catalog detail pages

import { type ReactNode } from "react";

export type ProductCategory = "2d" | "3d" | "ui";

export interface ProductSpec {
  label: string;
  value: string;
}

export interface ProductFeature {
  title: string;
  description: string;
  icon: string; // emoji icon
}

export interface Product {
  id: number;
  slug: string;
  category: ProductCategory;
  title: string;
  tagline: string;
  shortDesc: string;
  longDesc: string[];       // paragraphs
  price: string;
  priceValue: number;
  badge: string;
  tags: string[];
  // Visual
  gradient: string;
  iconBg: string;
  accentColor: string;
  ctaBorder: string;
  headerGradient: string;
  // Content
  features: string[];       // "Apa yang termasuk" checklist
  whatYouGet: ProductFeature[];  // detailed breakdown
  specs: ProductSpec[];
  compatibility: string[];
  releaseDate: string;
  version: string;
  fileSize: string;
}

export const PRODUCTS: Product[] = [
  /* ────────────────────────────────────────────────
     1. LAST SIGNAL — GLITCH UI PACK
  ──────────────────────────────────────────────── */
  {
    id: 1,
    slug: "last-signal-glitch-ui-pack",
    category: "ui",
    title: "Last Signal — Glitch UI Pack",
    tagline: "Cyberpunk-ready interface kit",
    shortDesc:
      "Koleksi UI kit futuristik dengan 80+ komponen siap pakai dan 24 efek suara sintetis untuk game sci-fi & cyberpunk.",
    longDesc: [
      "Last Signal adalah UI kit komprehensif yang dirancang khusus untuk game bertema sci-fi, cyberpunk, dan futuristik. Setiap komponen dibuat dengan detail tinggi — menggabungkan estetika glitch yang autentik dengan fungsionalitas yang intuitif dan mudah diintegrasikan.",
      "Pack ini mencakup semua elemen yang Anda butuhkan untuk membangun HUD game yang imersif: dari status bar kesehatan, minimap, inventory slot, hingga panel misi dan sistem dialog. Semua tersedia dalam format SVG yang scalable dan siap langsung diintegrasikan ke Unity, Godot, maupun proyek HTML5.",
      "Dilengkapi dengan 24 efek suara sintetis berkualitas tinggi yang dikurasi khusus, Last Signal memberikan pengalaman audio-visual yang kohesif dan profesional — satu pack, semua yang Anda butuhkan.",
    ],
    price: "Rp 49.000",
    priceValue: 49000,
    badge: "UI & Audio",
    tags: ["HUD Elements", "Sound FX", "Glitch Effects"],
    gradient: "from-indigo-600 via-indigo-700 to-violet-800",
    headerGradient: "from-indigo-900/80 via-[#090a14] to-[#090a14]",
    iconBg: "bg-indigo-500/20 border-indigo-500/30",
    accentColor: "text-indigo-400",
    ctaBorder:
      "border-indigo-500/30 bg-indigo-500/10 text-indigo-300 hover:bg-indigo-500 hover:border-indigo-500 hover:text-white",
    features: [
      "80+ komponen UI siap pakai (SVG + PNG)",
      "Panel HUD animasi: Health, Mana, Stamina, EXP",
      "24 efek suara sintetis (.WAV 44.1kHz stereo)",
      "Glitch animation effects (CSS keyframes + SVG filter)",
      "Button set lengkap: Primary, Secondary, Danger, Ghost",
      "Dialog box & notification system dengan animasi",
      "Inventory grid, item slot, tooltip component",
      "Minimap frame & radar dengan efek scan",
      "Loading screen & progress bar (animated)",
      "Achievement popup & quest tracker",
      "Unity Package (.unitypackage) siap import",
      "Godot Theme (.tres) siap pakai",
      "Dokumentasi PDF lengkap + panduan integrasi",
    ],
    whatYouGet: [
      {
        title: "HUD Elements",
        description:
          "Health bar, mana, stamina, exp, dan custom stat bar. Semua dengan animasi smooth fill dan efek glow yang bisa dikustomisasi warnanya.",
        icon: "🖥️",
      },
      {
        title: "Navigation & Minimap",
        description:
          "Minimap frame dengan efek scan, compass, quest marker, waypoint system, dan area indicator. Cocok untuk open-world maupun dungeon crawler.",
        icon: "🗺️",
      },
      {
        title: "Dialog & Notification",
        description:
          "Dialog box dengan animasi typewriter, pilihan jawaban, portrait frame, dan sistem notifikasi pop-up yang bisa trigger dari mana saja.",
        icon: "💬",
      },
      {
        title: "Audio SFX Pack",
        description:
          "24 file SFX sintetis: hover, click, alert, error, success, ambient hum, glitch burst, power-up, dan lebih banyak lagi. WAV lossless.",
        icon: "🔊",
      },
    ],
    specs: [
      { label: "Format File", value: "SVG, PNG (2x & 4x), .unitypackage, .tres" },
      { label: "Resolusi", value: "Scalable (SVG) + PNG 256px – 1024px" },
      { label: "Audio Format", value: "WAV 44.1kHz, 16-bit Stereo" },
      { label: "Jumlah Komponen", value: "80+ UI components" },
      { label: "Jumlah SFX", value: "24 sound effects" },
      { label: "Lisensi", value: "Komersial (hingga 3 game)" },
      { label: "Ukuran Download", value: "~85 MB" },
      { label: "Versi", value: "1.2.0" },
    ],
    compatibility: [
      "Unity 2021+",
      "Godot 4",
      "GameMaker Studio 2",
      "HTML5 / Web",
      "Construct 3",
    ],
    releaseDate: "Maret 2026",
    version: "1.2.0",
    fileSize: "~85 MB",
  },

  /* ────────────────────────────────────────────────
     2. DUNGEON CRAWLER TILESET
  ──────────────────────────────────────────────── */
  {
    id: 2,
    slug: "dungeon-crawler-tileset",
    category: "2d",
    title: "Dungeon Crawler Tileset",
    tagline: "16-bit pixel art dungeon collection",
    shortDesc:
      "340+ tile sprite 16-bit pixel art berkualitas tinggi bertema kastil gotik dan dungeon medieval — dengan animasi lengkap.",
    longDesc: [
      "Dungeon Crawler Tileset adalah koleksi pixel art premium yang menghadirkan atmosfer dungeon klasik yang gelap dan misterius. Dibuat dalam gaya 16-bit yang ikonik, setiap tile dirancang dengan detail pixel-perfect untuk menciptakan lingkungan game yang imersif dan penuh karakter.",
      "Tileset ini mencakup semua elemen yang dibutuhkan untuk membangun level dungeon yang kaya — dari dinding batu berlumut, lantai bata tua, langit-langit stalaktit, hingga prop interaktif seperti peti harta berkilau, obor beranimasi, pintu berbagai jenis, dan jebakan mematikan.",
      "Didesain dengan sistem tile yang terstruktur dan kompatibel langsung dengan LDtk, Tiled, dan Unity Tilemap. Memudahkan Anda membangun level dengan cepat tanpa harus khawatir tentang seam atau gap antar tile — semua sudah diatur dengan presisi.",
    ],
    price: "Rp 29.000",
    priceValue: 29000,
    badge: "Pixel Art",
    tags: ["340+ Sprites", "Animated", "Layer System"],
    gradient: "from-amber-600 via-orange-700 to-red-800",
    headerGradient: "from-amber-900/60 via-[#090a14] to-[#090a14]",
    iconBg: "bg-amber-500/20 border-amber-500/30",
    accentColor: "text-amber-400",
    ctaBorder:
      "border-amber-500/30 bg-amber-500/10 text-amber-300 hover:bg-amber-500 hover:border-amber-500 hover:text-white",
    features: [
      "340+ tile sprite resolusi 16×16 pixel",
      "Dinding 8-way: batu, bata, dan tanah (corner & edge otomatis)",
      "Pintu animasi: buka, tutup, terkunci, hancur",
      "Jebakan bergerak: spike floor, arrow trap, pendulum, dart",
      "Prop interaktif: chest, barrel, torch, pot, bookshelf",
      "Efek cahaya tile: torch glow, crystal, lava shimmer",
      "Sistem 3 layer: background, midground, foreground",
      "Water, lava, dan slime tile dengan animasi loop",
      "Tiles khusus bossroom & saferoom",
      "Tileset atlas PNG (512×512) + sprite individual",
      "LDtk project file + Tiled tileset (.tsx)",
      "Unity Tilemap package + Godot tileset (.tscn)",
    ],
    whatYouGet: [
      {
        title: "Wall & Floor Tiles",
        description:
          "8-directional wall tiles dalam 3 material berbeda: batu kasar, bata kuno, dan tanah. Mendukung auto-corner dan edge untuk placement yang mulus.",
        icon: "🧱",
      },
      {
        title: "Animated Props",
        description:
          "Obor berkedip realistis, air mengalir, lava bubble, pintu berayun, dan crystal bercahaya — semua dengan animasi loop yang halus.",
        icon: "🔥",
      },
      {
        title: "Traps & Hazards",
        description:
          "Spike floor, arrow shooter, pendulum axe, floor panel trigger, dan poison gas vent — semua dengan animasi idle dan triggered state.",
        icon: "⚔️",
      },
      {
        title: "Special Rooms",
        description:
          "Set tile eksklusif untuk boss room (Gothic throne, skull decorations) dan safe room (campfire, resting area) dengan nuansa visual berbeda.",
        icon: "🏰",
      },
    ],
    specs: [
      { label: "Resolusi Tile", value: "16×16 pixel per tile" },
      { label: "Format File", value: "PNG individual + Atlas 512×512" },
      { label: "Jumlah Tile", value: "340+ sprites" },
      { label: "Frame Animasi", value: "4–8 frame per animated tile" },
      { label: "Palet Warna", value: "32 warna (Gothic palette)" },
      { label: "Lisensi", value: "Komersial (1 game)" },
      { label: "Ukuran Download", value: "~28 MB" },
      { label: "Versi", value: "2.0.1" },
    ],
    compatibility: [
      "Unity 2021+ (Tilemap)",
      "Godot 4",
      "GameMaker Studio 2",
      "LDtk",
      "Tiled",
      "RPG Maker MZ",
    ],
    releaseDate: "Februari 2026",
    version: "2.0.1",
    fileSize: "~28 MB",
  },

  /* ────────────────────────────────────────────────
     3. SCI-FI STARFIGHTER PACK
  ──────────────────────────────────────────────── */
  {
    id: 3,
    slug: "sci-fi-starfighter-pack",
    category: "3d",
    title: "Sci-Fi Starfighter Pack",
    tagline: "Low-poly 3D spacecraft collection",
    shortDesc:
      "12 model pesawat luar angkasa low-poly dalam format FBX & OBJ dengan tekstur PBR 2K — dioptimalkan untuk Unity & Godot.",
    longDesc: [
      "Sci-Fi Starfighter Pack menghadirkan koleksi 12 model pesawat luar angkasa bertema futuristik yang dioptimalkan untuk performa tinggi di berbagai platform. Setiap model dibuat dengan teliti menggunakan Blender 4.0, mempertimbangkan keseimbangan antara kualitas visual dan efisiensi polygon.",
      "Koleksi ini mencakup 4 kelas kapal yang berbeda — Fighter nimble yang lincah, Cruiser medium yang berkarakter, Capital Ship yang megah, serta Drone utilitas. Setiap kapal hadir dalam 2-3 varian skin menggunakan PBR texture set yang profesional (Albedo, Normal, Metallic, Roughness, Emission).",
      "Semua model sudah UV-unwrapped dengan bersih tanpa overlapping, memudahkan Anda untuk melakukan reskin atau modifikasi tekstur. Tersedia juga format FBX yang sudah di-rig dengan bone dasar untuk animasi engine trail dan cannon rotation — langsung bisa pakai di Unity maupun Unreal Engine 5.",
    ],
    price: "Rp 99.000",
    priceValue: 99000,
    badge: "3D Models",
    tags: ["12 Models", "FBX & OBJ", "PBR Textures"],
    gradient: "from-violet-600 via-purple-700 to-indigo-800",
    headerGradient: "from-violet-900/60 via-[#090a14] to-[#090a14]",
    iconBg: "bg-violet-500/20 border-violet-500/30",
    accentColor: "text-violet-400",
    ctaBorder:
      "border-violet-500/30 bg-violet-500/10 text-violet-300 hover:bg-violet-500 hover:border-violet-500 hover:text-white",
    features: [
      "12 model pesawat unik (4 kelas berbeda)",
      "2–3 skin/varian texture per model",
      "PBR texture set 2K: Albedo, Normal, Metallic, Roughness, Emission",
      "UV-unwrapped bersih tanpa overlap",
      "Polygon range 500–3.500 tri per model",
      "Basic rig: engine thruster + cannon rotation bone",
      "LOD mesh tersedia (2 level per model)",
      "Collision mesh (simplified convex hull)",
      "Engine glow particle setup (Unity prefab)",
      "Thumbnail render 4K per model (PNG)",
      "Blender source file (.blend) semua model",
      "Panduan import & setup Unity / Unreal (PDF)",
    ],
    whatYouGet: [
      {
        title: "Fighter Class (4 model)",
        description:
          "Kapal kecil dan lincah dengan desain agresif. Ideal untuk karakter utama, wingman, atau musuh dogfight. Poly count 500–1.200.",
        icon: "🚀",
      },
      {
        title: "Cruiser Class (4 model)",
        description:
          "Kapal medium dengan detail yang lebih kaya dan senjata yang lebih besar. Cocok untuk escort mission atau mini-boss encounter. Poly count 1.500–2.500.",
        icon: "🛸",
      },
      {
        title: "Capital Class (2 model)",
        description:
          "Kapal besar sebagai background asset atau final boss. Polygon dioptimalkan untuk performa saat banyak objek di scene. Poly count 2.500–3.500.",
        icon: "🌌",
      },
      {
        title: "Drone & Utility (2 model)",
        description:
          "Drone kecil autonomous dan kapal utilitas untuk NPC, escort, atau ambient environment. Poly count 500–800.",
        icon: "🤖",
      },
    ],
    specs: [
      { label: "Software Pembuat", value: "Blender 4.0" },
      { label: "Format Model", value: "FBX, OBJ, .blend (source)" },
      { label: "Tekstur", value: "PBR 2K (2048×2048 px)" },
      { label: "Polygon Count", value: "500–3.500 tri per model" },
      { label: "LOD Levels", value: "2 level per model" },
      { label: "Jumlah Model", value: "12 kapal unik" },
      { label: "Lisensi", value: "Komersial (1 game)" },
      { label: "Ukuran Download", value: "~240 MB" },
    ],
    compatibility: [
      "Unity 2021+ (URP/HDRP)",
      "Unreal Engine 5",
      "Blender 3.6+",
      "Godot 4 (via FBX import)",
    ],
    releaseDate: "April 2026",
    version: "1.0.0",
    fileSize: "~240 MB",
  },
];

/* ─── Helpers ─── */

export function getProductBySlug(slug: string): Product | undefined {
  return PRODUCTS.find((p) => p.slug === slug);
}

export function getRelatedProducts(product: Product, count = 2): Product[] {
  // Same category first, then any other
  const same = PRODUCTS.filter(
    (p) => p.id !== product.id && p.category === product.category
  );
  const others = PRODUCTS.filter(
    (p) => p.id !== product.id && p.category !== product.category
  );
  return [...same, ...others].slice(0, count);
}

export function getCategoryLabel(category: ProductCategory): string {
  return { "2d": "2D & Pixel Art", "3d": "3D Models", ui: "UI & Audio" }[
    category
  ];
}
