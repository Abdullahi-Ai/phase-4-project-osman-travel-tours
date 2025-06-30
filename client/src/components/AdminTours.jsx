import React, { useState, useEffect } from "react";
import "./AdminTours.css";

export default function AdminTours() {
  const [tours, setTours] = useState([]);
  const [form, setForm] = useState({ name: "", description: "", price: "" });
  const [message, setMessage] = useState("");
  const [editId, setEditId] = useState(null); 

  useEffect(() => {
    fetch("/api/tours")
      .then((res) => res.json())
      .then(setTours)
      .catch(() => setMessage("Failed to load tours."));
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAddOrUpdate = async (e) => {
    e.preventDefault();
    setMessage("");

    if (editId) {
     
      try {
        const res = await fetch(`/api/tours/${editId}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        });
        if (res.ok) {
          const updated = await res.json();
          setTours(tours.map((t) => (t.id === editId ? updated : t)));
          setMessage("Tour updated!");
        } else {
          setMessage("Failed to update tour.");
        }
      } catch {
        setMessage("Network error while updating.");
      }
    } else {
    
      try {
        const response = await fetch("/api/tours", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        });

        if (response.ok) {
          const newTour = await response.json();
          setTours([...tours, newTour]);
          setMessage("Tour added!");
        } else {
          const data = await response.json();
          setMessage(data.error || "Failed to add tour.");
        }
      } catch {
        setMessage("Network error.");
      }
    }

    setForm({ name: "", description: "", price: "" });
    setEditId(null);
  };

  const handleEdit = (tour) => {
    setForm({ name: tour.name, description: tour.description, price: tour.price });
    setEditId(tour.id);
  };

  const handleDelete = async (id) => {
    try {
      const res = await fetch(`/api/tours/${id}`, { method: "DELETE" });
      if (res.ok) {
        setTours(tours.filter((tour) => tour.id !== id));
        setMessage("Tour deleted.");
      } else {
        setMessage("Failed to delete tour.");
      }
    } catch {
      setMessage("Network error while deleting.");
    }
  };

  return (
    <div className="admin-tours">
      <h2>🧭 Manage Safari Tours</h2>
      {message && <p className="message">{message}</p>}

      <div className="tour-list">
        {tours.map((tour) => (
          <div key={tour.id} className="tour-card">
            <h4>{tour.name}</h4>
            <p>{tour.description}</p>
            <p><strong>KES:</strong> {tour.price}</p>
            <div className="btns">
              <button onClick={() => handleEdit(tour)}>✏️ Edit</button>
              <button onClick={() => handleDelete(tour.id)}>🗑️ Delete</button>
            </div>
          </div>
        ))}
      </div>

      <div className="form-section">
        <h3>{editId ? "✏️ Edit Tour" : "➕ Add New Tour"}</h3>
        <form onSubmit={handleAddOrUpdate}>
          <input
            type="text"
            name="name"
            placeholder="Tour Name"
            value={form.name}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="description"
            placeholder="Description"
            value={form.description}
            onChange={handleChange}
            required
          />
          <input
            type="number"
            name="price"
            placeholder="Price"
            value={form.price}
            onChange={handleChange}
            required
          />
          <button type="submit">{editId ? "Update Tour" : "Add Tour"}</button>
        </form>
      </div>
    </div>
  );
}
