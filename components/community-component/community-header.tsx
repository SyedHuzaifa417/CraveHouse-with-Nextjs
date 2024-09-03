"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { useModal } from "@/components/ui/Modal";
import { toast } from "react-hot-toast";
import exploreImg from "@/assets/communityImg.jpg";
import Recipes from "@/components/community-component/recipes";
import CreateRecipe from "@/components/community-component/createRecipe";
import axios from "axios";

const CommunityHead = () => {
  const { openModal, closeModal } = useModal();
  const { data: session, status, update } = useSession();
  const [isCommunityMember, setIsCommunityMember] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    if (session?.user) {
      setIsCommunityMember(session.user.isCommunityMember || false);
    }
  }, [session]);

  const handleJoinCommunity = async () => {
    if (status === "loading") {
      toast.error("Please wait while we load your session");
      return;
    }
    if (status === "unauthenticated") {
      toast.error("Please log in first");
      return;
    }

    openModal(
      // session?.user.isCommunityMember ? (
      //   <div className="text-center py-4">
      //     <h2 className="text-3xl font-bold text-food_yellow text-center mb-4">
      //       Community Membership
      //     </h2>
      //     <p className="text-lg text-h1Text">
      //       You are already a member of our community!
      //     </p>
      //   </div>
      // ) : (
      <div className="p-4">
        <h2 className="text-3xl font-bold text-food_yellow text-center mb-4">
          Join the Community
        </h2>
        <h2 className="text-2xl uppercase font-bold text-white text-center mb-12">
          Terms & conditions
        </h2>
        <form
          onSubmit={handleSubmitJoin}
          className="flex flex-col justify-between items-center"
        >
          <div className="mb-4">
            <label className="flex items-center text-h1Text">
              <input
                type="checkbox"
                required
                className="mr-2 w-5 h-5 text-gray-500 rounded-sm"
              />
              <span className="ml-2">
                I agree to respect community guidelines
              </span>
            </label>
          </div>
          <div className="mb-4">
            <label className="flex items-center text-h1Text">
              <input
                type="checkbox"
                required
                className="mr-2 w-5 h-5 text-gray-500 rounded-sm"
              />
              I will contribute positively to the community
            </label>
          </div>
          <button
            type="submit"
            className="mt-7 bg-food_yellow text-white px-4 py-2 rounded-lg w-max"
          >
            Join
          </button>
        </form>
      </div>
    );
  };

  const handleSubmitJoin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await axios.patch(
        "/api/community",
        {},
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      if (response.status === 200) {
        closeModal();
        toast.success("Welcome to the community!");

        // Update the session
        await update({ isCommunityMember: true });

        // Update local state
        setIsCommunityMember(true);
      } else {
        toast.error(response.data.error || "Failed to join the community");
      }
    } catch (error) {
      console.error("Error joining community:", error);
      toast.error("An error occurred");
    }
  };

  const handleCreateRecipe = () => {
    if (status === "loading") {
      toast.error("Please wait while we load your session");
      return;
    }
    if (status === "unauthenticated") {
      toast.error("Please log in first");
      return;
    }
    if (!isCommunityMember) {
      toast.error("You must be a community member to create recipes");
      return;
    }
    openModal(
      <CreateRecipe
        onRecipeCreated={() => {
          setRefreshKey((prev) => prev + 1);
        }}
      />
    );
  };

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
            {!isCommunityMember ? (
              <button
                onClick={handleJoinCommunity}
                className="flex text-food_yellow hover:text-orange-300"
              >
                Join the Community
              </button>
            ) : null}
            <button
              onClick={handleCreateRecipe}
              className="inline-block w-max py-2 px-4 rounded-lg bg-gradient-to-r from-food_red to-food_yellow text-white font-bold no-underline hover:from-red-500 hover:to-orange-500"
            >
              Create a Recipe
            </button>
          </div>
        </div>
      </section>
      <section className="md:flex-row gap-8 md:gap-12 mx-auto my-16 md:my-24 w-[95%] md:w-[90%] max-w-[75rem] justify-between">
        <h2 className="text-4xl font-bold font-bodyFont mt-24 mb-8 tracking-[0.15rem] uppercase bg-gradient-to-r from-food_red to-yellow-500 bg-clip-text text-transparent text-center">
          Explore Recipes
        </h2>
        <p className="text-center text-lg text-pText mb-4">
          Discover a variety of delicious recipes to cook and share with friends
          and family. Find inspiration from appetizers to main courses and
          everything in between, including desserts and beverages. Whether
          you&apos;re a seasoned chef or just starting out in the kitchen, our
          community has something for everyone. Join us in celebrating the joy
          of cooking, sharing culinary tips, and exploring the diverse flavors
          that make our community unique.
        </p>
      </section>
      <Recipes key={refreshKey} />
    </main>
  );
};

export default CommunityHead;
