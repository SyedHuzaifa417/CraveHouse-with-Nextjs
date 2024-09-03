import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET() {
  try {
    const bookings = await db.booking.findMany({
      orderBy: {
        date: "desc",
      },
    });

    return NextResponse.json(bookings);
  } catch (error) {
    console.error("Error fetching bookings:", error);
    return NextResponse.json(
      { error: "Error fetching bookings" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      date,
      time,
      people,
      looking,
      firstName,
      lastName,
      companyName,
      mobile,
      email,
      specialRequirements,
    } = body;

    const booking = await db.booking.create({
      data: {
        date: new Date(date),
        time,
        people,
        looking,
        firstName,
        lastName,
        companyName,
        mobile,
        email,
        specialRequirements,
      },
    });

    return NextResponse.json(booking);
  } catch (error) {
    console.error("Error creating booking:", error);
    return NextResponse.json(
      { error: "Error creating booking" },
      { status: 500 }
    );
  }
}
