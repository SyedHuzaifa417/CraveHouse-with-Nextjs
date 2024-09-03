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

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await axios.get("/api/reservation");
        setBookings(response.data);
      } catch (error) {
        console.error("Error fetching bookings:", error);
      }
    };

    fetchBookings();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-h1Text">Bookings</h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {bookings.map((booking) => (
          <div key={booking.id} className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">
              {booking.firstName} {booking.lastName}
            </h2>
            <p>
              <strong>Date:</strong> {format(new Date(booking.date), "PPP")}
            </p>
            <p>
              <strong>Time:</strong> {booking.time}
            </p>
            <p>
              <strong>People:</strong> {booking.people}
            </p>
            <p>
              <strong>Looking for:</strong> {booking.looking}
            </p>
            <p>
              <strong>Company:</strong> {booking.companyName || "N/A"}
            </p>
            <p>
              <strong>Mobile:</strong> {booking.mobile}
            </p>
            <p>
              <strong>Email:</strong> {booking.email}
            </p>
            <p>
              <strong>Special Requirements:</strong>{" "}
              {booking.specialRequirements.join(", ") || "None"}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminBookings;
