import { createUploadthing, type FileRouter } from "uploadthing/next";

const f = createUploadthing();

// Uploadthing FileRouter config
export const ourFileRouter = {
  // Rute upload untuk gambar produk (maksimal 4MB, 1 file)
  productImage: f({
    image: {
      maxFileSize: "4MB",
      maxFileCount: 1,
    },
  })
    .middleware(async () => {
      // Di sini kita bisa mengautentikasi user jika perlu
      return {};
    })
    .onUploadComplete(async ({ file }) => {
      console.log("✅ File gambar produk berhasil diunggah:", file.url);
      return { url: file.url };
    }),

  // Rute upload untuk foto profil tim (maksimal 2MB, 1 file)
  teamPhoto: f({
    image: {
      maxFileSize: "2MB",
      maxFileCount: 1,
    },
  })
    .middleware(async () => {
      return {};
    })
    .onUploadComplete(async ({ file }) => {
      console.log("✅ File foto tim berhasil diunggah:", file.url);
      return { url: file.url };
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
