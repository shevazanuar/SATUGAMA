"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { RotateCcw, Play, Pause, Box, Layers, Maximize2 } from "lucide-react";

interface ModelPreset {
  id: string;
  label: string;
  icon: string;
  color: string;
  colorBg: string;
  colorBorder: string;
  accentGlow: string;
  faces: { transform: string; bg: string; opacity: number; border: string }[];
}

const MODEL_PRESETS: ModelPreset[] = [
  {
    id: "starfighter",
    label: "Starfighter",
    icon: "🚀",
    color: "text-violet-400",
    colorBg: "bg-violet-500/10",
    colorBorder: "border-violet-500/30",
    accentGlow: "shadow-[0_0_60px_rgba(139,92,246,0.15)]",
    faces: [
      { transform: "translateZ(60px)",            bg: "bg-violet-500/25", opacity: 0.85, border: "border-violet-400/40" },
      { transform: "translateZ(-60px) rotateY(180deg)", bg: "bg-violet-700/25", opacity: 0.55, border: "border-violet-600/30" },
      { transform: "rotateY(90deg) translateZ(60px)",  bg: "bg-violet-600/20", opacity: 0.70, border: "border-violet-500/30" },
      { transform: "rotateY(-90deg) translateZ(60px)", bg: "bg-violet-800/20", opacity: 0.60, border: "border-violet-700/25" },
      { transform: "rotateX(90deg) translateZ(40px)",  bg: "bg-violet-400/15", opacity: 0.50, border: "border-violet-300/20" },
      { transform: "rotateX(-90deg) translateZ(40px)", bg: "bg-violet-900/30", opacity: 0.45, border: "border-violet-800/20" },
    ],
  },
  {
    id: "weapon",
    label: "Sword",
    icon: "⚔️",
    color: "text-amber-400",
    colorBg: "bg-amber-500/10",
    colorBorder: "border-amber-500/30",
    accentGlow: "shadow-[0_0_60px_rgba(245,158,11,0.12)]",
    faces: [
      { transform: "translateZ(24px)",                  bg: "bg-amber-500/30", opacity: 0.90, border: "border-amber-400/50" },
      { transform: "translateZ(-24px) rotateY(180deg)", bg: "bg-amber-700/25", opacity: 0.60, border: "border-amber-600/35" },
      { transform: "rotateY(90deg) translateZ(70px)",   bg: "bg-amber-600/20", opacity: 0.75, border: "border-amber-500/35" },
      { transform: "rotateY(-90deg) translateZ(70px)",  bg: "bg-amber-800/20", opacity: 0.65, border: "border-amber-700/30" },
      { transform: "rotateX(90deg) translateZ(100px)",  bg: "bg-amber-400/15", opacity: 0.55, border: "border-amber-300/25" },
      { transform: "rotateX(-90deg) translateZ(100px)", bg: "bg-amber-900/30", opacity: 0.50, border: "border-amber-800/25" },
    ],
  },
  {
    id: "gem",
    label: "Gem Crystal",
    icon: "💎",
    color: "text-cyan-400",
    colorBg: "bg-cyan-500/10",
    colorBorder: "border-cyan-500/30",
    accentGlow: "shadow-[0_0_60px_rgba(34,211,238,0.12)]",
    faces: [
      { transform: "translateZ(50px)",                  bg: "bg-cyan-400/30", opacity: 0.90, border: "border-cyan-300/50" },
      { transform: "translateZ(-50px) rotateY(180deg)", bg: "bg-cyan-600/25", opacity: 0.60, border: "border-cyan-500/35" },
      { transform: "rotateY(90deg) translateZ(50px)",   bg: "bg-cyan-500/25", opacity: 0.75, border: "border-cyan-400/40" },
      { transform: "rotateY(-90deg) translateZ(50px)",  bg: "bg-cyan-700/20", opacity: 0.65, border: "border-cyan-600/30" },
      { transform: "rotateX(90deg) translateZ(50px)",   bg: "bg-cyan-300/15", opacity: 0.55, border: "border-cyan-200/25" },
      { transform: "rotateX(-90deg) translateZ(50px)",  bg: "bg-cyan-900/35", opacity: 0.50, border: "border-cyan-800/30" },
    ],
  },
];

const MODEL_DIMS: Record<string, { w: number; h: number; d: number }> = {
  starfighter: { w: 120, h: 80, d: 120 },
  weapon:      { w: 48,  h: 200, d: 48 },
  gem:         { w: 100, h: 100, d: 100 },
};

