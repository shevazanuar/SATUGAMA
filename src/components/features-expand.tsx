"use client";

import { useState } from "react";
import { ChevronDown, Check } from "lucide-react";

interface FeaturesExpandProps {
  features: string[];
  accentClass: string;   // e.g. "text-indigo-400"
  accentBg: string;      // e.g. "bg-indigo-500/10"
  accentBorder: string;  // e.g. "border-indigo-500/25"
}

export function FeaturesExpand({ features, accentClass, accentBg, accentBorder }: FeaturesExpandProps) {
  const [open, setOpen] = useState(false);

  return (
    <div>
      {/* Trigger badge */}
      <button
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls="features-list-panel"
        className={`flex items-center gap-1.5 text-xs font-semibold ${accentClass} hover:opacity-80 transition-opacity cursor-pointer group`}
      >
        {features.length}+ fitur termasuk
        <ChevronDown
          className={`h-3.5 w-3.5 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
          aria-hidden="true"
        />
      </button>

      {/* Expandable panel */}
      {open && (
        <div
          id="features-list-panel"
          role="region"
          aria-label="Daftar fitur"
          className={`mt-3 rounded-2xl border ${accentBorder} ${accentBg} p-4 space-y-2 animate-in fade-in slide-in-from-top-2 duration-200`}
        >
          <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-500 mb-3">
            Semua yang termasuk dalam pack ini:
          </p>
          <ul className="space-y-2" aria-label="Daftar lengkap fitur">
            {features.map((feat, i) => (
              <li key={i} className="flex items-start gap-2">
                <div className={`mt-0.5 w-4 h-4 rounded-full ${accentBg} border ${accentBorder} flex items-center justify-center shrink-0`}>
                  <Check className={`h-2.5 w-2.5 ${accentClass}`} aria-hidden="true" />
                </div>
                <span className="text-slate-300 text-xs leading-relaxed">{feat}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
