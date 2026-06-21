"use server";

import { db } from "@/db";
import { testimonials } from "@/db/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export async function approveTestimonial(id: number, isApproved: boolean) {
  try {
    await db
      .update(testimonials)
      .set({ isApproved })
      .where(eq(testimonials.id, id));
    revalidatePath("/admin/testimonials");
    revalidatePath("/admin");
    return { success: true };
  } catch (error) {
    console.error("❌ Gagal menyetujui testimonial:", error);
    return { success: false, error: "Gagal memproses persetujuan ulasan." };
  }
}

export async function deleteTestimonial(id: number) {
  try {
    await db.delete(testimonials).where(eq(testimonials.id, id));
    revalidatePath("/admin/testimonials");
    revalidatePath("/admin");
    return { success: true };
  } catch (error) {
    console.error("❌ Gagal menghapus testimonial:", error);
    return { success: false, error: "Gagal menghapus ulasan." };
  }
}
