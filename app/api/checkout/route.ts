import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import Stripe from "stripe";
import { authOptions } from "../auth/[...nextauth]/route";
import { db } from "@/lib/db";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2024-06-20",
});

export async function POST(req: Request) {
  const session = await getServerSession(authOptions); //function provided by NextAuth.js,to securely retrieve the session data on the server side,maybe alternate to useSession

  if (!session || !session.user) {
    return NextResponse.json(
      { error: "Unauthorized:Please Login First" },
      { status: 401 }
    );
  }

  const body = await req.json();
  const { paymentMethodId, items, address } = body;

  if (!paymentMethodId || !items || !address) {
    return NextResponse.json(
      { error: "Missing required fields" },
      { status: 400 }
    );
  }

  try {
    const total = items.reduce(
      (acc: number, item: any) => acc + item.price * item.quantity,
      0
    );

    // Use a transaction to ensure consistency between payment and database operations
    const result = await db.$transaction(async (prisma) => {
      const paymentIntent = await stripe.paymentIntents.create({
        amount: Math.round(total * 100), // Stripe expects amounts in cents
        currency: "PKR",
        payment_method: paymentMethodId,
        confirm: true,
        automatic_payment_methods: {
          enabled: true,
          allow_redirects: "never",
        },
        use_stripe_sdk: true,
        return_url: `${process.env.NEXTAUTH_URL}/menu`,
      });

      if (paymentIntent.status === "succeeded") {
        const delivery = await prisma.delivery.create({
          data: {
            userId: session.user.id,
            address: address,
            total: total,
            deliveryDate: new Date(Date.now() + 30 * 60 * 1000), // Deliver in 30 minutes
            items: {
              create: items.map((item: any) => ({
                menuItemId: item.id,
                quantity: item.quantity,
              })),
            },
          },
          include: {
            items: true,
          },
        });

        return {
          success: true,
          delivery,
          clientSecret: paymentIntent.client_secret,
        };
      } else if (paymentIntent.status === "requires_action") {
        return {
          success: false,
          requiresAction: true,
          clientSecret: paymentIntent.client_secret,
          paymentIntentId: paymentIntent.id,
        };
      } else {
        throw new Error("Payment failed");
      }
    });

    return NextResponse.json(result);
  } catch (error: any) {
    console.error("Error processing payment:", error);
    return NextResponse.json(
      { error: error.message || "Payment failed. Please try again later." },
      { status: 500 }
    );
  }
}
