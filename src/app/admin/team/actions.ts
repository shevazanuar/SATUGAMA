"use server";

import { db } from "@/db";
import { teamMembers } from "@/db/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export async function createTeamMember(data: {
  name: string;
  role: string;
  bio: string;
  photoUrl: string;
  badge?: string;
  displayOrder?: number;
}) {
  try {
    await db.insert(teamMembers).values({
      name: data.name,
      role: data.role,
      bio: data.bio,
      photoUrl: data.photoUrl,
      badge: data.badge || null,
      displayOrder: data.displayOrder ?? 0,
      isActive: true,
    });
    revalidatePath("/admin/team");
    revalidatePath("/");
    return { success: true };
  } catch (error) {
    console.error("❌ Gagal membuat anggota tim:", error);
    return { success: false, error: "Gagal menambahkan anggota tim." };
  }
}

export async function updateTeamMember(
  id: number,
  data: {
    name: string;
    role: string;
    bio: string;
    photoUrl: string;
    badge?: string;
    displayOrder?: number;
    isActive?: boolean;
  }
) {
  try {
    await db
      .update(teamMembers)
      .set({
        name: data.name,
        role: data.role,
        bio: data.bio,
        photoUrl: data.photoUrl,
        badge: data.badge || null,
        displayOrder: data.displayOrder ?? 0,
        isActive: data.isActive ?? true,
      })
      .where(eq(teamMembers.id, id));
    revalidatePath("/admin/team");
    revalidatePath("/");
    return { success: true };
  } catch (error) {
    console.error("❌ Gagal mengupdate anggota tim:", error);
    return { success: false, error: "Gagal memperbarui anggota tim." };
  }
}

export async function deleteTeamMember(id: number) {
  try {
    await db.delete(teamMembers).where(eq(teamMembers.id, id));
    revalidatePath("/admin/team");
    revalidatePath("/");
    return { success: true };
  } catch (error) {
    console.error("❌ Gagal menghapus anggota tim:", error);
    return { success: false, error: "Gagal menghapus anggota tim." };
  }
}
