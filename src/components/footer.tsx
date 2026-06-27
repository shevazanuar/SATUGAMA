import Image from "next/image";
import Link from "next/link";
import { Mail, MapPin, Gamepad2, Phone } from "lucide-react";

const Instagram = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

const Github = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

export function Footer() {
  return (
    <footer className="border-t border-white/[0.08] bg-[#0c0d1b] text-slate-300">
      <div className="max-w-6xl mx-auto px-5 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          {/* Column 1: Brand & Logo */}
          <div className="md:col-span-1 space-y-4">
            <Link href="/" className="group w-fit block select-none">
              <div
                className="font-extrabold text-white text-xl tracking-tight leading-none"
                style={{ fontFamily: "var(--font-sora)" }}
              >
                Satu<span className="text-indigo-400 drop-shadow-[0_0_8px_rgba(99,102,241,0.3)]">Gama</span>
              </div>
              <div className="text-[10px] text-slate-500 uppercase tracking-widest font-semibold mt-1.5">
                Game Asset Maker
              </div>
            </Link>
            <p className="text-slate-400 text-sm leading-relaxed max-w-xs">
              Studio kreatif spesialis game asset premium berbasis di Semarang, Indonesia.
              Kami membantu developer indie menciptakan game impian dengan aset 2D, 3D, dan UI berkualitas tinggi.
            </p>
            {/* Social links */}
            <div className="flex gap-3 pt-2">
              <a
                href="https://github.com/shevazanuar/SATUGAMA"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg border border-white/8 bg-white/5 hover:bg-white/10 hover:border-white/18 flex items-center justify-center text-slate-400 hover:text-white transition-all duration-200"
                aria-label="GitHub SatuGama"
              >
                <Github className="h-4.5 w-4.5" />
              </a>
              <a
                href="mailto:satuggama@gmail.com"
                className="w-9 h-9 rounded-lg border border-white/8 bg-white/5 hover:bg-indigo-500/15 hover:border-indigo-500/30 flex items-center justify-center text-slate-400 hover:text-indigo-400 transition-all duration-200"
                aria-label="Email SatuGama"
              >
                <Mail className="h-4.5 w-4.5" />
              </a>
            </div>
          </div>

          {/* Column 2: Navigation */}
          <div>
            <h3
              className="text-sm font-semibold text-white uppercase tracking-wider mb-5"
              style={{ fontFamily: "var(--font-sora)" }}
            >
              Navigasi
            </h3>
            <ul className="space-y-3" role="list">
              {[
                { href: "/#home", label: "Beranda" },
                { href: "/#about", label: "Tentang Kami" },
                { href: "/#customizer", label: "Customizer" },
                { href: "/#catalog", label: "Katalog Aset" },
                { href: "/#pricing", label: "Harga & Paket" },
                { href: "/#contact", label: "Hubungi Kami" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-slate-400 hover:text-indigo-400 hover:translate-x-1 transition-all duration-200 inline-block"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Services/Categories */}
          <div>
            <h3
              className="text-sm font-semibold text-white uppercase tracking-wider mb-5"
              style={{ fontFamily: "var(--font-sora)" }}
            >
              Layanan
            </h3>
            <ul className="space-y-3" role="list">
              {[
                { href: "/#catalog", label: "2D Pixel Art" },
                { href: "/#catalog", label: "3D Model Blender" },
                { href: "/#catalog", label: "UI Kit & HUD Design" },
                { href: "/#catalog", label: "Audio & SFX Game" },
                { href: "/#contact", label: "Custom Asset Service" },
              ].map((service, idx) => (
                <li key={idx}>
                  <Link
                    href={service.href}
                    className="text-sm text-slate-400 hover:text-indigo-400 hover:translate-x-1 transition-all duration-200 inline-block"
                  >
                    {service.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact Info */}
          <div>
            <h3
              className="text-sm font-semibold text-white uppercase tracking-wider mb-5"
              style={{ fontFamily: "var(--font-sora)" }}
            >
              Hubungi Kami
            </h3>
            <ul className="space-y-4" role="list">
              <li>
                <a
                  href="https://instagram.com/satugama.studio"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-slate-400 hover:text-indigo-400 transition-colors group"
                >
                  <Instagram className="h-4.5 w-4.5 text-indigo-400 shrink-0 group-hover:scale-110 transition-transform" />
                  <span className="text-sm">@satugama.studio</span>
                </a>
              </li>
              <li>
                <a
                  href="mailto:satuggama@gmail.com"
                  className="flex items-center gap-3 text-slate-400 hover:text-indigo-400 transition-colors group"
                >
                  <Mail className="h-4.5 w-4.5 text-indigo-400 shrink-0 group-hover:scale-110 transition-transform" />
                  <span className="text-sm">satuggama@gmail.com</span>
                </a>
              </li>
              <li>
                <a
                  href="https://wa.me/62882005486575"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-slate-400 hover:text-indigo-400 transition-colors group"
                >
                  <Phone className="h-4.5 w-4.5 text-indigo-400 shrink-0 group-hover:scale-110 transition-transform" />
                  <span className="text-sm">+62 882-0054-86575</span>
                </a>
              </li>
              <li className="flex items-start gap-3 text-slate-400">
                <MapPin className="h-4.5 w-4.5 text-indigo-400 shrink-0 mt-0.5" />
                <span className="text-sm leading-relaxed">
                  Jl. Garuda No 45, Banyumanik, Semarang, Jawa Tengah
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Separator line & Bottom bar */}
        <div className="pt-8 border-t border-white/[0.08] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <span>© 2026 SatuGama Studio. All rights reserved.</span>
          <div className="flex items-center gap-6">
            <Link href="/privacy" className="hover:text-indigo-400 transition-colors">
              Kebijakan Privasi
            </Link>
            <Link href="/terms" className="hover:text-indigo-400 transition-colors">
              Syarat & Ketentuan
            </Link>
            <div className="flex items-center gap-1.5 border-l border-white/10 pl-6 text-slate-600">
              <Gamepad2 className="h-3.5 w-3.5 text-indigo-500/50" />
              <span>Crafted for Indie Game Devs</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
