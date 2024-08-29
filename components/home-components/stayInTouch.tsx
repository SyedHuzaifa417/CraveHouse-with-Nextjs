"use client";
import React, { useState } from "react";
import Image from "next/image";
import { CgClose } from "react-icons/cg";
import about2 from "@/assets/about2.jpg";

const StayInTouch = () => {
  const [email, setEmail] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    setIsModalOpen(true);
  };

  return (
    <div className="max-w-4xl mx-auto  py-12 px-4 sm:px-6 lg:px-8">
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
            className="flex-grow px-4 py-2 bg-gradient-to-r from-gray-700 to-[#282c34] text-h1Text  rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
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

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-20">
          <div className="bg-gray-700 rounded-lg max-w-xl w-full overflow-hidden shadow-lg shadow-gray-700">
            <div className="relative">
              <button
                onClick={() => setIsModalOpen(false)}
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
              >
                <CgClose />
              </button>
              <div className="flex">
                <div className="w-1/2">
                  <Image
                    src={about2}
                    alt="community"
                    width={300}
                    height={400}
                    objectFit="cover"
                    className="h-full w-full"
                  />
                </div>
                <div className="w-1/2 p-8">
                  <h2 className="text-3xl font-bold text-gray-200 mb-4">
                    Subscribe to our newsletter!
                  </h2>
                  <p className="text-gray-300 mb-6">
                    We&apos;ll send you the best of our Recipes and the great
                    offers.
                  </p>
                  <form
                    onSubmit={(e) => e.preventDefault()}
                    className="space-y-4"
                  >
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter Your Email"
                      className="w-full px-4 bg-gradient-to-r from-gray-600 to-gray-700 py-2 text-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                      required
                    />
                    <button
                      type="submit"
                      className="w-full bg-gradient-to-r from-food_red to-food_yellow text-white font-bodyFont font-semibold px-6 py-2 rounded-md hover:from-red-500 hover:to-yellow-500 transition duration-300"
                    >
                      Subscribe
                    </button>
                  </form>
                  <p className="text-sm text-gray-300 mt-4">
                    We value your privacy and will never send irrelevant
                    information
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StayInTouch;
