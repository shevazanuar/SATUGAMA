"use server";

import { db } from "@/db";
import { inquiries } from "@/db/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export async function updateInquiryStatus(
  id: number,
  status: "new" | "in_progress" | "done" | "rejected"
) {
  try {
    await db.update(inquiries).set({ status }).where(eq(inquiries.id, id));
    revalidatePath("/admin/inquiries");
    revalidatePath("/admin");
    return { success: true };
  } catch (error) {
    console.error("❌ Gagal mengupdate status inquiry:", error);
    return { success: false, error: "Gagal memperbarui status." };
  }
}

export async function updateInquiryNotes(id: number, notes: string) {
  try {
    await db.update(inquiries).set({ notes }).where(eq(inquiries.id, id));
    revalidatePath("/admin/inquiries");
    return { success: true };
  } catch (error) {
    console.error("❌ Gagal menyimpan catatan inquiry:", error);
    return { success: false, error: "Gagal menyimpan catatan." };
  }
}

export async function deleteInquiry(id: number) {
  try {
    await db.delete(inquiries).where(eq(inquiries.id, id));
    revalidatePath("/admin/inquiries");
    revalidatePath("/admin");
    return { success: true };
  } catch (error) {
    console.error("❌ Gagal menghapus inquiry:", error);
    return { success: false, error: "Gagal menghapus pesan." };
  }
}
