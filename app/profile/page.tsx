"use client";
import { useSearchParams } from "next/navigation";

export default function Profile() {
  const searchParams = useSearchParams();
  const type = searchParams.get("type");

  return (
    <main className="min-h-screen p-6">
      <div className="max-w-4xl mx-auto bg-gray-700/45 p-8 rounded-lg shadow-lg shadow-gray-700/75">
        <h1 className="text-4xl font-bold font-bodyFont mb-6 tracking-[0.15rem] uppercase bg-gradient-to-r from-food_red to-yellow-500 bg-clip-text text-transparent">
          {type === "admin" ? "Admin" : "User"} Login Page
        </h1>
        <p className="text-lg text-pText mb-4">
          Welcome {type === "admin" ? "admin" : "user"}. Kindly login below{" "}
          {type === "admin" && " // email: admin123 | password: admin123"}
        </p>
        {/* Add more profile content here */}
      </div>
    </main>
  );
}
