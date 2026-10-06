"use client";

import type { Product } from "@/lib/store";

export function MirrorGuidanceMode({
  score,
  product,
  landmarks,
}: {
  score: { symmetry: number; precision: number; blending: number };
  product: Product | null;
  landmarks: number[][] | null;
}) {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/5 p-4">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-pink-200/80">Guidance</p>
          <h3 className="mt-2 text-lg font-semibold">Blend to lift</h3>
        </div>
        <div className="rounded-full border border-pink-400/30 bg-pink-500/10 px-2 py-1 text-xs text-pink-100">
          {product?.name ?? "Soft blush"}
        </div>
      </div>

      <div className="mt-4 grid gap-3 sm:grid-cols-3">
        {[
          { label: "Symmetry", value: score.symmetry },
          { label: "Precision", value: score.precision },
          { label: "Blending", value: score.blending },
        ].map((item) => (
          <div key={item.label} className="rounded-2xl border border-white/10 bg-[#0a1018] p-3">
            <p className="text-[10px] uppercase tracking-[0.25em] text-white/50">{item.label}</p>
            <p className="mt-2 text-2xl font-semibold text-white">{Math.round(item.value)}</p>
          </div>
        ))}
      </div>

      <div className="mt-4 rounded-2xl border border-white/10 bg-[#0a1018] p-3">
        <p className="text-sm text-white/80">
          {landmarks
            ? "I notice the left side is slightly heavier. Blend upward toward the temple to sculpt a lifted contour."
            : "Align your brush with the cheekbone and sweep upward for a lifted finish."}
        </p>
      </div>
    </div>
  );
}
