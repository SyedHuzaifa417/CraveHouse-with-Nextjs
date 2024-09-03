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
    return <div>Loading...</div>;
  }

  return (
    <div className="bg-gray-600 flex flex-col sm:flex-row gap-20 text-pText text-base sm:text-lg md:text-lg max-w-6xl mx-auto my-8 font-bodyFont">
      <table className="max-w-96 bg-gray-600">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">Email</th>
            <th className="py-2 px-4 border-b">Name</th>
            <th className="py-2 px-4 border-b">City</th>
            <th className="py-2 px-4 border-b">Message</th>
            <th className="py-2 px-4 border-b">Date</th>
          </tr>
        </thead>
        <tbody>
          {subscriptions.map((sub) => (
            <tr key={sub.id}>
              <td className="py-2 px-4 border-b">{sub.email}</td>
              <td className="py-2 px-4 border-b">{sub.name}</td>
              <td className="py-2 px-4 border-b">{sub.city}</td>
              <td className="py-2 px-4 border-b  truncate overflow-hidden md:max-w-md sm:max-w-sm">
                {sub.message}
              </td>
              <td className="py-2 px-4 border-b">
                {new Date(sub.createdAt).toLocaleDateString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminSubscriptions;
