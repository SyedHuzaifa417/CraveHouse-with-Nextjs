// app/api/admin/route.ts
import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();

    const user = await db.user.findUnique({
      where: { email },
      select: { isAdmin: true },
    });

    if (user) {
      return NextResponse.json({ isAdmin: user.isAdmin }, { status: 200 });
    } else {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }
  } catch (error) {
    console.error("Error checking admin status:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
