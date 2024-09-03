"use client";
import React, { useState } from "react";
import Image from "next/image";
import about2 from "@/assets/about2.jpg";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { useModal } from "../ui/Modal";

const NewsletterModal: React.FC = () => {
  const { closeModal, modalData } = useModal();
  const [email, setEmail] = useState(modalData?.email || "");
  const [name, setName] = useState("");
  const [city, setCity] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const data = { email, name, city, message };

    try {
      const response = await axios.post("/api/subscription", data);

      if (response.data.success) {
        toast.success("Subscribed Successfully");
      } else {
        toast.error("Subscription failed");
      }
    } catch (error) {
      console.error("An error occurred while subscribing:", error);
    }

    closeModal();
  };

  return (
    <>
      <Toaster
        position="bottom-right"
        toastOptions={{
          duration: 3000,
          style: {
            background: "#333",
            color: "#fff",
            height: 64,
            width: 354,
          },
        }}
      />
      <div className="flex">
        <div className="w-1/2 hidden lg:block">
          <Image
            src={about2}
            alt="community"
            width={300}
            height={400}
            style={{ objectFit: "cover" }}
            className="h-full w-full"
          />
        </div>
        <div className="w-auto p-8">
          <h2 className="text-3xl font-bold text-gray-200 mb-4">
            Subscribe to our website!
          </h2>
          <p className="text-gray-300 mb-6">
            We&apos;ll send you the best of our Recipes and great offers.
          </p>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter Your Email"
              className="w-full px-4 bg-gradient-to-r from-gray-600 to-gray-700 py-2 text-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
              required
            />
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter Your Name"
              className="w-full px-4 bg-gradient-to-r from-gray-600 to-gray-700 py-2 text-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
            <input
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder="Enter Your City"
              className="w-full px-4 bg-gradient-to-r from-gray-600 to-gray-700 py-2 text-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Enter Your Message"
              className="w-full px-4 bg-gradient-to-r from-gray-600 to-gray-700 py-2 text-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
              rows={3}
            />
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-food_red to-food_yellow text-white font-bodyFont font-semibold px-6 py-2 rounded-md hover:from-red-500 hover:to-yellow-500 transition duration-300"
            >
              Subscribe
            </button>
          </form>
          <p className="text-sm text-gray-300 mt-4">
            We value your privacy and will never send irrelevant information
          </p>
        </div>
      </div>
    </>
  );
};

export default NewsletterModal;
