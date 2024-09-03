import { db } from "@/lib/db";
import { getServerSession } from "next-auth/next";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";

export async function GET() {
  try {
    const recipe = await db.recipe.findMany({
      select: {
        id: true,
        title: true,
        description: true,
        image: true,
        category: {
          select: {
            name: true,
          },
        },
        author: {
          select: {
            id: true,
            username: true,
            name: true,
          },
        },
      },
    });
    return NextResponse.json(recipe);
  } catch (error) {
    console.error("Failed to fetch recipes:", error);
    return NextResponse.json(
      { error: "Failed to fetch recipes" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      title,
      description,
      image,
      ingredients,
      instructions,
      servings,
      cookingTime,
      categoryId,
      authorId,
      cookingNote,
    } = body;

    const user = await db.user.findUnique({
      where: { id: authorId },
      select: { isCommunityMember: true },
    });

    if (!user || !user.isCommunityMember) {
      return NextResponse.json(
        { error: "Only community members can post recipes" },
        { status: 403 }
      );
    }

    const newRecipe = await db.recipe.create({
      data: {
        title,
        description,
        image,
        ingredients,
        instructions,
        servings,
        cookingTime,
        author: {
          connect: { id: authorId },
        },
        category: {
          connect: { id: categoryId },
        },
        cookingNote,
      },
    });

    return NextResponse.json(newRecipe, { status: 201 });
  } catch (error) {
    console.error("Failed to create recipe:", error);
    return NextResponse.json(
      { error: "Failed to create recipe" },
      { status: 500 }
    );
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
      return NextResponse.json(
        { error: "You must be logged in to join the community" },
        { status: 401 }
      );
    }

    const updatedUser = await db.user.update({
      where: { id: session.user.id },
      data: { isCommunityMember: true },
    });

    if (updatedUser) {
      return NextResponse.json(
        { message: "Successfully joined the community" },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        { error: "Failed to join the community" },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("Failed to join community:", error);
    return NextResponse.json(
      { error: "An error occurred while joining the community" },
      { status: 500 }
    );
  }
}
