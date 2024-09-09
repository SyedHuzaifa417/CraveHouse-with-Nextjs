"use client";
import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import AdminDashboard from "@/components/admin/adminDashboard";
import CreateMenuItem from "@/components/admin/createMenu";
import AdminBookings from "@/components/admin/reservations";
import AdminSubscriptions from "@/components/admin/subcriptions";
import DeliveryDetails from "@/components/admin/deliveries";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { BsFillBellFill } from "react-icons/bs";
import { GoHomeFill } from "react-icons/go";
import { IoCalendarClear } from "react-icons/io5";
import { PiBookOpenFill } from "react-icons/pi";
import { FaTruck } from "react-icons/fa";

interface SidebarProps {
  onNavItemSelect: (section: string) => void;
  selectedSection: string;
}

const Sidebar: React.FC<SidebarProps> = ({
  onNavItemSelect,
  selectedSection,
}) => {
  const navItems = [
    { name: "Dashboard", section: "dashboard", icon: <GoHomeFill /> },
    { name: "Menu", section: "menu", icon: <PiBookOpenFill /> },
    {
      name: "Reservations",
      section: "reservations",
      icon: <IoCalendarClear />,
    },
    {
      name: "Subscriptions",
      section: "subscriptions",
      icon: <BsFillBellFill />,
    },
    {
      name: "Deliveries",
      section: "deliveries",
      icon: <FaTruck />,
    },
  ];

  return (
    <aside className=" w-auto  mt-4 bg-gradient-to-b from-gray-900/30 to-transparent text-white transition-all duration-300">
      <div className="p-4 font-bold text-xl hidden sm:block">Admin Panel</div>{" "}
      <nav className="mt-6 space-y-2">
        {navItems.map((item) => (
          <button
            key={item.name}
            onClick={() => onNavItemSelect(item.section)}
            className={`flex items-center sm:justify-center md:justify-start w-full text-left py-2 px-4 rounded-lg hover:bg-gray-700 ${
              selectedSection === item.section ? "bg-gray-700/70" : ""
            }`}
          >
            <div className="w-6">{item.icon}</div>
            <span className="ml-2 hidden sm:hidden md:inline">
              {item.name}
            </span>{" "}
          </button>
        ))}
      </nav>
    </aside>
  );
};

const Admin = () => {
  const { data: session, status } = useSession();

  const [selectedSection, setSelectedSection] = useState<string>("dashboard");
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);

  useEffect(() => {
    const checkAdminStatus = async () => {
      if (status === "authenticated" && session?.user?.email) {
        try {
          const response = await fetch("/api/auth/admin", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ email: session.user.email }),
          });
          const data = await response.json();
          setIsAdmin(data.isAdmin);
        } catch (error) {
          console.error("Error checking admin status:", error);
          setIsAdmin(false);
        }
      }
    };

    checkAdminStatus();
  }, [session, status]);

  const renderSection = () => {
    switch (selectedSection) {
      case "dashboard":
        return <AdminDashboard />;
      case "menu":
        return <CreateMenuItem />;
      case "reservations":
        return <AdminBookings />;
      case "subscriptions":
        return <AdminSubscriptions />;
      case "deliveries":
        return <DeliveryDetails />;
      default:
        return <AdminDashboard />;
    }
  };

  if (status === "loading" || isAdmin === null) {
    return (
      <div className="mt-32 text-h1Text text-3xl font-handFont text-center">
        Please Login to continue
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <Alert variant="destructive" className="mx-auto w-96 mt-32">
        <AlertTitle>Access Denied</AlertTitle>
        <AlertDescription>
          You do not have permission to access the admin page.
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="flex">
      <Sidebar
        onNavItemSelect={setSelectedSection}
        selectedSection={selectedSection}
      />
      <main className="flex-1 p-4 space-y-4">{renderSection()}</main>
    </div>
  );
};

export default Admin;
