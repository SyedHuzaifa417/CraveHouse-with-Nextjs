import React from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Link from "next/link";
import { RiShoppingBag4Fill } from "react-icons/ri";

const Cart = () => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <button className="relative">
          <RiShoppingBag4Fill className="text-pText text-[1.6rem] hover:text-food_yellow transition-all duration-300 mb-1" />
          <span className="absolute -top-2 -right-3 text-white bg-food_red rounded-full px-2 text-[0.7rem] z-20">
            5
          </span>
        </button>
      </SheetTrigger>
      <SheetContent className="bg-gray-800/35">
        <SheetHeader>
          <SheetTitle>
            <h1 className="text-4xl font-bold font-bodyFont mb-6 tracking-[0.15rem] uppercase bg-gradient-to-r from-food_red to-yellow-500 bg-clip-text text-transparent">
              Hungry?
            </h1>
          </SheetTitle>
          <SheetDescription>
            <p className="text-lg text-pText mb-4">
              You have not added anything in your cart!
            </p>
            <Link href="/menu">
              <button className="px-4 py-2 bg-food_yellow text-h1Text text-lg font-semibold hover:bg-food_red rounded-xl">
                Browse
              </button>
            </Link>
          </SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
};

export default Cart;
