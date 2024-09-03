import CreateMenuItem from "@/components/admin/createMenu";
import AdminBookings from "@/components/admin/reservations";
import AdminSubscriptions from "@/components/admin/subcriptions";
import React from "react";

const Admin = () => {
  return (
    <>
      <CreateMenuItem />
      <AdminBookings />
      <AdminSubscriptions />
    </>
  );
};

export default Admin;
