import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const categories = await db.category.findMany();
    return NextResponse.json(categories);
  } catch (error) {
    return NextResponse.json(
      { error: "Error fetching categories" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const { name } = await request.json();
    const category = await db.category.create({
      data: { name },
    });
    return NextResponse.json(category, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Error creating category" },
      { status: 500 }
    );
  }
}
