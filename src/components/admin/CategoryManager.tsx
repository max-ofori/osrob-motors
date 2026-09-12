"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type CategoryRow = {
  id: string;
  name: string;
  _count: { products: number };
};

export function CategoryManager({ initialCategories }: { initialCategories: CategoryRow[] }) {
  const router = useRouter();
  const [categories, setCategories] = useState(initialCategories);
  const [newName, setNewName] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingName, setEditingName] = useState("");

  async function handleAdd(e: React.FormEvent) {
    e.preventDefault();
    if (!newName.trim()) return;
    setError(null);
    setSubmitting(true);

    const res = await fetch("/api/categories", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: newName.trim() }),
    });
    const data = await res.json().catch(() => ({}));

    if (!res.ok) {
      setError(data.error ?? "Could not add category.");
    } else {
      setCategories((prev) =>
        [...prev, { ...data, _count: { products: 0 } }].sort((a, b) =>
          a.name.localeCompare(b.name)
        )
      );
      setNewName("");
      router.refresh();
    }
    setSubmitting(false);
  }

  async function handleRename(id: string) {
    if (!editingName.trim()) return;
    const res = await fetch(`/api/categories/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: editingName.trim() }),
    });
    const data = await res.json().catch(() => ({}));

    if (!res.ok) {
      alert(data.error ?? "Could not rename category.");
      return;
    }

    setCategories((prev) =>
      prev.map((c) => (c.id === id ? { ...c, name: data.name } : c))
    );
    setEditingId(null);
    router.refresh();
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete this category?")) return;

    const res = await fetch(`/api/categories/${id}`, { method: "DELETE" });
    const data = await res.json().catch(() => ({}));

    if (!res.ok) {
      alert(data.error ?? "Could not delete category.");
      return;
    }

    setCategories((prev) => prev.filter((c) => c.id !== id));
    router.refresh();
  }

  return (
    <div>
      <form onSubmit={handleAdd} className="flex gap-2">
        <input
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
          placeholder="e.g. Toyota, Brakes, Lighting"
          className="flex-1 rounded-md border border-line bg-canvas-raised px-4 py-3 text-base text-ink focus:outline-none focus:ring-2 focus:ring-amber"
        />
        <button
          type="submit"
          disabled={submitting}
          className="rounded-md bg-ink px-4 py-3 text-sm font-semibold text-canvas-raised disabled:opacity-50"
        >
          Add
        </button>
      </form>
      {error && <p className="mt-2 text-sm font-medium text-out-stock">{error}</p>}

      <div className="mt-4 rounded-md border border-line bg-canvas-raised px-4">
        {categories.length === 0 ? (
          <p className="py-8 text-center text-sm text-steel">No categories yet.</p>
        ) : (
          categories.map((category) => (
            <div
              key={category.id}
              className="flex items-center gap-3 border-b border-line py-3 last:border-0"
            >
              {editingId === category.id ? (
                <input
                  autoFocus
                  value={editingName}
                  onChange={(e) => setEditingName(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleRename(category.id)}
                  className="flex-1 rounded-md border border-line px-3 py-1.5 text-base"
                />
              ) : (
                <div className="flex-1">
                  <p className="font-medium text-ink">{category.name}</p>
                  <p className="text-xs text-steel">
                    {category._count.products} product
                    {category._count.products === 1 ? "" : "s"}
                  </p>
                </div>
              )}

              <div className="flex shrink-0 gap-2">
                {editingId === category.id ? (
                  <button
                    onClick={() => handleRename(category.id)}
                    className="rounded-md bg-ink px-3 py-1.5 text-sm font-medium text-canvas-raised"
                  >
                    Save
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      setEditingId(category.id);
                      setEditingName(category.name);
                    }}
                    className="rounded-md border border-line px-3 py-1.5 text-sm font-medium text-ink"
                  >
                    Rename
                  </button>
                )}
                <button
                  onClick={() => handleDelete(category.id)}
                  className="rounded-md border border-out-stock/30 bg-out-stock-bg px-3 py-1.5 text-sm font-medium text-out-stock"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
