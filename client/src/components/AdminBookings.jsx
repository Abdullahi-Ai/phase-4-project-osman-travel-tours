import { useEffect, useState } from "react";
import "./AdminBookings.css";

export default function AdminBookings() {
  const [bookings, setBookings] = useState([]);
  const [editId, setEditId] = useState(null);
  const [editDate, setEditDate] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch bookings
  useEffect(() => {
    fetch("/api/bookings")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to load bookings");
        return res.json();
      })
      .then((data) => {
        setBookings(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error:", err);
        setError("Could not load bookings.");
        setLoading(false);
      });
  }, []);

  const handleDelete = (id) => {
    if (!window.confirm("Are you sure you want to delete this booking?")) return;

    fetch(`/api/bookings/${id}`, { method: "DELETE" })
      .then((res) => {
        if (!res.ok) throw new Error("Delete failed");
        return res.json();
      })
      .then(() => {
        setBookings(bookings.filter((b) => b.id !== id));
      })
      .catch(() => alert("Error deleting booking"));
  };

  const startEditing = (id, currentDate) => {
    setEditId(id);
    setEditDate(currentDate);
  };

  const handleUpdate = (id) => {
    fetch(`/api/bookings/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ date: editDate }),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Update failed");
        return res.json();
      })
      .then(() => {
        const updated = bookings.map((b) =>
          b.id === id ? { ...b, date: editDate } : b
        );
        setBookings(updated);
        setEditId(null);
      })
      .catch(() => alert("Error updating booking"));
  };

  return (
    <section className="admin-bookings-section">
      <h2>Admin Bookings</h2>

      {loading ? (
        <p>Loading bookings...</p>
      ) : error ? (
        <p className="error-message">{error}</p>
      ) : bookings.length === 0 ? (
        <p>No bookings available.</p>
      ) : (
        <table className="admin-bookings-table">
          <thead>
            <tr>
              <th>User</th>
              <th>Email</th>
              <th>Tour</th>
              <th>Phone</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((b) => (
              <tr key={b.id}>
                <td>{b.user_name}</td>
                <td>{b.user_email}</td>
                <td>{b.tour_name}</td>
                <td>{b.phone_number}</td>
                <td>
                  {editId === b.id ? (
                    <input
                      type="date"
                      value={editDate}
                      onChange={(e) => setEditDate(e.target.value)}
                      className="admin-input"
                    />
                  ) : (
                    b.date
                  )}
                </td>
                <td>
                  {editId === b.id ? (
                    <>
                      <button
                        onClick={() => handleUpdate(b.id)}
                        className="admin-button btn-save"
                      >
                        Save
                      </button>
                      <button
                        onClick={() => setEditId(null)}
                        className="admin-button btn-cancel"
                      >
                        Cancel
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={() => startEditing(b.id, b.date)}
                        className="admin-button btn-edit"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(b.id)}
                        className="admin-button btn-delete"
                      >
                        Delete
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </section>
  );
}
