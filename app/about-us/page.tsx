import Image from "next/image";
import React from "react";
import About1 from "@/assets/about1.jpg";
import About2 from "@/assets/about2.jpg";
import { CiDeliveryTruck } from "react-icons/ci";
import { VscSignIn } from "react-icons/vsc";
import { IoRestaurantOutline } from "react-icons/io5";
import { Metadata } from "next";
import Reviews from "@/components/home-components/reviews";

export const metadata: Metadata = {
  title: "About",
};

const About = () => {
  return (
    <div className="container mx-auto px-4">
      <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl my-8 lg:mb-24 sm:my-12 md:my-16 text-center font-extrabold font-handFont">
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-food_red to-food_yellow">
          About Us
        </span>
      </h1>

      <section className="flex flex-col sm:flex-row gap-20 text-pText text-base sm:text-lg md:text-lg max-w-6xl mx-auto my-8 font-bodyFont">
        <div className="sm:w-1/2">
          <p className="mb-4 text-justify">
            Welcome to CraveHouse, your ultimate destination for discovering the
            best food experiences in Multan! We are passionate about connecting
            food enthusiasts with the finest dining options our city has to
            offer. Whether you&apos;re a local or just visiting, CraveHouse is
            here to make your culinary journey unforgettable. From savoring
            mouth-watering dishes at the top restaurants in town to sharing your
            own culinary creations with a vibrant community, CraveHouse brings
            everything you crave, right to your fingertips.
          </p>
        </div>
        <div className="sm:w-1/2 h-64 sm:h-auto relative shadow-lg shadow-orange-500/25 transform lg:-rotate-3">
          <Image
            src={About1}
            alt="aboutUs"
            layout="fill"
            objectFit="cover"
            className="rounded-lg "
          />
        </div>
      </section>

      <section className="flex flex-col sm:flex-row gap-20 text-pText text-base sm:text-lg md:text-lg max-w-6xl mx-auto my-28 font-bodyFont">
        <div className="sm:w-1/2 h-64 sm:h-auto relative shadow-lg shadow-orange-500/25 transform lg:rotate-3">
          <Image
            src={About2}
            alt="aboutUs"
            layout="fill"
            objectFit="cover"
            className="rounded-lg "
          />
        </div>
        <div className="sm:w-1/2">
          <p className="mb-4 text-justify">
            At CraveHouse, our mission is to bring people together through the
            love of food. We aim to create a seamless and enjoyable experience
            for foodies by offering a platform where they can explore various
            dining options, connect with like-minded individuals, and discover
            new tastes. We believe that food is more than just a necessity;
            it&apos;s an experience, a form of art, and a way to connect with
            others. CraveHouse is here to enhance that experience by providing a
            platform that makes finding, sharing, and enjoying food easy and
            fun.
          </p>
        </div>
      </section>

      <section className="text-pText max-w-4xl mx-auto my-12 text-center">
        <h2 className="text-xl sm:text-2xl md:text-5xl mb-4">
          How it{" "}
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-food_red to-food_yellow font-semibold">
            Works
          </span>
        </h2>
        <div className="flex justify-center space-x-18 my-16">
          <div className="flex flex-col items-center">
            <div className="flex items-center justify-center w-20 h-20 border border-pText rounded-full text-4xl text-ptext mb-2">
              <VscSignIn />
            </div>
            <p className="text-sm font-medium my-6 ">
              Getting started with CraveHouse is simple. Just sign up and create
              your profile to access all the features we offer.
            </p>
          </div>

          <div className="flex flex-col items-center">
            <div className="flex items-center justify-center w-20 h-20 border border-pText rounded-full text-4xl text-ptext mb-2">
              <CiDeliveryTruck />
            </div>
            <p className="text-sm font-medium my-6 ">
              Reserve a table at your favorite restaurant or order food for
              delivery directly through our platform
            </p>
          </div>

          <div className="flex flex-col items-center">
            <div className="flex items-center justify-center w-20 h-20 border border-pText rounded-full text-4xl text-pText mb-2">
              <IoRestaurantOutline />
            </div>
            <p className="text-sm font-medium my-6 ">
              Enjoy our tasty organic food with the convenience of planning your
              dining experiences without leaving your home.
            </p>
          </div>
        </div>
      </section>

      <section className="text-pText max-w-4xl mx-auto my-12 text-center">
        <h2 className="text-xl sm:text-2xl md:text-5xl mb-14">
          Why{" "}
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-food_red to-food_yellow font-semibold">
            Choose
          </span>{" "}
          Us?
        </h2>
        <p className="text-base sm:text-lg md:text-xl mb-4 text-center">
          CraveHouse provides an extensive list of meals, covering everything
          from local favorites to fine dining establishments. We make it easy
          for you to explore a wide range of dining options, all in one place.
        </p>
        <p className="text-base sm:text-lg md:text-xl mb-4  text-center">
          Our platform is not just about discovering food; it&apos;s about
          sharing it too. We encourage our users to share their culinary
          experiences, recipes, and tips, making CraveHouse a vibrant and
          interactive community.
        </p>
        <p className="text-base sm:text-lg md:text-xl mb-4 text-center ">
          Our website is designed with you in mind. With an easy-to-navigate
          interface, making reservations, finding meals, and ordering food has
          never been simpler. Enjoy a seamless and hassle-free experience with
          CraveHouse.
        </p>
        <p className="text-base sm:text-lg md:text-xl mb-4 text-center">
          Read genuine reviews and recommendations from fellow food enthusiasts.
          CraveHouse ensures that you have all the information you need to make
          informed dining decisions.
        </p>
        <p className="text-base sm:text-lg md:text-xl mb-4 text-center">
          Be the first to know about exclusive events, promotions, and offers
          from your favorite restaurant. CraveHouse brings you closer to the
          culinary happenings in Multan.
        </p>
      </section>
      <Reviews />
    </div>
  );
};

export default About;
