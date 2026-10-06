"use client";

import type { Product } from "@/lib/store";

export function CatalogTryOn({
  products,
  selectedProduct,
  onSelect,
}: {
  products: Product[];
  selectedProduct: Product | null;
  onSelect: (product: Product) => void;
}) {
  return (
    <div className="mt-4 space-y-3">
      {products.map((product) => {
        const active = selectedProduct?.id === product.id;

        return (
          <button
            key={product.id}
            onClick={() => onSelect(product)}
            className={`w-full rounded-2xl border p-3 text-left transition ${
              active ? "border-pink-400 bg-pink-500/10" : "border-white/10 bg-white/5 hover:border-white/20"
            }`}
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-sm font-semibold text-white">{product.name}</p>
                <p className="mt-1 text-xs text-white/60">{product.brand}</p>
              </div>
              <span className="rounded-full border border-white/10 bg-white/5 px-2 py-1 text-[10px] uppercase tracking-[0.2em] text-white/70">
                {product.category}
              </span>
            </div>

            <div className="mt-3 flex items-center gap-2">
              <span className="h-6 w-6 rounded-full border border-white/20" style={{ backgroundColor: product.shadeHex }} />
              <span className="text-xs text-white/70">{product.finish}</span>
              <span className="ml-auto text-xs font-medium text-pink-200">{product.price}</span>
            </div>
          </button>
        );
      })}
    </div>
  );
}
