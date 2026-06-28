"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import {
  Search, SlidersHorizontal, X, ChevronRight,
  Package, Palette, Box, Layers, Volume2,
  ArrowUpDown, Sparkles,
} from "lucide-react";
import type { Product } from "@/data/products";

/* ─── Types ─── */
type SortOption = "newest" | "price-asc" | "price-desc" | "name-asc";

const CATEGORY_ICON: Record<string, React.ReactNode> = {
  ui:  <Layers  className="h-4 w-4" />,
  "2d": <Palette className="h-4 w-4" />,
  "3d": <Box     className="h-4 w-4" />,
};

const CATEGORY_COLORS: Record<string, { accent: string; accentBg: string; accentBorder: string }> = {
  ui:  { accent: "text-indigo-400",  accentBg: "bg-indigo-500/10",  accentBorder: "border-indigo-500/25" },
  "2d": { accent: "text-amber-400",   accentBg: "bg-amber-500/10",   accentBorder: "border-amber-500/25" },
  "3d": { accent: "text-violet-400",  accentBg: "bg-violet-500/10",  accentBorder: "border-violet-500/25" },
};

const SORT_OPTIONS: { value: SortOption; label: string }[] = [
  { value: "newest",     label: "Terbaru" },
  { value: "price-asc",  label: "Harga: Termurah" },
  { value: "price-desc", label: "Harga: Termahal" },
  { value: "name-asc",   label: "Nama A–Z" },
];

const ENGINE_FILTERS = ["Unity", "Godot", "Unreal Engine", "HTML5", "Defold"];

