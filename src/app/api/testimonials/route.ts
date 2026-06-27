import { NextResponse } from "next/server";
import { db } from "@/db";
import { testimonials } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function GET() {
  try {
    // Ambil ulasan yang sudah disetujui
    const data = await db
      .select()
      .from(testimonials)
      .where(eq(testimonials.isApproved, true))
      .orderBy(testimonials.createdAt);

    return NextResponse.json({ success: true, testimonials: data });
  } catch (error) {
    console.error("❌ Error di API Testimonials GET:", error);
    return NextResponse.json(
      { success: false, error: "Gagal mengambil testimoni." },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, company, content, rating } = body;

    // Validasi input
    if (!name || !content || !rating) {
      return NextResponse.json(
        { success: false, error: "Nama, ulasan, dan rating wajib diisi." },
        { status: 400 }
      );
    }

    const ratingVal = Number(rating);
    if (isNaN(ratingVal) || ratingVal < 1 || ratingVal > 5) {
      return NextResponse.json(
        { success: false, error: "Rating harus berupa angka 1 sampai 5." },
        { status: 400 }
      );
    }

    // Masukkan testimoni baru ke database (default: isApproved = false)
    const [inserted] = await db
      .insert(testimonials)
      .values({
        reviewerName: name,
        reviewerCompany: company || "Solo Developer",
        content,
        rating: ratingVal,
        isApproved: false,
      })
      .returning({ id: testimonials.id });

    return NextResponse.json({ success: true, id: inserted.id });
  } catch (error) {
    console.error("❌ Error di API Testimonials POST:", error);
    return NextResponse.json(
      { success: false, error: "Terjadi kesalahan pada server saat mengirim testimoni." },
      { status: 500 }
    );
  }
}
