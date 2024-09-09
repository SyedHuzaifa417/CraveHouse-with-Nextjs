"use client";

import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import axios from "axios";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  BarChart,
  Bar,
  CartesianGrid,
  Label,
  RadialBarChart,
  RadialBar,
} from "recharts";
import { BiTrendingUp } from "react-icons/bi";

interface User {
  id: string;
  email: string;
  username: string;
  isCommunityMember: boolean;
}

interface Recipe {
  id: string;
  title: string;
  category: {
    name: string;
  };
}

interface MenuItem {
  id: string;
  name: string;
  price: number;
}

interface Booking {
  id: string;
  date: string;
}

interface DeliveryItem {
  menuItem: {
    name: string;
    price: number;
  };
  quantity: number;
}

interface Delivery {
  id: string;
  deliveryDate: string;
  user: {
    name: string;
    email: string;
  };
  items: DeliveryItem[];
}

interface Subscription {
  id: number;
  email: string;
  name?: string;
  city?: string;
  message?: string;
  createdAt: string;
}

const AdminDashboard: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [deliveries, setDeliveries] = useState<Delivery[]>([]);
  const [subscription, setSubscription] = useState<Subscription[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const [
          usersRes,
          recipesRes,
          menuItemsRes,
          bookingsRes,
          deliveriesRes,
          subscriptionRes,
        ] = await Promise.all([
          axios.get("/api/user"),
          axios.get("/api/community"),
          axios.get("/api/menu/menu-items"),
          axios.get("/api/reservation"),
          axios.get("/api/delivery"),
          axios.get("/api/subscription"),
        ]);

        setUsers(usersRes.data);
        setRecipes(recipesRes.data);
        setMenuItems(menuItemsRes.data);
        setBookings(bookingsRes.data);
        setDeliveries(deliveriesRes.data);
        setSubscription(subscriptionRes.data.data);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError(
          err instanceof Error ? err.message : "An unknown error occurred"
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (isLoading)
    return (
      <div className="text-center text-3xl mt-32 font-handFont text-h1Text">
        Loading...
      </div>
    );
  if (error)
    return (
      <Alert variant="destructive" className="w-max mx-auto mt-32">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    );

  const totalRevenue = menuItems.reduce((sum, item) => sum + item.price, 0);

  const userRoleData = [
    {
      name: "Community Members",
      value: users.filter((user) => user.isCommunityMember).length,
    },
    {
      name: "Regular Users",
      value: users.filter((user) => !user.isCommunityMember).length,
    },
  ];

  const bookingsChartData = bookings.reduce<Record<string, number>>(
    (acc, booking) => {
      //acc is object that stores the booking on each date of booking
      const date = new Date(booking.date).toISOString().split("T")[0]; //for yyyy-mm-dd and cut time
      acc[date] = (acc[date] || 0) + 1; //This checks if the accumulator already has an entry for the current date.If it does, the count for that date is incremented by 1 . else it initializes the value to 1 (0 + 1).
      return acc;
    },
    {} //initial value which is empty object
  );

  const deliveryChartData = deliveries.reduce<Record<string, number>>(
    (acc, delivery) => {
      const date = new Date(delivery.deliveryDate).toISOString().split("T")[0];
      acc[date] = (acc[date] || 0) + 1;
      return acc;
    },
    {}
  );

  const bookingsDataForChart = Object.entries(bookingsChartData).map(
    ([date, count]) => ({
      date,
      count,
    })
  );

  const deliveryDataForChart = Object.entries(deliveryChartData)
    .map(([date, count]) => ({
      date,
      count,
    }))
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .slice(-30); // Get the last 30 days of data

  const recipeCategoryData = Object.entries(
    recipes.reduce<Record<string, number>>((acc, recipe) => {
      acc[recipe.category.name] = (acc[recipe.category.name] || 0) + 1;
      return acc;
    }, {})
  ).map(([category, count]) => ({
    category,
    count,
  }));

  const totalDeliveryRevenue = deliveries.reduce((total, delivery) => {
    const deliveryTotal = delivery.items.reduce((sum, item) => {
      return sum + item.menuItem.price * item.quantity;
    }, 0);
    return total + deliveryTotal;
  }, 0);

  const COLORS = ["#2dacf0", "#f02d89"];

  return (
    <div className="p-2 sm:p-4 space-y-4 bg-gradient-to-b from-gray-900/30 to-transparent">
      <h1 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 text-white">
        Admin Dashboard
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Key Metrics */}
        <Card className="bg-gray-800/30 text-white col-span-1 sm:col-span-2 lg:col-span-2 border border-gray-700 shadow-lg shadow-gray-700">
          <CardHeader>
            <CardTitle className="text-lg">Key Metrics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <h3 className="font-semibold">Total Users</h3>
                <p className="text-xl font-bold text-red-400">{users.length}</p>
              </div>
              <div>
                <h3 className="font-semibold">Total Recipes</h3>
                <p className="text-xl font-bold text-green-400">
                  {recipes.length}
                </p>
              </div>
              <div>
                <h3 className="font-semibold">Total Menu Items</h3>
                <p className="text-xl font-bold text-lime-400">
                  {menuItems.length}
                </p>
              </div>
              <div>
                <h3 className="font-semibold">Total Bookings</h3>
                <p className="text-xl font-bold text-fuchsia-400">
                  {bookings.length}
                </p>
              </div>
              <div>
                <h3 className="font-semibold">Total Deliveries</h3>
                <p className="text-xl font-bold text-blue-500">
                  {deliveries.length}
                </p>
              </div>
              <div>
                <h3 className="font-semibold">Total Subscriptions</h3>
                <p className="text-xl font-bold text-orange-500">
                  {subscription.length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Total Users - PieChart */}
        <Card className="bg-gray-800/30 text-white border border-gray-700 shadow-lg shadow-gray-700">
          <CardHeader>
            <CardTitle className="text-lg">Total Users</CardTitle>
          </CardHeader>
          <CardContent className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={userRoleData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  fill="#8884d8"
                  stroke="#fffff"
                >
                  {userRoleData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Subscription */}
        <Card className="bg-gray-800/30  text-white border border-gray-700 shadow-lg shadow-gray-700">
          <CardHeader>
            <CardTitle className="text-lg">Total Subscriptions</CardTitle>
          </CardHeader>
          <CardContent className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={[{ name: "Revenue", value: subscription.length }]}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  innerRadius={60}
                  fill="#f78b25"
                  stroke="#D2D2D2"
                >
                  <Label
                    value={`${subscription.length}`}
                    position="center"
                    style={{ fontSize: "16px", fontWeight: "bold" }}
                  />
                  <Tooltip />
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Bookings Over Time - AreaChart */}
        <Card className="bg-gray-800/30 text-white col-span-1 sm:col-span-2 lg:col-span-1 border border-gray-700 shadow-lg shadow-gray-700">
          <CardHeader>
            <CardTitle className="text-lg">Bookings Over Time</CardTitle>
          </CardHeader>
          <CardContent className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={bookingsDataForChart}>
                <XAxis dataKey="date" />
                <YAxis ticks={[1, 3, 5]} />
                <CartesianGrid strokeDasharray="3 3" />
                <Tooltip />
                <Area
                  type="monotone"
                  dataKey="count"
                  stroke="#5752D1"
                  fill="#9711d5"
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Popular Recipe Categories - BarChart */}
        <Card className="bg-gray-800/30 text-white col-span-1 sm:col-span-2 lg:col-span-1 border border-gray-700 shadow-lg shadow-gray-700">
          <CardHeader>
            <CardTitle className="text-lg">Popular Recipe Categories</CardTitle>
          </CardHeader>
          <CardContent className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={recipeCategoryData}>
                <XAxis dataKey="category" />
                <YAxis ticks={[1, 5, 10]} />
                <CartesianGrid strokeDasharray="3 3" />
                <Tooltip />
                <Bar
                  dataKey="count"
                  strokeWidth={2}
                  radius={8}
                  activeIndex={2}
                  fill="#38812F"
                />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Deliveries*/}
        <Card className="bg-gray-800/30 text-white col-span-1 sm:col-span-2 lg:col-span-2 border border-gray-700 shadow-lg shadow-gray-700">
          <CardHeader>
            <CardTitle className="text-lg">
              Daily Deliveries (Last 30 Days)
            </CardTitle>
            <div className="text-sm text-gray-400">
              Total Revenue: ${totalDeliveryRevenue.toFixed(2)}
            </div>
          </CardHeader>
          <CardContent className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={deliveryDataForChart}>
                <XAxis
                  dataKey="date"
                  tick={{ fill: "#ffffff", fontSize: 12 }}
                  tickFormatter={(value) =>
                    new Date(value).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    })
                  }
                />
                <YAxis tick={{ fill: "#ffffff", fontSize: 12 }} />
                <CartesianGrid strokeDasharray="3 3" stroke="#6b7280" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#374151",
                    border: "none",
                    borderRadius: "4px",
                  }}
                  labelStyle={{ color: "#ffffff" }}
                  itemStyle={{ color: "#38bdf8" }}
                />
                <Bar dataKey="count" fill="#38bdf8" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Total Revenue - Hollow PieChart */}

        <Card className="bg-gray-800/30 col-span-1 sm:col-span-2 lg:col-span-1 text-white border border-gray-700 shadow-lg shadow-gray-700">
          <CardHeader>
            <CardTitle className="text-lg">Menu Revenue</CardTitle>
          </CardHeader>
          <CardContent className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={[{ name: "Revenue", value: totalRevenue }]}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  innerRadius={60}
                  fill="#d5f21c"
                  stroke="#D2D2D2"
                >
                  <Label
                    value={`Rs.${totalRevenue.toFixed(2)}`}
                    position="center"
                    style={{ fontSize: "16px", fontWeight: "bold" }}
                  />
                  <Tooltip />
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;
