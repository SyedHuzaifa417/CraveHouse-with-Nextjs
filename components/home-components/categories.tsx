"use client";

import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

interface RecipeCategory {
  name: string;
  imageUrl: string;
}

const recipeCategories: RecipeCategory[] = [
  { name: "Breakfast recipes", imageUrl: "" },
  { name: "Lunch recipes", imageUrl: "/lunch.jpg" },
  { name: "Dinner recipes", imageUrl: "/dinner.jpg" },
  { name: "Appetizer recipes", imageUrl: "/appetizer.jpg" },
  { name: "Salad recipes", imageUrl: "/salad.jpg" },
  { name: "Pizza recipes", imageUrl: "/pizza.jpg" },
  { name: "Smoothie recipes", imageUrl: "/smoothie.jpg" },
  { name: "Pasta recipes", imageUrl: "/pasta.jpg" },
];

export default function RecipeCategories() {
  return (
    <div className="flex flex-col w-[95%] md:w-[90%] max-w-[75rem] justify-between mx-auto mb-12 items-start">
      <h2 className="text-3xl mt-14 mb-8 font-bold font-bodyFont tracking-[0.15rem] uppercase bg-gradient-to-r from-food_red to-yellow-500 bg-clip-text text-transparent">
        Popular Dishes
      </h2>

      <Carousel>
        <CarouselContent>
          {recipeCategories.map((category) => (
            <CarouselItem
              key={category.name}
              className="rounded-lg flex flex-col items-center pl-1 basis-1/2 md:basis-1/4 lg:basis-1/5"
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
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
}
