import React from "react";
import { useState, useEffect } from "react";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import Image from "next/image";
import { toast } from "react-hot-toast";

interface Author {
  name: string;
}

interface Bookmark {
  id: string;
  title: string;
  image: string | null;
  author: Author;
}

interface UserBookmarksProps {
  userId: string;
}

const UserBookmarks: React.FC<UserBookmarksProps> = ({ userId }) => {
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBookmarks = async () => {
      try {
        const response = await fetch(`/api/user?userId=${userId}`);
        if (!response.ok) {
          throw new Error("Failed to fetch bookmarks");
        }
        const userData = await response.json();
        setBookmarks(userData.bookmarkedRecipes);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchBookmarks();
  }, [userId]);

  const removeBookmark = async (recipeId: string) => {
    try {
      const response = await fetch(`/api/user?userId=${userId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ action: "removeBookmark", recipeId }),
      });

      if (!response.ok) {
        throw new Error("Failed to remove bookmark");
      }

      const updatedUserData = await response.json();
      setBookmarks(updatedUserData.bookmarkedRecipes);
      toast.success("Bookmark removed successfully");
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
      toast.error("Failed to remove bookmark");
    }
  };

  if (loading)
    return <div className="text-h1Text text-center">Loading bookmarks...</div>;
  if (error)
    return <div className="text-red-500 text-center">Error: {error}</div>;

  return (
    <>
      {" "}
      <h1 className="text-2xl text-h1Text mb-3 font-semibold">Bookmarks</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {bookmarks.length > 0 ? (
          bookmarks.map((bookmark) => (
            <Card
              key={bookmark.id}
              className="overflow-hidden border-gray-500 bg-slate-800"
            >
              <CardHeader className="p-0">
                <Image
                  src={bookmark.image || "/api/placeholder/300/200"}
                  alt={bookmark.title}
                  width={300}
                  height={200}
                  className="w-full h-40 object-cover"
                />
              </CardHeader>
              <CardContent className="p-4">
                <h3 className="text-lg font-semibold text-h1Text">
                  {bookmark.title}
                </h3>
                <p className="text-sm text-gray-400 mt-3">
                  By {bookmark.author.name}
                </p>
                <Button
                  variant="ghost"
                  size="sm"
                  className="bg-red-500 hover:bg-red-600 text-white mt-3"
                  onClick={() => removeBookmark(bookmark.id)}
                >
                  <X className="mr-2 h-4 w-4" /> Remove
                </Button>
              </CardContent>
            </Card>
          ))
        ) : (
          <div className="text-h1Text font-handFont text-center">
            no bookmarks{" "}
          </div>
        )}
      </div>
    </>
  );
};

export default UserBookmarks;
