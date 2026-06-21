"use client";

import { useState } from "react";
import Image from "next/image";
import { createTeamMember, updateTeamMember, deleteTeamMember } from "./actions";
import { UploadButton } from "@/lib/uploadthing";
import {
  Plus,
  Edit2,
  Trash2,
  Users,
  Image as ImageIcon,
  Save,
  X,
  Loader2,
  Eye,
  EyeOff,
} from "lucide-react";

interface TeamMember {
  id: number;
  name: string;
  role: string;
  bio: string;
  photoUrl: string;
  badge: string | null;
  displayOrder: number;
  isActive: boolean;
}

export default function TeamListClient({
  initialMembers,
}: {
  initialMembers: TeamMember[];
}) {
  const [members, setMembers] = useState<TeamMember[]>(initialMembers);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingMember, setEditingMember] = useState<TeamMember | null>(null);

  // Form States
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [bio, setBio] = useState("");
  const [photoUrl, setPhotoUrl] = useState("");
  const [badge, setBadge] = useState("");
  const [displayOrder, setDisplayOrder] = useState(0);
  const [isActive, setIsActive] = useState(true);

  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);

  const openAddModal = () => {
    setEditingMember(null);
    setName("");
    setRole("");
    setBio("");
    setPhotoUrl("");
    setBadge("");
    setDisplayOrder(members.length + 1);
    setIsActive(true);
    setModalOpen(true);
  };

  const openEditModal = (member: TeamMember) => {
    setEditingMember(member);
    setName(member.name);
    setRole(member.role);
    setBio(member.bio);
    setPhotoUrl(member.photoUrl);
    setBadge(member.badge || "");
    setDisplayOrder(member.displayOrder);
    setIsActive(member.isActive);
    setModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !role || !bio || !photoUrl) {
      alert("Nama, Peran, Bio, dan Foto wajib diisi!");
      return;
    }

    setLoading(true);
    const data = { name, role, bio, photoUrl, badge, displayOrder, isActive };

    try {
      if (editingMember) {
        const res = await updateTeamMember(editingMember.id, data);
        if (res.success) {
          setMembers((prev) =>
            prev
              .map((m) =>
                m.id === editingMember.id ? { ...m, ...data } : m
              )
              .sort((a, b) => a.displayOrder - b.displayOrder)
          );
          setModalOpen(false);
        } else {
          alert(res.error);
        }
      } else {
        const res = await createTeamMember(data);
        if (res.success) {
          // Refresh atau ambil data terbaru (karena id digenerate db, untuk kemudahan refresh page lokal)
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
    if (!confirm("Apakah Anda yakin ingin menghapus anggota tim ini secara permanen?")) {
      return;
    }

    const res = await deleteTeamMember(id);
    if (res.success) {
      setMembers((prev) => prev.filter((m) => m.id !== id));
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
            Manajemen Tim
          </h1>
          <p className="text-slate-500 text-sm">Kelola profil anggota tim yang ditampilkan di halaman Utama.</p>
        </div>

        <button
          onClick={openAddModal}
          className="inline-flex items-center gap-2 px-5 py-3 btn-primary text-white font-bold rounded-xl text-sm"
        >
          <Plus className="h-4 w-4" /> Tambah Anggota
        </button>
      </div>

      {/* Grid Profil Tim */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {members.length === 0 ? (
          <div className="md:col-span-2 p-12 text-center rounded-2xl border border-white/[0.06] bg-[#0c0d1b]/30 text-slate-500 text-sm">
            Belum ada anggota tim terdaftar. Klik "Tambah Anggota" untuk memulai.
          </div>
        ) : (
          members.map((member) => (
            <div
              key={member.id}
              className={`p-6 rounded-2xl border bg-[#0c0d1b]/60 flex flex-col justify-between gap-5 relative transition-all ${
                member.isActive
                  ? "border-white/[0.06] hover:border-white/[0.15]"
                  : "border-white/[0.03] opacity-50"
              }`}
            >
              <div className="flex items-start gap-4">
                {/* Foto Profile */}
                <div className="relative w-16 h-16 rounded-2xl overflow-hidden bg-white/5 border border-white/10 shrink-0">
                  {member.photoUrl ? (
                    <Image
                      src={member.photoUrl}
                      alt={member.name}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-slate-600">
                      <ImageIcon className="h-6 w-6" />
                    </div>
                  )}
                </div>

                <div className="space-y-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="font-bold text-white text-base truncate">{member.name}</h3>
                    {member.badge && (
                      <span className="px-2 py-0.5 rounded bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-[9px] font-bold uppercase tracking-wider">
                        {member.badge}
                      </span>
                    )}
                  </div>
                  <p className="text-indigo-400 text-xs font-semibold">{member.role}</p>
                  <p className="text-slate-400 text-xs leading-relaxed line-clamp-3 pt-1">
                    {member.bio}
                  </p>
                </div>
              </div>

              {/* Footer Actions */}
              <div className="flex items-center justify-between pt-4 border-t border-white/[0.04] mt-auto">
                <span className="text-[10px] text-slate-500 font-semibold uppercase tracking-wider">
                  Urutan: {member.displayOrder} · {!member.isActive ? "Non-Aktif" : "Aktif"}
                </span>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => openEditModal(member)}
                    className="p-2 rounded-xl bg-white/5 border border-white/8 hover:bg-white/10 hover:text-white transition-colors"
                    title="Edit Profil"
                  >
                    <Edit2 className="h-3.5 w-3.5" />
                  </button>
                  <button
                    onClick={() => handleDelete(member.id)}
                    className="p-2 rounded-xl bg-white/5 border border-white/8 hover:bg-rose-500/10 hover:border-rose-500/20 hover:text-rose-400 transition-colors"
                    title="Hapus Profil"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
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

          {/* Modal Content */}
          <div className="relative w-full max-w-lg rounded-2xl border border-white/[0.08] bg-[#0c0d1b] p-6 md:p-8 shadow-2xl backdrop-blur-xl space-y-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-white/[0.06] pb-4">
              <h2
                className="text-lg font-bold text-white"
                style={{ fontFamily: "var(--font-sora)" }}
              >
                {editingMember ? "Edit Anggota Tim" : "Tambah Anggota Tim"}
              </h2>
              <button onClick={() => setModalOpen(false)} className="text-slate-500 hover:text-white">
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Name */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                  Nama Lengkap
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Ahmad Nurulloh"
                  className="w-full px-4 py-2.5 rounded-xl border border-white/8 bg-[#090a14]/60 text-slate-100 placeholder-slate-600 focus:outline-none focus:border-indigo-500 transition-colors text-sm"
                />
              </div>

              {/* Role & Badge */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                    Peran / Jabatan
                  </label>
                  <input
                    type="text"
                    required
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    placeholder="Lead Software Architect"
                    className="w-full px-4 py-2.5 rounded-xl border border-white/8 bg-[#090a14]/60 text-slate-100 placeholder-slate-600 focus:outline-none focus:border-indigo-500 transition-colors text-sm"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                    Badge / Angkatan (Opsional)
                  </label>
                  <input
                    type="text"
                    value={badge}
                    onChange={(e) => setBadge(e.target.value)}
                    placeholder="Co-Founder"
                    className="w-full px-4 py-2.5 rounded-xl border border-white/8 bg-[#090a14]/60 text-slate-100 placeholder-slate-600 focus:outline-none focus:border-indigo-500 transition-colors text-sm"
                  />
                </div>
              </div>

              {/* Bio */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                  Bio / Deskripsi Singkat
                </label>
                <textarea
                  required
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  placeholder="Tulis biografi singkat anggota..."
                  className="w-full h-24 p-3 rounded-xl border border-white/8 bg-[#090a14]/60 text-slate-100 placeholder-slate-600 focus:outline-none focus:border-indigo-500 transition-colors text-sm resize-none"
                />
              </div>

              {/* Display Order & Active */}
              <div className="grid grid-cols-2 gap-4 items-center">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                    Urutan Tampilan
                  </label>
                  <input
                    type="number"
                    required
                    value={displayOrder}
                    onChange={(e) => setDisplayOrder(parseInt(e.target.value) || 0)}
                    className="w-full px-4 py-2.5 rounded-xl border border-white/8 bg-[#090a14]/60 text-slate-100 focus:outline-none focus:border-indigo-500 transition-colors text-sm"
                  />
                </div>
                <div className="flex items-center gap-2 pt-6">
                  <button
                    type="button"
                    onClick={() => setIsActive(!isActive)}
                    className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-white"
                  >
                    {isActive ? (
                      <>
                        <Eye className="h-4 w-4 text-emerald-400" /> Profil Aktif (Tampil)
                      </>
                    ) : (
                      <>
                        <EyeOff className="h-4 w-4 text-slate-600" /> Non-Aktif (Sembunyikan)
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Photo Upload */}
              <div className="p-4 rounded-xl border border-white/5 bg-[#090a14]/60 space-y-3">
                <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">
                  Foto Profil
                </label>
                
                <div className="flex items-center gap-4">
                  {/* Preview */}
                  <div className="relative w-16 h-16 rounded-xl overflow-hidden bg-white/5 border border-white/10 shrink-0">
                    {photoUrl ? (
                      <Image src={photoUrl} alt="Preview" fill className="object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-slate-600">
                        <ImageIcon className="h-5 w-5" />
                      </div>
                    )}
                  </div>

                  {/* Uploadthing Button */}
                  <div className="flex-1">
                    <UploadButton
                      endpoint="teamPhoto"
                      onUploadBegin={() => setUploading(true)}
                      onClientUploadComplete={(res) => {
                        if (res && res[0]) {
                          setPhotoUrl(res[0].url);
                          setUploading(false);
                          alert("Foto berhasil diunggah!");
                        }
                      }}
                      onUploadError={(err) => {
                        setUploading(false);
                        console.error(err);
                        alert(`Gagal mengunggah foto: ${err.message}. Pastikan Anda telah mengonfigurasi API Key Uploadthing.`);
                      }}
                    />
                  </div>
                </div>
              </div>

              {/* Submit Buttons */}
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-white/[0.06]">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-5 py-2.5 rounded-xl border border-white/8 hover:bg-white/5 text-slate-400 hover:text-white transition-all text-xs font-bold"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={loading || uploading}
                  className="px-5 py-2.5 btn-primary text-white font-bold rounded-xl text-xs flex items-center gap-1.5 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <>
                      <Loader2 className="h-3.5 w-3.5 animate-spin" /> Menyimpan...
                    </>
                  ) : (
                    <>
                      <Save className="h-3.5 w-3.5" /> Simpan Profil
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
