"use client";
import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useEffect, useState } from "react";
import axios from "axios";
import { Skeleton } from "../ui/skeleton";
import Link from "next/link";

interface Category {
  id: string;
  name: string;
}

interface Menu {
  name: string;
  imageUrl: string;
  category: Category;
}

export default function MenuCategories() {
  const [menuItems, setMenuItems] = useState<Menu[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const response = await axios.get<Menu[]>("/api/menu/menu-items");
        setMenuItems(response.data);
      } catch (error) {
        console.error("Error fetching menu:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMenu();
  }, []);

  const filteredMenu = menuItems.filter(
    (item) => item.category.name === "Specials"
  );

  return (
    <div className="flex flex-col w-[95%] md:w-[90%] max-w-[75rem] justify-between mx-auto mb-12 items-start">
      <h2 className="text-3xl mt-14 mb-8 font-bold font-bodyFont tracking-[0.15rem] uppercase bg-gradient-to-r from-food_red to-yellow-500 bg-clip-text text-transparent">
        Popular Dishes
      </h2>
      <Carousel className="w-full relative">
        <CarouselContent>
          {loading
            ? Array.from({ length: 4 }).map((_, index) => (
                <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/4">
                  <div className="p-1">
                    <Skeleton className="w-56 h-56 rounded-full" />
                  </div>
                </CarouselItem>
              ))
            : filteredMenu.length > 0
            ? filteredMenu.map((category, index) => (
                <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/4">
                  <Link href="/menu">
                    <div className="p-1 relative">
                      <div className="flex w-56 h-56 items-center justify-center p-6 relative">
                        <Image
                          src={category.imageUrl}
                          alt={category.name}
                          layout="fill"
                          objectFit="cover"
                          className="rounded-full"
                        />

                        <div className="absolute inset-0 bg-black bg-opacity-40 rounded-full flex items-center justify-center">
                          <h1 className="text-white/75 text-2xl font-bold">
                            {category.name}
                          </h1>
                        </div>
                      </div>
                    </div>
                  </Link>
                </CarouselItem>
              ))
            : Array.from({ length: 4 }).map((_, index) => (
                <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/4">
                  <div className="p-1">
                    <Skeleton className="w-56 h-56 rounded-full" />
                  </div>
                </CarouselItem>
              ))}
        </CarouselContent>
        <CarouselPrevious className="left-0 md:-left-12" />
        <CarouselNext className="right-0 md:-right-12" />
      </Carousel>
    </div>
  );
}
