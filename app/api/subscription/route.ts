import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { db } from "@/lib/db";

export async function GET() {
  try {
    const subscriptions = await db.subscription.findMany();

    return NextResponse.json({ success: true, data: subscriptions });
  } catch (error) {
    console.error("Failed to fetch subscriptions:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch subscriptions" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, name, city, message } = body;
    const newSubscription = await db.subscription.create({
      data: {
        email,
        name,
        city,
        message,
      },
    });

    return NextResponse.json(
      { success: true, data: newSubscription },
      { status: 201 }
    );
  } catch (error) {
    console.error("Failed to subscribe:", error);
    return NextResponse.json(
      { success: false, error: "Failed to subscribe" },
      { status: 500 }
    );
  }
}
