"use client";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import logoImg from "@/assets/logo.png";
import Image from "next/image";
import MainHeaderBackground from "./MainHeaderBackground";
import NavLink from "./navLink";
import { TbMenuDeep } from "react-icons/tb";
import { CgClose } from "react-icons/cg";
import { FaSignOutAlt, FaUserAlt } from "react-icons/fa";
import { RiShoppingBag4Fill } from "react-icons/ri";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsProfileDropdownOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
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
          <span className="hidden sm:inline ">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-food_red to-food_yellow">
              Crave
            </span>
            House
          </span>
        </Link>

        {/* Navigation for medium and large screens */}
        <div className="flex items-center gap-8">
          <nav className="hidden lg:block">
            <ul className="list-none m-0 p-0 flex items-center gap-6 font-bodyFont text-xl">
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
              <li>
                <NavLink onClick={() => {}} href="/about-us">
                  About
                </NavLink>
              </li>
            </ul>
          </nav>
          <div className="flex items-center gap-6 ml-20">
            <NavLink onClick={() => {}} href="/cart">
              <RiShoppingBag4Fill className="text-pText text-[1.4rem] hover:text-food_yellow  transition-all duration-300" />
              <span className="absolute top-5 -right-4 text-white bg-food_yellow rounded-full px-1 text-[0.7rem] z-20">
                5
              </span>
            </NavLink>
            <div className="relative" ref={dropdownRef}>
              <button
                onMouseEnter={() => setIsProfileDropdownOpen(true)}
                className="focus:outline-none"
              >
                <FaUserAlt className="text-pText text-[1.4rem] hover:text-food_yellow transition-all duration-300" />
              </button>
              {isProfileDropdownOpen && (
                <div
                  className="absolute right-0 mt-2 w-48 bg-gray-700 rounded-md shadow-lg z-20"
                  onMouseLeave={() => setIsProfileDropdownOpen(false)}
                >
                  <Link
                    href="/profile?type=admin"
                    className="block px-4 py-2 text-md font-bold font-bodyFont text-h1Text  hover:bg-gray-600"
                  >
                    Admin
                  </Link>
                  <Link
                    href="/profile?type=user"
                    className="block px-4 py-2 text-md font-bold font-bodyFont text-h1Text  hover:bg-gray-600"
                  >
                    User
                  </Link>
                </div>
              )}
            </div>
          </div>

          {/* Hamburger menu for small screens */}
          <button
            className="lg:hidden text-h1Text hover:text-food_yellow text-3xl"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <TbMenuDeep />
          </button>
        </div>
      </header>

      {/* Mobile menu */}
      {isMenuOpen && (
        <nav className="lg:hidden bg-black bg-opacity-90 fixed top-0 left-0 right-0 bottom-0 z-50 flex items-center justify-center">
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
              <li>
                <NavLink href="/about-us" onClick={() => setIsMenuOpen(false)}>
                  About Us
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
