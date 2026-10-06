import { NextResponse } from "next/server";
import { productCatalog } from "@/lib/beauty-kb";

export async function GET() {
  return NextResponse.json({ products: productCatalog });
}
