import { db } from "@/db";
import { teamMembers } from "@/db/schema";
import { asc } from "drizzle-orm";
import TeamListClient from "./team-list-client";

export const dynamic = "force-dynamic";

export default async function TeamAdminPage() {
  // Ambil seluruh data anggota tim, diurutkan berdasarkan urutan tampilan
  const allMembers = await db
    .select()
    .from(teamMembers)
    .orderBy(asc(teamMembers.displayOrder));

  return <TeamListClient initialMembers={allMembers} />;
}
