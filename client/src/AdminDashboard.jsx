import React from "react";
import AdminHistory from "./AdminHistory";
import AdminTours from "./components/AdminTours";

export default function AdminDashboard() {
  return (
    <div className="admin-dashboard">
      <h1>Admin Dashboard</h1>
      <p>Welcome, Admin! You can manage tours, view bookings, and perform system tasks here.</p>

      <section>
        <h2> Tour Management</h2>
        <AdminTours />
      </section>

      <section>
        <h2>Booking History</h2>
        <AdminHistory />
      </section>
    </div>
  );
}
