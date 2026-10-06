export const beautySystemPrompt = `
You are Aura, an expert Beauty Director and Dermatological Advisor.
Your role is to provide elevated, evidence-informed beauty recommendations, product selection, and application coaching.

Core knowledge:
- Cosmetics: formulations, undertones, textures, shade match, brands including MAC, Charlotte Tilbury, Rare Beauty, Fenty, Glossier, and emerging indie brands.
- Skin health: Fitzpatrick skin types, sunscreen support, ingredient safety, barrier repair, niacinamide, retinoids, AHAs/BHAs, ceramides, and non-comedogenic product guidance.
- Technique: blending, symmetry, contouring, blush placement, lip precision, eye definitions, and camera-friendly application.

Respond in valid JSON only:
{
  "speech": "friendly spoken response",
  "action": "APPLY_PRODUCT | ADVISE_SKIN | GUIDE_APPLICATION | NONE",
  "params": { ...optional action parameters... }
}

Keep the speech polished, reassuring, and concise, suitable for spoken output by a beauty AI coach.
`;

export type ProductCatalogItem = {
  id: string;
  name: string;
  brand: string;
  category: string;
  shadeHex: string;
  finish: string;
  roughness: number;
  metalness: number;
  clearcoat: number;
  zone: string;
  price: string;
  description: string;
};

export const productCatalog: ProductCatalogItem[] = [
  {
    id: "rb-blush-joy",
    name: "Soft Pinch Liquid Blush",
    brand: "Rare Beauty",
    category: "blush",
    shadeHex: "#E07A5F",
    finish: "satin",
    roughness: 0.42,
    metalness: 0.06,
    clearcoat: 0.15,
    zone: "cheeks",
    price: "$23",
    description: "Warm rose blush with a radiant satin finish."
  },
  {
    id: "mac-lip-velvet",
    name: "Velvet Teddy Lipstick",
    brand: "MAC",
    category: "lipstick",
    shadeHex: "#B86C65",
    finish: "velvet",
    roughness: 0.31,
    metalness: 0.04,
    clearcoat: 0.1,
    zone: "lips",
    price: "$26",
    description: "Soft beige-brown nude for a sophisticated finish."
  },
  {
    id: "fenty-foundation-440",
    name: "Pro Filt'r Soft Matte Foundation",
    brand: "Fenty Beauty",
    category: "foundation",
    shadeHex: "#F0D7C7",
    finish: "soft matte",
    roughness: 0.52,
    metalness: 0.05,
    clearcoat: 0.18,
    zone: "skin",
    price: "$38",
    description: "Medium-coverage complexion base with a polished, soft-matte finish."
  },
  {
    id: "ct-liner-queen",
    name: "Pillow Talk Eyeliner",
    brand: "Charlotte Tilbury",
    category: "eyeliner",
    shadeHex: "#121212",
    finish: "soft matte",
    roughness: 0.62,
    metalness: 0.12,
    clearcoat: 0.08,
    zone: "eyes",
    price: "$32",
    description: "Precise liner for softly lifted definition."
  },
  {
    id: "glossier-cloud",
    name: "Cloud Paint",
    brand: "Glossier",
    category: "blush",
    shadeHex: "#D98D7A",
    finish: "cream",
    roughness: 0.56,
    metalness: 0.04,
    clearcoat: 0.12,
    zone: "cheeks",
    price: "$22",
    description: "Fresh, natural-looking cream blush that melts into the skin."
  },
];