/* ─── Product Card ─── */
function ProductCard({ product }: { product: Product }) {
  const c = CATEGORY_COLORS[product.category] ?? CATEGORY_COLORS.ui;
  return (
    <article className="group rounded-2xl overflow-hidden border border-white/8 bg-[#0e1020]/80 hover:border-white/16 hover:shadow-xl hover:shadow-black/30 transition-all duration-300 flex flex-col">
      {/* Gradient thumbnail */}
      <Link
        href={`/catalog/${product.slug}`}
        className={`relative h-44 bg-gradient-to-br ${product.gradient} flex items-center justify-center overflow-hidden`}
        aria-label={`Lihat detail ${product.title}`}
      >
        <div className="absolute inset-0 bg-black/25" />
        <div className="absolute inset-0 bg-dot-pattern opacity-15" aria-hidden="true" />
        <div className="relative z-10 flex flex-col items-center gap-3">
          <div className={`w-14 h-14 rounded-2xl border ${product.iconBg} flex items-center justify-center backdrop-blur-sm group-hover:scale-105 transition-transform duration-300`}>
            {CATEGORY_ICON[product.category]}
          </div>
          <span className="px-2.5 py-0.5 rounded-full bg-black/40 border border-white/15 text-[9px] font-bold tracking-widest uppercase text-white/90">
            {product.badge}
          </span>
        </div>
        <div className="absolute bottom-3 right-3 px-3 py-1.5 rounded-lg bg-black/50 border border-white/12 backdrop-blur-sm">
          <div className="text-[9px] text-white/50 leading-none mb-0.5">Mulai dari</div>
          <div className="text-sm font-bold text-amber-300">{product.price}</div>
        </div>
        <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <span className="px-4 py-2 rounded-xl bg-white/15 border border-white/25 text-white text-xs font-bold backdrop-blur-sm flex items-center gap-2">
            Lihat Detail <ChevronRight className="h-3.5 w-3.5" />
          </span>
        </div>
      </Link>

      {/* Content */}
      <div className="p-5 flex flex-col flex-1 gap-3">
        <div>
          <p className="text-[11px] text-slate-500 mb-1">{product.tagline}</p>
          <Link href={`/catalog/${product.slug}`}>
            <h3
              className={`font-bold text-white text-sm group-hover:${c.accent} transition-colors leading-snug hover:underline decoration-dotted underline-offset-2`}
              style={{ fontFamily: "var(--font-sora)" }}
            >
              {product.title}
            </h3>
          </Link>
        </div>
        <p className="text-slate-500 text-xs leading-relaxed flex-1 line-clamp-2">{product.shortDesc}</p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5">
          {product.tags.slice(0, 3).map(t => (
            <span key={t} className="px-2 py-0.5 rounded-md text-[10px] font-medium bg-white/5 border border-white/8 text-slate-400">
              {t}
            </span>
          ))}
        </div>

        {/* Footer CTA */}
        <div className="pt-3 border-t border-white/6 flex gap-2">
          <Link
            href={`/catalog/${product.slug}`}
            className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl btn-primary text-white text-xs font-bold transition-all duration-200"
          >
            Lihat Detail <ChevronRight className="h-3 w-3" />
          </Link>
          <a
            href={`https://wa.me/62882005486575?text=Halo%20SatuGama!%20%F0%9F%91%8B%20Saya%20tertarik%20dengan%20produk%20*${encodeURIComponent(product.title)}*%20(${encodeURIComponent(product.price)}).%20Bisa%20info%20lebih%20lanjut%3F%20%F0%9F%8E%AE`}
            target="_blank"
            rel="noopener noreferrer"
            className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl border ${c.accentBorder} ${c.accentBg} ${c.accent} hover:opacity-80 text-xs font-semibold transition-all duration-200`}
            aria-label={`Pesan ${product.title} via WhatsApp`}
          >
            Pesan
          </a>
        </div>
      </div>
    </article>
  );
}

/* ─── Main Client Component ─── */
export function CatalogClient({ products }: { products: Product[] }) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<"all" | "2d" | "3d" | "ui">("all");
  const [sort, setSort] = useState<SortOption>("newest");
  const [selectedEngines, setSelectedEngines] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);

  const toggleEngine = (engine: string) => {
    setSelectedEngines(prev =>
      prev.includes(engine) ? prev.filter(e => e !== engine) : [...prev, engine]
    );
  };

  const filtered = useMemo(() => {
    let result = [...products];

    // Category filter
    if (category !== "all") result = result.filter(p => p.category === category);

    // Search filter
    if (query.trim()) {
      const q = query.toLowerCase().trim();
      result = result.filter(p =>
        p.title.toLowerCase().includes(q) ||
        p.shortDesc.toLowerCase().includes(q) ||
        p.tags.some(t => t.toLowerCase().includes(q)) ||
        p.badge.toLowerCase().includes(q)
      );
    }

    // Engine filter
    if (selectedEngines.length > 0) {
      result = result.filter(p =>
        selectedEngines.some(eng => p.compatibility.some(c => c.toLowerCase().includes(eng.toLowerCase())))
      );
    }

    // Sort
    switch (sort) {
      case "price-asc":  result.sort((a, b) => a.priceValue - b.priceValue); break;
      case "price-desc": result.sort((a, b) => b.priceValue - a.priceValue); break;
      case "name-asc":   result.sort((a, b) => a.title.localeCompare(b.title)); break;
      case "newest":     result.sort((a, b) => b.id - a.id); break;
    }

    return result;
  }, [products, query, category, sort, selectedEngines]);

  const clearFilters = () => {
    setQuery("");
    setCategory("all");
    setSort("newest");
    setSelectedEngines([]);
  };

  const hasActiveFilters = query || category !== "all" || selectedEngines.length > 0;

  return (
    <div>
      {/* ─── Search & Controls ─── */}
      <div className="mb-8 space-y-4">
        {/* Search bar + sort */}
        <div className="flex flex-col sm:flex-row gap-3">
          {/* Search input */}
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500 pointer-events-none" aria-hidden="true" />
            <input
              id="catalog-search"
              type="search"
              placeholder="Cari produk, tag, atau kategori..."
              value={query}
              onChange={e => setQuery(e.target.value)}
              className="w-full pl-11 pr-10 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-slate-600 text-sm focus:outline-none focus:border-indigo-500/50 focus:bg-indigo-500/5 transition-all"
              aria-label="Cari produk katalog"
            />
            {query && (
              <button
                onClick={() => setQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-lg text-slate-500 hover:text-white transition-colors"
                aria-label="Hapus pencarian"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            )}
          </div>

          {/* Sort dropdown */}
          <div className="relative">
            <ArrowUpDown className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-500 pointer-events-none" aria-hidden="true" />
            <select
              value={sort}
              onChange={e => setSort(e.target.value as SortOption)}
              className="pl-9 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 text-slate-300 text-sm focus:outline-none focus:border-indigo-500/50 transition-all appearance-none cursor-pointer min-w-[180px]"
              aria-label="Urutkan produk"
            >
              {SORT_OPTIONS.map(opt => (
                <option key={opt.value} value={opt.value} className="bg-[#0e1020]">
                  {opt.label}
                </option>
              ))}
            </select>
          </div>

          {/* Filter toggle */}
          <button
            onClick={() => setShowFilters(v => !v)}
            aria-expanded={showFilters}
            aria-controls="catalog-filters"
            className={`flex items-center gap-2 px-4 py-3 rounded-xl border text-sm font-medium transition-all cursor-pointer ${
              showFilters || selectedEngines.length > 0
                ? "bg-indigo-500/15 border-indigo-500/40 text-indigo-300"
                : "bg-white/5 border-white/10 text-slate-400 hover:text-white hover:border-white/20"
            }`}
          >
            <SlidersHorizontal className="h-4 w-4" />
            Filter
            {selectedEngines.length > 0 && (
              <span className="w-5 h-5 rounded-full bg-indigo-500 text-white text-[10px] font-bold flex items-center justify-center">
                {selectedEngines.length}
              </span>
            )}
          </button>
        </div>

        {/* Category tabs */}
        <div className="flex flex-wrap gap-2" role="group" aria-label="Filter kategori">
          {[
            { key: "all" as const, label: "Semua Produk",    icon: <Package className="h-3.5 w-3.5" /> },
            { key: "2d"  as const, label: "2D & Pixel Art",  icon: <Palette className="h-3.5 w-3.5" /> },
            { key: "3d"  as const, label: "3D Models",       icon: <Box     className="h-3.5 w-3.5" /> },
            { key: "ui"  as const, label: "UI & Audio",      icon: <Volume2 className="h-3.5 w-3.5" /> },
          ].map(f => (
            <button
              key={f.key}
              onClick={() => setCategory(f.key)}
              aria-pressed={category === f.key}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 cursor-pointer ${
                category === f.key
                  ? "bg-indigo-600 text-white shadow-lg shadow-indigo-500/25 border border-indigo-500/50"
                  : "border border-white/8 bg-white/4 text-slate-400 hover:text-white hover:border-white/15 hover:bg-white/8"
              }`}
            >
              {f.icon} {f.label}
            </button>
          ))}
        </div>

        {/* Engine filter panel */}
        {showFilters && (
          <div
            id="catalog-filters"
            className="p-5 rounded-2xl border border-white/8 bg-[#0e1020]/60 space-y-3"
          >
            <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Filter Game Engine</div>
            <div className="flex flex-wrap gap-2">
              {ENGINE_FILTERS.map(eng => {
                const isSelected = selectedEngines.includes(eng);
                return (
                  <button
                    key={eng}
                    onClick={() => toggleEngine(eng)}
                    aria-pressed={isSelected}
                    className={`px-3 py-1.5 rounded-lg border text-xs font-medium transition-all cursor-pointer ${
                      isSelected
                        ? "bg-indigo-500/20 border-indigo-500/50 text-indigo-300"
                        : "bg-white/4 border-white/10 text-slate-400 hover:text-white hover:border-white/20"
                    }`}
                  >
                    {eng}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Active filters + clear */}
        {hasActiveFilters && (
          <div className="flex items-center gap-3 flex-wrap">
            <span className="text-xs text-slate-500">Filter aktif:</span>
            {query && (
              <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-xs text-slate-400">
                "{query}"
                <button onClick={() => setQuery("")} className="hover:text-white transition-colors" aria-label="Hapus filter pencarian"><X className="h-3 w-3" /></button>
              </span>
            )}
            {category !== "all" && (
              <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-indigo-500/10 border border-indigo-500/25 text-xs text-indigo-300">
                {category.toUpperCase()}
                <button onClick={() => setCategory("all")} className="hover:text-white transition-colors" aria-label="Hapus filter kategori"><X className="h-3 w-3" /></button>
              </span>
            )}
            {selectedEngines.map(eng => (
              <span key={eng} className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-violet-500/10 border border-violet-500/25 text-xs text-violet-300">
                {eng}
                <button onClick={() => toggleEngine(eng)} className="hover:text-white transition-colors" aria-label={`Hapus filter ${eng}`}><X className="h-3 w-3" /></button>
              </span>
            ))}
            <button
              onClick={clearFilters}
              className="text-xs text-slate-600 hover:text-rose-400 transition-colors underline underline-offset-2"
            >
              Hapus semua
            </button>
          </div>
        )}
      </div>

      {/* ─── Results count ─── */}
      <div className="flex items-center justify-between mb-6">
        <p className="text-sm text-slate-500">
          Menampilkan <span className="text-white font-semibold">{filtered.length}</span> dari{" "}
          <span className="text-slate-400">{products.length}</span> produk
        </p>
      </div>

      {/* ─── Product Grid ─── */}
      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map(p => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-24 text-center space-y-4">
          <div className="text-5xl" aria-hidden="true">🔍</div>
          <h3 className="text-xl font-bold text-white">Produk Tidak Ditemukan</h3>
          <p className="text-slate-500 text-sm max-w-md">
            Tidak ada produk yang cocok dengan pencarian atau filter yang dipilih. Coba kata kunci yang berbeda atau hapus beberapa filter.
          </p>
          <button
            onClick={clearFilters}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl btn-primary text-white text-sm font-semibold"
          >
            <Sparkles className="h-4 w-4" />
            Tampilkan Semua Produk
          </button>
        </div>
      )}
    </div>
  );
}
