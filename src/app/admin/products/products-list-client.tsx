"use client";

import { useState } from "react";
import Link from "next/link";
import { createProductAction, updateProductAction, deleteProductAction } from "./actions";
import {
  Plus,
  Edit2,
  Trash2,
  Package,
  Save,
  X,
  Loader2,
  Eye,
  EyeOff,
  Star,
  Info,
  Palette,
  Layers,
  ChevronRight,
} from "lucide-react";

interface Product {
  id: number;
  slug: string;
  category: "2d" | "3d" | "ui";
  title: string;
  tagline: string;
  shortDesc: string;
  longDesc: string[];
  price: string;
  priceValue: number;
  badge: string;
  gradient: string;
  headerGradient: string;
  iconBg: string;
  accentColor: string;
  ctaBorder: string;
  releaseDate: string;
  version: string;
  fileSize: string;
  isFeatured: boolean;
  isPublished: boolean;
  whatYouGet: Array<{ title: string; description: string; icon: string }>;
  features?: any[];
  specs?: any[];
  compatibility?: any[];
  tags?: any[];
}

export default function ProductsListClient({
  initialProducts,
}: {
  initialProducts: any[];
}) {
  const [productsList, setProductsList] = useState<any[]>(initialProducts);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<any | null>(null);
  const [activeTab, setActiveTab] = useState<"info" | "design" | "lists">("info");

  // Form States
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [category, setCategory] = useState<"2d" | "3d" | "ui">("ui");
  const [tagline, setTagline] = useState("");
  const [shortDesc, setShortDesc] = useState("");
  const [longDescText, setLongDescText] = useState(""); // paragraphs separated by newlines
  const [price, setPrice] = useState("");
  const [priceValue, setPriceValue] = useState(0);
  const [badge, setBadge] = useState("");
  const [gradient, setGradient] = useState("");
  const [headerGradient, setHeaderGradient] = useState("");
  const [iconBg, setIconBg] = useState("");
  const [accentColor, setAccentColor] = useState("");
  const [ctaBorder, setCtaBorder] = useState("");
  const [releaseDate, setReleaseDate] = useState("");
  const [version, setVersion] = useState("");
  const [fileSize, setFileSize] = useState("");
  const [isFeatured, setIsFeatured] = useState(false);
  const [isPublished, setIsPublished] = useState(true);

  // Dynamic Lists States
  const [featuresList, setFeaturesList] = useState<string[]>([]);
  const [newFeature, setNewFeature] = useState("");

  const [specsList, setSpecsList] = useState<Array<{ label: string; value: string }>>([]);
  const [newSpecLabel, setNewSpecLabel] = useState("");
  const [newSpecValue, setNewSpecValue] = useState("");

  const [compatList, setCompatList] = useState<string[]>([]);
  const [newCompat, setNewCompat] = useState("");

  const [tagsList, setTagsList] = useState<string[]>([]);
  const [newTag, setNewTag] = useState("");

  // What You Get States (4 fixed slots)
  const [wyg1Title, setWyg1Title] = useState("");
  const [wyg1Desc, setWyg1Desc] = useState("");
  const [wyg1Icon, setWyg1Icon] = useState("");

  const [wyg2Title, setWyg2Title] = useState("");
  const [wyg2Desc, setWyg2Desc] = useState("");
  const [wyg2Icon, setWyg2Icon] = useState("");

  const [wyg3Title, setWyg3Title] = useState("");
  const [wyg3Desc, setWyg3Desc] = useState("");
  const [wyg3Icon, setWyg3Icon] = useState("");

  const [wyg4Title, setWyg4Title] = useState("");
  const [wyg4Desc, setWyg4Desc] = useState("");
  const [wyg4Icon, setWyg4Icon] = useState("");

  const [loading, setLoading] = useState(false);

  const openAddModal = () => {
    setEditingProduct(null);
    setActiveTab("info");
    
    // Set default value
    setTitle("");
    setSlug("");
    setCategory("ui");
    setTagline("");
    setShortDesc("");
    setLongDescText("");
    setPrice("Rp ");
    setPriceValue(0);
    setBadge("Premium Pack");
    setGradient("from-indigo-600 via-indigo-700 to-violet-800");
    setHeaderGradient("from-indigo-900/80 via-[#090a14] to-[#090a14]");
    setIconBg("bg-indigo-500/20 border-indigo-500/30");
    setAccentColor("text-indigo-400");
    setCtaBorder("border-indigo-500/30 bg-indigo-500/10 text-indigo-300 hover:bg-indigo-500 hover:border-indigo-500 hover:text-white");
    setReleaseDate("");
    setVersion("1.0.0");
    setFileSize("");
    setIsFeatured(false);
    setIsPublished(true);

    setFeaturesList([]);
    setSpecsList([]);
    setCompatList([]);
    setTagsList([]);

    // Clear WYG
    setWyg1Title(""); setWyg1Desc(""); setWyg1Icon("🖥️");
    setWyg2Title(""); setWyg2Desc(""); setWyg2Icon("🔥");
    setWyg3Title(""); setWyg3Desc(""); setWyg3Icon("📦");
    setWyg4Title(""); setWyg4Desc(""); setWyg4Icon("🔊");

    setModalOpen(true);
  };

  const openEditModal = (p: any) => {
    setEditingProduct(p);
    setActiveTab("info");

    setTitle(p.title);
    setSlug(p.slug);
    setCategory(p.category);
    setTagline(p.tagline);
    setShortDesc(p.shortDesc);
    setLongDescText(p.longDesc.join("\n\n"));
    setPrice(p.price);
    setPriceValue(p.priceValue);
    setBadge(p.badge);
    setGradient(p.gradient);
    setHeaderGradient(p.headerGradient);
    setIconBg(p.iconBg);
    setAccentColor(p.accentColor);
    setCtaBorder(p.ctaBorder);
    setReleaseDate(p.releaseDate);
    setVersion(p.version);
    setFileSize(p.fileSize);
    setIsFeatured(p.isFeatured);
    setIsPublished(p.isPublished);

    // Map relational arrays
    setFeaturesList(p.features ? p.features.map((f: any) => f.featureText) : []);
    setSpecsList(p.specs ? p.specs.map((s: any) => ({ label: s.label, value: s.value })) : []);
    setCompatList(p.compatibility ? p.compatibility.map((c: any) => c.engineName) : []);
    setTagsList(p.tags ? p.tags.map((t: any) => t.tag) : []);

    // Map WYG (4 slots)
    const wyg = p.whatYouGet || [];
    setWyg1Title(wyg[0]?.title || ""); setWyg1Desc(wyg[0]?.description || ""); setWyg1Icon(wyg[0]?.icon || "🖥️");
    setWyg2Title(wyg[1]?.title || ""); setWyg2Desc(wyg[1]?.description || ""); setWyg2Icon(wyg[1]?.icon || "🔥");
    setWyg3Title(wyg[2]?.title || ""); setWyg3Desc(wyg[2]?.description || ""); setWyg3Icon(wyg[2]?.icon || "📦");
    setWyg4Title(wyg[3]?.title || ""); setWyg4Desc(wyg[3]?.description || ""); setWyg4Icon(wyg[3]?.icon || "🔊");

    setModalOpen(true);
  };

  const generateSlug = () => {
    setSlug(
      title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)+/g, "")
    );
  };

  const handleListAdd = (type: "feature" | "spec" | "compat" | "tag") => {
    if (type === "feature" && newFeature.trim()) {
      setFeaturesList([...featuresList, newFeature.trim()]);
      setNewFeature("");
    } else if (type === "spec" && newSpecLabel.trim() && newSpecValue.trim()) {
      setSpecsList([...specsList, { label: newSpecLabel.trim(), value: newSpecValue.trim() }]);
      setNewSpecLabel("");
      setNewSpecValue("");
    } else if (type === "compat" && newCompat.trim()) {
      setCompatList([...compatList, newCompat.trim()]);
      setNewCompat("");
    } else if (type === "tag" && newTag.trim()) {
      setTagsList([...tagsList, newTag.trim()]);
      setNewTag("");
    }
  };

  const handleListRemove = (type: "feature" | "spec" | "compat" | "tag", index: number) => {
    if (type === "feature") setFeaturesList(featuresList.filter((_, i) => i !== index));
    if (type === "spec") setSpecsList(specsList.filter((_, i) => i !== index));
    if (type === "compat") setCompatList(compatList.filter((_, i) => i !== index));
    if (type === "tag") setTagsList(tagsList.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !slug || !price || !priceValue) {
      alert("Judul, Slug, dan Harga wajib diisi!");
      return;
    }

    setLoading(true);

    const longDesc = longDescText.split("\n\n").filter((p) => p.trim() !== "");
    const whatYouGet = [
      { title: wyg1Title, description: wyg1Desc, icon: wyg1Icon },
      { title: wyg2Title, description: wyg2Desc, icon: wyg2Icon },
      { title: wyg3Title, description: wyg3Desc, icon: wyg3Icon },
      { title: wyg4Title, description: wyg4Desc, icon: wyg4Icon },
    ].filter((item) => item.title.trim() !== "");

    const productData = {
      title,
      slug,
      category,
      tagline,
      shortDesc,
      longDesc,
      price,
      priceValue,
      badge,
      gradient,
      headerGradient,
      iconBg,
      accentColor,
      ctaBorder,
      releaseDate,
      version,
      fileSize,
      isFeatured,
      isPublished,
      whatYouGet,
    };

    const lists = {
      features: featuresList,
      specs: specsList,
      compatibility: compatList,
      tags: tagsList,
    };

    try {
      if (editingProduct) {
        const res = await updateProductAction(editingProduct.id, productData, lists);
        if (res.success) {
          alert("Produk berhasil diperbarui!");
          window.location.reload();
        } else {
          alert(res.error);
        }
      } else {
        const res = await createProductAction(productData, lists);
        if (res.success) {
          alert("Produk baru berhasil ditambahkan!");
          window.location.reload();
        } else {
          alert(res.error);
        }
      }
    } catch (err) {
      console.error(err);
      alert("Terjadi kesalahan sistem.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Apakah Anda yakin ingin menghapus produk ini? Semua data relasi (fitur, spesifikasi, kompatibilitas, dll) akan ikut terhapus.")) {
      return;
    }

    const res = await deleteProductAction(id);
    if (res.success) {
      setProductsList((prev) => prev.filter((p) => p.id !== id));
      alert("Produk berhasil dihapus!");
    } else {
      alert(res.error);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Halaman */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1
            className="text-3xl font-black text-white tracking-tight"
            style={{ fontFamily: "var(--font-sora)" }}
          >
            Daftar Produk / Aset
          </h1>
          <p className="text-slate-500 text-sm">Kelola produk game aset Anda yang ditampilkan di Katalog.</p>
        </div>

        <button
          onClick={openAddModal}
          className="inline-flex items-center gap-2 px-5 py-3 btn-primary text-white font-bold rounded-xl text-sm whitespace-nowrap"
        >
          <Plus className="h-4 w-4" /> Tambah Produk
        </button>
      </div>

      {/* Grid Produk */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {productsList.length === 0 ? (
          <div className="md:col-span-3 p-12 text-center rounded-2xl border border-white/[0.06] bg-[#0c0d1b]/30 text-slate-500 text-sm">
            Belum ada produk. Klik "Tambah Produk" untuk mulai mengunggah.
          </div>
        ) : (
          productsList.map((product) => (
            <div
              key={product.id}
              className={`group flex flex-col justify-between rounded-2xl border bg-[#0c0d1b]/60 overflow-hidden relative transition-all ${
                product.isPublished
                  ? "border-white/[0.06] hover:border-white/[0.15]"
                  : "border-white/[0.02] opacity-45"
              }`}
            >
              {/* Product Visual Header */}
              <div className={`h-28 bg-gradient-to-br ${product.gradient} relative flex items-center justify-between px-6 overflow-hidden`}>
                <div className="absolute inset-0 bg-black/15 pointer-events-none" />
                <span className="px-2.5 py-0.5 rounded-full bg-black/40 border border-white/15 text-[9px] font-black tracking-widest uppercase text-white/95 relative z-10">
                  {product.badge}
                </span>
                <span className="text-[10px] text-white/60 font-semibold relative z-10 uppercase tracking-widest">
                  {product.category}
                </span>
              </div>

              {/* Product Content Details */}
              <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                <div className="space-y-1.5 min-w-0">
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold text-white text-base leading-snug truncate group-hover:text-indigo-400 transition-colors">
                      {product.title}
                    </h3>
                    {product.isFeatured && (
                      <span title="Featured Product">
                        <Star className="h-4.5 w-4.5 text-amber-400 fill-amber-400 shrink-0" />
                      </span>
                    )}
                  </div>
                  <p className="text-slate-500 text-xs truncate italic">{product.tagline}</p>
                  <p className="text-slate-400 text-xs leading-relaxed line-clamp-3 pt-2">
                    {product.shortDesc}
                  </p>
                </div>

                <div className="pt-4 border-t border-white/[0.04] flex items-center justify-between">
                  <span className="text-amber-400 font-bold text-base">{product.price}</span>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => openEditModal(product)}
                      className="p-2 rounded-lg bg-white/5 border border-white/8 hover:bg-white/10 hover:text-white transition-colors"
                      title="Edit Produk"
                    >
                      <Edit2 className="h-3.5 w-3.5" />
                    </button>
                    <button
                      onClick={() => handleDelete(product.id)}
                      className="p-2 rounded-lg bg-white/5 border border-white/8 hover:bg-rose-500/10 hover:border-rose-500/20 hover:text-rose-400 transition-colors"
                      title="Hapus Produk"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                    <Link
                      href={`/catalog/${product.slug}`}
                      className="p-2 rounded-lg bg-white/5 border border-white/8 hover:bg-indigo-500/20 hover:border-indigo-500/35 hover:text-indigo-400 transition-colors"
                      title="Lihat Halaman Klien"
                      target="_blank"
                    >
                      <ChevronRight className="h-3.5 w-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* FORM MODAL (Add / Edit) */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-5">
          {/* Overlay */}
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setModalOpen(false)} />

          {/* Modal Container */}
          <div className="relative w-full max-w-4xl rounded-2xl border border-white/[0.08] bg-[#0c0d1b] shadow-2xl backdrop-blur-xl flex flex-col max-h-[90vh] overflow-hidden">
            {/* Header Modal */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-white/[0.06] shrink-0">
              <h2
                className="text-lg font-bold text-white"
                style={{ fontFamily: "var(--font-sora)" }}
              >
                {editingProduct ? `Edit: ${editingProduct.title}` : "Tambah Produk Baru"}
              </h2>
              <button onClick={() => setModalOpen(false)} className="text-slate-500 hover:text-white">
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Tabs Selector */}
            <div className="flex border-b border-white/[0.04] bg-[#090a14]/40 px-6 py-1 gap-4 text-xs font-semibold shrink-0">
              {[
                { id: "info", label: "Info Utama", icon: <Info className="h-3.5 w-3.5" /> },
                { id: "design", label: "Gaya & Meta", icon: <Palette className="h-3.5 w-3.5" /> },
                { id: "lists", label: "Detail Relasional", icon: <Layers className="h-3.5 w-3.5" /> },
              ].map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex items-center gap-1.5 py-3 border-b-2 font-bold transition-all px-1 ${
                    activeTab === tab.id
                      ? "border-indigo-500 text-indigo-400"
                      : "border-transparent text-slate-500 hover:text-slate-300"
                  }`}
                >
                  {tab.icon}
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Scrollable Form Body */}
            <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 md:p-8 space-y-6">
              {/* TAB 1: INFO UTAMA */}
              {activeTab === "info" && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                        Nama Produk / Judul
                      </label>
                      <input
                        type="text"
                        required
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        onBlur={generateSlug}
                        placeholder="Last Signal — Glitch UI Pack"
                        className="w-full px-4 py-2.5 rounded-xl border border-white/8 bg-[#090a14]/60 text-slate-100 placeholder-slate-600 focus:outline-none focus:border-indigo-500 transition-colors text-sm"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                        Product Slug (URL)
                      </label>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          required
                          value={slug}
                          onChange={(e) => setSlug(e.target.value)}
                          placeholder="last-signal-glitch-ui-pack"
                          className="w-full px-4 py-2.5 rounded-xl border border-white/8 bg-[#090a14]/60 text-slate-100 placeholder-slate-600 focus:outline-none focus:border-indigo-500 transition-colors text-sm font-mono text-xs"
                        />
                        <button
                          type="button"
                          onClick={generateSlug}
                          className="px-4 py-2 bg-white/5 border border-white/8 hover:bg-white/10 rounded-xl text-xs text-slate-300 whitespace-nowrap"
                        >
                          Auto-Gen
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                        Kategori
                      </label>
                      <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value as any)}
                        className="w-full px-4 py-2.5 rounded-xl border border-white/8 bg-[#090a14]/60 text-slate-100 focus:outline-none focus:border-indigo-500 transition-colors text-sm"
                      >
                        <option value="2d">2D / Pixel Art</option>
                        <option value="3d">3D Models</option>
                        <option value="ui">UI & Audio</option>
                      </select>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                        Harga (Teks)
                      </label>
                      <input
                        type="text"
                        required
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        placeholder="Rp 49.000"
                        className="w-full px-4 py-2.5 rounded-xl border border-white/8 bg-[#090a14]/60 text-slate-100 placeholder-slate-600 focus:outline-none focus:border-indigo-500 transition-colors text-sm"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                        Nilai Angka Harga (Untuk sorting)
                      </label>
                      <input
                        type="number"
                        required
                        value={priceValue}
                        onChange={(e) => setPriceValue(parseInt(e.target.value) || 0)}
                        placeholder="49000"
                        className="w-full px-4 py-2.5 rounded-xl border border-white/8 bg-[#090a14]/60 text-slate-100 focus:outline-none focus:border-indigo-500 transition-colors text-sm"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                      Tagline / Kalimat Penjelas Singkat
                    </label>
                    <input
                      type="text"
                      value={tagline}
                      onChange={(e) => setTagline(e.target.value)}
                      placeholder="Cyberpunk-ready interface kit"
                      className="w-full px-4 py-2.5 rounded-xl border border-white/8 bg-[#090a14]/60 text-slate-100 placeholder-slate-600 focus:outline-none focus:border-indigo-500 transition-colors text-sm"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                      Deskripsi Singkat (Muncul di katalog card)
                    </label>
                    <textarea
                      required
                      value={shortDesc}
                      onChange={(e) => setShortDesc(e.target.value)}
                      placeholder="Koleksi UI kit futuristik dengan 80+ komponen siap pakai..."
                      className="w-full h-20 p-3 rounded-xl border border-white/8 bg-[#090a14]/60 text-slate-100 placeholder-slate-600 focus:outline-none focus:border-indigo-500 transition-colors text-sm resize-none"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                      Deskripsi Panjang (Detail Page — pisahkan paragraf dengan baris kosong ganda / Enter 2 kali)
                    </label>
                    <textarea
                      required
                      value={longDescText}
                      onChange={(e) => setLongDescText(e.target.value)}
                      placeholder="Paragraf 1 tentang detail kegunaan produk...&#10;&#10;Paragraf 2 tentang cara integrasi..."
                      className="w-full h-36 p-3 rounded-xl border border-white/8 bg-[#090a14]/60 text-slate-100 placeholder-slate-600 focus:outline-none focus:border-indigo-500 transition-colors text-sm font-light leading-relaxed"
                    />
                  </div>

                  <div className="flex gap-6 pt-2">
                    <label className="flex items-center gap-2 text-xs font-semibold text-slate-400 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={isPublished}
                        onChange={(e) => setIsPublished(e.target.checked)}
                        className="rounded border-white/20 bg-[#090a14]/60 text-indigo-500 focus:ring-indigo-500"
                      />
                      <span className="flex items-center gap-1">
                        {isPublished ? <Eye className="h-4 w-4 text-emerald-400" /> : <EyeOff className="h-4 w-4 text-slate-500" />}
                        Publikasikan produk (Tampil di Katalog)
                      </span>
                    </label>

                    <label className="flex items-center gap-2 text-xs font-semibold text-slate-400 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={isFeatured}
                        onChange={(e) => setIsFeatured(e.target.checked)}
                        className="rounded border-white/20 bg-[#090a14]/60 text-indigo-500 focus:ring-indigo-500"
                      />
                      <span className="flex items-center gap-1">
                        <Star className={`h-4 w-4 ${isFeatured ? "text-amber-400 fill-amber-400" : "text-slate-500"}`} />
                        Tampilkan sebagai Produk Utama (Featured)
                      </span>
                    </label>
                  </div>
                </div>
              )}

              {/* TAB 2: DESAIN & META */}
              {activeTab === "design" && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                        Badge (Teks label atas card)
                      </label>
                      <input
                        type="text"
                        value={badge}
                        onChange={(e) => setBadge(e.target.value)}
                        placeholder="UI & Audio"
                        className="w-full px-4 py-2.5 rounded-xl border border-white/8 bg-[#090a14]/60 text-slate-100 placeholder-slate-600 focus:outline-none focus:border-indigo-500 transition-colors text-sm"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                        Tailwind Gradient Class (Warna visual card)
                      </label>
                      <input
                        type="text"
                        value={gradient}
                        onChange={(e) => setGradient(e.target.value)}
                        placeholder="from-indigo-600 via-indigo-700 to-violet-800"
                        className="w-full px-4 py-2.5 rounded-xl border border-white/8 bg-[#090a14]/60 text-slate-100 focus:outline-none focus:border-indigo-500 transition-colors text-sm font-mono"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                        Header Gradient (Detail Page)
                      </label>
                      <input
                        type="text"
                        value={headerGradient}
                        onChange={(e) => setHeaderGradient(e.target.value)}
                        placeholder="from-indigo-900/80 via-[#090a14] to-[#090a14]"
                        className="w-full px-4 py-2.5 rounded-xl border border-white/8 bg-[#090a14]/60 text-slate-100 focus:outline-none focus:border-indigo-500 transition-colors text-sm font-mono text-xs"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                        Icon Container Styling Class
                      </label>
                      <input
                        type="text"
                        value={iconBg}
                        onChange={(e) => setIconBg(e.target.value)}
                        placeholder="bg-indigo-500/20 border-indigo-500/30"
                        className="w-full px-4 py-2.5 rounded-xl border border-white/8 bg-[#090a14]/60 text-slate-100 focus:outline-none focus:border-indigo-500 transition-colors text-sm font-mono text-xs"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                        Warna Utama Teks Aksen
                      </label>
                      <input
                        type="text"
                        value={accentColor}
                        onChange={(e) => setAccentColor(e.target.value)}
                        placeholder="text-indigo-400"
                        className="w-full px-4 py-2.5 rounded-xl border border-white/8 bg-[#090a14]/60 text-slate-100 focus:outline-none focus:border-indigo-500 transition-colors text-sm font-mono text-xs"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                      CTA Border Detail Styling Class
                    </label>
                    <input
                      type="text"
                      value={ctaBorder}
                      onChange={(e) => setCtaBorder(e.target.value)}
                      placeholder="border-indigo-500/30 bg-indigo-500/10 text-indigo-300 hover:bg-indigo-500 hover:border-indigo-500 hover:text-white"
                      className="w-full px-4 py-2.5 rounded-xl border border-white/8 bg-[#090a14]/60 text-slate-100 focus:outline-none focus:border-indigo-500 transition-colors text-sm font-mono text-xs"
                    />
                  </div>

                  {/* Meta Details */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-white/[0.04]">
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                        Rilis (Tanggal / Bulan)
                      </label>
                      <input
                        type="text"
                        value={releaseDate}
                        onChange={(e) => setReleaseDate(e.target.value)}
                        placeholder="Maret 2026"
                        className="w-full px-4 py-2.5 rounded-xl border border-white/8 bg-[#090a14]/60 text-slate-100 placeholder-slate-600 focus:outline-none focus:border-indigo-500 transition-colors text-sm"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                        Versi Rilis
                      </label>
                      <input
                        type="text"
                        value={version}
                        onChange={(e) => setVersion(e.target.value)}
                        placeholder="1.2.0"
                        className="w-full px-4 py-2.5 rounded-xl border border-white/8 bg-[#090a14]/60 text-slate-100 placeholder-slate-600 focus:outline-none focus:border-indigo-500 transition-colors text-sm"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                        Ukuran File (File Size)
                      </label>
                      <input
                        type="text"
                        value={fileSize}
                        onChange={(e) => setFileSize(e.target.value)}
                        placeholder="~85 MB"
                        className="w-full px-4 py-2.5 rounded-xl border border-white/8 bg-[#090a14]/60 text-slate-100 placeholder-slate-600 focus:outline-none focus:border-indigo-500 transition-colors text-sm"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 3: DETAIL RELASIONAL */}
              {activeTab === "lists" && (
                <div className="space-y-6">
                  {/* Tags & Engine Compatibility */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Tags */}
                    <div className="p-4 rounded-xl border border-white/5 bg-[#090a14]/40 space-y-3">
                      <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">
                        Tag Produk
                      </label>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={newTag}
                          onChange={(e) => setNewTag(e.target.value)}
                          placeholder="HUD Elements"
                          className="w-full px-3 py-1.5 rounded-lg border border-white/8 bg-[#090a14]/80 text-slate-100 text-xs focus:outline-none focus:border-indigo-500"
                          onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), handleListAdd("tag"))}
                        />
                        <button
                          type="button"
                          onClick={() => handleListAdd("tag")}
                          className="px-3 py-1.5 bg-white/5 hover:bg-white/10 border border-white/8 rounded-lg text-xs"
                        >
                          Tambah
                        </button>
                      </div>
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {tagsList.map((t, idx) => (
                          <span
                            key={idx}
                            className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-white/5 border border-white/8 text-[10px] text-slate-300 font-semibold"
                          >
                            {t}
                            <button
                              type="button"
                              onClick={() => handleListRemove("tag", idx)}
                              className="text-slate-500 hover:text-rose-400"
                            >
                              &times;
                            </button>
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Compatibility */}
                    <div className="p-4 rounded-xl border border-white/5 bg-[#090a14]/40 space-y-3">
                      <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">
                        Kompatibilitas Engine
                      </label>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={newCompat}
                          onChange={(e) => setNewCompat(e.target.value)}
                          placeholder="Unity 2021+"
                          className="w-full px-3 py-1.5 rounded-lg border border-white/8 bg-[#090a14]/80 text-slate-100 text-xs focus:outline-none focus:border-indigo-500"
                          onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), handleListAdd("compat"))}
                        />
                        <button
                          type="button"
                          onClick={() => handleListAdd("compat")}
                          className="px-3 py-1.5 bg-white/5 hover:bg-white/10 border border-white/8 rounded-lg text-xs"
                        >
                          Tambah
                        </button>
                      </div>
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {compatList.map((c, idx) => (
                          <span
                            key={idx}
                            className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-white/5 border border-white/8 text-[10px] text-slate-300 font-semibold"
                          >
                            {c}
                            <button
                              type="button"
                              onClick={() => handleListRemove("compat", idx)}
                              className="text-slate-500 hover:text-rose-400"
                            >
                              &times;
                            </button>
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Features Checklist */}
                  <div className="p-4 rounded-xl border border-white/5 bg-[#090a14]/40 space-y-3">
                    <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">
                      Checklist Fitur ("Semua yang Anda Butuhkan")
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={newFeature}
                        onChange={(e) => setNewFeature(e.target.value)}
                        placeholder="80+ komponen UI siap pakai (SVG + PNG)"
                        className="w-full px-3 py-2 rounded-lg border border-white/8 bg-[#090a14]/80 text-slate-100 text-xs focus:outline-none focus:border-indigo-500"
                        onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), handleListAdd("feature"))}
                      />
                      <button
                        type="button"
                        onClick={() => handleListAdd("feature")}
                        className="px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/8 rounded-lg text-xs"
                      >
                        Tambah
                      </button>
                    </div>
                    <ul className="space-y-1.5 pt-2 max-h-40 overflow-y-auto" role="list">
                      {featuresList.map((feat, idx) => (
                        <li key={idx} className="flex items-center justify-between text-xs text-slate-300 bg-white/[0.02] px-3 py-1.5 rounded border border-white/5">
                          <span>{feat}</span>
                          <button
                            type="button"
                            onClick={() => handleListRemove("feature", idx)}
                            className="text-slate-500 hover:text-rose-400 font-bold"
                          >
                            Hapus
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Specs Table */}
                  <div className="p-4 rounded-xl border border-white/5 bg-[#090a14]/40 space-y-3">
                    <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">
                      Spesifikasi Teknis (Tabel detail)
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                      <input
                        type="text"
                        value={newSpecLabel}
                        onChange={(e) => setNewSpecLabel(e.target.value)}
                        placeholder="Label (Format File)"
                        className="w-full px-3 py-2 rounded-lg border border-white/8 bg-[#090a14]/80 text-slate-100 text-xs focus:outline-none focus:border-indigo-500"
                      />
                      <input
                        type="text"
                        value={newSpecValue}
                        onChange={(e) => setNewSpecValue(e.target.value)}
                        placeholder="Nilai (SVG, PNG, .unitypackage)"
                        className="w-full px-3 py-2 rounded-lg border border-white/8 bg-[#090a14]/80 text-slate-100 text-xs focus:outline-none focus:border-indigo-500"
                        onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), handleListAdd("spec"))}
                      />
                      <button
                        type="button"
                        onClick={() => handleListAdd("spec")}
                        className="w-full py-2 bg-white/5 hover:bg-white/10 border border-white/8 rounded-lg text-xs"
                      >
                        Tambah Spesifikasi
                      </button>
                    </div>
                    <table className="w-full text-xs text-slate-300 divide-y divide-white/[0.04]" aria-label="Spesifikasi">
                      <tbody>
                        {specsList.map((spec, idx) => (
                          <tr key={idx}>
                            <td className="py-2 pr-4 font-semibold text-slate-400 w-1/3">{spec.label}</td>
                            <td className="py-2 pr-4 text-slate-300">{spec.value}</td>
                            <td className="py-2 text-right">
                              <button
                                type="button"
                                onClick={() => handleListRemove("spec", idx)}
                                className="text-slate-500 hover:text-rose-400 font-bold"
                              >
                                &times;
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {/* What You Get Breakdown (4 Fixed Blocks) */}
                  <div className="p-4 rounded-xl border border-white/5 bg-[#090a14]/40 space-y-4">
                    <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider block border-b border-white/[0.04] pb-2">
                      Overview "Apa yang Anda Dapatkan" (Maksimal 4 Blok)
                    </label>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* WYG 1 */}
                      <div className="p-4 rounded-lg bg-white/[0.02] border border-white/5 space-y-2.5">
                        <div className="flex gap-2">
                          <input
                            type="text"
                            value={wyg1Icon}
                            onChange={(e) => setWyg1Icon(e.target.value)}
                            placeholder="🖥️"
                            className="w-10 px-2 py-1 rounded bg-[#090a14]/80 border border-white/8 text-center text-xs"
                          />
                          <input
                            type="text"
                            value={wyg1Title}
                            onChange={(e) => setWyg1Title(e.target.value)}
                            placeholder="HUD Elements"
                            className="w-full px-2 py-1 rounded bg-[#090a14]/80 border border-white/8 text-xs font-bold text-white"
                          />
                        </div>
                        <input
                          type="text"
                          value={wyg1Desc}
                          onChange={(e) => setWyg1Desc(e.target.value)}
                          placeholder="Health bar, dialog boxes, radar..."
                          className="w-full px-2 py-1 rounded bg-[#090a14]/80 border border-white/8 text-xs text-slate-400"
                        />
                      </div>

                      {/* WYG 2 */}
                      <div className="p-4 rounded-lg bg-white/[0.02] border border-white/5 space-y-2.5">
                        <div className="flex gap-2">
                          <input
                            type="text"
                            value={wyg2Icon}
                            onChange={(e) => setWyg2Icon(e.target.value)}
                            placeholder="🔥"
                            className="w-10 px-2 py-1 rounded bg-[#090a14]/80 border border-white/8 text-center text-xs"
                          />
                          <input
                            type="text"
                            value={wyg2Title}
                            onChange={(e) => setWyg2Title(e.target.value)}
                            placeholder="Animated Props"
                            className="w-full px-2 py-1 rounded bg-[#090a14]/80 border border-white/8 text-xs font-bold text-white"
                          />
                        </div>
                        <input
                          type="text"
                          value={wyg2Desc}
                          onChange={(e) => setWyg2Desc(e.target.value)}
                          placeholder="Torches, animated doors, gold..."
                          className="w-full px-2 py-1 rounded bg-[#090a14]/80 border border-white/8 text-xs text-slate-400"
                        />
                      </div>

                      {/* WYG 3 */}
                      <div className="p-4 rounded-lg bg-white/[0.02] border border-white/5 space-y-2.5">
                        <div className="flex gap-2">
                          <input
                            type="text"
                            value={wyg3Icon}
                            onChange={(e) => setWyg3Icon(e.target.value)}
                            placeholder="📦"
                            className="w-10 px-2 py-1 rounded bg-[#090a14]/80 border border-white/8 text-center text-xs"
                          />
                          <input
                            type="text"
                            value={wyg3Title}
                            onChange={(e) => setWyg3Title(e.target.value)}
                            placeholder="PBR Textures"
                            className="w-full px-2 py-1 rounded bg-[#090a14]/80 border border-white/8 text-xs font-bold text-white"
                          />
                        </div>
                        <input
                          type="text"
                          value={wyg3Desc}
                          onChange={(e) => setWyg3Desc(e.target.value)}
                          placeholder="Albedo, normal, emission..."
                          className="w-full px-2 py-1 rounded bg-[#090a14]/80 border border-white/8 text-xs text-slate-400"
                        />
                      </div>

                      {/* WYG 4 */}
                      <div className="p-4 rounded-lg bg-white/[0.02] border border-white/5 space-y-2.5">
                        <div className="flex gap-2">
                          <input
                            type="text"
                            value={wyg4Icon}
                            onChange={(e) => setWyg4Icon(e.target.value)}
                            placeholder="🔊"
                            className="w-10 px-2 py-1 rounded bg-[#090a14]/80 border border-white/8 text-center text-xs"
                          />
                          <input
                            type="text"
                            value={wyg4Title}
                            onChange={(e) => setWyg4Title(e.target.value)}
                            placeholder="Sound FX Pack"
                            className="w-full px-2 py-1 rounded bg-[#090a14]/80 border border-white/8 text-xs font-bold text-white"
                          />
                        </div>
                        <input
                          type="text"
                          value={wyg4Desc}
                          onChange={(e) => setWyg4Desc(e.target.value)}
                          placeholder="Hover sounds, ambient clicks..."
                          className="w-full px-2 py-1 rounded bg-[#090a14]/80 border border-white/8 text-xs text-slate-400"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </form>

            {/* Footer Modal Buttons */}
            <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-white/[0.06] bg-[#090a14]/20 shrink-0">
              <button
                type="button"
                onClick={() => setModalOpen(false)}
                className="px-5 py-2.5 rounded-xl border border-white/8 hover:bg-white/5 text-slate-400 hover:text-white transition-all text-xs font-bold"
              >
                Batal
              </button>
              <button
                onClick={handleSubmit}
                disabled={loading}
                className="px-5 py-2.5 btn-primary text-white font-bold rounded-xl text-xs flex items-center gap-1.5 disabled:opacity-50"
              >
                {loading ? (
                  <>
                    <Loader2 className="h-3.5 w-3.5 animate-spin" /> Menyimpan...
                  </>
                ) : (
                  <>
                    <Save className="h-3.5 w-3.5" /> Simpan Produk
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
