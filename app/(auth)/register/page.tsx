"use client";
import Link from "next/link";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      await axios.post("/api/auth/register", { username, email, password });
      router.push("/login?message=Registration successful");
    } catch (error: any) {
      if (error.response) {
        setError(error.response.data.error);
      } else {
        setError("An error occurred during registration");
      }
    }
  };

  return (
    <main className="p-6">
      <div className="max-w-max text-center mx-auto bg-gray-700/45 p-8 rounded-lg shadow-lg shadow-gray-700/75">
        <h1 className="text-4xl font-bold font-bodyFont mb-6 tracking-[0.15rem] uppercase bg-gradient-to-r from-food_red to-yellow-500 bg-clip-text text-transparent">
          Register
        </h1>
        <p className="text-lg text-pText mb-4">
          Create your account to get started
        </p>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-4 text-start">
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-300"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="mt-1 block w-full px-3 py-2 bg-gray-600 focus:bg-gray-800 border border-gray-500 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-food_red"
              required
            />
          </div>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-300"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full px-3 py-2 bg-gray-600 focus:bg-gray-800 border border-gray-500 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-food_red"
              required
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-300"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full px-3 py-2 bg-gray-600 focus:bg-gray-800 border border-gray-500 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-food_red"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-food_red hover:bg-food_red/80 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-food_red"
          >
            Register
          </button>
        </form>
        <p className="mt-4 text-center text-sm text-gray-300">
          Already have an account?{" "}
          <Link
            href="/login"
            className="font-medium text-food_red hover:text-food_red/80"
          >
            Login here
          </Link>
        </p>
      </div>
    </main>
  );
}
