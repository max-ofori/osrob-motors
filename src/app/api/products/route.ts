import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { isAdminAuthenticated } from "@/lib/auth";
import { uniqueSlug } from "@/lib/slug";

export async function POST(request: NextRequest) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  const body = await request.json().catch(() => null);
  if (!body) {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const name = typeof body.name === "string" ? body.name.trim() : "";
  const categoryId = typeof body.categoryId === "string" ? body.categoryId : "";
  const priceCedis = Number(body.price);
  const stock = Number.isFinite(Number(body.stock)) ? Math.max(0, Math.trunc(Number(body.stock))) : 0;

  if (!name) return NextResponse.json({ error: "Product name is required." }, { status: 400 });
  if (!categoryId) return NextResponse.json({ error: "Please choose a category." }, { status: 400 });
  if (!Number.isFinite(priceCedis) || priceCedis < 0) {
    return NextResponse.json({ error: "Please enter a valid price." }, { status: 400 });
  }

  const product = await prisma.product.create({
    data: {
      name,
      slug: uniqueSlug(name),
      categoryId,
      price: Math.round(priceCedis * 100), // stored as pesewas
      stock,
      image: typeof body.image === "string" && body.image ? body.image : null,
      partNumber: body.partNumber || null,
      vehicleMake: body.vehicleMake || null,
      vehicleModel: body.vehicleModel || null,
      year: body.year || null,
      description: body.description || null,
    },
  });

  return NextResponse.json(product, { status: 201 });
}
