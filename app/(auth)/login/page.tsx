"use client";

import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { useState, useEffect } from "react";
import { FcGoogle } from "react-icons/fc";
import { signIn } from "next-auth/react";

export default function Login() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const type = searchParams.get("type");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const msg = searchParams.get("message");
    if (msg) {
      setMessage(msg);
    }
  }, [searchParams]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      if (type === "admin") {
        // Admin login check
        if (email === "admin123@admin.com" && password === "admin123") {
          // Correct admin credentials
          router.push("/admin");
          return;
        } else {
          // Wrong admin credentials
          setError("Invalid admin credentials");
          return;
        }
      } else {
        // Regular user login check
        if (email === "admin123@admin.com" && password === "admin123") {
          // Prevent admin credentials on user login type
          setError("No Access");
          return;
        }

        const result = await signIn("credentials", {
          redirect: false,
          email,
          password,
        });

        if (result?.error) {
          // Error during sign-in process
          setError(result.error);
        } else if (result?.ok) {
          // Successful login for regular user
          router.push("/");
        }
      }
    } catch (error: any) {
      setError("An error occurred during login");
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      setIsLoading(true);
      await signIn("google", { callbackUrl: "/" });
    } catch (error) {
      setIsLoading(false);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="p-6">
      <div className="max-w-max mx-auto text-center bg-gray-700/45 p-8 rounded-lg shadow-lg shadow-gray-700/75">
        <h1 className="text-4xl font-bold font-bodyFont mb-6 tracking-[0.15rem] uppercase bg-gradient-to-r from-food_red to-yellow-500 bg-clip-text text-transparent">
          Welcome {type === "admin" ? "Admin" : "User"}
        </h1>
        <p className="text-lg text-pText mb-4">Kindly login below </p>
        {type === "admin" && (
          <p className="text-lg text-gray-600 mb-4">
            email: admin123@admin.com | password: admin123
          </p>
        )}
        {message && !error && <p className="text-green-500 mb-4">{message}</p>}
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-4 text-start">
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
              className="mt-1 block w-full px-3 py-2 bg-gray-600 border border-gray-500 rounded-md text-white focus:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-food_red"
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
              className="mt-1 block w-full px-3 py-2 bg-gray-600 border border-gray-500 rounded-md text-white focus:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-food_red"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-food_red hover:bg-food_red/80 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-food_red"
          >
            Sign In
          </button>
        </form>
        <p className="text-gray-500 my-3 hidden md:block">
          ————————— or —————————
        </p>
        <button
          onClick={handleGoogleSignIn}
          className="flex items-center justify-center gap-4 mt-4 w-full py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gray-900 hover:bg-gray-700 focus:bg-gray-700"
          disabled={isLoading}
        >
          {isLoading && (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              className="h-4 w-4 mr-2 animate-spin text-white"
            >
              <line x1="12" y1="2" x2="12" y2="6"></line>
              <line x1="12" y1="18" x2="12" y2="22"></line>
              <line x1="4.93" y1="4.93" x2="7.76" y2="7.76"></line>
              <line x1="16.24" y1="16.24" x2="19.07" y2="19.07"></line>
              <line x1="2" y1="12" x2="6" y2="12"></line>
              <line x1="18" y1="12" x2="22" y2="12"></line>
              <line x1="4.93" y1="19.07" x2="7.76" y2="16.24"></line>
              <line x1="16.24" y1="7.76" x2="19.07" y2="4.93"></line>
            </svg>
          )}
          Continue with Google
          <FcGoogle className="text-2xl" />
        </button>
        <p className="mt-4 text-center text-sm text-gray-300">
          Don&apos;t have an account?{" "}
          <Link
            href="/register"
            className="font-medium text-food_red hover:text-food_red/80"
          >
            Register here
          </Link>
        </p>
      </div>
    </main>
  );
}
