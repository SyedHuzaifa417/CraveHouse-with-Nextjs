import { Metadata } from "next";
import Link from "next/link";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export const metadata: Metadata = {
  title: "Reservation",
};

const Reservations = async () => {
  const session = await getServerSession(authOptions);

  return (
    <main className=" p-6">
      <div className="max-w-4xl mx-auto bg-gray-700/45 p-8 rounded-lg shadow-lg shadow-gray-700/75 text-center">
        <h1 className="text-2xl font-bold font-bodyFont mt-5 mb-9 tracking-[0.15rem] uppercase bg-gradient-to-r from-food_red to-yellow-500 bg-clip-text text-transparent md:text-4xl">
          Reservations
        </h1>
        <p className="text-lg text-pText mb-4 ">
          We highly recommend making a booking.
        </p>
        <p className="text-lg text-pText mb-4">
          Click on the link below or call{" "}
          <span className="text-orange-500 underline cursor-copy">
            061 212 12112
          </span>{" "}
          to make a reservation.
        </p>
        <p className="text-md text-pText mb-4">
          <em>Please note:- </em> Telephonic bookings can only be made via
          phone.
        </p>
        {session ? (
          <Link
            href="/reservations/booking"
            className="inline-block text-xl underline text-food_yellow hover:text-orange-300"
          >
            Make a Reservation
          </Link>
        ) : (
          <Link
            href="/login"
            className="inline-block text-xl underline text-food_yellow hover:text-orange-300"
          >
            Login to Make a Reservation
          </Link>
        )}
      </div>
    </main>
  );
};

export default Reservations;
