import Image from "next/image";
import React from "react";
import reviewPng from "@/assets/reviewPng.png";
import avatar from "@/assets/revPerson.jpg";

const Reviews = () => {
  return (
    <div className="flex items-center flex-col md:flex-row gap-8 md:gap-28 mx-auto my-8 md:my-12 w-[95%] md:w-[90%] max-w-[75rem] ">
      <Image
        src={reviewPng}
        alt="chef"
        width={550}
        height={580}
        className=" w-max h-[27rem] object-cover "
      />
      <div>
        <p className="text-xl font-bold text-food_red uppercase tracking-wider mb-2">
          What they say
        </p>
        <h1 className="text-3xl md:text-4xl md:max-w-[32rem] font-extrabold  mb-6 font-bodyFont tracking-[0.15rem] bg-gradient-to-r from-food_red to-yellow-500 bg-clip-text text-transparent">
          What Our Customers Say About Us
        </h1>
        <p className="text-lg text-gray-400 mb-8">
          &quot;Crave House is the best. Besides the many and delicious meals
          the service is also very good, especially in the very fast delivery. I
          highly recommend Crave House to you&quot;
        </p>
        <div className="flex items-start md:justify-start mt-8 justify-center">
          <Image
            src={avatar}
            alt="avatar"
            width={200}
            height={200}
            className="w-12 h-12 rounded-full overflow-hidden"
          />
          <div className="ml-4 text-left ">
            <h4 className="text-md font-bold text-h1Text">Emelia Clark</h4>
            <p className="text-sm text-pText">Food Enthusiast</p>
            <div className="flex justify-start items-center text-yellow-500 text-2xl">
              <span> &#9733;</span>
              <span> &#9733;</span>
              <span> &#9733;</span>
              <span> &#9733;</span>
              <span className="text-gray-300"> &#9734; </span>
              <span className="ml-2 text-sm text-gray-300">4.8</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reviews;
