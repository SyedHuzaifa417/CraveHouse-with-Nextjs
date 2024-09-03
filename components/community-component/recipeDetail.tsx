import React from "react";
import Image from "next/image";

interface RecipeDetailsProps {
  recipe: {
    title: string;
    description: string;
    image: string;
    author: {
      id: string;
      username?: string;
      name?: string;
    };
    category: {
      name: string;
    };
  };
}

const RecipeDetails: React.FC<RecipeDetailsProps> = ({ recipe }) => {
  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-lg text-white">
      <div className="relative w-full h-60 mb-4">
        <Image
          src={recipe.image}
          alt={recipe.title}
          layout="fill"
          objectFit="cover"
          className="rounded-lg"
        />
      </div>
      <h2 className="text-2xl font-bold mb-2">{recipe.title}</h2>
      <p className="text-gray-300 mb-4 text-nowrap">{recipe.description}</p>
      <p className="text-gray-500">Category: {recipe.category.name}</p>
      <p className="text-gray-50">
        Author: {recipe.author.username || recipe.author.name}
      </p>
    </div>
  );
};

export default RecipeDetails;
