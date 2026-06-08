import type { Metadata } from "next";
import { Inter, Sora } from "next/font/google";
import "./globals.css";

// Inter — body text, modern & highly legible
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

// Sora — headings, geometric & premium feel
const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "SatuGama Studio — Game Asset Maker & 3D Creative Studio",
  description:
    "SatuGama adalah studio kreatif game asset Indonesia. Kami menyediakan aset 2D pixel art, model 3D Blender, UI kit, dan audio SFX berkualitas tinggi untuk developer game indie.",
  keywords: "game asset, pixel art, 3d model, blender, UI kit, SFX, Indonesia, indie game",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="id"
      className={`${inter.variable} ${sora.variable} h-full antialiased scroll-smooth`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
