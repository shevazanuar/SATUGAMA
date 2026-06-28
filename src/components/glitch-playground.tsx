"use client";

import React, { useState, useEffect, useCallback } from "react";
import { Zap, Shield, Cpu, AlertTriangle, ChevronRight, RotateCcw, Swords } from "lucide-react";

type ColorTheme = "indigo" | "cyan" | "rose" | "amber";

const THEMES: { id: ColorTheme; label: string; primary: string; glow: string; bg: string; border: string; badge: string }[] = [
  { id: "indigo", label: "Cyber Indigo", primary: "#6366f1", glow: "shadow-[0_0_20px_rgba(99,102,241,0.5)]",  bg: "bg-indigo-500",  border: "border-indigo-500/50", badge: "bg-indigo-500/20 border-indigo-500/40 text-indigo-300" },
  { id: "cyan",   label: "Neon Cyan",    primary: "#22d3ee", glow: "shadow-[0_0_20px_rgba(34,211,238,0.5)]",  bg: "bg-cyan-400",   border: "border-cyan-400/50",   badge: "bg-cyan-500/20 border-cyan-500/40 text-cyan-300" },
  { id: "rose",   label: "Blood Red",    primary: "#f43f5e", glow: "shadow-[0_0_20px_rgba(244,63,94,0.5)]",   bg: "bg-rose-500",   border: "border-rose-500/50",   badge: "bg-rose-500/20 border-rose-500/40 text-rose-300" },
  { id: "amber",  label: "Gold Fire",    primary: "#f59e0b", glow: "shadow-[0_0_20px_rgba(245,158,11,0.5)]",  bg: "bg-amber-500",  border: "border-amber-500/50",  badge: "bg-amber-500/20 border-amber-500/40 text-amber-300" },
];

function GlitchText({ text, isGlitching }: { text: string; isGlitching: boolean }) {
  const [displayText, setDisplayText] = useState(text);
  const chars = "!@#$%^&*<>?/\\|{}[]01";

  useEffect(() => {
    if (!isGlitching) { setDisplayText(text); return; }
    let i = 0;
    const interval = setInterval(() => {
      setDisplayText(
        text.split("").map((c, j) =>
          j < i ? c : chars[Math.floor(Math.random() * chars.length)]
        ).join("")
      );
      i++;
      if (i > text.length) {
        clearInterval(interval);
        setDisplayText(text);
      }
    }, 40);
    return () => clearInterval(interval);
  }, [isGlitching, text]);

  return (
    <span
      className={`font-mono tracking-wider ${isGlitching ? "animate-pulse" : ""}`}
      style={isGlitching ? { textShadow: "2px 0 #f43f5e, -2px 0 #22d3ee" } : undefined}
    >
      {displayText}
    </span>
  );
}

function StatBar({ label, value, max, color }: { label: string; value: number; max: number; color: string }) {
  const pct = Math.round((value / max) * 100);
  return (
    <div className="space-y-1" role="meter" aria-valuenow={value} aria-valuemax={max} aria-label={label}>
      <div className="flex justify-between text-[11px] font-mono">
        <span className="text-slate-500">{label}</span>
        <span className="text-slate-400">{value}/{max}</span>
      </div>
      <div className="h-2 rounded-full bg-white/5 border border-white/8 overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-700 ${color}`}
          style={{ width: `${pct}%`, boxShadow: `0 0 8px currentColor` }}
        />
      </div>
    </div>
  );
}

