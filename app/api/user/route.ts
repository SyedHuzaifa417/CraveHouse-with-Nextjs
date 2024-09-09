import { NextResponse } from "next/server";
import { db } from "@/lib/db";

// Handle GET requests
export async function GET() {
  try {
    const users = await db.user.findMany({
      select: {
        id: true,
        email: true,
        username: true,
        isCommunityMember: true,
      },
    });
    return NextResponse.json(users, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch users" },
      { status: 500 }
    );
  }
}

// Only allow GET requests
export const methods = ["GET"];
