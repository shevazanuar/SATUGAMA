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
import { z } from "zod";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

// Zod schemas for validation
const productDataSchema = z.object({
  slug: z.string().min(1),
  category: z.enum(["2d", "3d", "ui"]),
  title: z.string().min(1),
  tagline: z.string().min(1),
  shortDesc: z.string().min(1),
  longDesc: z.array(z.string()),
  price: z.string().min(1),
  priceValue: z.number().int().nonnegative(),
  badge: z.string().min(1),
  gradient: z.string().min(1),
  headerGradient: z.string().min(1),
  iconBg: z.string().min(1),
  accentColor: z.string().min(1),
  ctaBorder: z.string().min(1),
  releaseDate: z.string().min(1),
  version: z.string().min(1),
  fileSize: z.string().min(1),
  isFeatured: z.boolean().default(false),
  isPublished: z.boolean().default(true),
  whatYouGet: z.array(
    z.object({
      title: z.string().min(1),
      description: z.string().min(1),
      icon: z.string().min(1),
    })
  ),
});

const listsSchema = z.object({
  features: z.array(z.string()),
  specs: z.array(
    z.object({
      label: z.string().min(1),
      value: z.string().min(1),
    })
  ),
  compatibility: z.array(z.string()),
  tags: z.array(z.string()),
});

export async function createProductAction(
  productData: any,
  lists: {
    features: string[];
    specs: Array<{ label: string; value: string }>;
    compatibility: string[];
    tags: string[];
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
  const validatedProductData = productDataSchema.parse(productData);
  const validatedLists = listsSchema.parse(lists);

  try {
    // 1. Insert product
    const [insertedProduct] = await db
      .insert(products)
      .values(validatedProductData)
      .returning({ id: products.id });

    const productId = insertedProduct.id;

    // 2. Insert features
    if (validatedLists.features.length > 0) {
      await db.insert(productFeatures).values(
        validatedLists.features.map((feat, index) => ({
          productId,
          featureText: feat,
          displayOrder: index,
        }))
      );
    }

    // 3. Insert specs
    if (validatedLists.specs.length > 0) {
      await db.insert(productSpecs).values(
        validatedLists.specs.map((spec, index) => ({
          productId,
          label: spec.label,
          value: spec.value,
          displayOrder: index,
        }))
      );
    }

    // 4. Insert compatibility
    if (validatedLists.compatibility.length > 0) {
      await db.insert(productCompatibility).values(
        validatedLists.compatibility.map((engine) => ({
          productId,
          engineName: engine,
        }))
      );
    }

    // 5. Insert tags
    if (validatedLists.tags.length > 0) {
      await db.insert(productTags).values(
        validatedLists.tags.map((tag) => ({
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
  // Session check
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session) {
    throw new Error("Unauthorized access");
  }

  // Zod validation
  const validatedId = z.number().int().positive().parse(id);
  const validatedProductData = productDataSchema.parse(productData);
  const validatedLists = listsSchema.parse(lists);

  try {
    // 1. Update product main data
    await db.update(products).set(validatedProductData).where(eq(products.id, validatedId));

    // 2. Transaksi menghapus data relasi lama & memasukkan data baru
    // Hapus lama
    await db.delete(productFeatures).where(eq(productFeatures.productId, validatedId));
    await db.delete(productSpecs).where(eq(productSpecs.productId, validatedId));
    await db.delete(productCompatibility).where(eq(productCompatibility.productId, validatedId));
    await db.delete(productTags).where(eq(productTags.productId, validatedId));

    // Masukkan baru - features
    if (validatedLists.features.length > 0) {
      await db.insert(productFeatures).values(
        validatedLists.features.map((feat, index) => ({
          productId: validatedId,
          featureText: feat,
          displayOrder: index,
        }))
      );
    }

    // Masukkan baru - specs
    if (validatedLists.specs.length > 0) {
      await db.insert(productSpecs).values(
        validatedLists.specs.map((spec, index) => ({
          productId: validatedId,
          label: spec.label,
          value: spec.value,
          displayOrder: index,
        }))
      );
    }

    // Masukkan baru - compatibility
    if (validatedLists.compatibility.length > 0) {
      await db.insert(productCompatibility).values(
        validatedLists.compatibility.map((engine) => ({
          productId: validatedId,
          engineName: engine,
        }))
      );
    }

    // Masukkan baru - tags
    if (validatedLists.tags.length > 0) {
      await db.insert(productTags).values(
        validatedLists.tags.map((tag) => ({
          productId: validatedId,
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
    // Cascade delete di DB akan menghapus semua relasi secara otomatis
    await db.delete(products).where(eq(products.id, validatedId));
    
    revalidatePath("/admin/products");
    revalidatePath("/catalog/[slug]", "layout");
    revalidatePath("/");
    return { success: true };
  } catch (error) {
    console.error("❌ Gagal menghapus produk:", error);
    return { success: false, error: "Gagal menghapus produk." };
  }
}
