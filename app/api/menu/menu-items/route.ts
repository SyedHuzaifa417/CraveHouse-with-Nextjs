import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET() {
  try {
    const menuItems = await db.menuItem.findMany({
      include: { category: true },
    });
    return NextResponse.json(menuItems);
  } catch (error) {
    return NextResponse.json(
      { error: "Error fetching menu items" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const { name, price, originalPrice, description, imageUrl, categoryId } =
      await request.json();

    if (!name || !price || !description || !categoryId) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const menuItem = await db.menuItem.create({
      data: {
        name,
        price,
        originalPrice: originalPrice ? parseFloat(originalPrice) : null,
        description,
        imageUrl,
        categoryId,
      },
    });

    return NextResponse.json(menuItem, { status: 200 });
  } catch (error) {
    console.error("Error creating menu item:", error);
    return NextResponse.json(
      { error: "Error creating menu item" },
      { status: 500 }
    );
  }
}
