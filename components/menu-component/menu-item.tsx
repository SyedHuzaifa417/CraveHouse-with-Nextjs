"use client";
import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import axios from "axios";
import toast from "react-hot-toast";
import { useAppDispatch } from "@/store/useAppDispatch";
import { addToCart } from "@/store/cartSlice";

interface MenuItem {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  description: string;
  imageUrl: string;
  categoryId: string;
}

interface Category {
  id: string;
  name: string;
}

const MenuItems: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [activeCategory, setActiveCategory] = useState("");
  const categoryRefs = useRef<{ [key: string]: HTMLDivElement | null }>({}); //[key:string ]=id, this ref here is of type object i-e. divElement
  const dispatch = useAppDispatch();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [categoriesResponse, menuItemsResponse] = await Promise.all([
          axios.get<Category[]>("/api/menu/categories"),
          axios.get<MenuItem[]>("/api/menu/menu-items"),
        ]);

        const sortedCategories = categoriesResponse.data.sort((a, b) =>
          a.id.localeCompare(b.id)
        );

        setCategories(sortedCategories);
        setMenuItems(menuItemsResponse.data);

        if (sortedCategories.length > 0) {
          setActiveCategory(sortedCategories[0].id);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        toast.loading("Fetching Menu");
      }
    };

    fetchData();
  }, []);

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
  }, [activeCategory, categories]);

  const scrollToCategory = (categoryId: string) => {
    categoryRefs.current[categoryId]?.scrollIntoView({ behavior: "smooth" });
  }; //It uses the categoryRefs object to find the DOM element for the given categoryId and calls scrollIntoView on it with smooth scrolling behavior.

  const handleAddToCart = (item: MenuItem) => {
    dispatch(addToCart(item));
    toast.success(`${item.name} added to cart`);
  };

  return (
    <div className="w-full">
      <nav className="sticky top-0 p-4 z-10 overflow-x-auto bg-[#282c34] shadow-lg shadow-gray-800 rounded-lg scrollbar-thin scrollbar-thumb-food_red scrollbar-track-gray-700">
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
            }}
            className="mb-0"
          >
            <h2 className="text-2xl font-bold my-4 text-food_yellow">
              {category.name}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {menuItems
                .filter((item) => item.categoryId === category.id)
                .map((item) => (
                  <div
                    key={item.id}
                    className="bg-gray-700 rounded-lg shadow-lg p-4 flex justify-between relative mb-1"
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
                    <div className="w-52 h-32 relative ml-4">
                      <Image
                        src={item.imageUrl}
                        alt={item.name}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        style={{ objectFit: "cover", width: "100%" }}
                        className="rounded-lg"
                      />
                    </div>
                    <button
                      className="absolute -bottom-4 -right-4 bg-food_yellow px-4 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold text-xl hover:bg-food_red"
                      onClick={() => handleAddToCart(item)}
                    >
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
