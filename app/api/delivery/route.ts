import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const deliveries = await db.delivery.findMany({
      select: {
        id: true,
        deliveryDate: true,
        total: true,
        address: true,
        user: {
          select: {
            username: true,
            email: true,
          },
        },
        items: {
          select: {
            menuItem: {
              select: {
                name: true,
                price: true,
              },
            },
            quantity: true,
          },
        },
      },
      orderBy: {
        deliveryDate: "desc",
      },
    });

    return NextResponse.json(deliveries);
  } catch (error) {
    console.error("Error fetching deliveries:", error);
    return NextResponse.json(
      { error: "Error fetching deliveries" },
      { status: 500 }
    );
  }
}
