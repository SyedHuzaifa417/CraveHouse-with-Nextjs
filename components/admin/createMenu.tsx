"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const CreateMenuItem: React.FC = () => {
  const [categories, setCategories] = useState<
    Array<{ id: string; name: string }>
  >([]);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [originalPrice, setOriginalPrice] = useState("");
  const [description, setDescription] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [newCategoryName, setNewCategoryName] = useState("");

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get("/api/menu/categories");
        setCategories(response.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchCategories();
  }, []);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImage(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!image) return;

    try {
      const formData = new FormData();
      formData.append("image", image); //name,value

      const imageResponse = await axios.post(
        "/api/menu/upload-image",
        formData
      );
      const { imageUrl } = imageResponse.data;

      const menuItemResponse = await axios.post("/api/menu/menu-items", {
        name,
        price: parseFloat(price),
        originalPrice: originalPrice ? parseFloat(originalPrice) : null,
        description,
        imageUrl,
        categoryId,
      });

      if (menuItemResponse.status === 200) {
        setName("");
        setPrice("");
        setOriginalPrice("");
        setDescription("");
        setCategoryId("");
        setImage(null);
        toast.success("Menu item created successfully!");
      } else {
        toast.error("Error creating menu item");
      }
    } catch (error) {
      console.error("Error creating menu item:", error);
      toast.error("Error creating menu item");
    }
  };

  const handleCreateCategory = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await axios.post("/api/menu/categories", {
        name: newCategoryName,
      });

      if (response.status === 201) {
        setCategories([...categories, response.data]);
        setNewCategoryName("");
        toast.success("Category created successfully!");
      } else {
        toast.error("Error creating category");
      }
    } catch (error) {
      console.error("Error creating category:", error);
      toast.error("Error creating category");
    }
  };

  return (
    <div className="p-4 sm:p-6 md:p-8 space-y-6 bg-gray-900/30 text-h1Text">
      {/* Create New Category Form */}
      <form
        onSubmit={handleCreateCategory}
        className="flex flex-col sm:flex-row items-end justify-between mb-8"
      >
        <div className="w-full sm:w-2/3 mb-4 sm:mb-0">
          <label
            htmlFor="newCategoryName"
            className="block  md:text-base text-3xl lg:text-3xl sm:text-3xl font-bold mb-4 sm:mb-6 text-white"
          >
            Create New Category
          </label>
          <input
            type="text"
            id="newCategoryName"
            value={newCategoryName}
            onChange={(e) => setNewCategoryName(e.target.value)}
            className="w-full px-4 py-2 bg-gradient-to-r from-gray-700 to-gray-800 text-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full sm:w-auto py-2 px-4 rounded-lg bg-gradient-to-r from-food_red to-food_yellow text-white font-bold hover:from-red-500 hover:to-orange-500"
        >
          Create Category
        </button>
      </form>

      {/* Create Menu Item Form */}
      <h1 className="block  md:text-base text-3xl lg:text-3xl sm:text-3xl font-bold mb-4 sm:mb-6 text-white">
        Create new Item
      </h1>
      <form onSubmit={handleSubmit} className="max-w-4xl mx-auto space-y-4">
        <div className="flex flex-col sm:flex-row gap-6">
          <div className="flex-1">
            <label htmlFor="name" className="block mb-2 text-sm md:text-base">
              Name
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2 bg-gradient-to-r from-gray-700 to-gray-800 text-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
              required
            />
          </div>

          <div className="flex-1">
            <label htmlFor="price" className="block mb-2 text-sm md:text-base">
              Price
            </label>
            <input
              type="number"
              id="price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="w-full px-4 py-2 bg-gradient-to-r from-gray-700 to-gray-800 text-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
              required
            />
          </div>
        </div>

        <div>
          <label
            htmlFor="originalPrice"
            className="block mb-2 text-sm md:text-base"
          >
            Original Price (optional)
          </label>
          <input
            type="number"
            id="originalPrice"
            value={originalPrice}
            onChange={(e) => setOriginalPrice(e.target.value)}
            className="w-full px-4 py-2 bg-gradient-to-r from-gray-700 to-gray-800 text-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
        </div>

        <div>
          <label
            htmlFor="description"
            className="block mb-2 text-sm md:text-base"
          >
            Description
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-4 py-2 bg-gradient-to-r from-gray-700 to-gray-800 text-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
            required
          />
        </div>

        <div>
          <label htmlFor="category" className="block mb-2 text-sm md:text-base">
            Category
          </label>
          <select
            id="category"
            value={categoryId}
            onChange={(e) => setCategoryId(e.target.value)}
            className="w-full px-4 py-2 bg-gradient-to-r from-gray-700 to-gray-800 text-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
            required
          >
            <option value="" className="bg-gray-800" disabled>
              Select a category
            </option>
            {categories.map((category) => (
              <option
                key={category.id}
                value={category.id}
                className="bg-gray-800"
              >
                {category.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="image" className="block mb-2 text-sm md:text-base">
            Image
          </label>
          <input
            type="file"
            id="image"
            onChange={handleImageChange}
            className="flex w-full file:px-3 rounded-lg border border-orange-700 bg-gray-800 text-sm text-gray-300 file:bg-orange-600 file:text-white file:font-semibold"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full sm:w-auto py-2 px-4 mt-4 rounded-lg bg-gradient-to-r from-food_red to-food_yellow text-white font-bold hover:from-red-500 hover:to-orange-500"
        >
          Create Menu Item
        </button>
      </form>
    </div>
  );
};

export default CreateMenuItem;
