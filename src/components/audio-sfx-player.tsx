"use client";

import React, { useState, useRef, useCallback, useEffect } from "react";
import { Play, Square, Volume2, Waves } from "lucide-react";

type SFXType = "glitch" | "laser" | "impact" | "pickup" | "alert" | "powerup" | "menuclick" | "ambient";

interface SFXDef {
  id: SFXType;
  label: string;
  icon: string;
  color: string;
  colorBg: string;
  colorBorder: string;
  desc: string;
  duration: number;
}

const SFX_DEFS: SFXDef[] = [
  { id: "glitch",    label: "Glitch",      icon: "⚡", color: "text-indigo-400",  colorBg: "bg-indigo-500/10",  colorBorder: "border-indigo-500/30",  desc: "Distorsi sinyal",   duration: 280 },
  { id: "laser",     label: "Laser Shot",  icon: "🔫", color: "text-cyan-400",    colorBg: "bg-cyan-500/10",    colorBorder: "border-cyan-500/30",    desc: "Tembakan laser",    duration: 300 },
  { id: "impact",    label: "Impact",      icon: "💥", color: "text-rose-400",    colorBg: "bg-rose-500/10",    colorBorder: "border-rose-500/30",    desc: "Ledakan keras",     duration: 200 },
  { id: "pickup",    label: "Pickup",      icon: "✨", color: "text-amber-400",   colorBg: "bg-amber-500/10",   colorBorder: "border-amber-500/30",   desc: "Item diambil",      duration: 380 },
  { id: "alert",     label: "Alert",       icon: "🚨", color: "text-red-400",     colorBg: "bg-red-500/10",     colorBorder: "border-red-500/30",     desc: "Bahaya terdeteksi", duration: 500 },
  { id: "powerup",   label: "Power-Up",    icon: "🎮", color: "text-violet-400",  colorBg: "bg-violet-500/10",  colorBorder: "border-violet-500/30",  desc: "Booster aktif",    duration: 500 },
  { id: "menuclick", label: "Menu Click",  icon: "🖱️", color: "text-emerald-400", colorBg: "bg-emerald-500/10", colorBorder: "border-emerald-500/30", desc: "Navigasi UI",       duration: 100 },
  { id: "ambient",   label: "Ambient",     icon: "🌌", color: "text-slate-300",   colorBg: "bg-slate-500/10",   colorBorder: "border-slate-500/30",   desc: "Atmosfer ruang",   duration: 1700 },
];

