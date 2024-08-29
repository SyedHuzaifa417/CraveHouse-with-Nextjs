import { Metadata } from "next";
import Image from "next/image";
import React from "react";
import MenuImg from "@/assets/menuImg.jpg";
import { RiDiscountPercentFill } from "react-icons/ri";
import MenuItems from "@/components/menu-component/menu-item";

export const metadata: Metadata = {
  title: "Menu",
};

const Menu: React.FC = () => {
  return (
    <main className="min-h-screen p-6">
      <section className="flex flex-col md:flex-row gap-8 md:gap-12 mx-auto my-8 md:my-12 w-[95%] md:w-[90%] max-w-[75rem]">
        <div className="w-full h-[25rem] lg:h-[22rem] md:w-[50%] lg:w-[50rem] lg:mr-14 relative shadow-xl shadow-gray-900">
          <Image
            src={MenuImg}
            alt="Menu"
            layout="fill"
            objectFit="cover"
            className="rounded-lg"
          />
        </div>
        <div>
          <h1 className="text-4xl font-bold font-bodyFont mt-5 mb-9 tracking-[0.15rem] uppercase bg-gradient-to-r from-food_red to-yellow-500 bg-clip-text text-transparent">
            Welcome to the Crave House Menu
          </h1>
          <p className="text-lg text-pText">
            Explore our delicious offerings, connect with fellow food lovers,
            and enjoy exclusive culinary experiences.
          </p>
          <h3 className="text-3xl font-bodyFont font-semibold text-pText mt-8">
            Available Deals:
          </h3>
          <div className="text-xl md:text-2xl mt-3 flex flex-col sm:flex-row gap-4 sm:gap-8 md:gap-9 md:mt-5 items-center">
            <div className="bg-stone-600/25 rounded-lg shadow-md p-4">
              <div className="flex items-center text-orange-400">
                <RiDiscountPercentFill />
                <span className="ml-2 font-bold">35% off</span>
              </div>
              <h3 className="text-lg font-semibold mb-1 text-gray-300">
                Pro Discount
              </h3>
              <p className="text-gray-400 text-xs">
                No min. order required special savings for CraveHouse members
              </p>
            </div>
            <div className="bg-stone-600/25 rounded-lg shadow-md p-4">
              <div className="flex items-center text-orange-300">
                <RiDiscountPercentFill />
                <span className="ml-2 font-bold">20% off</span>
              </div>
              <h3 className="text-lg font-semibold mb-1 text-gray-300">
                General Discount
              </h3>
              <p className="text-gray-400 text-xs">
                No min. order required. and Valid for all items.and Auto
                applied.
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="md:flex-row gap-8 md:gap-12 mx-auto my-16 md:my-24 w-[95%] md:w-[90%] max-w-[75rem] justify-between">
        <h2 className="text-4xl font-bold font-bodyFont mt-24 mb-8 tracking-[0.15rem] uppercase bg-gradient-to-r from-food_red to-yellow-500 bg-clip-text text-transparent text-center">
          Explore Our Menu
        </h2>
        <p className="text-center text-lg text-pText mb-12">
          Discover a delightful variety of dishes crafted to please every
          palate. From appetizers to main courses, desserts, and beverages, our
          menu has something to offer everyone. Whether you&apos;re in the mood
          for a hearty meal or a light snack, our selection is sure to inspire
          your taste buds. Join us in savoring the joy of great food, and
          explore the diverse flavors that make our culinary offerings truly
          special.
        </p>
        <MenuItems />
      </section>
    </main>
  );
};

export default Menu;
