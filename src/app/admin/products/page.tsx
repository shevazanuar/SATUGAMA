import { db } from "@/db";
import { products } from "@/db/schema";
import { desc } from "drizzle-orm";
import ProductsListClient from "./products-list-client";

export const dynamic = "force-dynamic";

export default async function ProductsAdminPage() {
  // Ambil daftar produk beserta data relasinya untuk mempermudah form edit pre-fill
  const allProducts = await db.query.products.findMany({
    orderBy: [desc(products.createdAt)],
    with: {
      features: { orderBy: (f, { asc }) => [asc(f.displayOrder)] },
      specs: { orderBy: (s, { asc }) => [asc(s.displayOrder)] },
      compatibility: true,
      tags: true,
    },
  });

  return <ProductsListClient initialProducts={allProducts} />;
}
