"use client";
import Link from "next/link";
import FooterBackground from "./footerBackground";
import { GrGithub } from "react-icons/gr";
import { BsLinkedin } from "react-icons/bs";
import { FaFacebook } from "react-icons/fa";
import { IoIosSend } from "react-icons/io";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { toast, Toaster } from "react-hot-toast";

const PrivacyPolicyDrawer = dynamic(() => import("../privacy"), {
  ssr: false, //When ssr is set to false, the component will only be rendered on the client side (in the browser), not on the server.
  loading: () => <p className="text-pText">Loading...</p>,
});

function Footer() {
  const [isMounted, setIsMounted] = useState(false);
  const [isInitialMount, setIsInitialMount] = useState(true);

  useEffect(() => {
    setIsMounted(true);
    const policyShown = localStorage.getItem("privacyPolicyShown") === "true";
    setIsInitialMount(!policyShown);
  }, []);

  const handlePrivacyAction = (action: "accept" | "decline") => {
    setIsInitialMount(false);
    localStorage.setItem("privacyPolicyShown", "true");
    if (action === "accept") {
      toast.success("Privacy policy accepted!", {
        position: "bottom-right",
      });
    } else {
      toast.error("Privacy policy declined!", {
        position: "bottom-right",
      });
    }
  };
  return (
    <footer className="relative">
      <Toaster
        position="bottom-right"
        toastOptions={{
          duration: 3000,
          style: {
            background: "#333",
            color: "#fff",
            height: 64,
            width: 354,
          },
        }}
      />
      <FooterBackground />
      <div className="relative z-10 px-4 pt-8 md:px-[10%] w-full">
        <div className="flex flex-col sm:flex-row flex-wrap justify-between items-start">
          <div className="w-full sm:w-1/2 lg:w-1/4 mb-6 sm:mb-0">
            <Link href={"/"}>
              <h2 className="text-xl font-bold mb-2">
                <span className="text-h1Text">Crave</span>
                <span className="text-food_red">House</span>
              </h2>
            </Link>
            <p className="text-sm text-gray-300">
              Satisfy Your Hunger for Adventure, Indulge in tastes that spark
              joy and curiosity,Dive into dishes that delight and inspire.
            </p>
          </div>

          <div className="hidden sm:flex w-full sm:w-1/2 lg:w-3/4  flex-wrap justify-end">
            <div className="w-1/2 lg:w-1/4 mb-6 lg:mb-0">
              <h3 className="font-semibold mb-2 text-h1Text">Quick links</h3>
              <ul className="text-sm">
                <li>
                  <Link href="/" className="text-gray-300 hover:text-white">
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    href="/community"
                    className="text-gray-300 hover:text-white"
                  >
                    Recipes
                  </Link>
                </li>
                <li>
                  <Link
                    href="/meals"
                    className="text-gray-300 hover:text-white"
                  >
                    Meals
                  </Link>
                </li>
              </ul>
            </div>

            <div className="w-1/2 lg:w-1/4">
              <h3 className="font-semibold mb-2 text-h1Text">Legal</h3>
              <ul className="text-sm">
                <li>
                  <Link
                    href="/about-us"
                    className="text-gray-300 hover:text-white"
                  >
                    About us
                  </Link>
                </li>
                <li>
                  {isMounted && (
                    <PrivacyPolicyDrawer
                      isInitialMount={isInitialMount}
                      onAccept={() => handlePrivacyAction("accept")}
                      onDecline={() => handlePrivacyAction("decline")}
                    >
                      <p className="text-gray-300 hover:text-white cursor-pointer">
                        Terms Of Use
                      </p>
                    </PrivacyPolicyDrawer>
                  )}
                </li>
                <li>
                  {isMounted && (
                    <PrivacyPolicyDrawer
                      isInitialMount={isInitialMount}
                      onAccept={() => handlePrivacyAction("accept")}
                      onDecline={() => handlePrivacyAction("decline")}
                    >
                      <p className="text-gray-300 hover:text-white cursor-pointer">
                        Privacy Policy
                      </p>
                    </PrivacyPolicyDrawer>
                  )}
                </li>
              </ul>
            </div>

            <div className="w-1/2 lg:w-1/4">
              <h3 className="font-semibold mb-2 text-h1Text">Get In Touch</h3>
              <ul className="text-sm">
                <li>
                  <Link href="#" className="text-gray-300 hover:text-white">
                    Feedback
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-300 hover:text-white">
                    Complaints
                  </Link>
                </li>
                <li>
                  <Link
                    href="/community"
                    className="text-gray-300 hover:text-white"
                  >
                    <button className="flex items-center gap-4 border w-max px-3 py-1 rounded-full my-2">
                      email address
                      <IoIosSend />
                    </button>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-600 flex justify-between">
          <p className="text-sm text-gray-300">
            © 2024 CraveHouse by Syed Huzaifa.
          </p>
          <div className="flex gap-6 text-pText text-2xl">
            <Link
              href={"https://github.com/SyedHuzaifa417"}
              className="hover:scale-125 "
              target="_blank"
            >
              <GrGithub />
            </Link>
            <Link
              href={
                "https://www.linkedin.com/in/syed-huzaifa-bukhari-b866421b3/"
              }
              target="_blank"
              className="hover:scale-125 "
            >
              <BsLinkedin />
            </Link>
            <Link
              href={"https://www.facebook.com/muhammadhuzaifa.ali.7/"}
              target="_blank"
              className="hover:scale-125 "
            >
              <FaFacebook />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
