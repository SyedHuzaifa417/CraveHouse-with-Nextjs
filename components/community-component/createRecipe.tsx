"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import { useSession } from "next-auth/react";
import toast from "react-hot-toast";
import { useModal } from "../ui/Modal";

interface Category {
  id: string;
  name: string;
}

interface CreateRecipeProps {
  onRecipeCreated: () => void;
}

const CreateRecipe: React.FC<CreateRecipeProps> = ({ onRecipeCreated }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [ingredients, setIngredients] = useState<string[]>([""]);
  const [instructions, setInstructions] = useState<string[]>([""]);
  const [servings, setServings] = useState(0);
  const [cookingTimeHours, setCookingTimeHours] = useState("");
  const [cookingTimeMinutes, setCookingTimeMinutes] = useState("");
  const [cookingNote, setCookingNote] = useState("");
  const [category, setCategory] = useState("");
  const [categories, setCategories] = useState<Category[]>([]);
  const { data: session } = useSession();
  const { closeModal } = useModal();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get<Category[]>("/api/menu/categories");
        setCategories(response.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleIngredientChange = (index: number, value: string) => {
    const newIngredients = [...ingredients];
    newIngredients[index] = value;
    setIngredients(newIngredients);
  };

  const removeIngredient = (index: number) => {
    if (index > 0) {
      const newIngredients = ingredients.filter((_, i) => i !== index); //_is the ingredient input we want to remove
      setIngredients(newIngredients);
    }
  };

  const addIngredient = () => {
    setIngredients([...ingredients, ""]);
  };

  const handleInstructionChange = (index: number, value: string) => {
    const newInstructions = [...instructions];
    newInstructions[index] = value;
    setInstructions(newInstructions);
  };

  const removeInstruction = (index: number) => {
    if (index > 0) {
      const newInstructions = instructions.filter((_, i) => i !== index);
      setInstructions(newInstructions);
    }
  };

  const addInstruction = () => {
    setInstructions([...instructions, ""]);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      let imageUrl = "";
      if (image) {
        const formData = new FormData();
        formData.append("image", image);
        const uploadResponse = await axios.post(
          "/api/menu/upload-image",
          formData
        );
        imageUrl = uploadResponse.data.imageUrl;
      }
      const cookingTimeInMinutes =
        parseInt(cookingTimeHours) * 60 + parseInt(cookingTimeMinutes);

      const mealData = {
        title,
        image: imageUrl,
        description,
        ingredients,
        instructions,
        servings,
        cookingTime: cookingTimeInMinutes,
        cookingNote,
        categoryId: category,
        authorId: session?.user.id,
      };

      await axios.post("/api/community", mealData);
      closeModal();
      toast.success("Thank you Chef!");
      onRecipeCreated();
    } catch (error) {
      console.error("Error creating recipe:", error);
      toast.error("Please try later");
    }
  };

  return (
    <div className=" text-h1Text p-8 rounded-md ">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <h1 className="text-food_yellow text-2xl font-bold mb-4">
          Create new recipe
        </h1>
        <div>
          <label htmlFor="title" className="block mb-2">
            Title:
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-4 bg-gradient-to-r from-gray-600 to-gray-700 py-2 text-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
            required
          />
        </div>

        <div>
          <label htmlFor="description" className="block mb-2">
            Description:
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="resize-x w-full px-4 bg-gradient-to-r from-gray-600 to-gray-700 py-2 text-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 scrollbar-thin scrollbar-thumb-food_red scrollbar-track-slate-700"
            required
          />
        </div>

        <div className="flex flex-col gap-4 sm:flex-row sm:gap-6">
          {image && (
            <div className="flex items-center justify-center w-full sm:w-max">
              <Image
                src={image ? URL.createObjectURL(image) : ""}
                width={300}
                height={300}
                alt="Recipe Image"
                className="max-w-full max-h-60 object-contain"
              />
            </div>
          )}
          <div className="flex flex-col gap-2">
            <label htmlFor="image" className="block mb-2 text-sm sm:text-base">
              Recipe image:
            </label>
            <input
              type="file"
              id="image"
              onChange={handleImageChange}
              accept="image/*"
              className="flex w-full sm:w-auto file:px-3 rounded-lg border border-orange-700 bg-gray-800 text-sm text-gray-300 file:border-0 file:bg-orange-600 file:text-white file:text-lg file:font-semibold"
              required
            />
          </div>
        </div>

        <div>
          <h2 className="text-xl font-bold mb-2">Ingredients:</h2>
          {ingredients.map((ingredient, index) => (
            <div
              key={index}
              className="flex items-center gap-2 overflow-hidden"
            >
              <input
                type="text"
                value={ingredient}
                onChange={(e) => handleIngredientChange(index, e.target.value)}
                className="w-full px-4 bg-gradient-to-r from-gray-600 to-gray-700 py-2 text-gray-100 rounded-md focus:outline-none my-2"
                required
              />
              {index > 0 && (
                <button
                  type="button"
                  onClick={() => removeIngredient(index)}
                  className="bg-red-500 hover:bg-red-700 text-white font-bold px-2 rounded-full"
                >
                  -
                </button>
              )}
            </div>
          ))}
          <button
            type="button"
            onClick={addIngredient}
            className="bg-gray-500 hover:bg-gray-900 text-white font-bold  px-2 rounded-full"
          >
            +
          </button>
        </div>

        <div>
          <h2 className="text-xl font-bold mb-2">Instructions:</h2>
          {instructions.map((instruction, index) => (
            <div
              key={index}
              className="flex items-center gap-2 my-2 overflow-hidden"
            >
              <input
                type="text"
                value={instruction}
                onChange={(e) => handleInstructionChange(index, e.target.value)}
                className="w-full px-4 bg-gradient-to-r from-gray-600 to-gray-700 py-2 text-gray-100 rounded-md focus:outline-none"
                required
              />
              {index > 0 && (
                <button
                  type="button"
                  onClick={() => removeInstruction(index)}
                  className="bg-red-500 hover:bg-red-700 text-white font-bold px-2 rounded-full"
                >
                  -
                </button>
              )}
            </div>
          ))}
          <button
            type="button"
            onClick={addInstruction}
            className="bg-gray-500 hover:bg-gray-900 text-white font-bold  px-2 rounded-full"
          >
            +
          </button>
        </div>

        <div className="flex justify-between items-center">
          <div>
            <label htmlFor="servings" className="block mb-2">
              Servings:
            </label>
            <input
              type="number"
              id="servings"
              value={servings}
              onChange={(e) => setServings(Number(e.target.value))}
              className="w-24 px-4 bg-gradient-to-r from-gray-600 to-gray-700 py-2 text-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
              required
            />
          </div>

          <div>
            <label htmlFor="cookingTimeHours" className="block mb-2">
              Cooking Time:
            </label>
            <div className="flex gap-4 items-center">
              <div>
                <input
                  type="number"
                  id="cookingTimeHours"
                  placeholder="hour"
                  value={cookingTimeHours}
                  onChange={(e) => setCookingTimeHours(e.target.value)}
                  className="w-24 px-4 bg-gradient-to-r from-gray-600 to-gray-700 py-2 text-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                  required
                />
              </div>
              <span>-</span>
              <div>
                <input
                  type="number"
                  id="cookingTimeMinutes"
                  placeholder="minutes"
                  value={cookingTimeMinutes}
                  onChange={(e) => setCookingTimeMinutes(e.target.value)}
                  className="w-28 px-4 bg-gradient-to-r from-gray-600 to-gray-700 py-2 text-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                  required
                />
              </div>
            </div>
          </div>
        </div>

        <div>
          <label htmlFor="category" className="block mb-2">
            Category:
          </label>
          <select
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-max px-4 bg-gradient-to-r from-gray-600 to-gray-700 py-2 text-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
            required
          >
            <option value="" className="bg-gray-800">
              Select Category
            </option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id} className="bg-gray-800">
                {cat.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="cookingNote" className="block mb-2">
            Notes:
          </label>
          <textarea
            id="cookingNote"
            value={cookingNote}
            onChange={(e) => setCookingNote(e.target.value)}
            className="resize-x w-full px-4 bg-gradient-to-r from-gray-600 to-gray-700 py-2 text-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 scrollbar-thin scrollbar-thumb-food_red scrollbar-track-slate-700"
            required
          />
        </div>
        <button
          type="submit"
          className="w-max bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded-md"
        >
          Save
        </button>
      </form>
    </div>
  );
};

export default CreateRecipe;