export function GlitchPlayground() {
  const [theme, setTheme] = useState<ColorTheme>("indigo");
  const [isGlitching, setIsGlitching] = useState(false);
  const [scanlines, setScanlines] = useState(true);
  const [hp, setHp] = useState(72);
  const [mp, setMp] = useState(45);
  const [xp, setXp] = useState(60);
  const [alertActive, setAlertActive] = useState(false);
  const [clickedBtn, setClickedBtn] = useState<string | null>(null);
  const [notification, setNotification] = useState<string | null>(null);

  const t = THEMES.find(x => x.id === theme)!;

  const triggerGlitch = useCallback(() => {
    setIsGlitching(true);
    setAlertActive(true);
    setTimeout(() => { setIsGlitching(false); setAlertActive(false); }, 1200);
  }, []);

  const handleBtnClick = (id: string, msg: string) => {
    setClickedBtn(id);
    setNotification(msg);
    setTimeout(() => { setClickedBtn(null); setNotification(null); }, 1800);
  };

  const handleAttack = () => {
    handleBtnClick("attack", "⚔️ CRITICAL HIT! -28 HP");
    setHp(prev => Math.max(0, prev - Math.floor(15 + Math.random() * 20)));
    triggerGlitch();
  };

  const handleHeal = () => {
    handleBtnClick("heal", "✨ RESTORED +25 HP");
    setHp(prev => Math.min(100, prev + 25));
    setMp(prev => Math.max(0, prev - 15));
  };

  const handleBoost = () => {
    handleBtnClick("boost", "⚡ POWER SURGE! +20 XP");
    setXp(prev => Math.min(100, prev + 20));
  };

  const handleReset = () => { setHp(72); setMp(45); setXp(60); };

  return (
    <div className="rounded-3xl border border-white/[0.08] bg-[#0b0c1a]/90 backdrop-blur-sm overflow-hidden">
      {/* Panel Header */}
      <div className="px-7 py-5 border-b border-white/[0.06] flex items-center justify-between flex-wrap gap-3">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-indigo-500/15 border border-indigo-500/30 flex items-center justify-center">
            <Cpu className="h-4 w-4 text-indigo-400" aria-hidden="true" />
          </div>
          <div>
            <div className="font-bold text-white text-sm" style={{ fontFamily: "var(--font-sora)" }}>
              Glitch UI Playground
            </div>
            <div className="text-[11px] text-slate-500">Interaksi langsung dengan komponen UI cyberpunk</div>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-2 flex-wrap">
          {/* Scanline toggle */}
          <button
            onClick={() => setScanlines(v => !v)}
            aria-pressed={scanlines}
            className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border text-[11px] font-semibold transition-all cursor-pointer ${
              scanlines ? "bg-white/10 border-white/20 text-white" : "bg-white/4 border-white/8 text-slate-500"
            }`}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-current" aria-hidden="true" />
            Scanlines
          </button>
          {/* Glitch trigger */}
          <button
            onClick={triggerGlitch}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-[11px] font-bold transition-all cursor-pointer ${t.badge} hover:opacity-90`}
            aria-label="Trigger glitch effect"
          >
            <Zap className="h-3 w-3" />
            GLITCH
          </button>
        </div>
      </div>

      {/* Theme Picker */}
      <div className="px-7 py-3 border-b border-white/[0.06] flex items-center gap-2 flex-wrap bg-black/10">
        <span className="text-[10px] text-slate-600 uppercase tracking-wider font-semibold mr-1">Tema:</span>
        {THEMES.map(th => (
          <button
            key={th.id}
            onClick={() => setTheme(th.id)}
            aria-pressed={theme === th.id}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-medium transition-all cursor-pointer border ${
              theme === th.id ? th.badge : "bg-white/4 border-white/8 text-slate-500 hover:text-white"
            }`}
          >
            <div className={`w-2 h-2 rounded-full ${th.bg} shrink-0`} aria-hidden="true" />
            {th.label}
          </button>
        ))}
      </div>

      {/* Main HUD Playground */}
      <div className="relative p-6 md:p-8">
        {/* Scanlines overlay */}
        {scanlines && (
          <div
            className="absolute inset-0 pointer-events-none z-10 opacity-[0.04]"
            style={{
              backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,1) 2px, rgba(0,0,0,1) 4px)",
            }}
            aria-hidden="true"
          />
        )}

        {/* Alert banner */}
        {alertActive && (
          <div
            className="absolute top-4 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2 px-4 py-2 rounded-lg bg-rose-500/20 border border-rose-500/40 text-rose-300 text-xs font-bold font-mono animate-pulse"
            role="alert"
          >
            <AlertTriangle className="h-3.5 w-3.5" aria-hidden="true" />
            [SIGNAL CORRUPTED — REBOOTING...]
          </div>
        )}

        <div className="relative z-0 grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* Left — HUD Panel */}
          <div
            className="rounded-2xl border border-white/10 bg-black/40 p-5 space-y-5"
            style={isGlitching ? { boxShadow: `0 0 0 1px #f43f5e, 0 0 0 2px #22d3ee` } : undefined}
          >
            {/* Player info */}
            <div className="flex items-center gap-3">
              <div
                className={`w-12 h-12 rounded-xl border ${t.border} flex items-center justify-center text-xl ${t.glow}`}
                style={{ background: `${t.primary}15` }}
              >
                🧙
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-mono font-bold text-sm text-white">
                  <GlitchText text="PLAYER_001" isGlitching={isGlitching} />
                </div>
                <div className="flex items-center gap-2 mt-1">
                  <span className={`text-[10px] px-2 py-0.5 rounded border font-bold ${t.badge}`}>LVL 42</span>
                  <span className="text-[10px] text-slate-600 font-mono">Class: Wizard</span>
                </div>
              </div>
              <Shield className="h-5 w-5 text-slate-600 shrink-0" aria-hidden="true" />
            </div>

            {/* Stat bars */}
            <div className="space-y-3">
              <StatBar label="HP" value={hp} max={100} color={hp > 50 ? "bg-emerald-500" : hp > 25 ? "bg-amber-500" : "bg-rose-500"} />
              <StatBar label="MP" value={mp} max={100} color="bg-cyan-500" />
              <StatBar label="XP" value={xp} max={100} color={t.bg} />
            </div>

            {/* Notification toast */}
            <div className={`h-8 flex items-center`}>
              {notification ? (
                <div className={`text-[11px] font-mono font-bold ${t.badge} px-3 py-1 rounded-lg border animate-pulse`} aria-live="polite">
                  {notification}
                </div>
              ) : (
                <div className="text-[11px] text-slate-700 font-mono">Pilih aksi di bawah...</div>
              )}
            </div>
          </div>

          {/* Right — Button Panel */}
          <div className="space-y-4">
            {/* HUD Buttons */}
            <div className="rounded-2xl border border-white/10 bg-black/40 p-5 space-y-3">
              <div className="text-[10px] uppercase tracking-wider text-slate-600 font-semibold mb-2">Action Buttons</div>

              {/* Primary */}
              <button
                onClick={handleAttack}
                aria-pressed={clickedBtn === "attack"}
                className={`w-full flex items-center justify-between px-5 py-3 rounded-xl text-sm font-bold font-mono transition-all cursor-pointer ${t.bg} text-white ${t.glow} hover:opacity-90 active:scale-95`}
              >
                <span className="flex items-center gap-2">
                  <Swords className="h-4 w-4" aria-hidden="true" />
                  ATTACK
                </span>
                <ChevronRight className="h-4 w-4 opacity-60" aria-hidden="true" />
              </button>

              {/* Secondary */}
              <button
                onClick={handleHeal}
                aria-pressed={clickedBtn === "heal"}
                className="w-full flex items-center justify-between px-5 py-3 rounded-xl text-sm font-bold font-mono transition-all cursor-pointer bg-emerald-500/15 border border-emerald-500/35 text-emerald-400 hover:bg-emerald-500/25 active:scale-95"
              >
                <span className="flex items-center gap-2">
                  <span aria-hidden="true">✨</span>
                  HEAL SPELL
                </span>
                <span className="text-[11px] text-emerald-600 font-mono">-15 MP</span>
              </button>

              {/* Accent */}
              <button
                onClick={handleBoost}
                aria-pressed={clickedBtn === "boost"}
                className="w-full flex items-center justify-between px-5 py-3 rounded-xl text-sm font-bold font-mono transition-all cursor-pointer bg-amber-500/15 border border-amber-500/35 text-amber-400 hover:bg-amber-500/25 active:scale-95"
              >
                <span className="flex items-center gap-2">
                  <Zap className="h-4 w-4" aria-hidden="true" />
                  POWER BOOST
                </span>
                <ChevronRight className="h-4 w-4 opacity-60" aria-hidden="true" />
              </button>

              {/* Ghost (danger) */}
              <button
                onClick={triggerGlitch}
                className="w-full flex items-center justify-between px-5 py-3 rounded-xl text-sm font-bold font-mono transition-all cursor-pointer bg-transparent border border-rose-500/30 text-rose-500/70 hover:bg-rose-500/10 hover:text-rose-400 hover:border-rose-500/50 active:scale-95"
              >
                <span className="flex items-center gap-2">
                  <AlertTriangle className="h-4 w-4" aria-hidden="true" />
                  TRIGGER GLITCH
                </span>
                <span className="text-[10px] opacity-60">DANGER</span>
              </button>
            </div>

            {/* Minimap / Dialog Preview */}
            <div className="rounded-2xl border border-white/10 bg-black/40 p-5">
              <div className="text-[10px] uppercase tracking-wider text-slate-600 font-semibold mb-3">Dialog Box</div>
              <div
                className={`rounded-xl border ${t.border} p-4`}
                style={{ background: `${t.primary}08` }}
              >
                <div className="flex items-start gap-3">
                  <span className="text-2xl leading-none">👾</span>
                  <div className="space-y-1.5">
                    <div className={`text-xs font-bold font-mono`} style={{ color: t.primary }}>
                      <GlitchText text="SYSTEM_AI" isGlitching={isGlitching} />
                    </div>
                    <p className="text-slate-400 text-xs leading-relaxed">
                      {isGlitching
                        ? "▓▒░ SIGNAL CORRUPTED — REBOOTING... ░▒▓"
                        : "Selamat datang di dungeon level 42. Gunakan action buttons di atas untuk berinteraksi dengan elemen HUD."}
                    </p>
                    <button
                      className={`mt-1 flex items-center gap-1 text-[11px] font-mono font-semibold ${t.badge.split(" ").slice(-1)[0]} cursor-pointer hover:opacity-80 transition-opacity`}
                    >
                      Lanjutkan <ChevronRight className="h-3 w-3" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Reset + info */}
        <div className="mt-6 flex items-center justify-between">
          <button
            onClick={handleReset}
            className="flex items-center gap-1.5 text-[11px] text-slate-600 hover:text-slate-400 transition-colors cursor-pointer font-mono"
            aria-label="Reset all stats"
          >
            <RotateCcw className="h-3 w-3" />
            Reset Stats
          </button>
          <div className="text-[11px] text-slate-700 font-mono" aria-hidden="true">
            UI KIT · 80+ KOMPONEN · SVG READY
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="px-7 py-4 border-t border-white/[0.06] bg-black/10 flex items-center gap-2 text-[11px] text-slate-600">
        <div className="w-3.5 h-3.5 rounded-full bg-indigo-500/15 border border-indigo-500/25 flex items-center justify-center shrink-0" aria-hidden="true">
          <div className="w-1 h-1 rounded-full bg-indigo-400" />
        </div>
        Demo interaktif — pack asli mengandung 80+ komponen UI dalam format SVG, PNG &amp; Unity/Godot package
      </div>
    </div>
  );
}
