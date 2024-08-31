"use client";

import { useRouter } from "next/navigation";

export default function ErrorClient({ error }: { error: string }) {
  const router = useRouter();

  return (
    <div className=" flex items-center justify-center ">
      <div className="max-w-max mx-auto text-center bg-gray-700/45 p-8 rounded-lg shadow-lg shadow-gray-700/75">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-extrabold text-food_red">
            Authentication Error
          </h2>
          <p className="mt-2 text-sm text-gray-400">{error}</p>
        </div>
        <div className="mt-5">
          <button
            onClick={() => router.push("/login")}
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Return to Login
          </button>
        </div>
      </div>
    </div>
  );
}
