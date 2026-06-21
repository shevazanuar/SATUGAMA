import { db } from "@/db";
import { inquiries } from "@/db/schema";
import { desc } from "drizzle-orm";
import InquiriesListClient from "./inquiries-list-client";

// Menonaktifkan caching untuk halaman dinamis admin ini
export const dynamic = "force-dynamic";

export default async function InquiriesAdminPage() {
  // Ambil seluruh data pesan masuk, diurutkan dari yang terbaru
  const allInquiries = await db
    .select()
    .from(inquiries)
    .orderBy(desc(inquiries.createdAt));

  return <InquiriesListClient initialInquiries={allInquiries} />;
}
