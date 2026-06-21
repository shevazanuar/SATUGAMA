import * as dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

import { db } from "./index";
import {
  products,
  productFeatures,
  productSpecs,
  productCompatibility,
  productTags,
  teamMembers,
  testimonials,
  users,
  accounts,
  sessions,
  verifications,
} from "./schema";
import { PRODUCTS } from "../data/products";
import { auth } from "../lib/auth";

async function main() {
  console.log("🌱 Menjalankan Seeding Database...");

  const dbUrl = process.env.DATABASE_URL;
  if (!dbUrl || dbUrl.includes("placeholder_")) {
    console.error("❌ ERROR: DATABASE_URL tidak diset atau masih menggunakan placeholder.");
    console.error("Harap perbarui DATABASE_URL di file .env.local dengan koneksi Neon PostgreSQL Anda.");
    process.exit(1);
  }

  try {
    // 1. Bersihkan tabel terlebih dahulu (relasi dihapus dulu karena foreign key)
    console.log("🧹 Membersihkan data lama...");
    await db.delete(productFeatures);
    await db.delete(productSpecs);
    await db.delete(productCompatibility);
    await db.delete(productTags);
    await db.delete(testimonials);
    await db.delete(products);
    await db.delete(teamMembers);
    await db.delete(sessions);
    await db.delete(accounts);
    await db.delete(users);
    await db.delete(verifications);

    console.log("📦 Memasukkan data produk...");
    for (const p of PRODUCTS) {
      // Simpan produk ke tabel products
      const [insertedProduct] = await db
        .insert(products)
        .values({
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
          whatYouGet: p.whatYouGet,
          isFeatured: p.id === 1, // Tandai Last Signal sebagai featured
          isPublished: true,
        })
        .returning({ id: products.id });

      console.log(`✅ Produk dimasukkan: ${p.title} (ID: ${insertedProduct.id})`);

      // Simpan features
      if (p.features && p.features.length > 0) {
        await db.insert(productFeatures).values(
          p.features.map((feat, index) => ({
            productId: insertedProduct.id,
            featureText: feat,
            displayOrder: index,
          }))
        );
        console.log(`   - Dimasukkan ${p.features.length} fitur checklist`);
      }

      // Simpan specs
      if (p.specs && p.specs.length > 0) {
        await db.insert(productSpecs).values(
          p.specs.map((spec, index) => ({
            productId: insertedProduct.id,
            label: spec.label,
            value: spec.value,
            displayOrder: index,
          }))
        );
        console.log(`   - Dimasukkan ${p.specs.length} spesifikasi`);
      }

      // Simpan compatibility
      if (p.compatibility && p.compatibility.length > 0) {
        await db.insert(productCompatibility).values(
          p.compatibility.map((engine) => ({
            productId: insertedProduct.id,
            engineName: engine,
          }))
        );
        console.log(`   - Dimasukkan ${p.compatibility.length} engine kompatibilitas`);
      }

      // Simpan tags
      if (p.tags && p.tags.length > 0) {
        await db.insert(productTags).values(
          p.tags.map((tag) => ({
            productId: insertedProduct.id,
            tag,
          }))
        );
        console.log(`   - Dimasukkan ${p.tags.length} tag`);
      }
    }

    // 2. Memasukkan Anggota Tim
    console.log("👥 Memasukkan data Anggota Tim...");
    await db.insert(teamMembers).values([
      {
        name: "Biges",
        role: "CEO & Business Strategist",
        bio: "Memimpin arah bisnis SatuGama — fokus pada perencanaan produk, kemitraan strategis, dan pengembangan bisnis yang berkelanjutan.",
        photoUrl: "/team-biges.png",
        badge: "D3 Teknik Informatika · Sem. 4",
        displayOrder: 1,
        isActive: true,
      },
      {
        name: "Dai",
        role: "Lead Software Architect",
        bio: "Membangun platform web SatuGama dari nol — sistem backend, integrasi API, dan character customizer interaktif yang berjalan optimal di semua perangkat.",
        photoUrl: "/team-dai.png",
        badge: "D3 Teknik Informatika · Sem. 4",
        displayOrder: 2,
        isActive: true,
      },
      {
        name: "Ravie",
        role: "Lead 3D Artist (Blender)",
        bio: "Seniman 3D andalan tim — ahli dalam low-poly modeling, rigging, dan texturing menggunakan Blender untuk menghasilkan aset visual berkualitas tinggi.",
        photoUrl: "/team-ravie.png",
        badge: "D3 Teknik Informatika · Sem. 4",
        displayOrder: 3,
        isActive: true,
      },
      {
        name: "Sheva",
        role: "UI/UX & Frontend Engineer",
        bio: "Merancang dan membangun antarmuka SatuGama yang premium — berfokus pada UX intuitif, estetika konsisten, dan performa frontend yang optimal.",
        photoUrl: "/team-sheva.png",
        badge: "D3 Teknik Informatika · Sem. 4",
        displayOrder: 4,
        isActive: true,
      },
    ]);
    console.log("✅ Data Anggota Tim berhasil dimasukkan!");

    // 3. Memasukkan Testimonial
    console.log("💬 Memasukkan data Testimonial...");
    await db.insert(testimonials).values([
      {
        reviewerName: "David Miller",
        reviewerCompany: "Arcane Studios",
        content: "UI kit Last Signal benar-benar mempermudah pengembangan game sci-fi kami. Efek suara yang disertakan sangat membantu menghemat waktu!",
        rating: 5,
        productId: 1,
        isApproved: true,
      },
      {
        reviewerName: "Sarah Chen",
        reviewerCompany: "Solo Developer",
        content: "Tileset Dungeon Crawler sangat rapi dan mudah digunakan dengan LDtk. Desain pixel art-nya sangat berkarakter.",
        rating: 5,
        productId: 2,
        isApproved: true,
      },
      {
        reviewerName: "Yohanis Putra",
        reviewerCompany: "Nusantara Games",
        content: "Model low-poly dari Sci-Fi Starfighter Pack sangat teroptimasi dengan baik. Penggunaan PBR texture membuat pesawat tampak mengesankan.",
        rating: 5,
        productId: 3,
        isApproved: true,
      },
    ]);
    console.log("✅ Data Testimonial berhasil dimasukkan!");

    // 4. Memasukkan Admin User default via Better Auth API
    console.log("🔑 Memasukkan data Admin User...");
    try {
      await auth.api.signUpEmail({
        body: {
          email: "admin@satugama.studio",
          password: "adminpassword123",
          name: "Admin SatuGama",
        },
      });
      console.log("✅ Admin User berhasil dibuat (Email: admin@satugama.studio, Password: adminpassword123)");
    } catch (authError: any) {
      console.error("⚠️ Gagal membuat Admin User:", authError);
    }

    console.log("🎉 Seeding database selesai dengan sukses!");
  } catch (error) {
    console.error("❌ ERROR saat melakukan seeding:", error);
    process.exit(1);
  }
}

main();
