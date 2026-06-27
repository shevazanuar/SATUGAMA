import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "./schema";
import * as dotenv from "dotenv";
import dns from "node:dns";

// Force Node.js/Next.js to resolve IPv4 addresses first to avoid flaky/blocked IPv6 database connection timeouts on Windows
dns.setDefaultResultOrder("ipv4first");


// Muat variabel lingkungan secara manual jika dijalankan di luar runtime Next.js (seperti seeder script)
dotenv.config({ path: ".env.local" });
dotenv.config({ path: ".env" });

const connectionString = process.env.DATABASE_URL || "postgresql://placeholder:placeholder@localhost:5432/placeholder";

if (!process.env.DATABASE_URL) {
  console.warn("⚠️ Warning: DATABASE_URL is not set in env variables.");
}

// Gunakan neon-http adapter untuk Vercel Serverless environment
const client = neon(connectionString);
export const db = drizzle(client, { schema });
