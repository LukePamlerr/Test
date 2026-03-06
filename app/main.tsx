"use client";

import { useState, useEffect } from "react";
import ItemCard from "@/components/ItemCard";

type Item = {
  id: number;
  title: string;
  description: string;
  created_at: string;
};

export default function HomePage() {
  const [items, setItems] = useState<Item[]>([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchItems = async () => {
    const res = await fetch("/api/items");
    const data = await res.json();
    setItems(data.items || []);
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const res = await fetch("/api/items", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, description }),
    });

    if (res.ok) {
      setTitle("");
      setDescription("");
      await fetchItems();
    } else {
      setError("Failed to create item.");
    }

    setLoading(false);
  };

  const handleDelete = async (id: number) => {
    await fetch("/api/items", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    await fetchItems();
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">📋 Items Manager</h2>

      {/* Form */}
      <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow p-6 mb-8 space-y-4">
        <h3 className="text-lg font-semibold">Add New Item</h3>
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="w-full border rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          rows={3}
          className="w-full border rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
        />
        <button
          type="submit"
          disabled={loading}
          className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 disabled:opacity-50 transition"
        >
          {loading ? "Adding..." : "Add Item"}
        </button>
      </form>

      {/* Items List */}
      {items.length === 0 ? (
        <p className="text-gray-400 text-center">No items yet. Add one above!</p>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2">
          {items.map((item) => (
            <ItemCard key={item.id} item={item} onDelete={handleDelete} />
          ))}
        </div>
      )}
    </div>
  );
}
