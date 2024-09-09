"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import communityImg from "@/assets/community.png";
import axios from "axios";
import { Skeleton } from "@/components/ui/skeleton";
import { RiAccountCircleFill } from "react-icons/ri";

interface Recipe {
  id: string;
  title: string;
  image: string;
  cookingTime: number;
  author: {
    id: string;
    username: string;
    name: string;
  };
}

const shuffleArray = (array: Recipe[]) => {
  return array.sort(() => Math.random() - 0.5);
};

const RecipeSharing: React.FC = () => {
  const [trendingRecipe, setTrendingRecipe] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const response = await axios.get<Recipe[]>("/api/community");
        setTrendingRecipe(response.data);
        setError(false);
      } catch (error) {
        console.error("Error fetching Recipes:", error);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipe();
  }, []);

  const randomRecipe = shuffleArray(trendingRecipe).slice(0, 6);

  const formatCookingTime = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return `${hours > 0 ? `${hours}h ` : ""}${remainingMinutes}min`;
  };

  const RecipeSkeleton = () => (
    <div className="bg-gray-700/40 p-4 rounded-lg shadow-lg shadow-gray-700/75">
      <Skeleton className="h-48 w-full mb-4 rounded-lg" />
      <Skeleton className="h-6 w-3/4 mb-2" />
      <Skeleton className="h-4 w-1/4 mb-2" />
      <div className="flex justify-between items-center">
        <Skeleton className="h-6 w-1/3" />
        <Skeleton className="h-6 w-1/4" />
      </div>
    </div>
  );

  return (
    <main className="min-h-screen p-6">
      <section className="mx-auto my-16 md:my-24 w-[95%] md:w-[90%] max-w-[75rem]">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold font-bodyFont tracking-[0.15rem] uppercase bg-gradient-to-r from-food_red to-yellow-500 bg-clip-text text-transparent">
            Trending Recipes
          </h2>
          <Link
            href="/community"
            className="text-food_yellow hover:text-orange-300"
          >
            View more
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {loading || error
            ? Array.from({ length: 6 }).map((_, index) => (
                <RecipeSkeleton key={index} />
              ))
            : randomRecipe.map((recipe) => (
                <div
                  key={recipe.id}
                  className="bg-gray-700/40 p-4 rounded-lg shadow-lg shadow-gray-700/75"
                >
                  <div className="relative h-48 mb-4">
                    <Image
                      src={recipe.image}
                      alt={recipe.title}
                      layout="fill"
                      objectFit="cover"
                      className="rounded-lg"
                    />
                  </div>
                  <h3 className="text-lg font-semibold text-pText mb-2">
                    {recipe.title}
                  </h3>
                  <div className="flex items-center mb-2">
                    {Array.from({ length: 5 }, (_, i) => (
                      <svg
                        key={i}
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-food_yellow"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <RiAccountCircleFill className="text-h1Text mr-2 text-lg" />
                      <span className="text-sm text-gray-400">
                        {recipe.author.username}
                      </span>
                    </div>
                    <div className="flex items-center text-sm text-gray-400">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 mr-1"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                        />
                      </svg>
                      {recipe.cookingTime
                        ? formatCookingTime(recipe.cookingTime)
                        : "Not specified"}
                    </div>
                  </div>
                </div>
              ))}
        </div>
      </section>
      {/* Share Your Recipes Section */}
      <section className="flex flex-col items-center md:flex-row gap-8 md:gap-12 mx-auto my-8 md:my-12 w-[95%] md:w-[90%] max-w-[75rem] lg:mt-28">
        <div>
          <h1 className="text-3xl font-bold font-bodyFont mt-5 mb-4 tracking-[0.15rem] uppercase bg-gradient-to-r from-food_red to-yellow-500 bg-clip-text text-transparent  text-center">
            Share Your Recipes
          </h1>
          <p className="text-lg text-pText mb-6 text-center">
            Connect with other food enthusiasts to share your favorite recipes
            and discover new ones.
          </p>
          <div className="text-xl md:text-2xl flex flex-col sm:flex-row gap-4 sm:gap-8 md:gap-9 md:mt-10 justify-center items-center">
            <Link
              href="/community"
              className="inline-block w-max py-2 px-4 rounded-lg bg-gradient-to-r from-food_red to-food_yellow text-white font-bold no-underline hover:from-red-500 hover:to-orange-500"
            >
              Join the Community
            </Link>
          </div>
        </div>
        <div className="w-2/3 h-[20rem] lg:h-[22rem] md:w-[50%] lg:w-[35rem] lg:mr-14 relative hidden md:block">
          <Image
            src={communityImg}
            alt="Share your recipe"
            layout="fill"
            objectFit="cover"
            className="rounded-xl"
          />
        </div>
      </section>
    </main>
  );
};

export default RecipeSharing;
