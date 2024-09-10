import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import Image from "next/image";
import toast from "react-hot-toast";
import { BiSearch } from "react-icons/bi";
import { useModal } from "@/components/ui/Modal";
import RecipeDetails from "./recipeDetail";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface Recipe {
  id: string;
  title: string;
  description: string;
  ingredients: string[];
  instructions: string[];
  cookingTime: number;
  date: Date;
  servings: number;
  cookingNote: string;
  image: string;
  category: {
    id: string;
    name: string;
  };
  author: {
    id: string;
    username: string;
    name: string;
  };
}

interface Category {
  id: string;
  name: string;
}

const RECIPES_PER_PAGE = 12;

const Recipes: React.FC = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [filteredRecipes, setFilteredRecipes] = useState<Recipe[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const { openModal } = useModal();

  const fetchRecipes = useCallback(async () => {
    try {
      const recipeResponse = await axios.get<Recipe[]>("/api/community");
      const recipesWithParsedDates = recipeResponse.data.map((recipe) => ({
        ...recipe,
        date: new Date(recipe.date),
      }));
      setRecipes(recipesWithParsedDates);
      setFilteredRecipes(recipeResponse.data);
    } catch (error) {
      console.error("Error fetching recipes:", error);
      toast.loading("Fetching recipes");
    }
  }, []);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const categoriesResponse = await axios.get<Category[]>(
          "/api/menu/categories"
        );
        setCategories(categoriesResponse.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
        toast.loading("Fetching categories");
      }
    };

    fetchCategories();
    fetchRecipes();
  }, [fetchRecipes]);

  useEffect(() => {
    const filtered = recipes.filter((recipe) => {
      const categoryMatch =
        activeCategory === "all" || recipe.category.name === activeCategory;
      const searchMatch = recipe.title
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      return categoryMatch && searchMatch;
    });
    setFilteredRecipes(filtered);
    setCurrentPage(1);
  }, [activeCategory, searchTerm, recipes]);

  const handleRecipeClick = (recipe: Recipe) => {
    openModal(<RecipeDetails recipe={recipe} />);
  };

  const totalPages = Math.ceil(filteredRecipes.length / RECIPES_PER_PAGE);
  const paginatedRecipes = filteredRecipes.slice(
    (currentPage - 1) * RECIPES_PER_PAGE,
    currentPage * RECIPES_PER_PAGE
  );

  return (
    <>
      <div className="sticky top-0 z-10 py-4">
        <section className="flex flex-col-reverse md:flex-row-reverse lg:flex-row mx-auto w-[95%] md:w-[90%] max-w-[75rem] justify-between items-center">
          <nav className="flex space-x-4 overflow-x-auto w-full sm:w-max md:w-max bg-gray-700 shadow-lg shadow-stone-600 px-6 py-3 rounded-full mb-4 scrollbar-thin scrollbar-thumb-food_red scrollbar-track-gray-700">
            <button
              className={`font-semibold hover:text-food_yellow whitespace-nowrap ${
                activeCategory === "all" ? "text-food_yellow" : "text-h1Text"
              }`}
              onClick={() => setActiveCategory("all")}
            >
              All
            </button>
            {categories.map((category) => (
              <button
                key={category.id}
                className={`font-semibold hover:text-food_yellow whitespace-nowrap ${
                  activeCategory === category.name
                    ? "text-food_yellow"
                    : "text-h1Text"
                }`}
                onClick={() => setActiveCategory(category.name)}
              >
                {category.name}
              </button>
            ))}
          </nav>
          <div className="flex items-center w-full sm:w-max p-2 rounded-xl bg-gray-700 text-white mb-3 lg:mb-0">
            <input
              type="text"
              placeholder="Search recipe..."
              className="rounded-s-full px-2 w-full outline-none ring-0 bg-gray-700 text-white"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <BiSearch className="text-h1Text mr-1 hover:text-orange-500 text-2xl cursor-pointer" />
          </div>
        </section>
      </div>

      <div className="flex flex-col-reverse lg:flex-row xl:flex-row gap-16 mx-auto my-24 w-full max-w-[75rem]">
        <div className="w-full lg:w-full">
          <h1 className="mb-7 text-pText">
            You have <span className="font-bold">{filteredRecipes.length}</span>{" "}
            recipes to explore
          </h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {paginatedRecipes.map((recipe) => (
              <div
                key={recipe.id}
                className="bg-gray-700/40 p-4 rounded-lg shadow-xl hover:shadow-gray-700/75 transform transition-transform duration-300 hover:scale-105 cursor-pointer"
                onClick={() => handleRecipeClick(recipe)}
              >
                <div className="w-full h-40 bg-gray-500 rounded-lg mb-4 relative">
                  <Image
                    src={recipe.image}
                    alt={recipe.title}
                    layout="fill"
                    objectFit="cover"
                    className="rounded-lg"
                  />
                </div>
                <h3 className="text-lg font-semibold text-pText mb-2 overflow-hidden whitespace-nowrap text-ellipsis">
                  {recipe.title}
                </h3>
                <p className="text-sm text-gray-400 overflow-hidden whitespace-nowrap text-ellipsis">
                  {recipe.description}
                </p>
                <div className="flex items-center justify-between mt-2">
                  <p className="text-sm text-gray-300 mt-2">
                    By: {recipe.author.username}
                  </p>
                  <p className="text-pText text-sm mt-2">
                    {recipe.date
                      ? new Date(recipe.date).toLocaleDateString()
                      : "N/A"}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {totalPages > 1 && (
            <Pagination className="mt-14">
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    onClick={() =>
                      setCurrentPage((prev) => Math.max(prev - 1, 1))
                    }
                    className={
                      currentPage === 1 ? "pointer-events-none opacity-50" : ""
                    }
                  />
                </PaginationItem>
                {[...Array(totalPages)].map((_, index) => (
                  <PaginationItem key={index}>
                    <PaginationLink
                      className="hover:bg-gray-700 hover:text-pText"
                      onClick={() => setCurrentPage(index + 1)}
                      isActive={currentPage === index + 1}
                    >
                      {index + 1}
                    </PaginationLink>
                  </PaginationItem>
                ))}
                <PaginationItem>
                  <PaginationNext
                    onClick={() =>
                      setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                    }
                    className={
                      currentPage === totalPages
                        ? "pointer-events-none opacity-50"
                        : ""
                    }
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          )}
        </div>
      </div>
    </>
  );
};

export default Recipes;
