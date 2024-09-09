import React, { useState, useRef } from "react";
import Image from "next/image";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { SlCalender } from "react-icons/sl";
import { FaBookmark, FaRegClock } from "react-icons/fa";
import { MdPersonPin } from "react-icons/md";
import { BiCategory } from "react-icons/bi";
import { IoMdPrint } from "react-icons/io";
import { FaShareNodes } from "react-icons/fa6";

interface RecipeDetailsProps {
  recipe: {
    title: string;
    description: string;
    image: string;
    date: Date;
    author: {
      id: string;
      username?: string;
      name?: string;
    };
    category: {
      name: string;
    };
    ingredients: string[];
    instructions: string[];
    servings: number;
    cookingTime: number;
    cookingNote?: string;
  };
}

const RecipeDetails: React.FC<RecipeDetailsProps> = ({ recipe }) => {
  const [checkedIngredients, setCheckedIngredients] = useState<
    Record<number, boolean>
  >({});
  const componentRef = useRef<HTMLDivElement>(null);

  if (!recipe) {
    return <div className="text-center text-h1Text">Loading...</div>;
  }

  const formatCookingTime = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return `${hours > 0 ? `${hours}h ` : ""}${remainingMinutes}min`;
  };

  const handleCheckIngredient = (index: number) => {
    setCheckedIngredients((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const handlePrint = () => {
    if (componentRef.current) {
      const printWindow = window.open("", "", "width=800,height=600");
      printWindow?.document.write("<html><head><title>Print</title>");
      printWindow?.document.write("</head><body >");
      printWindow?.document.write(componentRef.current.innerHTML);
      printWindow?.document.write("</body></html>");
      printWindow?.document.close();
      printWindow?.focus();
      printWindow?.print();
    }
  };

  const handleShare = () => {
    const url = window.location.href;
    if (navigator.share) {
      navigator
        .share({
          title: recipe.title || "Recipe",
          text: "Check out this recipe!",
          url,
        })
        .catch(console.error);
    } else {
      alert("Web Share API not supported on this browser.");
    }
  };

  return (
    <Card
      className="w-full max-w-3xl mx-auto bg-transparent border-none"
      ref={componentRef}
    >
      <CardHeader className="flex flex-col sm:flex-row items-start justify-start">
        {recipe.image && (
          <Image
            src={recipe.image}
            alt={recipe.title || "Recipe Image"}
            width={400}
            height={300}
            className="w-full sm:w-56 h-56 object-cover rounded-lg mb-4 sm:mb-0"
          />
        )}
        <div className="sm:ml-4 w-full overflow-hidden">
          <h2 className="text-2xl text-h1Text font-bold text-start break-words overflow-wrap-anywhere ">
            {recipe.title || "Untitled Recipe"}
          </h2>
          <div className="flex mt-5  flex-wrap items-start justify-between text-sm text-gray-200 ">
            <div className="flex items-start flex-col">
              <p className="w-auto mb-2 flex">
                <SlCalender className="mr-2 text-food_yellow text-lg" />{" "}
                {recipe.date?.toLocaleDateString() || "N/A"}
              </p>
              <p className="w-full sm:w-auto mb-2 sm:mb-0 flex">
                <BiCategory className="mr-1 text-food_yellow text-lg" />{" "}
                {recipe.category?.name || " Uncategorized"}
              </p>
            </div>
            <div className="flex items-start flex-col">
              <p className="w-auto flex mb-2">
                <MdPersonPin className="mr-1 text-food_yellow text-xl" />
                {recipe.author?.username || recipe.author?.name || "Unknown"}
              </p>

              <p className="w-full sm:w-auto flex">
                <FaRegClock className="mr-1 text-food_yellow text-lg" /> Time:
                {recipe.cookingTime
                  ? formatCookingTime(recipe.cookingTime)
                  : "Not specified"}
              </p>
            </div>
          </div>
          <div className="flex flex-wrap items-center justify-around mt-3 text-white font-bold">
            <button
              onClick={handlePrint}
              className="w-24  bg-gray-800 shadow-md shadow-gray-600 hover:bg-orange-800 p-2 rounded-lg flex items-center gap-1 justify-center"
            >
              <IoMdPrint /> Print
            </button>
            <button
              onClick={handleShare}
              className="w-24  bg-gray-800 shadow-md shadow-gray-600 hover:bg-orange-800 p-2 rounded-lg flex items-center gap-1 justify-center"
            >
              <FaShareNodes /> Share
            </button>
            <button className="w-24  bg-gray-800 shadow-md shadow-gray-600 hover:bg-orange-800 p-2 rounded-lg flex items-center gap-1 justify-center">
              <FaBookmark /> Save
            </button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <p className="w-auto text-white text-lg  mb-2 text-end">
          <span className="text-xl font-semibold my-2 text-food_yellow mr-2">
            Servings:
          </span>{" "}
          {recipe.servings || "Not specified"}
        </p>
        <h3 className="text-xl font-semibold my-2 text-food_yellow">
          Details:
        </h3>
        <p className="text-gray-300 mb-4 break-words">
          {recipe.description || "No description available."}
        </p>

        <h3 className="text-xl font-semibold my-2 text-food_yellow">
          Ingredients
        </h3>
        {recipe.ingredients && recipe.ingredients.length > 0 ? (
          <ul className="mb-4">
            {recipe.ingredients.map((ingredient, index) => (
              <li key={index} className="flex items-start mb-2 text-pText">
                <Checkbox
                  id={`ingredient-${index}`}
                  className="mr-4 mt-1 border-food_yellow bg-transparent  fill-none flex-shrink-0"
                  checked={checkedIngredients[index]}
                  onCheckedChange={() => handleCheckIngredient(index)}
                />
                <label
                  htmlFor={`ingredient-${index}`}
                  className={`text-sm break-words ${
                    checkedIngredients[index]
                      ? "line-through text-gray-500"
                      : ""
                  }`}
                >
                  {ingredient}
                </label>
              </li>
            ))}
          </ul>
        ) : (
          <p className="mb-4">No ingredients listed.</p>
        )}

        <h3 className="text-xl font-semibold my-2 text-food_yellow">
          Instructions
        </h3>
        {recipe.instructions && recipe.instructions.length > 0 ? (
          <ol className="list-decimal list-inside mb-4">
            {recipe.instructions.map((instruction, index) => (
              <li
                key={index}
                className="mb-2 break-words pl-4 -indent-4 text-pText"
              >
                {instruction}
              </li>
            ))}
          </ol>
        ) : (
          <p className="mb-4">No instructions available.</p>
        )}

        {recipe.cookingNote && (
          <>
            <h3 className="text-xl font-semibold my-2 text-food_yellow">
              Cooking Notes
            </h3>
            <p className="text-gray-300 mb-4 break-words">
              {recipe.cookingNote}
            </p>
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default RecipeDetails;
