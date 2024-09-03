"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";

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
      // Upload image
      const formData = new FormData();
      formData.append("image", image); //name,value

      const imageResponse = await axios.post(
        "/api/menu/upload-image",
        formData
      );
      const { imageUrl } = imageResponse.data;

      // Create menu item
      const menuItemResponse = await axios.post("/api/menu/menu-items", {
        name,
        price: parseFloat(price),
        originalPrice: originalPrice ? parseFloat(originalPrice) : null,
        description,
        imageUrl,
        categoryId,
      });

      if (menuItemResponse.status === 200) {
        // Reset form
        setName("");
        setPrice("");
        setOriginalPrice("");
        setDescription("");
        setCategoryId("");
        setImage(null);
        alert("Menu item created successfully!");
      } else {
        alert("Error creating menu item");
      }
    } catch (error) {
      console.error("Error creating menu item:", error);
      alert("Error creating menu item");
    }
  };
  // Function to handle new category creation
  const handleCreateCategory = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await axios.post("/api/menu/categories", {
        name: newCategoryName,
      });

      if (response.status === 201) {
        setCategories([...categories, response.data]); // Add the new category to the list
        setNewCategoryName("");
        alert("Category created successfully!");
      } else {
        alert("Error creating category");
      }
    } catch (error) {
      console.error("Error creating category:", error);
      alert("Error creating category");
    }
  };
  return (
    <div className="max-w-md mx-auto mt-8">
      <form onSubmit={handleCreateCategory} className="mb-8">
        <div className="mb-4">
          <label htmlFor="newCategoryName" className="block mb-2">
            Create New Category
          </label>
          <input
            type="text"
            id="newCategoryName"
            value={newCategoryName}
            onChange={(e) => setNewCategoryName(e.target.value)}
            className="w-full px-3 py-2 border rounded"
            required
          />
        </div>
        <button
          type="submit"
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
        >
          Create Category
        </button>
      </form>

      <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-8">
        <div className="mb-4">
          <label htmlFor="name" className="block mb-2">
            Name
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-3 py-2 border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="price" className="block mb-2">
            Price
          </label>
          <input
            type="number"
            id="price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="w-full px-3 py-2 border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="originalPrice" className="block mb-2">
            Original Price (optional)
          </label>
          <input
            type="number"
            id="originalPrice"
            value={originalPrice}
            onChange={(e) => setOriginalPrice(e.target.value)}
            className="w-full px-3 py-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="description" className="block mb-2">
            Description
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-3 py-2 border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="category" className="block mb-2">
            Category
          </label>
          <select
            id="category"
            value={categoryId}
            onChange={(e) => setCategoryId(e.target.value)}
            className="w-full px-3 py-2 border rounded"
            required
          >
            <option value="" disabled>
              Select a category
            </option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label htmlFor="image" className="block mb-2">
            Image
          </label>
          <input
            type="file"
            id="image"
            onChange={handleImageChange}
            className="w-full px-3 py-2 border rounded"
            required
          />
        </div>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Create Menu Item
        </button>
      </form>
    </div>
  );
};

export default CreateMenuItem;
