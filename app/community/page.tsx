import React from "react";
import Link from "next/link";
import Head from "next/head";
import exploreImg from "@/assets/explore.jpg";
import Image from "next/image";

const Community: React.FC = () => {
  return (
    <>
      <Head>
        <title>Crave House - Community</title>
        <meta
          name="description"
          content="Join the Crave House community to share recipes, find friends, and participate in exclusive events."
        />
      </Head>
      <main className="min-h-screen  p-6">
        <section className="flex flex-col md:flex-row gap-8 md:gap-12 mx-auto my-8 md:my-12 w-[95%] md:w-[90%] max-w-[75rem]">
          <div className="w-full h-[25rem] lg:h-[22rem] md:w-[50%] lg:w-[50rem] lg:mr-14 relative">
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
              Share & discover recipes, find new friends & like-minded people,
              and participate in exclusive events.
            </p>
            <div className="text-xl md:text-2xl flex flex-col sm:flex-row gap-4 sm:gap-8 md:gap-9 md:mt-10">
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

        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          <div className="bg-gray-700/40 p-6 rounded-lg shadow-lg shadow-gray-700/75">
            <h2 className="text-2xl font-semibold text-pText mb-4">
              Share & Discover Recipes
            </h2>
            <p className="text-gray-400">
              Connect with other food enthusiasts to share your favorite recipes
              and discover new ones.
            </p>
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
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Participate in Exclusive Events
            </h2>
            <p className="text-gray-600">
              Join our special events and activities to deepen your culinary
              knowledge and have fun.
            </p>
          </div>
        </section>
      </main>
    </>
  );
};

export default Community;
