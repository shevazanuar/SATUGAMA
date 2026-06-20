import type { Metadata } from "next";
import { Inter, Sora } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

/* ─── Fonts ─── */
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

/* ─── SEO Metadata ─── */
const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://satugama.studio";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),

  title: {
    default:
      "SatuGama Studio — Game Asset 2D, 3D & UI untuk Developer Indonesia",
    template: "%s | SatuGama Studio",
  },

  description:
    "SatuGama adalah studio kreatif game asset berbasis di Semarang, Indonesia. Kami menyediakan aset 2D pixel art, model 3D Blender, UI kit, dan audio SFX berkualitas tinggi untuk game developer indie.",

  keywords: [
    "game asset indonesia",
    "pixel art indonesia",
    "3d model blender",
    "ui kit game",
    "game developer indonesia",
    "indie game asset",
    "2d game asset",
    "sfx game",
    "satugama",
    "game studio semarang",
    "aset game murah",
    "asset unity godot",
  ],

  authors: [{ name: "SatuGama Studio", url: siteUrl }],
  creator: "SatuGama Studio",
  publisher: "SatuGama Studio",

  formatDetection: {
    email: true,
    telephone: false,
    address: false,
  },

  openGraph: {
    type: "website",
    locale: "id_ID",
    url: siteUrl,
    siteName: "SatuGama Studio",
    title: "SatuGama Studio — Game Asset 2D, 3D & UI untuk Developer Indonesia",
    description:
      "Studio kreatif game asset dari Semarang, Indonesia. Aset 2D pixel art, model 3D Blender, UI kit & audio SFX berkualitas tinggi untuk indie developer.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "SatuGama Studio — Game Asset Premium Indonesia",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "SatuGama Studio — Game Asset Premium Indonesia",
    description:
      "Aset 2D pixel art, model 3D, UI kit & audio SFX untuk game developer Indonesia. Mulai dari Rp 29.000.",
    images: ["/og-image.png"],
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  alternates: {
    canonical: siteUrl,
  },
};

/* ─── JSON-LD Structured Data ─── */
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${siteUrl}/#organization`,
      name: "SatuGama Studio",
      url: siteUrl,
      logo: {
        "@type": "ImageObject",
        url: `${siteUrl}/logo.png`,
      },
      description:
        "Studio kreatif game asset Indonesia, spesialis 2D pixel art, model 3D Blender, UI kit, dan audio SFX.",
      email: "satuggama@gmail.com",
      address: {
        "@type": "PostalAddress",
        streetAddress: "Jalan Garuda No 45",
        addressLocality: "Banyumanik",
        addressRegion: "Jawa Tengah",
        addressCountry: "ID",
        postalCode: "50267",
      },
      sameAs: ["https://github.com/shevazanuar/SATUGAMA"],
    },
    {
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      url: siteUrl,
      name: "SatuGama Studio",
      description:
        "Game asset premium untuk developer Indonesia — 2D, 3D, UI kit & audio SFX.",
      publisher: { "@id": `${siteUrl}/#organization` },
      inLanguage: "id-ID",
    },
    {
      "@type": "ItemList",
      "@id": `${siteUrl}/#products`,
      name: "Produk SatuGama",
      description: "Koleksi game asset premium dari SatuGama Studio",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Last Signal — Glitch UI Pack",
          description:
            "UI kit futuristik dengan 80+ komponen HUD, tombol neon, dan 24 efek suara sintetis.",
          offers: {
            "@type": "Offer",
            price: "49000",
            priceCurrency: "IDR",
            availability: "https://schema.org/InStock",
          },
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Dungeon Crawler Tileset",
          description:
            "340+ tile sprite 16-bit pixel art bertema kastil gotik dan dungeon.",
          offers: {
            "@type": "Offer",
            price: "29000",
            priceCurrency: "IDR",
            availability: "https://schema.org/InStock",
          },
        },
        {
          "@type": "ListItem",
          position: 3,
          name: "Sci-Fi Starfighter Pack",
          description:
            "12 model pesawat luar angkasa low-poly dalam format FBX & OBJ dengan tekstur PBR 2K.",
          offers: {
            "@type": "Offer",
            price: "99000",
            priceCurrency: "IDR",
            availability: "https://schema.org/InStock",
          },
        },
      ],
    },
  ],
};

/* ─── Root Layout ─── */
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="id"
      className={`${inter.variable} ${sora.variable} h-full antialiased scroll-smooth`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
