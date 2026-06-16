"use client";

import React, { useState } from "react";
import { Download, Sparkles, Shuffle, Shield, Check, Palette, User, Shirt, Swords } from "lucide-react";

// Types
type SkinTone = "light" | "medium" | "dark" | "alien-green" | "alien-blue";
type HairStyle = "none" | "spiky" | "long" | "bob" | "wizard";
type ClothesStyle = "tunic" | "armor" | "robe" | "suit";
type Accessory = "none" | "sword" | "shield" | "wand" | "cape";
type EyeStyle = "classic" | "anime" | "glasses";

export function CharacterCustomizer() {
  // States
  const [skinTone, setSkinTone] = useState<SkinTone>("light");
  const [hairStyle, setHairStyle] = useState<HairStyle>("spiky");
  const [hairColor, setHairColor] = useState<string>("#fbbf24"); // Blonde
  const [clothesStyle, setClothesStyle] = useState<ClothesStyle>("tunic");
  const [clothesColor, setClothesColor] = useState<string>("#2563eb"); // Blue
  const [eyeStyle, setEyeStyle] = useState<EyeStyle>("classic");
  const [accessory, setAccessory] = useState<Accessory>("sword");
  const [activeTab, setActiveTab] = useState<"body" | "hair" | "clothes" | "gear">("body");

  // Options configuration
  const SKIN_TONES = [
    { id: "light", label: "Peach", value: "#fed7aa" },
    { id: "medium", label: "Warm", value: "#fdba74" },
    { id: "dark", label: "Brown", value: "#b45309" },
    { id: "alien-green", label: "Green", value: "#34d399" },
    { id: "alien-blue", label: "Blue", value: "#60a5fa" },
  ] as const;

  const HAIR_COLORS = [
    { label: "Blonde", value: "#fbbf24" },
    { label: "Red", value: "#ef4444" },
    { label: "Black", value: "#1e293b" },
    { label: "Brown", value: "#78350f" },
    { label: "Royal Blue", value: "#3b82f6" },
    { label: "Cyber Pink", value: "#ec4899" },
    { label: "Mystic Gray", value: "#cbd5e1" },
  ];

  const CLOTHES_COLORS = [
    { label: "Royal Blue", value: "#2563eb" },
    { label: "Crimson", value: "#dc2626" },
    { label: "Forest Green", value: "#16a34a" },
    { label: "Wizard Purple", value: "#7c3aed" },
    { label: "Goldenrod", value: "#d97706" },
    { label: "Carbon Black", value: "#1f2937" },
  ];

  const SKIN_TONE_COLORS: Record<SkinTone, string> = {
    light: "#fed7aa",
    medium: "#fdba74",
    dark: "#b45309",
    "alien-green": "#34d399",
    "alien-blue": "#60a5fa",
  };

  // SVG String Generation
  const getSVGContent = (isDownload: boolean = false) => {
    const activeSkinColor = SKIN_TONE_COLORS[skinTone];

    // Helper functions to generate conditional parts
    const renderCape = () => {
      if (accessory !== "cape") return "";
      return `
        <!-- Cape -->
        <path d="M 34,62 L 15,108 H 85 L 66,62 Z" fill="#b91c1c" />
        <path d="M 34,62 H 66 L 50,68 Z" fill="#7f1d1d" />
      `;
    };

    const renderSword = () => {
      if (accessory !== "sword") return "";
      return `
        <!-- Sword -->
        <g transform="translate(18, 55) rotate(-15)">
          <rect x="-3" y="-35" width="6" height="35" rx="2" fill="#e2e8f0" stroke="#cbd5e1" stroke-width="1" />
          <line x1="0" y1="-33" x2="0" y2="0" stroke="#94a3b8" stroke-width="1" />
          <rect x="-10" y="0" width="20" height="4" rx="1.5" fill="#fbbf24" />
          <rect x="-2" y="4" width="4" height="12" rx="1" fill="#78350f" />
          <circle cx="0" cy="17" r="2.5" fill="#fbbf24" />
        </g>
      `;
    };

    const renderShield = () => {
      if (accessory !== "shield") return "";
      return `
        <!-- Shield -->
        <g transform="translate(80, 75)">
          <path d="M -12,-16 H 12 V -4 C 12,8 0,18 0,18 C 0,18 -12,8 -12,-4 Z" fill="#3b82f6" stroke="#94a3b8" stroke-width="2.5" />
          <path d="M -12,-16 H 12 V -4 C 12,8 0,18 0,18 C 0,18 -12,8 -12,-4 Z" fill="none" stroke="#cbd5e1" stroke-width="1.5" />
          <polygon points="0,-8 6,2 0,10 -6,2" fill="#fbbf24" />
        </g>
      `;
    };

    const renderWand = () => {
      if (accessory !== "wand") return "";
      return `
        <!-- Wand -->
        <g transform="translate(18, 50) rotate(-10)">
          <rect x="-2" y="-30" width="4" height="85" rx="2" fill="#78350f" />
          <path d="M -6,-34 Q 0,-28 6,-34 Q 6,-38 0,-34 Q -6,-38 -6,-34 Z" fill="#fbbf24" />
          <polygon points="0,-46 6,-38 0,-30 -6,-38" fill="#06b6d4" />
          <circle cx="0" cy="-38" r="12" fill="#00f0ff" opacity="0.25" />
        </g>
      `;
    };

    const renderClothes = () => {
      switch (clothesStyle) {
        case "armor":
          return `
            <!-- Knight Armor -->
            <rect x="32" y="62" width="36" height="32" rx="8" fill="#cbd5e1" stroke="#94a3b8" stroke-width="2" />
            <circle cx="30" cy="66" r="6" fill="#94a3b8" />
            <circle cx="70" cy="66" r="6" fill="#94a3b8" />
            <path d="M 47,70 H 53 M 50,67 V 79" stroke="#dc2626" stroke-width="3" stroke-linecap="round" />
          `;
        case "robe":
          return `
            <!-- Wizard Robe -->
            <path d="M 32,62 L 68,62 L 72,102 L 28,102 Z" fill="${clothesColor}" />
            <path d="M 32,62 L 50,85 L 68,62" stroke="#fbbf24" stroke-width="2.5" fill="none" />
            <rect x="28" y="100" width="44" height="3" fill="#fbbf24" />
          `;
        case "suit":
          return `
            <!-- Modern Suit -->
            <rect x="32" y="62" width="36" height="32" rx="8" fill="#1e293b" />
            <polygon points="46,62 54,62 50,72" fill="#ffffff" />
            <polygon points="49,70 51,70 52,82 50,86 48,82" fill="#ef4444" />
          `;
        case "tunic":
        default:
          return `
            <!-- Adventurer Tunic -->
            <rect x="32" y="62" width="36" height="32" rx="8" fill="${clothesColor}" />
            <polygon points="44,62 56,62 50,70" fill="${activeSkinColor}" />
            <rect x="32" y="78" width="36" height="4" fill="#78350f" />
            <rect x="47" y="76" width="6" height="8" rx="1" fill="#fbbf24" stroke="#d97706" stroke-width="1" />
          `;
      }
    };

    const renderEyes = () => {
      switch (eyeStyle) {
        case "anime":
          return `
            <!-- Anime Eyes -->
            <rect x="38" y="39" width="6" height="7" rx="1.5" fill="#0f172a" />
            <rect x="56" y="39" width="6" height="7" rx="1.5" fill="#0f172a" />
            <circle cx="39.5" cy="40.5" r="1.2" fill="#ffffff" />
            <circle cx="57.5" cy="40.5" r="1.2" fill="#ffffff" />
            <circle cx="42.5" cy="43.5" r="0.6" fill="#ffffff" />
            <circle cx="60.5" cy="43.5" r="0.6" fill="#ffffff" />
          `;
        case "glasses":
          return `
            <!-- Glasses -->
            <circle cx="41" cy="42" r="6" stroke="#00f0ff" stroke-width="2.5" fill="none" />
            <circle cx="59" cy="42" r="6" stroke="#00f0ff" stroke-width="2.5" fill="none" />
            <line x1="47" y1="42" x2="53" y2="42" stroke="#00f0ff" stroke-width="2.5" />
          `;
        case "classic":
        default:
          return `
            <!-- Classic Dot Eyes -->
            <circle cx="42" cy="42" r="3.2" fill="#0f172a" />
            <circle cx="58" cy="42" r="3.2" fill="#0f172a" />
            <circle cx="43.2" cy="40.8" r="1" fill="#ffffff" />
            <circle cx="59.2" cy="40.8" r="1" fill="#ffffff" />
          `;
      }
    };

    const renderHairAndHat = () => {
      switch (hairStyle) {
        case "spiky":
          return `
            <!-- Spiky Hair -->
            <path d="M 28,32 C 28,18 40,11 50,11 C 60,11 72,18 72,32 L 75,25 L 67,19 L 58,11 L 50,15 L 42,11 L 33,19 L 25,25 Z" fill="${hairColor}" />
          `;
        case "long":
          return `
            <!-- Long Hair -->
            <path d="M 28,32 Q 30,17 50,17 Q 70,17 72,32 V 72 Q 72,82 68,82 Q 67,58 70,36 Q 50,26 30,36 Q 33,58 32,82 Q 28,82 28,72 Z" fill="${hairColor}" />
          `;
        case "bob":
          return `
            <!-- Bob Hair -->
            <path d="M 27,34 Q 30,17 50,17 Q 70,17 73,34 Q 75,44 71,46 Q 67,35 50,25 Q 33,35 29,46 Q 25,44 27,34 Z" fill="${hairColor}" />
          `;
        case "wizard":
          return `
            <!-- Wizard Beard & Hat -->
            <path d="M 32,48 Q 50,75 68,48 Q 66,70 50,78 Q 34,70 32,48 Z" fill="#cbd5e1" />
            <path d="M 44,48 Q 50,60 56,48 Q 50,56 44,48 Z" fill="#94a3b8" />
            <ellipse cx="50" cy="24" rx="28" ry="5" fill="#1d4ed8" />
            <path d="M 22,26 L 78,26 Q 82,26 80,24 Q 76,20 66,20 L 54,2 Q 50,0 48,2 L 36,20 Q 26,20 22,24 Q 20,26 22,26 Z" fill="#3b82f6" />
            <polygon points="50,6 52,11 57,11 53,14 55,19 50,16 45,19 47,14 43,11 48,11" fill="#fbbf24" />
          `;
        case "none":
        default:
          return "";
      }
    };

    return `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 125" width="100%" height="100%">
        ${isDownload ? `<rect width="100" height="125" fill="#0f1117" rx="10" />` : ""}
        
        <!-- Shadow -->
        <ellipse cx="50" cy="115" rx="22" ry="5" fill="#020617" opacity="0.4" />
        
        ${renderCape()}
        
        <!-- Legs -->
        <rect x="36" y="94" width="10" height="18" rx="2" fill="#1e293b" />
        <rect x="54" y="94" width="10" height="18" rx="2" fill="#1e293b" />
        <rect x="34" y="110" width="14" height="6" rx="2" fill="#475569" />
        <rect x="52" y="110" width="14" height="6" rx="2" fill="#475569" />
        
        <!-- Arms (Base) -->
        <rect x="26" y="66" width="7" height="24" rx="3.5" fill="${activeSkinColor}" />
        <rect x="67" y="66" width="7" height="24" rx="3.5" fill="${activeSkinColor}" />
        <rect x="25" y="64" width="9" height="12" rx="4.5" fill="${clothesStyle === "armor" ? "#cbd5e1" : clothesColor}" />
        <rect x="66" y="64" width="9" height="12" rx="4.5" fill="${clothesStyle === "armor" ? "#cbd5e1" : clothesColor}" />
        
        <!-- Torso -->
        <rect x="46" y="58" width="8" height="6" fill="${activeSkinColor}" />
        ${renderClothes()}
        
        <!-- Head -->
        <rect x="30" y="25" width="40" height="36" rx="12" fill="${activeSkinColor}" />
        
        <!-- Face Details -->
        ${renderEyes()}
        <ellipse cx="36" cy="48" rx="3.5" ry="1.8" fill="#f43f5e" opacity="0.3" />
        <ellipse cx="64" cy="48" rx="3.5" ry="1.8" fill="#f43f5e" opacity="0.3" />
        <path d="M 47,49 Q 50,52 53,49" stroke="#0f172a" stroke-width="2" fill="none" stroke-linecap="round" />
        
        <!-- Hair & Hat Layer -->
        ${renderHairAndHat()}
        
        <!-- Handheld items (Foreground) -->
        ${renderSword()}
        ${renderShield()}
        ${renderWand()}
      </svg>
    `.trim();
  };

  const handleDownload = () => {
    const svgContent = getSVGContent(true);
    const blob = new Blob([svgContent], { type: "image/svg+xml" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `satugama-character-${skinTone}-${hairStyle}-${clothesStyle}.svg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleRandomize = () => {
    // Pick random options
    const skins: SkinTone[] = ["light", "medium", "dark", "alien-green", "alien-blue"];
    const hairs: HairStyle[] = ["none", "spiky", "long", "bob", "wizard"];
    const clothes: ClothesStyle[] = ["tunic", "armor", "robe", "suit"];
    const accessories: Accessory[] = ["none", "sword", "shield", "wand", "cape"];
    const eyes: EyeStyle[] = ["classic", "anime", "glasses"];

    setSkinTone(skins[Math.floor(Math.random() * skins.length)]);
    setHairStyle(hairs[Math.floor(Math.random() * hairs.length)]);
    setHairColor(HAIR_COLORS[Math.floor(Math.random() * HAIR_COLORS.length)].value);
    setClothesStyle(clothes[Math.floor(Math.random() * clothes.length)]);
    setClothesColor(CLOTHES_COLORS[Math.floor(Math.random() * CLOTHES_COLORS.length)].value);
    setEyeStyle(eyes[Math.floor(Math.random() * eyes.length)]);
    setAccessory(accessories[Math.floor(Math.random() * accessories.length)]);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
      {/* LEFT - Preview Panel (5 Cols) */}
      <div className="lg:col-span-5 flex flex-col items-center">
        <div className="relative w-full max-w-[280px] aspect-[4/5] rounded-2xl border border-white/10 bg-[#0f1117]/60 overflow-hidden flex items-center justify-center p-6 shadow-inner group">
          {/* Cyberpunk grid backdrop */}
          <div className="absolute inset-0 bg-dot-pattern opacity-10 pointer-events-none" />
          <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-cyan-500/10 to-transparent pointer-events-none" />
          
          {/* Animated SVG Container */}
          <div 
            className="w-full h-full relative z-10 transition-transform duration-500 ease-out hover:scale-105"
            style={{ 
              animation: "bob 4s ease-in-out infinite",
              filter: "drop-shadow(0 10px 20px rgba(0, 240, 255, 0.15))"
            }}
            dangerouslySetInnerHTML={{ __html: getSVGContent(false) }}
          />

          {/* Sparkles icon overlay */}
          <div className="absolute top-4 left-4 text-cyan-400 opacity-60 group-hover:opacity-100 transition-opacity">
            <Sparkles className="h-4 w-4 animate-spin-slow" />
          </div>
        </div>

        {/* Floating Quick Action Buttons */}
        <div className="flex gap-3 mt-6 w-full max-w-[280px]">
          <button
            onClick={handleRandomize}
            className="flex-1 flex items-center justify-center gap-2 py-2.5 px-4 bg-white/5 border border-white/10 text-slate-300 hover:text-white hover:bg-white/10 rounded-xl text-xs font-semibold transition-all"
            title="Randomize Character"
          >
            <Shuffle className="h-3.5 w-3.5" />
            Acak
          </button>
          
          <button
            onClick={handleDownload}
            className="flex-1 flex items-center justify-center gap-2 py-2.5 px-4 bg-gradient-to-r from-cyan-500 to-violet-600 hover:from-cyan-400 hover:to-violet-500 text-white rounded-xl text-xs font-bold transition-all btn-glow-cyan shadow-md"
          >
            <Download className="h-3.5 w-3.5" />
            Unduh SVG
          </button>
        </div>
      </div>

      {/* RIGHT - Control Customization panel (7 Cols) */}
      <div className="lg:col-span-7 space-y-6">
        {/* Navigation Tabs */}
        <div className="flex border-b border-white/10 gap-1 pb-px">
          {[
            { id: "body", label: "Tubuh", icon: <User className="h-4 w-4" /> },
            { id: "hair", label: "Rambut", icon: <Palette className="h-4 w-4" /> },
            { id: "clothes", label: "Pakaian", icon: <Shirt className="h-4 w-4" /> },
            { id: "gear", label: "Senjata/Gaya", icon: <Swords className="h-4 w-4" /> },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-4 py-3 text-xs font-semibold tracking-wider uppercase border-b-2 transition-all -mb-px ${
                activeTab === tab.id
                  ? "border-cyan-400 text-cyan-400 bg-white/[0.02] rounded-t-xl"
                  : "border-transparent text-slate-500 hover:text-slate-300"
              }`}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content Panels */}
        <div className="min-h-[200px] space-y-6">
          {/* TAB 1: BODY */}
          {activeTab === "body" && (
            <div className="space-y-5">
              {/* Skin Tone Selector */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">Warna Kulit</label>
                <div className="flex flex-wrap gap-2.5">
                  {SKIN_TONES.map((tone) => (
                    <button
                      key={tone.id}
                      onClick={() => setSkinTone(tone.id)}
                      className={`relative w-8 h-8 rounded-full border-2 transition-all flex items-center justify-center ${
                        skinTone === tone.id ? "border-cyan-400 scale-110 shadow-lg shadow-cyan-500/20" : "border-transparent hover:scale-105"
                      }`}
                      style={{ backgroundColor: tone.value }}
                      title={tone.label}
                    >
                      {skinTone === tone.id && (
                        <Check className="h-4 w-4 text-[#0f1117] stroke-[3]" />
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Eye Style Selector */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">Model Mata</label>
                <div className="grid grid-cols-3 gap-2.5">
                  {[
                    { id: "classic", label: "Klasik (Dot)" },
                    { id: "anime", label: "Anime" },
                    { id: "glasses", label: "Kacamata" },
                  ].map((eye) => (
                    <button
                      key={eye.id}
                      onClick={() => setEyeStyle(eye.id as EyeStyle)}
                      className={`py-2 px-3 rounded-xl border text-xs font-medium transition-all ${
                        eyeStyle === eye.id
                          ? "border-cyan-400/50 bg-cyan-400/10 text-cyan-400"
                          : "border-white/10 bg-white/5 text-slate-400 hover:text-white"
                      }`}
                    >
                      {eye.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: HAIR */}
          {activeTab === "hair" && (
            <div className="space-y-5">
              {/* Hair Style Selector */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">Gaya Rambut</label>
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
                  {[
                    { id: "none", label: "Botak" },
                    { id: "spiky", label: "Spiky" },
                    { id: "long", label: "Panjang" },
                    { id: "bob", label: "Sleek" },
                    { id: "wizard", label: "Wizard Hat" },
                  ].map((hair) => (
                    <button
                      key={hair.id}
                      onClick={() => setHairStyle(hair.id as HairStyle)}
                      className={`py-2.5 px-2 rounded-xl border text-xs font-medium transition-all ${
                        hairStyle === hair.id
                          ? "border-cyan-400/50 bg-cyan-400/10 text-cyan-400"
                          : "border-white/10 bg-white/5 text-slate-400 hover:text-white"
                      }`}
                    >
                      {hair.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Hair Color Picker */}
              {hairStyle !== "none" && hairStyle !== "wizard" && (
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">Warna Rambut</label>
                  <div className="flex flex-wrap gap-2.5">
                    {HAIR_COLORS.map((color) => (
                      <button
                        key={color.value}
                        onClick={() => setHairColor(color.value)}
                        className={`relative w-8 h-8 rounded-full border-2 transition-all flex items-center justify-center ${
                          hairColor === color.value ? "border-cyan-400 scale-110 shadow-lg shadow-cyan-500/20" : "border-transparent hover:scale-105"
                        }`}
                        style={{ backgroundColor: color.value }}
                        title={color.label}
                      >
                        {hairColor === color.value && (
                          <Check className="h-4 w-4 text-[#0f1117] stroke-[3]" />
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 3: CLOTHES */}
          {activeTab === "clothes" && (
            <div className="space-y-5">
              {/* Clothes Style Selector */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">Model Pakaian</label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  {[
                    { id: "tunic", label: "Tunik RPG" },
                    { id: "armor", label: "Zirah Knight" },
                    { id: "robe", label: "Jubah Mage" },
                    { id: "suit", label: "Jas Modern" },
                  ].map((cloth) => (
                    <button
                      key={cloth.id}
                      onClick={() => setClothesStyle(cloth.id as ClothesStyle)}
                      className={`py-2.5 px-3 rounded-xl border text-xs font-medium transition-all ${
                        clothesStyle === cloth.id
                          ? "border-cyan-400/50 bg-cyan-400/10 text-cyan-400"
                          : "border-white/10 bg-white/5 text-slate-400 hover:text-white"
                      }`}
                    >
                      {cloth.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Clothes Color Picker */}
              {clothesStyle !== "armor" && clothesStyle !== "suit" && (
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">Warna Pakaian</label>
                  <div className="flex flex-wrap gap-2.5">
                    {CLOTHES_COLORS.map((color) => (
                      <button
                        key={color.value}
                        onClick={() => setClothesColor(color.value)}
                        className={`relative w-8 h-8 rounded-full border-2 transition-all flex items-center justify-center ${
                          clothesColor === color.value ? "border-cyan-400 scale-110 shadow-lg shadow-cyan-500/20" : "border-transparent hover:scale-105"
                        }`}
                        style={{ backgroundColor: color.value }}
                        title={color.label}
                      >
                        {clothesColor === color.value && (
                          <Check className="h-4 w-4 text-white stroke-[2.5]" />
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 4: GEAR / ACCESSORIES */}
          {activeTab === "gear" && (
            <div className="space-y-5">
              {/* Accessories Selector */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">Perlengkapan & Gaya</label>
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
                  {[
                    { id: "none", label: "Tanpa Alat" },
                    { id: "sword", label: "Pedang Besi" },
                    { id: "shield", label: "Perisai Ksatria" },
                    { id: "wand", label: "Tongkat Sihir" },
                    { id: "cape", label: "Jubah Merah" },
                  ].map((item) => (
                    <button
                      key={item.id}
                      onClick={() => setAccessory(item.id as Accessory)}
                      className={`py-2.5 px-2 rounded-xl border text-xs font-medium transition-all ${
                        accessory === item.id
                          ? "border-cyan-400/50 bg-cyan-400/10 text-cyan-400"
                          : "border-white/10 bg-white/5 text-slate-400 hover:text-white"
                      }`}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      
      {/* Styles Injection */}
      <style jsx global>{`
        @keyframes bob {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-6px); }
        }
        .animate-spin-slow {
          animation: spin 8s linear infinite;
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
