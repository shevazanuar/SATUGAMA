import { defineConfig } from "drizzle-kit";
import * as dotenv from "dotenv";

// Load environment variables dari .env.local untuk migrasi lokal
dotenv.config({ path: ".env.local" });

if (!process.env.DATABASE_URL) {
  console.warn("⚠️ Warning: DATABASE_URL tidak ditemukan di .env.local");
}

export default defineConfig({
  dialect: "postgresql",
  schema: "./src/db/schema.ts",
  out: "./src/db/migrations",
  dbCredentials: {
    url: process.env.DATABASE_URL || "",
  },
});
