"use client";
import React, { useState } from "react";
import { useModal } from "../ui/Modal";
import NewsletterModal from "./newsletterModal";

const StayInTouch = () => {
  const [email, setEmail] = useState("");
  const { openModal } = useModal();

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    openModal(<NewsletterModal />, { email });
  };

  return (
    <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-4xl font-bodyFont font-bold bg-gradient-to-r from-food_red to-yellow-500 bg-clip-text text-transparent mb-4">
          Let&apos;s Stay In Touch!
        </h2>
        <p className="text-xl text-gray-400 mb-8">
          Join our newsletter, so that we reach out to you with our news and
          offers.
        </p>
        <form
          onSubmit={handleSubscribe}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter Your Email"
            className="flex-grow px-4 py-2 bg-gradient-to-r from-gray-700 to-[#282c34] text-h1Text rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
            required
          />
          <button
            type="submit"
            className="w-max bg-gradient-to-r from-food_red to-food_yellow text-white font-bodyFont font-semibold px-6 py-2 rounded-md hover:from-red-500 hover:to-yellow-500 transition duration-300"
          >
            Subscribe
          </button>
        </form>
      </div>
    </div>
  );
};

export default StayInTouch;
