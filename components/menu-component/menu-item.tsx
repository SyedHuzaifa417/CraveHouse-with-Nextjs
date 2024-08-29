"use client";
import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";

interface MenuItem {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  description: string;
  image: string;
  category: string;
}

interface Category {
  id: string;
  name: string;
}

const categories: Category[] = [
  { id: "popular", name: "Popular" },
  { id: "crazy-deals", name: "Crazy Deals" },
  { id: "shawarma", name: "Shawarma" },
  { id: "chinese", name: "Chinese" },
  { id: "burgers-sandwiches", name: "Burgers & Sandwiches" },
  { id: "platters", name: "Platters" },
  { id: "soup", name: "Soup" },
  { id: "rice", name: "Rice" },
];

const menuItems: MenuItem[] = [
  {
    id: "1",
    name: "Pizza Sandwich",
    price: 315,
    originalPrice: 450,
    description:
      "Black olives, vegetables, cheese, chicken, fries & mayo garlic",
    image: "/path-to-pizza-sandwich-image.jpg",
    category: "popular",
  },
  {
    id: "2",
    name: "Chow Mein",
    price: 493.5,
    originalPrice: 705,
    description: "Spaghetti, chicken, vegetable & spices",
    image: "/path-to-chow-mein-image.jpg",
    category: "chinese",
  },
  {
    id: "3",
    name: " Mein",
    price: 493.5,
    originalPrice: 705,
    description: "Spaghetti, chicken, vegetable & spices",
    image: "/path-to-chow-mein-image.jpg",
    category: "rice",
  },
  {
    id: "4",
    name: " Mein",
    price: 493.5,
    originalPrice: 705,
    description: "Spaghetti, chicken, vegetable & spices",
    image: "/path-to-chow-mein-image.jpg",
    category: "popular",
  },
  // Add more menu items here...
];

const MenuItems: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState("popular");
  const categoryRefs = useRef<{ [key: string]: HTMLDivElement | null }>({}); //[key:string ]=id, this ref here is of type object i-e. divElement

  useEffect(() => {
    const handleScroll = () => {
      // This function is triggered on each scroll event.
      let currentCategory = "";
      categories.forEach(({ id }) => {
        //Iterates through each category and checks if its corresponding DOM element (element) is present.
        const element = categoryRefs.current[id]; //the element here is category div which have that current id
        if (element) {
          const rect = element.getBoundingClientRect(); // getBoundingClientRect() to get the position of the category element relative to the viewport.
          if (rect.top <= 100) {
            currentCategory = id;
          } //If the top of the element is within 100 pixels of the top of the viewport, it sets currentCategory to that category's ID
        }
      });
      if (currentCategory !== activeCategory) {
        setActiveCategory(currentCategory);
      } //If currentCategory has changed, setActiveCategory(currentCategory) is called to update the state.
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [activeCategory]);

  const scrollToCategory = (categoryId: string) => {
    categoryRefs.current[categoryId]?.scrollIntoView({ behavior: "smooth" });
  }; //It uses the categoryRefs object to find the DOM element for the given categoryId and calls scrollIntoView on it with smooth scrolling behavior.

  return (
    <div className="w-full">
      <nav className="sticky top-0 p-4 z-10 overflow-x-auto bg-[#282c34] shadow-lg shadow-gray-800 rounded-lg">
        <div className="flex space-x-4">
          {categories.map((category) => (
            <button
              key={category.id}
              className={`text-white px-3 py-2 rounded-md text-sm font-medium whitespace-nowrap ${
                activeCategory === category.id ? "bg-food_red" : ""
              }`}
              onClick={() => scrollToCategory(category.id)}
            >
              {category.name}
            </button>
          ))}
        </div>
      </nav>

      <div className="mt-8">
        {categories.map((category) => (
          <div
            key={category.id}
            ref={(el) => {
              categoryRefs.current[category.id] = el;
            }} // el is divElement
            className="mb-12"
          >
            <h2 className="text-2xl font-bold mb-4 text-food_yellow">
              {category.name}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {menuItems
                .filter((item) => item.category === category.id)
                .map((item) => (
                  <div
                    key={item.id}
                    className="bg-gray-700 rounded-lg shadow-lg p-4 flex"
                  >
                    <div className="flex-grow">
                      <h3 className="text-xl font-semibold text-white">
                        {item.name}
                      </h3>
                      <p className="text-gray-300 text-sm mt-1">
                        {item.description}
                      </p>
                      <div className="mt-2">
                        <span className="text-food_red font-bold">
                          Rs. {item.price.toFixed(2)}
                        </span>
                        {item.originalPrice && (
                          <span className="text-gray-400 line-through ml-2">
                            Rs. {item.originalPrice.toFixed(2)}
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="w-24 h-24 relative ml-4">
                      <Image
                        src={item.image}
                        alt={item.name}
                        layout="fill"
                        objectFit="cover"
                        className="rounded-lg"
                      />
                    </div>
                    <button className="relative -bottom-16 right-0 bg-food_yellow p-2 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-xl">
                      +
                    </button>
                  </div>
                ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MenuItems;