export function ModelViewer3D() {
  const [selectedId, setSelectedId] = useState("starfighter");
  const [rotX, setRotX] = useState(20);
  const [rotY, setRotY] = useState(30);
  const [isAutoRotate, setIsAutoRotate] = useState(true);
  const [wireframe, setWireframe] = useState(false);
  const dragging = useRef(false);
  const lastPos = useRef({ x: 0, y: 0 });
  const frameRef = useRef<number | null>(null);
  const rotYRef = useRef(rotY);

  const preset = MODEL_PRESETS.find(m => m.id === selectedId) ?? MODEL_PRESETS[0];
  const dims = MODEL_DIMS[selectedId] ?? MODEL_DIMS.starfighter;

  // Auto-rotate loop
  useEffect(() => {
    if (!isAutoRotate) {
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
      return;
    }
    const tick = () => {
      rotYRef.current += 0.4;
      setRotY(rotYRef.current);
      frameRef.current = requestAnimationFrame(tick);
    };
    frameRef.current = requestAnimationFrame(tick);
    return () => { if (frameRef.current) cancelAnimationFrame(frameRef.current); };
  }, [isAutoRotate]);

  // Keep ref in sync
  useEffect(() => { rotYRef.current = rotY; }, [rotY]);

  const onPointerDown = useCallback((e: React.PointerEvent) => {
    dragging.current = true;
    lastPos.current = { x: e.clientX, y: e.clientY };
    setIsAutoRotate(false);
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  }, []);

  const onPointerMove = useCallback((e: React.PointerEvent) => {
    if (!dragging.current) return;
    const dx = e.clientX - lastPos.current.x;
    const dy = e.clientY - lastPos.current.y;
    lastPos.current = { x: e.clientX, y: e.clientY };
    setRotY(prev => { const v = prev + dx * 0.6; rotYRef.current = v; return v; });
    setRotX(prev => Math.max(-60, Math.min(60, prev - dy * 0.4)));
  }, []);

  const onPointerUp = useCallback(() => { dragging.current = false; }, []);

  const handleReset = () => {
    setRotX(20);
    setRotY(30);
    rotYRef.current = 30;
    setIsAutoRotate(true);
  };

  const modelSize = 240; // canvas size

  return (
    <div className="rounded-3xl border border-white/[0.08] bg-[#0b0c1a]/80 backdrop-blur-sm overflow-hidden">
      {/* Header */}
      <div className="px-7 py-5 border-b border-white/[0.06] flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className={`w-9 h-9 rounded-xl ${preset.colorBg} border ${preset.colorBorder} flex items-center justify-center`}>
            <Box className={`h-4 w-4 ${preset.color}`} aria-hidden="true" />
          </div>
          <div>
            <div className="font-bold text-white text-sm" style={{ fontFamily: "var(--font-sora)" }}>
              3D Model Preview
            </div>
            <div className="text-[11px] text-slate-500">Drag untuk memutar · Low-poly real-time viewer</div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {/* Wireframe toggle */}
          <button
            onClick={() => setWireframe(v => !v)}
            aria-label="Toggle wireframe mode"
            aria-pressed={wireframe}
            className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border text-[11px] font-semibold transition-all cursor-pointer ${
              wireframe
                ? `${preset.colorBg} ${preset.colorBorder} ${preset.color}`
                : "bg-white/5 border-white/10 text-slate-500 hover:text-slate-300"
            }`}
          >
            <Layers className="h-3 w-3" />
            Wireframe
          </button>
          {/* Auto-rotate toggle */}
          <button
            onClick={() => setIsAutoRotate(v => !v)}
            aria-label={isAutoRotate ? "Pause rotation" : "Resume rotation"}
            className="p-2 rounded-lg bg-white/5 border border-white/10 text-slate-400 hover:text-white hover:border-white/20 transition-all cursor-pointer"
          >
            {isAutoRotate ? <Pause className="h-3.5 w-3.5" /> : <Play className="h-3.5 w-3.5" />}
          </button>
          {/* Reset */}
          <button
            onClick={handleReset}
            aria-label="Reset view"
            className="p-2 rounded-lg bg-white/5 border border-white/10 text-slate-400 hover:text-white hover:border-white/20 transition-all cursor-pointer"
          >
            <RotateCcw className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>

      <div className="flex flex-col md:flex-row">
        {/* 3D Canvas */}
        <div
          className={`flex-1 flex items-center justify-center py-14 px-8 cursor-grab active:cursor-grabbing select-none relative ${preset.accentGlow}`}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerLeave={onPointerUp}
          role="img"
          aria-label={`Interactive 3D model of ${preset.label}`}
        >
          {/* Grid floor */}
          <div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage: "linear-gradient(rgba(139,92,246,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(139,92,246,0.3) 1px, transparent 1px)",
              backgroundSize: "30px 30px",
            }}
            aria-hidden="true"
          />

          {/* 3D Scene */}
          <div
            style={{ width: modelSize, height: modelSize, perspective: 800, perspectiveOrigin: "50% 50%" }}
          >
            <div
              style={{
                width: "100%",
                height: "100%",
                position: "relative",
                transformStyle: "preserve-3d",
                transform: `rotateX(${rotX}deg) rotateY(${rotY}deg)`,
                transition: dragging.current ? "none" : "transform 0.05s linear",
              }}
            >
              {/* Cube faces */}
              {preset.faces.map((face, i) => (
                <div
                  key={i}
                  aria-hidden="true"
                  style={{
                    position: "absolute",
                    left: "50%",
                    top: "50%",
                    width: dims.w,
                    height: dims.d,
                    marginLeft: -dims.w / 2,
                    marginTop: -dims.d / 2,
                    transform: face.transform,
                    transformStyle: "preserve-3d",
                    backfaceVisibility: wireframe ? "visible" : "hidden",
                    opacity: wireframe ? 0.6 : face.opacity,
                  }}
                  className={`border ${face.border} ${wireframe ? "bg-transparent" : face.bg}`}
                />
              ))}


              {/* Center glow orb */}
              {!wireframe && (
                <div
                  aria-hidden="true"
                  className={`absolute rounded-full ${preset.colorBg} blur-2xl`}
                  style={{
                    width: 80, height: 80,
                    left: "50%", top: "50%",
                    marginLeft: -40, marginTop: -40,
                    transform: "translateZ(0px)",
                  }}
                />
              )}
            </div>
          </div>

          {/* Corner hint */}
          <div className="absolute bottom-4 right-4 flex items-center gap-1.5 text-[10px] text-slate-600" aria-hidden="true">
            <Maximize2 className="h-3 w-3" />
            Drag to rotate
          </div>
        </div>

        {/* Model Selector */}
        <div className="md:w-56 border-t md:border-t-0 md:border-l border-white/[0.06] p-4 flex flex-col gap-2">
          <div className="text-[10px] font-semibold uppercase tracking-wider text-slate-600 mb-1 px-1">
            Model Pack
          </div>
          {MODEL_PRESETS.map(m => (
            <button
              key={m.id}
              onClick={() => { setSelectedId(m.id); setIsAutoRotate(true); }}
              aria-pressed={selectedId === m.id}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl border text-left transition-all cursor-pointer ${
                selectedId === m.id
                  ? `${m.colorBg} ${m.colorBorder}`
                  : "bg-white/[0.02] border-white/6 hover:bg-white/5 hover:border-white/12"
              }`}
            >
              <span className="text-xl leading-none">{m.icon}</span>
              <div>
                <div className={`text-sm font-bold ${selectedId === m.id ? m.color : "text-slate-300"}`}>
                  {m.label}
                </div>
                <div className="text-[10px] text-slate-600 mt-0.5">Low-poly mesh</div>
              </div>
            </button>
          ))}

          {/* Stats */}
          <div className="mt-auto pt-3 border-t border-white/[0.06] space-y-2">
            {[
              { label: "Poly Count", value: selectedId === "starfighter" ? "~2.4k" : selectedId === "weapon" ? "~1.8k" : "~1.2k" },
              { label: "Format",     value: "FBX / OBJ" },
              { label: "UV Maps",    value: "Included" },
            ].map(row => (
              <div key={row.label} className="flex justify-between text-[11px]">
                <span className="text-slate-600">{row.label}</span>
                <span className="text-slate-400 font-medium">{row.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="px-7 py-4 border-t border-white/[0.06] bg-black/10 flex items-center gap-2 text-[11px] text-slate-600">
        <div className="w-3.5 h-3.5 rounded-full bg-violet-500/15 border border-violet-500/25 flex items-center justify-center shrink-0" aria-hidden="true">
          <div className="w-1 h-1 rounded-full bg-violet-400" />
        </div>
        Preview model CSS 3D — pack asli mengandung model FBX &amp; OBJ dengan PBR textures 2K
      </div>
    </div>
  );
}
