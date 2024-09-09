"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { format } from "date-fns";

interface Booking {
  id: string;
  date: string;
  time: string;
  people: number;
  looking: string;
  firstName: string;
  lastName: string;
  companyName: string | null;
  mobile: string;
  email: string;
  specialRequirements: string[];
}

const AdminBookings: React.FC = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await axios.get("/api/reservation");
        setBookings(response.data);
      } catch (error) {
        console.error("Error fetching bookings:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  if (loading) {
    return (
      <div className="text-center text-3xl mt-32 font-handFont text-h1Text">
        Loading...
      </div>
    );
  }

  return (
    <div className=" mx-auto px-4 py-8 space-y-4 bg-gray-900/30">
      <h1 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 text-white">
        Bookings
      </h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {bookings.map((booking) => (
          <div
            key={booking.id}
            className="bg-gray-700/60 shadow-md shadow-gray-600 rounded-lg p-6"
          >
            <h2 className="text-2xl font-bold mb-4 text-food_red">
              {booking.firstName} {booking.lastName}
            </h2>
            <p className="text-food_yellow">
              <strong className="text-white">Date:</strong>{" "}
              {format(new Date(booking.date), "PPP")}
            </p>
            <p className="text-food_yellow">
              <strong className="text-white">Time:</strong> {booking.time}
            </p>
            <p className="text-food_yellow">
              <strong className="text-white">People:</strong> {booking.people}
            </p>
            <p className="text-food_yellow">
              <strong className="text-white">Looking for:</strong>{" "}
              {booking.looking}
            </p>
            <p className="text-food_yellow">
              <strong className="text-white">Company:</strong>{" "}
              {booking.companyName || "N/A"}
            </p>
            <p className="text-food_yellow">
              <strong className="text-white">Mobile:</strong> {booking.mobile}
            </p>
            <p className="text-food_yellow">
              <strong className="text-white">Email:</strong> {booking.email}
            </p>
            <p className="text-food_yellow">
              <strong className="text-white">Special Requirements:</strong>{" "}
              {booking.specialRequirements.join(", ") || "None"}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminBookings;
