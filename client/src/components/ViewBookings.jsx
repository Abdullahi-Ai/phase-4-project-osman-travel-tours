import React, { useEffect, useState } from "react";
import "./ViewBookings.css";

export default function ViewBookings() {
  const [bookings, setBookings] = useState([]);
  const [tours, setTours] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editId, setEditId] = useState(null);
  const [editForm, setEditForm] = useState({
    date: "",
    phone_number: "",
    tour_id: "",
    user_name: "",
    user_email: ""
  });

  useEffect(() => {
    async function fetchData() {
      try {
        const [bookingsRes, toursRes] = await Promise.all([
          fetch("/api/bookings"),
          fetch("/api/tours")
        ]);

        const bookingsData = await bookingsRes.json();
        const toursData = await toursRes.json();

        setBookings(bookingsData);
        setTours(toursData);
        setLoading(false);
      } catch (err) {
        console.error("Failed to fetch data:", err);
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  const handleEditClick = (booking) => {
  setEditId(booking.id);
  setEditForm({
    date: booking.date,
    phone_number: booking.phone_number,
    tour_id: String(booking.tour_id),   
    user_name: booking.user_name,
    user_email: booking.user_email,
    user_id: booking.user_id            
  });
};

const handleUpdate = async (id) => {
  try {
    const res = await fetch(`/api/bookings/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...editForm,
        tour_id: Number(editForm.tour_id),
        user_id: editForm.user_id          
      }),
    });

    if (res.ok) {
      setBookings(bookings.map(b =>
        b.id === id
          ? {
              ...b,
              ...editForm,
              tour_id: Number(editForm.tour_id),
              tour_name: tours.find(t => t.id === Number(editForm.tour_id))?.name || b.tour_name
            }
          : b
      ));
      setEditId(null);
    } else {
      alert("Failed to update booking.");
    }
  } catch {
    alert("Network error while updating booking.");
  }
};



  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this booking?")) return;

    try {
      const res = await fetch(`/api/bookings/${id}`, { method: "DELETE" });
      if (res.ok) {
        setBookings(bookings.filter(b => b.id !== id));
      } else {
        alert("Failed to delete booking.");
      }
    } catch {
      alert("Network error while deleting booking.");
    }
  };

  return (
    <div className="view-bookings-container">
      <h2 className="view-bookings-title">📋 All Bookings</h2>
      {loading ? (
        <p className="loading">Loading...</p>
      ) : bookings.length === 0 ? (
        <p className="no-bookings">No bookings found.</p>
      ) : (
        <table className="bookings-table">
          <thead>
            <tr>
              <th>User</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Tour</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map(b => (
              <tr key={b.id}>
                <td>
                  {editId === b.id ? (
                    <input
                      type="text"
                      value={editForm.user_name}
                      onChange={(e) => setEditForm({ ...editForm, user_name: e.target.value })}
                    />
                  ) : (
                    b.user_name
                  )}
                </td>
                <td>
                  {editId === b.id ? (
                    <input
                      type="email"
                      value={editForm.user_email}
                      onChange={(e) => setEditForm({ ...editForm, user_email: e.target.value })}
                    />
                  ) : (
                    b.user_email
                  )}
                </td>
                <td>
                  {editId === b.id ? (
                    <input
                      type="text"
                      value={editForm.phone_number}
                      onChange={(e) => setEditForm({ ...editForm, phone_number: e.target.value })}
                    />
                  ) : (
                    b.phone_number
                  )}
                </td>
                <td>
                  {editId === b.id ? (
                    <select
                      value={editForm.tour_id}
                      onChange={(e) => setEditForm({ ...editForm, tour_id: e.target.value })}
                    >
                      <option value="">-- Select Tour --</option>
                      {tours.map(t => (
                        <option key={t.id} value={t.id}>{t.name}</option>
                      ))}
                    </select>
                  ) : (
                    b.tour_name
                  )}
                </td>
                <td>
                  {editId === b.id ? (
                    <input
                      type="date"
                      value={editForm.date}
                      onChange={(e) => setEditForm({ ...editForm, date: e.target.value })}
                    />
                  ) : (
                    b.date
                  )}
                </td>
                <td>
                  {editId === b.id ? (
                    <>
                      <button onClick={() => handleUpdate(b.id)}>Save</button>
                      <button onClick={() => setEditId(null)}>❌ Cancel</button>
                    </>
                  ) : (
                    <>
                      <button onClick={() => handleEditClick(b)}>✏️ Edit</button>
                      <button onClick={() => handleDelete(b.id)}>🗑 Delete</button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
