import { db } from "@/db";
import { PRODUCTS, type Product } from "@/data/products";

/**
 * Mengambil daftar seluruh produk dari database (dengan relasi)
 * Jika database bermasalah atau kosong, akan fallback ke data statis
 */
export async function getProductsFromDb(): Promise<Product[]> {
  try {
    const dbProducts = await db.query.products.findMany({
      where: (p, { eq }) => eq(p.isPublished, true),
      with: {
        features: { orderBy: (f, { asc }) => [asc(f.displayOrder)] },
        specs: { orderBy: (s, { asc }) => [asc(s.displayOrder)] },
        compatibility: true,
        tags: true,
      },
    });

    if (!dbProducts || dbProducts.length === 0) {
      console.warn("ℹ️ Database produk kosong. Menggunakan data produk statis.");
      return PRODUCTS;
    }

    return dbProducts.map((p) => ({
      id: p.id,
      slug: p.slug,
      category: p.category,
      title: p.title,
      tagline: p.tagline,
      shortDesc: p.shortDesc,
      longDesc: p.longDesc,
      price: p.price,
      priceValue: p.priceValue,
      badge: p.badge,
      gradient: p.gradient,
      headerGradient: p.headerGradient,
      iconBg: p.iconBg,
      accentColor: p.accentColor,
      ctaBorder: p.ctaBorder,
      releaseDate: p.releaseDate,
      version: p.version,
      fileSize: p.fileSize,
      features: p.features.map((f) => f.featureText),
      whatYouGet: p.whatYouGet,
      specs: p.specs.map((s) => ({ label: s.label, value: s.value })),
      compatibility: p.compatibility.map((c) => c.engineName),
      tags: p.tags.map((t) => t.tag),
    }));
  } catch (error) {
    console.warn("⚠️ Gagal mengambil produk dari DB (Menggunakan static fallback):", error);
    return PRODUCTS;
  }
}

/**
 * Mengambil detail satu produk berdasarkan slug dari database
 * Jika tidak ditemukan atau database bermasalah, akan fallback ke data statis
 */
export async function getProductBySlugFromDb(slug: string): Promise<Product | undefined> {
  try {
    const p = await db.query.products.findFirst({
      where: (prod, { eq }) => eq(prod.slug, slug),
      with: {
        features: { orderBy: (f, { asc }) => [asc(f.displayOrder)] },
        specs: { orderBy: (s, { asc }) => [asc(s.displayOrder)] },
        compatibility: true,
        tags: true,
      },
    });

    if (!p) {
      return PRODUCTS.find((prod) => prod.slug === slug);
    }

    return {
      id: p.id,
      slug: p.slug,
      category: p.category,
      title: p.title,
      tagline: p.tagline,
      shortDesc: p.shortDesc,
      longDesc: p.longDesc,
      price: p.price,
      priceValue: p.priceValue,
      badge: p.badge,
      gradient: p.gradient,
      headerGradient: p.headerGradient,
      iconBg: p.iconBg,
      accentColor: p.accentColor,
      ctaBorder: p.ctaBorder,
      releaseDate: p.releaseDate,
      version: p.version,
      fileSize: p.fileSize,
      features: p.features.map((f) => f.featureText),
      whatYouGet: p.whatYouGet,
      specs: p.specs.map((s) => ({ label: s.label, value: s.value })),
      compatibility: p.compatibility.map((c) => c.engineName),
      tags: p.tags.map((t) => t.tag),
    };
  } catch (error) {
    console.warn(`⚠️ Gagal mengambil produk ${slug} dari DB (Menggunakan static fallback):`, error);
    return PRODUCTS.find((prod) => prod.slug === slug);
  }
}

/**
 * Mengambil produk terkait
 */
export async function getRelatedProductsFromDb(product: Product, count = 2): Promise<Product[]> {
  const allProducts = await getProductsFromDb();
  const same = allProducts.filter(
    (p) => p.id !== product.id && p.category === product.category
  );
  const others = allProducts.filter(
    (p) => p.id !== product.id && p.category !== product.category
  );
  return [...same, ...others].slice(0, count);
}
