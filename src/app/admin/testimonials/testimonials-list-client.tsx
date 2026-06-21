"use client";

import { useState } from "react";
import { approveTestimonial, deleteTestimonial } from "./actions";
import {
  Search,
  Check,
  X,
  Trash2,
  Star,
  MessageSquare,
  Package,
  Calendar,
  AlertCircle,
} from "lucide-react";

interface Testimonial {
  id: number;
  reviewerName: string;
  reviewerCompany: string;
  content: string;
  rating: number;
  productId: number | null;
  isApproved: boolean;
  createdAt: Date;
  product?: {
    title: string;
  } | null;
}

export default function TestimonialsListClient({
  initialTestimonials,
}: {
  initialTestimonials: Testimonial[];
}) {
  const [testimonialsList, setTestimonialsList] = useState<Testimonial[]>(initialTestimonials);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<string>("all"); // 'all', 'approved', 'pending'

  const filteredTestimonials = testimonialsList.filter((item) => {
    const matchesSearch =
      item.reviewerName.toLowerCase().includes(search.toLowerCase()) ||
      item.reviewerCompany.toLowerCase().includes(search.toLowerCase()) ||
      item.content.toLowerCase().includes(search.toLowerCase());

    const matchesStatus =
      filter === "all" ||
      (filter === "approved" && item.isApproved) ||
      (filter === "pending" && !item.isApproved);

    return matchesSearch && matchesStatus;
  });

  const handleApproveToggle = async (id: number, currentApproved: boolean) => {
    const nextApproved = !currentApproved;
    const res = await approveTestimonial(id, nextApproved);
    if (res.success) {
      setTestimonialsList((prev) =>
        prev.map((t) => (t.id === id ? { ...t, isApproved: nextApproved } : t))
      );
    } else {
      alert("Gagal memproses persetujuan ulasan.");
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Apakah Anda yakin ingin menghapus testimonial ini?")) {
      return;
    }

    const res = await deleteTestimonial(id);
    if (res.success) {
      setTestimonialsList((prev) => prev.filter((t) => t.id !== id));
    } else {
      alert("Gagal menghapus testimonial.");
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1
          className="text-3xl font-black text-white tracking-tight"
          style={{ fontFamily: "var(--font-sora)" }}
        >
          Moderasi Testimonial
        </h1>
        <p className="text-slate-500 text-sm">
          Setujui atau tolak ulasan masuk dari klien untuk ditampilkan di situs web utama.
        </p>
      </div>

      {/* Filter & Search */}
      <div className="flex flex-col sm:flex-row gap-3">
        {/* Search */}
        <div className="relative flex-1">
          <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-500" aria-hidden="true">
            <Search className="h-4 w-4" />
          </span>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Cari nama reviewer, perusahaan, isi ulasan..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-white/8 bg-[#0c0d1b]/60 text-slate-100 placeholder-slate-600 focus:outline-none focus:border-indigo-500 transition-colors text-sm"
          />
        </div>

        {/* Filter Buttons */}
        <div className="flex gap-1.5">
          {[
            { label: "Semua", value: "all" },
            { label: "Disetujui", value: "approved" },
            { label: "Tertunda", value: "pending" },
          ].map((btn) => (
            <button
              key={btn.value}
              onClick={() => setFilter(btn.value)}
              className={`px-4 py-2 rounded-xl text-xs font-bold border transition-all whitespace-nowrap ${
                filter === btn.value
                  ? "bg-indigo-500/15 border-indigo-500/30 text-indigo-400"
                  : "bg-[#0c0d1b]/60 border-white/5 text-slate-400 hover:text-slate-200"
              }`}
            >
              {btn.label}
            </button>
          ))}
        </div>
      </div>

      {/* Grid List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {filteredTestimonials.length === 0 ? (
          <div className="md:col-span-2 p-12 text-center rounded-2xl border border-white/[0.06] bg-[#0c0d1b]/30 text-slate-500 text-sm">
            Tidak ada testimonial yang cocok dengan kriteria pencarian/filter.
          </div>
        ) : (
          filteredTestimonials.map((item) => (
            <div
              key={item.id}
              className={`p-6 rounded-2xl border bg-[#0c0d1b]/60 flex flex-col justify-between gap-5 transition-all ${
                item.isApproved
                  ? "border-emerald-500/15 hover:border-emerald-500/30"
                  : "border-amber-500/15 hover:border-amber-500/30"
              }`}
            >
              <div className="space-y-4">
                {/* Header Card (Reviewer Details & Rating) */}
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="font-bold text-white text-base leading-snug">{item.reviewerName}</h3>
                    <p className="text-slate-500 text-xs mt-0.5">{item.reviewerCompany}</p>
                  </div>
                  {/* Rating Stars */}
                  <div className="flex items-center gap-0.5" aria-label={`Rating ${item.rating} bintang`}>
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-3.5 w-3.5 ${
                          i < item.rating
                            ? "text-amber-400 fill-amber-400"
                            : "text-slate-700"
                        }`}
                      />
                    ))}
                  </div>
                </div>

                {/* Content */}
                <p className="text-slate-300 text-xs leading-relaxed italic bg-white/5 p-4 rounded-xl border border-white/5">
                  "{item.content}"
                </p>

                {/* Meta Details */}
                <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-[10px] text-slate-500">
                  <span className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    {new Date(item.createdAt).toLocaleDateString("id-ID", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </span>
                  {item.product && (
                    <span className="flex items-center gap-1 text-slate-400">
                      <Package className="h-3 w-3 text-indigo-400" />
                      Produk: <strong className="text-slate-300">{item.product.title}</strong>
                    </span>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-between pt-4 border-t border-white/[0.04] mt-auto">
                <div className="flex items-center gap-2">
                  {item.isApproved ? (
                    <button
                      onClick={() => handleApproveToggle(item.id, item.isApproved)}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-emerald-500/20 bg-emerald-500/10 text-emerald-400 text-xs font-bold"
                    >
                      <Check className="h-3.5 w-3.5" /> Disetujui (Tampil)
                    </button>
                  ) : (
                    <button
                      onClick={() => handleApproveToggle(item.id, item.isApproved)}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-amber-500/20 bg-amber-500/5 text-amber-400 text-xs font-bold"
                    >
                      <AlertCircle className="h-3.5 w-3.5" /> Tertunda (Disembunyikan)
                    </button>
                  )}
                </div>

                <button
                  onClick={() => handleDelete(item.id)}
                  className="p-2 rounded-xl bg-white/5 border border-white/8 hover:bg-rose-500/10 hover:border-rose-500/20 hover:text-rose-400 transition-colors"
                  title="Hapus Testimonial"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
