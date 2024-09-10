"use client";
import Link from "next/link";
import React, { useState } from "react";
import logoImg from "@/assets/logo.png";
// import profile from "@/assets/profile.jpg"; //for <AvatarImage  src={profile }/>
import Image from "next/image";
import MainHeaderBackground from "./MainHeaderBackground";
import NavLink from "./navLink";
import { TbMenuDeep } from "react-icons/tb";
import { CgClose } from "react-icons/cg";
import { FaSignOutAlt, FaUserAlt } from "react-icons/fa";
import Cart from "@/components/cart/cart";
import { useSession, signOut } from "next-auth/react";
import { useAppDispatch } from "@/store/useAppDispatch";
import { resetCart } from "@/store/cartSlice";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { MdOutlineBookmarks, MdOutlineSettings } from "react-icons/md";
import { HiOutlineSupport } from "react-icons/hi";
import { FiSend } from "react-icons/fi";
import { useModal } from "../ui/Modal";
import Profile from "./Profile";
import UserBookmarks from "./Bookmarks";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { data: session, status } = useSession();
  const dispatch = useAppDispatch();
  const { openModal } = useModal();

  const handleLogout = async () => {
    const confirmLogout = window.confirm("Are you sure you want to log out?");
    if (confirmLogout) {
      dispatch(resetCart());
      await signOut({ callbackUrl: "/" });
    }
  };

  const handleShare = () => {
    const websiteUrl = window.location.href;
    if (navigator.share) {
      navigator
        .share({
          title: "Check out this awesome website!",
          text: "Discover amazing content on our website.",
          url: websiteUrl,
        })
        .catch(console.error);
    } else {
      alert("Web Share API not supported on this browser.");
    }
  };

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
          <nav className="hidden xl:block">
            <ul className="list-none m-0 p-0 flex items-center gap-6 font-bodyFont text-xl">
              <li>
                <NavLink onClick={() => {}} href="/menu">
                  Menu
                </NavLink>
              </li>
              <li>
                <NavLink onClick={() => {}} href="/reservations">
                  Reservation
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
            <Cart />
            <DropdownMenu>
              <DropdownMenuTrigger
                className={status === "loading" ? "pointer-events-none" : ""}
              >
                {status === "loading" ? (
                  <FaUserAlt className="text-pText text-[1.4rem] animate-pulse " />
                ) : session ? (
                  <Avatar>
                    <AvatarFallback>
                      {session.user?.username?.[0] || "U"}
                    </AvatarFallback>
                  </Avatar>
                ) : (
                  <FaUserAlt className="text-pText text-[1.4rem] hover:text-food_yellow transition-all duration-300" />
                )}
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                {session ? (
                  <>
                    <DropdownMenuLabel>
                      Hello {session.user?.username || "User"}!
                    </DropdownMenuLabel>

                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      className="flex items-center gap-1"
                      onSelect={() => openModal(<Profile />)}
                    >
                      <MdOutlineSettings />
                      Settings
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <button
                        onClick={handleShare}
                        className="flex items-center gap-1"
                      >
                        <FiSend />
                        Invite
                      </button>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Link
                        href={
                          "https://www.linkedin.com/in/syed-huzaifa-bukhari-b866421b3/"
                        }
                        target="_blank"
                        className="flex items-center gap-1"
                      >
                        <HiOutlineSupport />
                        Support
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() =>
                        openModal(<UserBookmarks userId={session?.user.id} />)
                      }
                      className="flex items-center gap-1"
                    >
                      <MdOutlineBookmarks /> Bookmarks
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onSelect={handleLogout}>
                      <FaSignOutAlt className="mr-2" /> Logout
                    </DropdownMenuItem>
                  </>
                ) : (
                  <>
                    <DropdownMenuLabel>Login / Registor</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      <Link href="/login?type=admin">Admin</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Link href="/login?type=user">User</Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />

                    <DropdownMenuItem>
                      <Link href="/register">Register</Link>
                    </DropdownMenuItem>
                  </>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Hamburger menu for small screens */}
          <button
            className="xl:hidden text-h1Text hover:text-food_yellow text-3xl"
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
                <NavLink href="/menu" onClick={() => setIsMenuOpen(false)}>
                  Menu
                </NavLink>
              </li>
              <li>
                <NavLink
                  href="/reservations"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Reservation
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
