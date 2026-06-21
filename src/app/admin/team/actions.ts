"use server";

import { db } from "@/db";
import { teamMembers } from "@/db/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

const createTeamMemberSchema = z.object({
  name: z.string().min(1),
  role: z.string().min(1),
  bio: z.string().min(1),
  photoUrl: z.string().url().or(z.string().startsWith("/")),
  badge: z.string().optional().nullable(),
  displayOrder: z.number().int().default(0),
});

const updateTeamMemberSchema = z.object({
  name: z.string().min(1),
  role: z.string().min(1),
  bio: z.string().min(1),
  photoUrl: z.string().url().or(z.string().startsWith("/")),
  badge: z.string().optional().nullable(),
  displayOrder: z.number().int().default(0),
  isActive: z.boolean().optional(),
});

export async function createTeamMember(data: {
  name: string;
  role: string;
  bio: string;
  photoUrl: string;
  badge?: string;
  displayOrder?: number;
}) {
  // Session check
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session) {
    throw new Error("Unauthorized access");
  }

  // Zod validation
  const validatedData = createTeamMemberSchema.parse(data);

  try {
    await db.insert(teamMembers).values({
      name: validatedData.name,
      role: validatedData.role,
      bio: validatedData.bio,
      photoUrl: validatedData.photoUrl,
      badge: validatedData.badge || null,
      displayOrder: validatedData.displayOrder,
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
  // Session check
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session) {
    throw new Error("Unauthorized access");
  }

  // Zod validation
  const validatedId = z.number().int().positive().parse(id);
  const validatedData = updateTeamMemberSchema.parse(data);

  try {
    await db
      .update(teamMembers)
      .set({
        name: validatedData.name,
        role: validatedData.role,
        bio: validatedData.bio,
        photoUrl: validatedData.photoUrl,
        badge: validatedData.badge || null,
        displayOrder: validatedData.displayOrder,
        isActive: validatedData.isActive ?? true,
      })
      .where(eq(teamMembers.id, validatedId));
    revalidatePath("/admin/team");
    revalidatePath("/");
    return { success: true };
  } catch (error) {
    console.error("❌ Gagal mengupdate anggota tim:", error);
    return { success: false, error: "Gagal memperbarui anggota tim." };
  }
}

export async function deleteTeamMember(id: number) {
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
    await db.delete(teamMembers).where(eq(teamMembers.id, validatedId));
    revalidatePath("/admin/team");
    revalidatePath("/");
    return { success: true };
  } catch (error) {
    console.error("❌ Gagal menghapus anggota tim:", error);
    return { success: false, error: "Gagal menghapus anggota tim." };
  }
}
