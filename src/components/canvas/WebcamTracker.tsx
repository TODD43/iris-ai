"use client";

const presets = [
  { id: "daylight", label: "Daylight" },
  { id: "golden", label: "Golden Hour" },
  { id: "office", label: "Office Fluorescent" },
  { id: "evening", label: "Evening Glow" },
] as const;

export function LightingStudio({
  value,
  onChange,
}: {
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <div className="grid grid-cols-2 gap-2">
      {presets.map((preset) => (
        <button
          key={preset.id}
          onClick={() => onChange(preset.id)}
          className={`rounded-2xl border px-3 py-2 text-left text-sm transition ${
            value === preset.id
              ? "border-pink-400 bg-pink-500/20 text-pink-100"
              : "border-white/10 bg-white/5 text-white/70 hover:border-white/20"
          }`}
        >
          {preset.label}
        </button>
      ))}
    </div>
  );
}