function playSFX(ctx: AudioContext, type: SFXType) {
  const t = ctx.currentTime;
  switch (type) {
    case "glitch": {
      for (let i = 0; i < 6; i++) {
        const osc = ctx.createOscillator();
        const g = ctx.createGain();
        osc.connect(g); g.connect(ctx.destination);
        osc.type = "sawtooth";
        osc.frequency.setValueAtTime(150 + Math.random() * 900, t + i * 0.045);
        g.gain.setValueAtTime(0.18, t + i * 0.045);
        g.gain.exponentialRampToValueAtTime(0.001, t + i * 0.045 + 0.04);
        osc.start(t + i * 0.045); osc.stop(t + i * 0.045 + 0.05);
      }
      break;
    }
    case "laser": {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain); gain.connect(ctx.destination);
      osc.type = "sine";
      osc.frequency.setValueAtTime(1400, t);
      osc.frequency.exponentialRampToValueAtTime(180, t + 0.28);
      gain.gain.setValueAtTime(0.3, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.28);
      osc.start(t); osc.stop(t + 0.3);
      break;
    }
    case "impact": {
      const bufSize = Math.floor(ctx.sampleRate * 0.15);
      const buf = ctx.createBuffer(1, bufSize, ctx.sampleRate);
      const data = buf.getChannelData(0);
      for (let i = 0; i < bufSize; i++) data[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / bufSize, 3);
      const src = ctx.createBufferSource();
      const gain = ctx.createGain();
      src.buffer = buf; src.connect(gain); gain.connect(ctx.destination);
      gain.gain.setValueAtTime(1.0, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.15);
      src.start(t);
      break;
    }
    case "pickup": {
      [523, 659, 784, 1047].forEach((freq, i) => {
        const osc = ctx.createOscillator();
        const g = ctx.createGain();
        osc.connect(g); g.connect(ctx.destination);
        osc.type = "sine";
        osc.frequency.setValueAtTime(freq, t + i * 0.08);
        g.gain.setValueAtTime(0.22, t + i * 0.08);
        g.gain.exponentialRampToValueAtTime(0.001, t + i * 0.08 + 0.12);
        osc.start(t + i * 0.08); osc.stop(t + i * 0.08 + 0.14);
      });
      break;
    }
    case "alert": {
      [880, 660, 880, 660].forEach((freq, i) => {
        const osc = ctx.createOscillator();
        const g = ctx.createGain();
        osc.connect(g); g.connect(ctx.destination);
        osc.type = "square";
        osc.frequency.setValueAtTime(freq, t + i * 0.12);
        g.gain.setValueAtTime(0.12, t + i * 0.12);
        g.gain.exponentialRampToValueAtTime(0.001, t + i * 0.12 + 0.1);
        osc.start(t + i * 0.12); osc.stop(t + i * 0.12 + 0.13);
      });
      break;
    }
    case "powerup": {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain); gain.connect(ctx.destination);
      osc.type = "sine";
      osc.frequency.setValueAtTime(220, t);
      osc.frequency.exponentialRampToValueAtTime(880, t + 0.4);
      gain.gain.setValueAtTime(0.25, t);
      gain.gain.setValueAtTime(0.25, t + 0.35);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.48);
      osc.start(t); osc.stop(t + 0.5);
      break;
    }
    case "menuclick": {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain); gain.connect(ctx.destination);
      osc.type = "triangle";
      osc.frequency.setValueAtTime(700, t);
      gain.gain.setValueAtTime(0.28, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.07);
      osc.start(t); osc.stop(t + 0.08);
      break;
    }
    case "ambient": {
      for (let i = 0; i < 4; i++) {
        const osc = ctx.createOscillator();
        const g = ctx.createGain();
        osc.connect(g); g.connect(ctx.destination);
        osc.type = "sine";
        osc.frequency.setValueAtTime(40 * (i + 1), t);
        g.gain.setValueAtTime(0, t);
        g.gain.linearRampToValueAtTime(0.07, t + 0.3 + i * 0.1);
        g.gain.linearRampToValueAtTime(0, t + 1.6);
        osc.start(t); osc.stop(t + 1.7);
      }
      break;
    }
  }
}

/* ─── Animated Visualizer Bars ─── */
function VisualizerBars({ active, colorClass }: { active: boolean; colorClass: string }) {
  const [heights, setHeights] = useState<number[]>(Array(8).fill(3));

  useEffect(() => {
    if (!active) {
      setHeights(Array(8).fill(3));
      return;
    }
    const interval = setInterval(() => {
      setHeights(Array(8).fill(0).map(() => 3 + Math.random() * 20));
    }, 80);
    return () => clearInterval(interval);
  }, [active]);

  return (
    <div className="flex items-end gap-[2px] h-6 mt-2" aria-hidden="true">
      {heights.map((h, i) => (
        <div
          key={i}
          className={`w-[3px] rounded-full transition-all duration-75 ${active ? colorClass : "bg-white/10"}`}
          style={{ height: `${h}px` }}
        />
      ))}
    </div>
  );
}

