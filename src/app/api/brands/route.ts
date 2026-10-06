import { NextResponse } from "next/server";
import OpenAI from "openai";
import { beautySystemPrompt } from "@/lib/beauty-kb";

const openai = process.env.OPENAI_API_KEY ? new OpenAI({ apiKey: process.env.OPENAI_API_KEY }) : null;

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const message = typeof body?.message === "string" ? body.message : "";

    if (!message) {
      return NextResponse.json({
        speech: "I’m ready to help. Ask for a product match, skin care routine, or application coaching.",
        action: "NONE",
      });
    }

    if (!openai) {
      const fallback = createFallbackResponse(message);
      return NextResponse.json(fallback);
    }

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      temperature: 0.7,
      response_format: { type: "json_object" },
      messages: [
        { role: "system", content: beautySystemPrompt },
        { role: "user", content: message },
      ],
    });

    const raw = completion.choices[0]?.message?.content ?? "{}";
    const parsed = JSON.parse(raw) as {
      speech?: string;
      action?: string;
      params?: Record<string, unknown>;
    };

    return NextResponse.json({
      speech: parsed.speech ?? "I can help you with that.",
      action: parsed.action ?? "NONE",
      params: parsed.params ?? {},
    });
  } catch (error) {
    console.error("Agent brain error", error);
    return NextResponse.json(createFallbackResponse(""));
  }
}

function createFallbackResponse(message: string) {
  const normalized = message.toLowerCase();

  if (normalized.includes("blush") || normalized.includes("cheek")) {
    return {
      speech: "I’m applying Rare Beauty’s Soft Pinch blush in Joy with a radiant satin finish for a lifted cheek glow.",
      action: "APPLY_PRODUCT",
      params: {
        category: "blush",
        shadeHex: "#E07A5F",
        finish: "satin",
        roughness: 0.45,
        zone: "cheeks",
      },
    };
  }

  if (normalized.includes("lip") || normalized.includes("lipstick")) {
    return {
      speech: "Let’s try a soft rose lipstick with a satin finish. It will define the lips while keeping them hydrated.",
      action: "APPLY_PRODUCT",
      params: {
        category: "lipstick",
        shadeHex: "#B85C76",
        finish: "satin",
        roughness: 0.35,
        zone: "lips",
      },
    };
  }

  return {
    speech: "I’m Aura, your beauty director. I can recommend products, skin-safe routines, and application guidance for your face.",
    action: "NONE",
    params: {},
  };
}
