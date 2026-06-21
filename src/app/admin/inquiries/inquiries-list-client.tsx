"use client";

import { useState } from "react";
import {
  updateInquiryStatus,
  updateInquiryNotes,
  deleteInquiry,
} from "./actions";
import {
  Search,
  Clock,
  CheckCircle2,
  AlertCircle,
  FileText,
  Trash2,
  Mail,
  DollarSign,
  Gamepad2,
  Calendar,
  Save,
  Loader2,
  ChevronDown,
} from "lucide-react";

interface Inquiry {
  id: number;
  name: string;
  email: string;
  assetStyle: string | null;
  budget: string | null;
  message: string;
  status: "new" | "in_progress" | "done" | "rejected";
  notes: string | null;
  createdAt: Date;
}

export default function InquiriesListClient({
  initialInquiries,
}: {
  initialInquiries: Inquiry[];
}) {
  const [inquiriesList, setInquiriesList] = useState<Inquiry[]>(initialInquiries);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [activeInquiry, setActiveInquiry] = useState<Inquiry | null>(null);
  const [tempNotes, setTempNotes] = useState("");
  const [savingNotesId, setSavingNotesId] = useState<number | null>(null);
  const [updatingStatusId, setUpdatingStatusId] = useState<number | null>(null);

  // Filter inquiries berdasarkan pencarian & status
  const filteredInquiries = inquiriesList.filter((inq) => {
    const matchesSearch =
      inq.name.toLowerCase().includes(search.toLowerCase()) ||
      inq.email.toLowerCase().includes(search.toLowerCase()) ||
      inq.message.toLowerCase().includes(search.toLowerCase());

    const matchesStatus = statusFilter === "all" || inq.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const handleStatusChange = async (id: number, newStatus: any) => {
    setUpdatingStatusId(id);
    const res = await updateInquiryStatus(id, newStatus);
    if (res.success) {
      setInquiriesList((prev) =>
        prev.map((i) => (i.id === id ? { ...i, status: newStatus } : i))
      );
      if (activeInquiry?.id === id) {
        setActiveInquiry((prev) => (prev ? { ...prev, status: newStatus } : null));
      }
    } else {
      alert("Gagal mengupdate status.");
    }
    setUpdatingStatusId(null);
  };

  const handleNotesSave = async (id: number) => {
    setSavingNotesId(id);
    const res = await updateInquiryNotes(id, tempNotes);
    if (res.success) {
      setInquiriesList((prev) =>
        prev.map((i) => (i.id === id ? { ...i, notes: tempNotes } : i))
      );
      if (activeInquiry?.id === id) {
        setActiveInquiry((prev) => (prev ? { ...prev, notes: tempNotes } : null));
      }
      alert("Catatan internal berhasil disimpan!");
    } else {
      alert("Gagal menyimpan catatan.");
    }
    setSavingNotesId(null);
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Apakah Anda yakin ingin menghapus pesan ini secara permanen?")) {
      return;
    }

    const res = await deleteInquiry(id);
    if (res.success) {
      setInquiriesList((prev) => prev.filter((i) => i.id !== id));
      if (activeInquiry?.id === id) {
        setActiveInquiry(null);
      }
    } else {
      alert("Gagal menghapus pesan.");
    }
  };

  const selectInquiry = (inq: Inquiry) => {
    setActiveInquiry(inq);
    setTempNotes(inq.notes || "");
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
            Inquiries (Pesan Masuk)
          </h1>
          <p className="text-slate-500 text-sm">Kelola pesan dan permintaan pengerjaan aset dari klien potensial.</p>
        </div>
      </div>

      {/* Konten Utama */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        {/* Left / Middle: List & Filters */}
        <div className="lg:col-span-2 space-y-4">
          {/* Filters Bar */}
          <div className="flex flex-col sm:flex-row gap-3">
            {/* Search Input */}
            <div className="relative flex-1">
              <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-500" aria-hidden="true">
                <Search className="h-4 w-4" />
              </span>
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Cari nama, email, pesan..."
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-white/8 bg-[#0c0d1b]/60 text-slate-100 placeholder-slate-600 focus:outline-none focus:border-indigo-500 transition-colors text-sm"
              />
            </div>

            {/* Filter Status */}
            <div className="flex gap-1.5 overflow-x-auto pb-1 sm:pb-0">
              {[
                { label: "Semua", value: "all" },
                { label: "Baru", value: "new" },
                { label: "Diproses", value: "in_progress" },
                { label: "Selesai", value: "done" },
                { label: "Ditolak", value: "rejected" },
              ].map((filter) => (
                <button
                  key={filter.value}
                  onClick={() => setStatusFilter(filter.value)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap border ${
                    statusFilter === filter.value
                      ? "bg-indigo-500/15 border-indigo-500/30 text-indigo-400"
                      : "bg-[#0c0d1b]/60 border-white/5 text-slate-400 hover:text-slate-200"
                  }`}
                >
                  {filter.label}
                </button>
              ))}
            </div>
          </div>

          {/* Cards List */}
          <div className="space-y-3">
            {filteredInquiries.length === 0 ? (
              <div className="p-12 text-center rounded-2xl border border-white/[0.06] bg-[#0c0d1b]/30 text-slate-500 text-sm">
                Tidak ada inquiries yang cocok dengan filter atau pencarian Anda.
              </div>
            ) : (
              filteredInquiries.map((inq) => {
                const isActive = activeInquiry?.id === inq.id;
                return (
                  <div
                    key={inq.id}
                    onClick={() => selectInquiry(inq)}
                    className={`p-5 rounded-2xl border transition-all cursor-pointer flex flex-col sm:flex-row sm:items-start justify-between gap-4 ${
                      isActive
                        ? "bg-indigo-500/5 border-indigo-500/35"
                        : "bg-[#0c0d1b]/60 border-white/[0.06] hover:bg-white/[0.01]"
                    }`}
                  >
                    <div className="space-y-2 min-w-0">
                      <div className="flex items-center gap-2.5 flex-wrap">
                        <h3 className="font-bold text-white text-sm truncate">{inq.name}</h3>
                        <span className="text-slate-500 text-xs truncate">({inq.email})</span>
                      </div>
                      <p className="text-slate-400 text-xs line-clamp-2 leading-relaxed">
                        {inq.message}
                      </p>
                      
                      <div className="flex items-center gap-3 pt-1 text-[10px] text-slate-500 flex-wrap">
                        <span className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {new Date(inq.createdAt).toLocaleDateString("id-ID", {
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                          })}
                        </span>
                        {inq.assetStyle && (
                          <span className="flex items-center gap-1 px-1.5 py-0.5 rounded bg-white/5 border border-white/8">
                            <Gamepad2 className="h-2.5 w-2.5" /> {inq.assetStyle}
                          </span>
                        )}
                        {inq.budget && (
                          <span className="flex items-center gap-0.5 px-1.5 py-0.5 rounded bg-white/5 border border-white/8 text-amber-500 font-medium">
                            <DollarSign className="h-2.5 w-2.5" /> Budget: {inq.budget}
                          </span>
                        )}
                        {inq.notes && (
                          <span className="flex items-center gap-1 text-indigo-400">
                            <FileText className="h-3 w-3" /> Ada Catatan
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Status & Actions Column */}
                    <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-start gap-3 mt-2 sm:mt-0 shrink-0">
                      {/* Dropdown status */}
                      <div className="relative">
                        <select
                          value={inq.status}
                          disabled={updatingStatusId === inq.id}
                          onChange={(e) => handleStatusChange(inq.id, e.target.value as any)}
                          onClick={(e) => e.stopPropagation()} // cegah trigger selectInquiry
                          className={`appearance-none pl-3 pr-8 py-1.5 rounded-lg border text-[10px] font-black uppercase tracking-wider focus:outline-none cursor-pointer ${
                            inq.status === "new"
                              ? "bg-amber-500/10 border-amber-500/20 text-amber-400"
                              : inq.status === "in_progress"
                              ? "bg-indigo-500/10 border-indigo-500/20 text-indigo-400"
                              : inq.status === "done"
                              ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-400"
                              : "bg-slate-500/10 border-white/8 text-slate-400"
                          }`}
                        >
                          <option value="new">Baru</option>
                          <option value="in_progress">Diproses</option>
                          <option value="done">Selesai</option>
                          <option value="rejected">Ditolak</option>
                        </select>
                        <ChevronDown className="h-3.5 w-3.5 absolute right-2 top-2 pointer-events-none text-slate-500" />
                      </div>

                      {/* Delete button */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDelete(inq.id);
                        }}
                        className="p-2 rounded-lg bg-white/5 border border-white/8 hover:bg-rose-500/10 hover:border-rose-500/20 hover:text-rose-400 transition-colors"
                        title="Hapus Pesan"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Right Sidebar: Details & Internal Notes */}
        <div className="lg:col-span-1">
          {activeInquiry ? (
            <div className="rounded-2xl border border-white/[0.06] bg-[#0c0d1b]/80 p-6 space-y-6 sticky top-24 shadow-xl">
              <div>
                <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">
                  Detail Inquiry #{activeInquiry.id}
                </span>
                <h2
                  className="text-lg font-bold text-white mt-1"
                  style={{ fontFamily: "var(--font-sora)" }}
                >
                  {activeInquiry.name}
                </h2>
                <a
                  href={`mailto:${activeInquiry.email}`}
                  className="text-xs text-indigo-400 hover:underline flex items-center gap-1.5 mt-1.5"
                >
                  <Mail className="h-3 w-3" /> {activeInquiry.email}
                </a>
              </div>

              {/* Detail fields */}
              <div className="space-y-4 text-xs">
                <div>
                  <div className="text-slate-500 mb-1">Gaya Desain Aset</div>
                  <div className="text-slate-200 font-semibold bg-white/5 px-3 py-2 rounded-lg border border-white/8">
                    {activeInquiry.assetStyle || "—"}
                  </div>
                </div>
                <div>
                  <div className="text-slate-500 mb-1">Budget Pembelian</div>
                  <div className="text-slate-200 font-semibold bg-white/5 px-3 py-2 rounded-lg border border-white/8">
                    {activeInquiry.budget || "—"}
                  </div>
                </div>
                <div>
                  <div className="text-slate-500 mb-1">Isi Pesan Klien</div>
                  <div className="text-slate-300 bg-white/5 px-4 py-3 rounded-lg border border-white/8 leading-relaxed max-h-48 overflow-y-auto whitespace-pre-wrap">
                    {activeInquiry.message}
                  </div>
                </div>
              </div>

              {/* Internal Notes */}
              <div className="pt-5 border-t border-white/[0.06] space-y-3">
                <div className="flex items-center justify-between">
                  <label htmlFor="notes-area" className="text-xs font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                    <FileText className="h-3.5 w-3.5" /> Catatan Admin Internal
                  </label>
                  {savingNotesId === activeInquiry.id && (
                    <Loader2 className="h-3 w-3 text-indigo-400 animate-spin" />
                  )}
                </div>
                <textarea
                  id="notes-area"
                  value={tempNotes}
                  onChange={(e) => setTempNotes(e.target.value)}
                  placeholder="Tambahkan catatan khusus untuk proyek/klien ini (misal: sudah dihubungi via email, deal budget, dll)..."
                  className="w-full h-28 p-3 rounded-xl border border-white/8 bg-[#090a14]/80 text-slate-200 placeholder-slate-600 focus:outline-none focus:border-indigo-500 transition-colors text-xs resize-none"
                />
                <button
                  onClick={() => handleNotesSave(activeInquiry.id)}
                  disabled={savingNotesId === activeInquiry.id || tempNotes === (activeInquiry.notes || "")}
                  className="w-full flex items-center justify-center gap-1.5 py-2.5 btn-primary text-white font-bold rounded-xl text-xs disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Save className="h-3.5 w-3.5" />
                  Simpan Catatan
                </button>
              </div>
            </div>
          ) : (
            <div className="rounded-2xl border border-white/[0.06] bg-[#0c0d1b]/30 p-8 text-center text-slate-600 text-xs">
              Pilih salah satu pesan masuk untuk melihat detail dan menambahkan catatan internal admin.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
