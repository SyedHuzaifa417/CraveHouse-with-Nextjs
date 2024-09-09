import { format } from "date-fns";
import React from "react";
import { useState, useEffect } from "react";

interface MenuItem {
  name: string;
}

interface DeliveryItem {
  id: string;
  menuItem: MenuItem;
  quantity: number;
}

interface User {
  username: string;
  email: string;
}

interface Delivery {
  id: string;
  user: User;
  address: string;
  deliveryDate: string;
  total: number;
  items: DeliveryItem[];
}

const DeliveryDetails: React.FC = () => {
  const [deliveries, setDeliveries] = useState<Delivery[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchDeliveries = async () => {
      try {
        const response = await fetch("/api/delivery");
        if (!response.ok) {
          throw new Error("Failed to fetch deliveries");
        }
        const data: Delivery[] = await response.json();
        setDeliveries(data);
      } catch (error) {
        console.error("Error fetching deliveries:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDeliveries();
  }, []);

  if (loading) {
    return (
      <div className="text-center text-3xl mt-32 font-handFont text-h1Text">
        Loading...
      </div>
    );
  }

  return (
    <div className="mx-auto px-4 py-8 space-y-4 bg-gray-900/30">
      <h1 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 text-white">
        Deliveries
      </h1>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {deliveries.map((delivery) => (
          <div
            key={delivery.id}
            className="bg-gray-700/60 shadow-md shadow-gray-600 rounded-lg p-6 "
          >
            <h2 className="text-2xl font-bold mb-4 text-food_red ">
              <span className="text-h1Text font-semibold mr-2">User:</span>{" "}
              {delivery.user.username}
            </h2>
            <p className=" text-food_yellow mb-2">
              {" "}
              <span className="text-h1Text font-semibold mr-2">Email:</span>
              {delivery.user.email}
            </p>
            <p className=" text-food_yellow mb-2">
              {" "}
              <span className="text-h1Text font-semibold mr-2">
                Address:
              </span>{" "}
              {delivery.address}
            </p>
            <p className=" text-food_yellow mb-2">
              <span className="text-h1Text font-semibold mr-2">Date: </span>
              {format(new Date(delivery.deliveryDate), "PPP")}
            </p>

            <h3 className="text-lg font-semibold my-2 text-white">Items:</h3>
            <ul className="list-disc list-inside">
              {delivery.items.map((item) => (
                <li key={item.id} className="text-gray-300">
                  {item.menuItem.name} x {item.quantity}
                </li>
              ))}
            </ul>
            <p className=" text-food_yellow mt-4 ">
              <span className="text-h1Text font-semibold mr-2">Total: </span>
              Rs.{delivery.total.toFixed(2)}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DeliveryDetails;
