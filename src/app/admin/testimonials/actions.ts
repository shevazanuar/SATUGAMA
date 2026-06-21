"use server";

import { db } from "@/db";
import { testimonials } from "@/db/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export async function approveTestimonial(id: number, isApproved: boolean) {
  // Session check
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session) {
    throw new Error("Unauthorized access");
  }

  // Zod validation
  const validatedId = z.number().int().positive().parse(id);
  const validatedIsApproved = z.boolean().parse(isApproved);

  try {
    await db
      .update(testimonials)
      .set({ isApproved: validatedIsApproved })
      .where(eq(testimonials.id, validatedId));
    revalidatePath("/admin/testimonials");
    revalidatePath("/admin");
    return { success: true };
  } catch (error) {
    console.error("❌ Gagal menyetujui testimonial:", error);
    return { success: false, error: "Gagal memproses persetujuan ulasan." };
  }
}

export async function deleteTestimonial(id: number) {
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
    await db.delete(testimonials).where(eq(testimonials.id, validatedId));
    revalidatePath("/admin/testimonials");
    revalidatePath("/admin");
    return { success: true };
  } catch (error) {
    console.error("❌ Gagal menghapus testimonial:", error);
    return { success: false, error: "Gagal menghapus ulasan." };
  }
}
