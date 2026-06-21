"use server";

import { db } from "@/db";
import {
  products,
  productFeatures,
  productSpecs,
  productCompatibility,
  productTags,
} from "@/db/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export async function createProductAction(
  productData: any,
  lists: {
    features: string[];
    specs: Array<{ label: string; value: string }>;
    compatibility: string[];
    tags: string[];
  }
) {
  try {
    // 1. Insert product
    const [insertedProduct] = await db
      .insert(products)
      .values(productData)
      .returning({ id: products.id });

    const productId = insertedProduct.id;

    // 2. Insert features
    if (lists.features.length > 0) {
      await db.insert(productFeatures).values(
        lists.features.map((feat, index) => ({
          productId,
          featureText: feat,
          displayOrder: index,
        }))
      );
    }

    // 3. Insert specs
    if (lists.specs.length > 0) {
      await db.insert(productSpecs).values(
        lists.specs.map((spec, index) => ({
          productId,
          label: spec.label,
          value: spec.value,
          displayOrder: index,
        }))
      );
    }

    // 4. Insert compatibility
    if (lists.compatibility.length > 0) {
      await db.insert(productCompatibility).values(
        lists.compatibility.map((engine) => ({
          productId,
          engineName: engine,
        }))
      );
    }

    // 5. Insert tags
    if (lists.tags.length > 0) {
      await db.insert(productTags).values(
        lists.tags.map((tag) => ({
          productId,
          tag,
        }))
      );
    }

    revalidatePath("/admin/products");
    revalidatePath("/catalog/[slug]", "layout");
    revalidatePath("/");
    return { success: true, id: productId };
  } catch (error) {
    console.error("❌ Gagal membuat produk:", error);
    return { success: false, error: "Gagal membuat produk di database." };
  }
}

export async function updateProductAction(
  id: number,
  productData: any,
  lists: {
    features: string[];
    specs: Array<{ label: string; value: string }>;
    compatibility: string[];
    tags: string[];
  }
) {
  try {
    // 1. Update product main data
    await db.update(products).set(productData).where(eq(products.id, id));

    // 2. Transaksi menghapus data relasi lama & memasukkan data baru
    // Hapus lama
    await db.delete(productFeatures).where(eq(productFeatures.productId, id));
    await db.delete(productSpecs).where(eq(productSpecs.productId, id));
    await db.delete(productCompatibility).where(eq(productCompatibility.productId, id));
    await db.delete(productTags).where(eq(productTags.productId, id));

    // Masukkan baru - features
    if (lists.features.length > 0) {
      await db.insert(productFeatures).values(
        lists.features.map((feat, index) => ({
          productId: id,
          featureText: feat,
          displayOrder: index,
        }))
      );
    }

    // Masukkan baru - specs
    if (lists.specs.length > 0) {
      await db.insert(productSpecs).values(
        lists.specs.map((spec, index) => ({
          productId: id,
          label: spec.label,
          value: spec.value,
          displayOrder: index,
        }))
      );
    }

    // Masukkan baru - compatibility
    if (lists.compatibility.length > 0) {
      await db.insert(productCompatibility).values(
        lists.compatibility.map((engine) => ({
          productId: id,
          engineName: engine,
        }))
      );
    }

    // Masukkan baru - tags
    if (lists.tags.length > 0) {
      await db.insert(productTags).values(
        lists.tags.map((tag) => ({
          productId: id,
          tag,
        }))
      );
    }

    revalidatePath("/admin/products");
    revalidatePath("/catalog/[slug]", "layout");
    revalidatePath("/");
    return { success: true };
  } catch (error) {
    console.error("❌ Gagal mengupdate produk:", error);
    return { success: false, error: "Gagal memperbarui data produk." };
  }
}

export async function deleteProductAction(id: number) {
  try {
    // Cascade delete di DB akan menghapus semua relasi secara otomatis
    await db.delete(products).where(eq(products.id, id));
    
    revalidatePath("/admin/products");
    revalidatePath("/catalog/[slug]", "layout");
    revalidatePath("/");
    return { success: true };
  } catch (error) {
    console.error("❌ Gagal menghapus produk:", error);
    return { success: false, error: "Gagal menghapus produk." };
  }
}
