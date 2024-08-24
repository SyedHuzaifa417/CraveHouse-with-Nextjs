"use client";
import Link from "next/link";
import React, { useState } from "react";
import logoImg from "@/assets/logo.png";
import Image from "next/image";
import MainHeaderBackground from "./MainHeaderBackground";
import NavLink from "./navLink";
import { TbMenuDeep } from "react-icons/tb";
import { CgClose } from "react-icons/cg";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      <MainHeaderBackground />
      <header className="flex justify-between items-center px-4 py-8 md:px-[10%]">
        <Link
          href="/"
          className="flex items-center justify-center gap-4 md:gap-8 text-pText font-bold font-bodyFont tracking-[0.15rem] uppercase text-xl md:text-2xl no-underline"
        >
          <Image
            src={logoImg}
            alt="A plate of food"
            priority
            className="w-16 h-16 md:w-20 md:h-20 object-contain filter drop-shadow-[0_0_0.75rem_rgba(0,0,0,0.5)]"
          />
          <span className="hidden sm:inline">Crave House</span>
        </Link>

        {/* Hamburger menu for small screens */}
        <button
          className="md:hidden text-h1Text hover:text-food_yellow text-3xl"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <TbMenuDeep />
        </button>

        {/* Navigation for medium and large screens */}
        <nav className="hidden md:block">
          <ul className="list-none m-0 p-0 flex gap-6 font-bodyFont text-xl">
            <li>
              <NavLink onClick={() => {}} href="/meals">
                Meals
              </NavLink>
            </li>
            <li>
              <NavLink onClick={() => {}} href="/community">
                Community
              </NavLink>
            </li>
          </ul>
        </nav>
      </header>

      {/* Mobile menu */}
      {isMenuOpen && (
        <nav className="md:hidden bg-black bg-opacity-90 fixed top-0 left-0 right-0 bottom-0 z-50 flex items-center justify-center">
          <div className="bg-stone-900 shadow-md shadow-stone-700 rounded-2xl w-80 relative p-8">
            <button
              className="absolute top-3 right-4 text-pText hover:text-food_yellow text-xl"
              onClick={() => setIsMenuOpen(false)}
            >
              <CgClose />
            </button>
            <ul className="list-none m-0 p-0 flex flex-col items-center justify-center gap-8 font-bodyFont">
              <li>
                <NavLink href="/meals" onClick={() => setIsMenuOpen(false)}>
                  Meals
                </NavLink>
              </li>
              <li>
                <NavLink href="/community" onClick={() => setIsMenuOpen(false)}>
                  Community
                </NavLink>
              </li>
            </ul>
          </div>
        </nav>
      )}
    </>
  );
};

export default Header;
