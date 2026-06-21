import { db } from "@/db";
import { testimonials } from "@/db/schema";
import { desc } from "drizzle-orm";
import TestimonialsListClient from "./testimonials-list-client";

export const dynamic = "force-dynamic";

export default async function TestimonialsAdminPage() {
  // Ambil testimonial terurut dari yang terbaru beserta judul produk yang diulas
  const allTestimonials = await db.query.testimonials.findMany({
    orderBy: [desc(testimonials.createdAt)],
    with: {
      product: {
        columns: {
          title: true,
        },
      },
    },
  });

  return <TestimonialsListClient initialTestimonials={allTestimonials} />;
}
