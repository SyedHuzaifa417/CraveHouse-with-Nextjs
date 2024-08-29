"use client";
import React, { useState, useRef, useEffect, ReactNode } from "react";
import { CgClose } from "react-icons/cg";

interface DrawerProps {
  children: ReactNode;
  trigger: ReactNode;
  isInitialMount: boolean;
  onAccept: () => void;
  onDecline: () => void;
}

const Drawer: React.FC<DrawerProps> = ({
  children,
  trigger,
  isInitialMount,
  onAccept,
  onDecline,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(isInitialMount);
  const drawerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        drawerRef.current &&
        !drawerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside); //mousedown is the press of mouse any button
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      <div onClick={() => setIsOpen(true)}>{trigger}</div>
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50">
          <div
            ref={drawerRef}
            className="fixed bottom-0 left-0 right-0 h-max w-full bg-stone-900 text-pText shadow-2xl  shadow-white transform transition-transform duration-300 ease-in-out z-50"
          >
            <div className="h-max flex flex-col">
              <div className="flex justify-between items-center p-4 border-b border-gray-600">
                <h2 className="text-lg font-semibold">Privacy Policy</h2>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-gray-300 hover:text-gray-600"
                >
                  <CgClose />
                </button>
              </div>
              <div className="flex-grow overflow-y-auto p-4">{children}</div>
              <div className="border-t border-gray-600 p-4 flex flex-col items-center">
                <button
                  onClick={() => {
                    setIsOpen(false);
                    onAccept();
                  }}
                  className="px-9 mb-3 py-2 bg-green-500 text-white font-semibold rounded-xl hover:bg-green-600"
                >
                  Accept
                </button>
                <button
                  onClick={() => {
                    setIsOpen(false);
                    onDecline();
                  }}
                  className="px-9 py-2 bg-red-500 text-white font-semibold rounded-xl hover:bg-red-600"
                >
                  Decline
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export interface PrivacyPolicyDrawerProps {
  children: React.ReactNode;
  isInitialMount: boolean;
  onAccept: () => void;
  onDecline: () => void;
}
const PrivacyPolicyDrawer: React.FC<PrivacyPolicyDrawerProps> = ({
  children,
  isInitialMount,
  onAccept,
  onDecline,
}) => {
  if (typeof window === "undefined") {
    return <>{children}</>;
  }

  return (
    <Drawer
      trigger={children}
      isInitialMount={isInitialMount}
      onAccept={onAccept}
      onDecline={onDecline}
    >
      <div className="text-sm">
        <p>
          Welcome to CraveHouse! Your privacy is important to us. This privacy
          policy outlines how we collect, use, and protect your personal
          information.
        </p>
        <h2 className="mt-4 font-bold">Information We Collect</h2>
        <p>
          We collect personal information when you use our website, make
          reservations, or participate in our community. This includes your
          name, email address, and other details required for providing our
          services.
        </p>
        <h2 className="mt-4 font-bold">How We Use Your Information</h2>
        <p>
          Your information is used to enhance your experience with CraveHouse,
          including processing orders, reservations, and community
          participation. We do not share your information with third parties
          without your consent.
        </p>
        <h2 className="mt-4 font-bold">Your Rights</h2>
        <p>
          You have the right to access, modify, or delete your personal
          information at any time. Please contact us if you have any concerns
          regarding your privacy.
        </p>
      </div>
    </Drawer>
  );
};
export default PrivacyPolicyDrawer;