/* ─── Main Component ─── */
export function AudioSFXPlayer() {
  const [playing, setPlaying] = useState<SFXType | null>(null);
  const [lastPlayed, setLastPlayed] = useState<SFXType | null>(null);
  const [globalBars, setGlobalBars] = useState<number[]>(Array(40).fill(3));
  const ctxRef = useRef<AudioContext | null>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const animRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (playing) {
      animRef.current = setInterval(() => {
        setGlobalBars(Array(40).fill(0).map((_, i) => {
          const base = [3, 5, 8, 6, 10, 7, 4, 9, 5, 6][i % 10];
          return base + Math.random() * 14;
        }));
      }, 60);
    } else {
      if (animRef.current) clearInterval(animRef.current);
      setGlobalBars(prev => prev.map(h => Math.max(3, h * 0.4)));
    }
    return () => { if (animRef.current) clearInterval(animRef.current); };
  }, [playing]);

  const handlePlay = useCallback((sfx: SFXDef) => {
    if (!ctxRef.current || ctxRef.current.state === "closed") {
      ctxRef.current = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
    }
    if (ctxRef.current.state === "suspended") ctxRef.current.resume();
    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    playSFX(ctxRef.current, sfx.id);
    setPlaying(sfx.id);
    setLastPlayed(sfx.id);
    timeoutRef.current = setTimeout(() => setPlaying(null), sfx.duration + 50);
  }, []);

  return (
    <div className="rounded-3xl border border-white/[0.08] bg-[#0b0c1a]/80 backdrop-blur-sm overflow-hidden">
      {/* Header */}
      <div className="px-7 py-5 border-b border-white/[0.06] flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-indigo-500/15 border border-indigo-500/30 flex items-center justify-center">
            <Volume2 className="h-4 w-4 text-indigo-400" aria-hidden="true" />
          </div>
          <div>
            <div className="font-bold text-white text-sm" style={{ fontFamily: "var(--font-sora)" }}>
              Audio SFX Preview
            </div>
            <div className="text-[11px] text-slate-500">Klik tombol untuk mendengarkan sampel efek suara</div>
          </div>
        </div>
        <div className="flex items-center gap-2" aria-live="polite">
          <div className={`w-1.5 h-1.5 rounded-full transition-colors duration-300 ${playing ? "bg-emerald-400 shadow-[0_0_6px_#34d399]" : "bg-slate-600"}`} />
          <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-500">
            {playing ? "Playing" : "Ready"}
          </span>
        </div>
      </div>

      {/* Global Waveform */}
      <div className="px-7 py-4 border-b border-white/[0.06] bg-black/20 flex items-center gap-3">
        <Waves className="h-3.5 w-3.5 text-slate-600 shrink-0" aria-hidden="true" />
        <div className="flex items-end gap-[2px] h-8 flex-1" aria-label="Global audio visualizer">
          {globalBars.map((h, i) => (
            <div
              key={i}
              className={`flex-1 rounded-full transition-all ${playing ? "duration-75" : "duration-300"} ${playing ? "bg-indigo-400/70" : "bg-white/8"}`}
              style={{ height: `${Math.min(h, 28)}px` }}
            />
          ))}
        </div>
        {lastPlayed && (
          <span className="text-[10px] text-indigo-400/70 shrink-0 font-mono font-bold">
            {SFX_DEFS.find(s => s.id === lastPlayed)?.label}
          </span>
        )}
      </div>

      {/* SFX Grid */}
      <div className="p-6 grid grid-cols-2 sm:grid-cols-4 gap-3">
        {SFX_DEFS.map((sfx) => {
          const isActive = playing === sfx.id;
          const bgColor = sfx.color.replace("text-", "bg-");
          return (
            <button
              key={sfx.id}
              onClick={() => handlePlay(sfx)}
              aria-label={`Play ${sfx.label} sound effect`}
              aria-pressed={isActive}
              className={`group relative p-4 rounded-2xl border text-left transition-all duration-200 cursor-pointer ${
                isActive
                  ? `${sfx.colorBg} ${sfx.colorBorder} scale-[0.97] shadow-lg`
                  : `bg-white/[0.025] border-white/8 hover:border-white/20 hover:bg-white/5 hover:scale-[1.02]`
              }`}
            >
              {/* Active glow ring */}
              {isActive && (
                <div className={`absolute inset-0 rounded-2xl ${sfx.colorBg} opacity-30 blur-xl`} aria-hidden="true" />
              )}
              <div className="relative">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-lg leading-none">{sfx.icon}</span>
                  <div className={`w-6 h-6 rounded-lg flex items-center justify-center transition-colors ${isActive ? sfx.colorBg : "bg-white/5 group-hover:bg-white/10"}`}>
                    {isActive
                      ? <Square className={`h-2.5 w-2.5 ${sfx.color}`} />
                      : <Play className={`h-2.5 w-2.5 text-slate-500 group-hover:text-white transition-colors`} />
                    }
                  </div>
                </div>
                <div className={`text-xs font-bold mb-0.5 transition-colors ${isActive ? sfx.color : "text-white"}`}>
                  {sfx.label}
                </div>
                <div className="text-[10px] text-slate-600 leading-tight">{sfx.desc}</div>
                <VisualizerBars active={isActive} colorClass={bgColor} />
              </div>
            </button>
          );
        })}
      </div>

      {/* Footer */}
      <div className="px-7 pb-5 flex items-center gap-2 text-[11px] text-slate-600">
        <div className="w-3.5 h-3.5 rounded-full bg-emerald-500/15 border border-emerald-500/25 flex items-center justify-center shrink-0" aria-hidden="true">
          <div className="w-1 h-1 rounded-full bg-emerald-400" />
        </div>
        Sampel sintetis — versi pack final memiliki 24 SFX WAV 44.1kHz stereo berkualitas studio
      </div>
    </div>
  );
}
