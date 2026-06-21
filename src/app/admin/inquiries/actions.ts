"use server";

import { db } from "@/db";
import { inquiries } from "@/db/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export async function updateInquiryStatus(
  id: number,
  status: "new" | "in_progress" | "done" | "rejected"
) {
  // Session check
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session) {
    throw new Error("Unauthorized access");
  }

  // Zod validation
  const validatedId = z.number().int().positive().parse(id);
  const validatedStatus = z.enum(["new", "in_progress", "done", "rejected"]).parse(status);

  try {
    await db.update(inquiries).set({ status: validatedStatus }).where(eq(inquiries.id, validatedId));
    revalidatePath("/admin/inquiries");
    revalidatePath("/admin");
    return { success: true };
  } catch (error) {
    console.error("❌ Gagal mengupdate status inquiry:", error);
    return { success: false, error: "Gagal memperbarui status." };
  }
}

export async function updateInquiryNotes(id: number, notes: string) {
  // Session check
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session) {
    throw new Error("Unauthorized access");
  }

  // Zod validation
  const validatedId = z.number().int().positive().parse(id);
  const validatedNotes = z.string().parse(notes);

  try {
    await db.update(inquiries).set({ notes: validatedNotes }).where(eq(inquiries.id, validatedId));
    revalidatePath("/admin/inquiries");
    return { success: true };
  } catch (error) {
    console.error("❌ Gagal menyimpan catatan inquiry:", error);
    return { success: false, error: "Gagal menyimpan catatan." };
  }
}

export async function deleteInquiry(id: number) {
  // Session check
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session) {
    throw new Error("Unauthorized access");
  }

  // Zod validation
  const validatedId = z.number().int().positive().parse(id);

  try {
    await db.delete(inquiries).where(eq(inquiries.id, validatedId));
    revalidatePath("/admin/inquiries");
    revalidatePath("/admin");
    return { success: true };
  } catch (error) {
    console.error("❌ Gagal menghapus inquiry:", error);
    return { success: false, error: "Gagal menghapus pesan." };
  }
}
