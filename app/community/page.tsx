import React from "react";
import Link from "next/link";
import exploreImg from "@/assets/communityImg.jpg";
import Image from "next/image";
import { BiSearch } from "react-icons/bi";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Community",
};

const Community: React.FC = () => {
  return (
    <main className="min-h-screen p-6">
      <section className="flex flex-col md:flex-row gap-8 md:gap-12 mx-auto my-8 md:my-12 w-[95%] md:w-[90%] max-w-[75rem]">
        <div className="w-full h-[25rem] lg:h-[22rem] md:w-[50%] lg:w-[50rem] lg:mr-14 relative shadow-xl shadow-gray-900">
          <Image
            src={exploreImg}
            alt="explore"
            layout="fill"
            objectFit="cover"
            className="rounded-lg"
          />
        </div>
        <div>
          <h1 className="text-4xl font-bold font-bodyFont mt-5 mb-9 tracking-[0.15rem] uppercase bg-gradient-to-r from-food_red to-yellow-500 bg-clip-text text-transparent">
            Welcome to the Crave House Community
          </h1>
          <p className="text-lg text-pText">
            Share & discover recipes, find new friends & like-minded people, and
            participate in exclusive events.
          </p>

          <div className="text-xl md:text-2xl flex flex-col sm:flex-row gap-4 sm:gap-8 md:gap-9 md:mt-10 items-center">
            <Link
              href="/community"
              className="inline-block text-food_yellow hover:text-orange-300"
            >
              Join the Community
            </Link>
            <Link
              href="/meals"
              className="inline-block w-max py-2 px-4 rounded-lg bg-gradient-to-r from-food_red to-food_yellow text-white font-bold no-underline hover:from-red-500 hover:to-orange-500"
            >
              Create a Recipe
            </Link>
          </div>
        </div>
      </section>
      <section className="  md:flex-row gap-8 md:gap-12 mx-auto my-16 md:my-24 w-[95%] md:w-[90%] max-w-[75rem] justify-between">
        <h2 className="text-4xl font-bold font-bodyFont mt-24 mb-8 tracking-[0.15rem] uppercase bg-gradient-to-r from-food_red to-yellow-500 bg-clip-text text-transparent text-center">
          Explore Recipes
        </h2>
        <p className="text-center text-lg text-pText mb-4 ">
          Discover a variety of delicious recipes to cook and share with friends
          and family. Find inspiration from appetizers to main courses and
          everything in between, including desserts and beverages. Whether
          you&apos;re a seasoned chef or just starting out in the kitchen, our
          community has something for everyone. Join us in celebrating the joy
          of cooking, sharing culinary tips, and exploring the diverse flavors
          that make our community unique.
        </p>
      </section>
      <div className="sticky top-0 z-10 py-4">
        <section className="flex flex-col-reverse md:flex-row-reverse lg:flex-row mx-auto w-[95%] md:w-[90%] max-w-[75rem] justify-between items-center ">
          <nav className="flex space-x-4 overflow-x-auto w-full sm:w-max md:w-max bg-gray-700 shadow-lg shadow-stone-600 px-6 py-3 rounded-full mb-4 ">
            <button className="text-h1Text font-semibold hover:text-food_yellow whitespace-nowrap">
              All
            </button>
            <button className="text-h1Text font-semibold hover:text-food_yellow whitespace-nowrap">
              Appetizers
            </button>
            <button className="text-h1Text font-semibold hover:text-food_yellow whitespace-nowrap">
              Starters
            </button>
            <button className="text-h1Text font-semibold hover:text-food_yellow whitespace-nowrap">
              Main Courses
            </button>
            <button className="text-h1Text font-semibold hover:text-food_yellow whitespace-nowrap">
              Side Dishes
            </button>
            <button className="text-h1Text font-semibold hover:text-food_yellow whitespace-nowrap">
              Desserts
            </button>
          </nav>
          <div className="flex items-center w-full sm:w-max p-2 rounded-xl bg-gray-700 text-white mb-3 lg:mb-0">
            <input
              type="text"
              placeholder="Search recipe..."
              className="rounded-s-full px-2 w-full outline-none ring-0 bg-gray-700 text-white"
            />
            <BiSearch className="text-h1Text mr-1 hover:text-orange-500 text-2xl cursor-pointer" />
          </div>
        </section>
      </div>

      <div className="flex flex-col-reverse lg:flex-row xl:flex-row gap-16 mx-auto my-24 w-full max-w-[75rem]">
        <div className="w-full lg:w-3/4">
          <h1 className="mb-7 text-pText">
            You have <span className="font-bold">49</span> recipes to explore
          </h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <div
                key={item}
                className="bg-gray-700/40 p-4 rounded-lg shadow-lg shadow-gray-700/75"
              >
                <div className="w-full h-40 bg-gray-500 rounded-lg mb-4"></div>
                <h3 className="text-lg font-semibold text-pText mb-2">
                  Meal Title
                </h3>
                <p className="text-sm text-gray-400">
                  Brief description of the meal
                </p>
              </div>
            ))}
          </div>
        </div>
        <div className="w-full lg:w-1/4">
          <div className="bg-gray-700/40 p-4 rounded-lg shadow-lg shadow-gray-700/75">
            <h3 className="text-xl font-semibold text-food_yellow mb-4">
              I&apos;d like to cook...
            </h3>
            <ul className="space-y-2">
              <li className="text-pText hover:text-orange-300 cursor-pointer">
                Vegetarian
              </li>
              <li className="text-pText hover:text-orange-300 cursor-pointer">
                Dessert
              </li>
              <li className="text-pText hover:text-orange-300 cursor-pointer">
                Quick meals
              </li>
              <li className="text-pText hover:text-orange-300 cursor-pointer">
                Healthy options
              </li>
            </ul>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Community;

/* <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
<div className="bg-gray-700/40 p-6 rounded-lg shadow-lg shadow-gray-700/75">
  <h2 className="text-2xl font-semibold text-pText mb-4">
    Share & Discover Recipes
  </h2>
  <p className="text-gray-400">
    Connect with other food enthusiasts to share your favorite recipes
    and discover new ones.
  </p>
  <p className="text-food_yellow">ingredients</p>
</div>
<div className="bg-white p-6 rounded-lg shadow-lg">
  <h2 className="text-2xl font-semibold text-gray-800 mb-4">
    Find New Friends
  </h2>
  <p className="text-gray-600">
    Meet like-minded individuals who share your passion for food and
    cooking.
  </p>
</div>

</section> */
