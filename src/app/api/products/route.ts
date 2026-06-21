import { NextResponse } from "next/server";
import { db } from "@/db";

export async function GET() {
  try {
    const allProducts = await db.query.products.findMany({
      where: (products, { eq }) => eq(products.isPublished, true),
      with: {
        images: true,
        features: true,
        tags: true,
        specs: true,
        compatibility: true,
      },
    });

    return NextResponse.json({ success: true, products: allProducts });
  } catch (error) {
    console.error("❌ Error fetching products from DB:", error);
    return NextResponse.json(
      { success: false, error: "Gagal mengambil data produk dari database." },
      { status: 500 }
    );
  }
}
