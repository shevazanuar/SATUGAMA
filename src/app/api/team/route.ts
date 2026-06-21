import { NextResponse } from "next/server";
import { db } from "@/db";
import { teamMembers } from "@/db/schema";
import { asc } from "drizzle-orm";

export async function GET() {
  try {
    const members = await db.query.teamMembers.findMany({
      where: (team, { eq }) => eq(team.isActive, true),
      orderBy: [asc(teamMembers.displayOrder)],
    });

    return NextResponse.json({ success: true, team: members });
  } catch (error) {
    console.error("❌ Error fetching team from DB:", error);
    return NextResponse.json(
      { success: false, error: "Gagal mengambil data tim dari database." },
      { status: 500 }
    );
  }
}
