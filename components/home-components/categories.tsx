"use client";

import Image from "next/image";
import { useState } from "react";
import { CgArrowsScrollV } from "react-icons/cg";

interface RecipeCategory {
  name: string;
  imageUrl: string;
}

const recipeCategories: RecipeCategory[] = [
  {
    name: "Breakfast recipes",
    imageUrl: "",
  },
  {
    name: "Lunch recipes",
    imageUrl: "/lunch.jpg",
  },
  {
    name: "Dinner recipes",
    imageUrl: "/dinner.jpg",
  },
  {
    name: "Appetizer recipes",
    imageUrl: "/appetizer.jpg",
  },
  {
    name: "Salad recipes",
    imageUrl: "/salad.jpg",
  },
  {
    name: "Pizza recipes",
    imageUrl: "/pizza.jpg",
  },
  {
    name: "Smoothie recipes",
    imageUrl: "/smoothie.jpg",
  },
  {
    name: "Pasta recipes",
    imageUrl: "/pasta.jpg",
  },
];

export default function RecipeCategories() {
  const [showMore, setShowMore] = useState(false);

  const handleShowMore = () => {
    setShowMore(!showMore);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex w-[95%] md:w-[90%] max-w-[75rem] justify-between mx-auto">
        <h2 className="text-3xl font-bold text-h1Text my-12">
          Popular Restaurants
        </h2>
        {recipeCategories.length > 5 && (
          <button className="text-gray-400 text-3xl" onClick={handleShowMore}>
            <CgArrowsScrollV />
          </button>
        )}
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {recipeCategories
          .slice(0, showMore ? recipeCategories.length : 5)
          .map((category) => (
            <div
              key={category.name}
              className="rounded-lg flex flex-col items-center"
            >
              <Image
                src={category.imageUrl}
                alt={category.name}
                width={40}
                height={40}
                className="rounded-full w-max h-36 object-cover shadow-lg shadow-gray-900"
              />
              <div className="p-4">
                <h3 className="text-xl font-bold text-pText mb-2">
                  {category.name}
                </h3>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
