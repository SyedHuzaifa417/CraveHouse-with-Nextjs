"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";

interface Subscription {
  id: number;
  email: string;
  name?: string;
  city?: string;
  message?: string;
  createdAt: string;
}

const AdminSubscriptions: React.FC = () => {
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSubscriptions = async () => {
      try {
        const response = await axios.get("/api/subscription");
        setSubscriptions(response.data.data);
      } catch (error) {
        console.error("Failed to fetch subscriptions:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSubscriptions();
  }, []);

  if (loading) {
    return (
      <div className="text-center text-3xl mt-32 font-handFont text-h1Text">
        Loading...
      </div>
    );
  }

  return (
    <div className=" mx-auto lg:p-8 p-2 sm:p-4 space-y-4 bg-gray-900/30">
      <h1 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 text-white">
        Subscriptions
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {subscriptions.map((sub) => (
          <div
            key={sub.id}
            className="bg-gray-700/40 text-pText p-4 rounded-lg shadow-md shadow-gray-600 space-y-2 sm:space-y-4"
          >
            <div className="flex flex-col sm:flex-row justify-between">
              <span className="font-bold">Email:</span>
              <span className="text-food_yellow">{sub.email}</span>
            </div>

            <div className="flex flex-col sm:flex-row justify-between">
              <span className="font-bold">Name:</span>
              <span className="text-food_yellow">{sub.name || "N/A"}</span>
            </div>

            <div className="flex flex-col sm:flex-row justify-between">
              <span className="font-bold">City:</span>
              <span className="text-food_yellow">{sub.city || "N/A"}</span>
            </div>

            <div className="flex flex-col sm:flex-row justify-between">
              <span className="font-bold">Message:</span>
              <span className="truncate text-food_yellow">
                {sub.message || "No message"}
              </span>
            </div>

            <div className="flex flex-col sm:flex-row justify-between">
              <span className="font-bold">Date:</span>
              <span className="text-food_yellow">
                {new Date(sub.createdAt).toLocaleDateString()}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminSubscriptions;
