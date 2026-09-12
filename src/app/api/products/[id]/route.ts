import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { isAdminAuthenticated } from "@/lib/auth";

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  const { id } = await params;
  const body = await request.json().catch(() => null);
  if (!body) {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const data: Record<string, unknown> = {};

  if (typeof body.name === "string" && body.name.trim()) data.name = body.name.trim();
  if (typeof body.categoryId === "string" && body.categoryId) data.categoryId = body.categoryId;
  if (body.price !== undefined) {
    const priceCedis = Number(body.price);
    if (!Number.isFinite(priceCedis) || priceCedis < 0) {
      return NextResponse.json({ error: "Please enter a valid price." }, { status: 400 });
    }
    data.price = Math.round(priceCedis * 100);
  }
  if (body.stock !== undefined) {
    const stock = Number(body.stock);
    data.stock = Number.isFinite(stock) ? Math.max(0, Math.trunc(stock)) : 0;
  }
  if (body.image !== undefined) data.image = body.image || null;
  if (body.partNumber !== undefined) data.partNumber = body.partNumber || null;
  if (body.vehicleMake !== undefined) data.vehicleMake = body.vehicleMake || null;
  if (body.vehicleModel !== undefined) data.vehicleModel = body.vehicleModel || null;
  if (body.year !== undefined) data.year = body.year || null;
  if (body.description !== undefined) data.description = body.description || null;

  try {
    const product = await prisma.product.update({ where: { id }, data });
    return NextResponse.json(product);
  } catch {
    return NextResponse.json({ error: "Could not update this product." }, { status: 400 });
  }
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  const { id } = await params;

  try {
    await prisma.product.delete({ where: { id } });
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Could not delete this product." }, { status: 400 });
  }
}
