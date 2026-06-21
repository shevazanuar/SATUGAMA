import { NextResponse } from "next/server";
import { db } from "@/db";
import { inquiries } from "@/db/schema";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, style, budget, message } = body;

    // Validasi input sederhana
    if (!name || !email || !message) {
      return NextResponse.json(
        { success: false, error: "Nama, email, dan pesan wajib diisi." },
        { status: 400 }
      );
    }

    // Insert ke database
    const [inserted] = await db
      .insert(inquiries)
      .values({
        name,
        email,
        assetStyle: style,
        budget,
        message,
        status: "new",
      })
      .returning({ id: inquiries.id });

    return NextResponse.json({ success: true, id: inserted.id });
  } catch (error) {
    console.error("❌ Error di API Contact:", error);
    return NextResponse.json(
      { success: false, error: "Terjadi kesalahan internal pada server. Silakan coba lagi nanti." },
      { status: 500 }
    );
  }
}
