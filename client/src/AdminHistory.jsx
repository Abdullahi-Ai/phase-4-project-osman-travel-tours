import React, { useEffect, useState } from "react";

function AdminHistory() {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/admin/history")
      .then(res => res.json())
      .then(data => {
        setHistory(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <h2>Action History</h2>
      <ul>
        {history.length === 0 && <li>No actions yet.</li>}
        {history.map(h => (
          <li key={h.id}>
            <strong>{h.action}</strong> by user {h.user_id} – {h.detail}{" "}
            <em>({new Date(h.timestamp).toLocaleString()})</em>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AdminHistory;
