import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { hash, compare } from "bcrypt";

export const dynamic = "force-dynamic";

export async function GET(req: any) {
  const userId = req.nextUrl.searchParams.get("userId");

  try {
    if (userId) {
      // Fetch single user
      const user = await db.user.findUnique({
        where: { id: userId },
        select: {
          id: true,
          email: true,
          username: true,
          name: true,
          isCommunityMember: true,
          bookmarkedRecipes: {
            select: {
              id: true,
              title: true,
              image: true,
              author: {
                select: {
                  name: true,
                },
              },
            },
          },
        },
      });

      if (!user) {
        return NextResponse.json({ error: "User not found" }, { status: 404 });
      }

      return NextResponse.json(user);
    } else {
      // Fetch all users
      const users = await db.user.findMany({
        select: {
          id: true,
          email: true,
          username: true,
          isCommunityMember: true,
        },
      });

      return NextResponse.json(users);
    }
  } catch (error) {
    console.error("Error fetching user data:", error);
    return NextResponse.json(
      { error: "Failed to fetch user data" },
      { status: 500 }
    );
  }
}

export async function PATCH(req: any) {
  const userId = req.nextUrl.searchParams.get("userId");
  const data = await req.json();

  if (!userId) {
    return NextResponse.json({ error: "User ID is required" }, { status: 400 });
  }

  try {
    if (data.action === "addBookmark") {
      const updatedUser = await db.user.update({
        where: { id: userId },
        data: {
          bookmarkedRecipes: {
            connect: { id: data.recipeId },
          },
        },
        include: {
          bookmarkedRecipes: true,
        },
      });

      return NextResponse.json(updatedUser);
    } else if (data.action === "removeBookmark") {
      const updatedUser = await db.user.update({
        where: { id: userId },
        data: {
          bookmarkedRecipes: {
            disconnect: { id: data.recipeId },
          },
        },
        include: {
          bookmarkedRecipes: {
            select: {
              id: true,
              title: true,
              image: true,
              author: {
                select: {
                  name: true,
                },
              },
            },
          },
        },
      });

      return NextResponse.json(updatedUser);
    } else {
      const updatedUser = await db.user.update({
        where: { id: userId },
        data: {
          name: data.name,
          username: data.username,
          isCommunityMember: data.isCommunityMember,
          ...(data.newPassword && { password: await hash(data.password, 10) }),
        },
        select: {
          id: true,
          email: true,
          username: true,
          name: true,
          isCommunityMember: true,
        },
      });

      return NextResponse.json(updatedUser);
    }
  } catch (error) {
    console.error("Error updating user data:", error);
    return NextResponse.json(
      { error: "Failed to update user data" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: any) {
  const userId = req.nextUrl.searchParams.get("userId");

  if (!userId) {
    return NextResponse.json({ error: "User ID is required" }, { status: 400 });
  }

  try {
    await db.user.delete({
      where: { id: userId },
    });

    return NextResponse.json(
      { message: "User deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting user:", error);
    return NextResponse.json(
      { error: "Failed to delete user" },
      { status: 500 }
    );
  }
}

export async function POST(req: any) {
  const userId = req.nextUrl.searchParams.get("userId");
  const { currentPassword, newPassword } = await req.json();

  if (!userId || !currentPassword) {
    return NextResponse.json(
      { error: "User ID and current password are required" },
      { status: 400 }
    );
  }

  try {
    const user = await db.user.findUnique({
      where: { id: userId },
      select: { password: true },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }
    if (!user.password) {
      return NextResponse.json(
        { error: "Please change password from your Google account" },
        { status: 404 }
      );
    }

    const isPasswordValid = await compare(currentPassword, user.password);

    if (!isPasswordValid) {
      return NextResponse.json(
        { error: "Invalid current password" },
        { status: 400 }
      );
    }

    // If we're changing the password
    if (newPassword) {
      const hashedNewPassword = await hash(newPassword, 10);
      await db.user.update({
        where: { id: userId },
        data: { password: hashedNewPassword },
      });
      return NextResponse.json(
        { message: "Password changed successfully" },
        { status: 200 }
      );
    }

    // If we're just validating the current password
    return NextResponse.json(
      { message: "Current password is valid" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error handling password operation:", error);
    return NextResponse.json(
      { error: "An error occurred while processing your request" },
      { status: 500 }
    );
  }
}
