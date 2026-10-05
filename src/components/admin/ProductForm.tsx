"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { ImageUploader } from "@/components/admin/ImageUploader";
import type { CategoryOption } from "@/types";

export type ProductFormValues = {
  id?: string;
  name: string;
  categoryId?: string;
  price: string;
  stock: string;
  availability: "available" | "unavailable";
  image: string | null;
  partNumber: string;
  vehicleMake: string;
  vehicleModel: string;
  year: string;
  description: string;
};

const emptyValues: ProductFormValues = {
  name: "",
  categoryId: "",
  price: "",
  stock: "1",
  availability: "available",
  image: null,
  partNumber: "",
  vehicleMake: "",
  vehicleModel: "",
  year: "",
  description: "",
};

export function ProductForm({
  categories,
  initialValues,
}: {
  categories: CategoryOption[];
  initialValues?: ProductFormValues;
}) {
  const router = useRouter();
  const isEditing = Boolean(initialValues?.id);
  const [values, setValues] = useState<ProductFormValues>(initialValues ?? emptyValues);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  function update<K extends keyof ProductFormValues>(key: K, value: ProductFormValues[K]) {
    setValues((prev) => ({ ...prev, [key]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (!values.name.trim()) return setError("Please enter a product name.");
    if (!values.price || Number.isNaN(Number(values.price))) {
      return setError("Please enter a valid price.");
    }

    const categoryId = values.categoryId || categories[0]?.id || "";
    if (!categoryId) return setError("No category is available. Please create one first.");

    setSubmitting(true);

    const stockValue = values.availability === "available"
      ? Math.max(1, Number(values.stock) || 1)
      : 0;

    const payload = {
      name: values.name.trim(),
      categoryId,
      price: Number(values.price),
      stock: stockValue,
      image: values.image,
      partNumber: values.partNumber.trim(),
      vehicleMake: values.vehicleMake.trim(),
      vehicleModel: values.vehicleModel.trim(),
      year: values.year.trim(),
      description: values.description.trim(),
    };

    try {
      const res = await fetch(isEditing ? `/api/products/${values.id}` : "/api/products", {
        method: isEditing ? "PATCH" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setError(data.error ?? "Could not save this product.");
        setSubmitting(false);
        return;
      }

      router.push("/admin/dashboard");
      router.refresh();
    } catch {
      setError("Something went wrong. Check your connection and try again.");
      setSubmitting(false);
    }
  }

  const inputClass =
    "w-full rounded-md border border-line bg-canvas-raised px-4 py-3 text-base text-ink focus:outline-none focus:ring-2 focus:ring-amber";
  const labelClass = "mb-1.5 block text-sm font-medium text-ink";

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 pb-10">
      <div>
        <label className={labelClass} htmlFor="name">
          Product Name
        </label>
        <input
          id="name"
          className={inputClass}
          value={values.name}
          onChange={(e) => update("name", e.target.value)}
          placeholder="Toyota Corolla Brake Pad"
        />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className={labelClass} htmlFor="price">
            Price (GH₵)
          </label>
          <input
            id="price"
            type="number"
            inputMode="decimal"
            min={0}
            step="0.01"
            className={inputClass}
            value={values.price}
            onChange={(e) => update("price", e.target.value)}
            placeholder="450"
          />
        </div>
        <div>
          <label className={labelClass} htmlFor="availability">
            Availability
          </label>
          <select
            id="availability"
            className={inputClass}
            value={values.availability}
            onChange={(e) => update("availability", e.target.value as "available" | "unavailable")}
          >
            <option value="available">Available</option>
            <option value="unavailable">Unavailable</option>
          </select>
        </div>
      </div>

      {values.availability === "available" && (
        <div>
          <label className={labelClass} htmlFor="stock">
            Quantity in stock
          </label>
          <input
            id="stock"
            type="number"
            inputMode="numeric"
            min={1}
            step="1"
            className={inputClass}
            value={values.stock}
            onChange={(e) => update("stock", e.target.value)}
            placeholder="10"
          />
        </div>
      )}

      <ImageUploader value={values.image} onChange={(url) => update("image", url)} />

      <div>
        <label className={labelClass} htmlFor="partNumber">
          Part Number (optional)
        </label>
        <input
          id="partNumber"
          className={inputClass}
          value={values.partNumber}
          onChange={(e) => update("partNumber", e.target.value)}
          placeholder="BP-8821"
        />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className={labelClass} htmlFor="vehicleMake">
            Vehicle Make (optional)
          </label>
          <input
            id="vehicleMake"
            className={inputClass}
            value={values.vehicleMake}
            onChange={(e) => update("vehicleMake", e.target.value)}
            placeholder="Toyota"
          />
        </div>
        <div>
          <label className={labelClass} htmlFor="vehicleModel">
            Vehicle Model (optional)
          </label>
          <input
            id="vehicleModel"
            className={inputClass}
            value={values.vehicleModel}
            onChange={(e) => update("vehicleModel", e.target.value)}
            placeholder="Corolla"
          />
        </div>
      </div>

      <div>
        <label className={labelClass} htmlFor="year">
          Year (optional)
        </label>
        <input
          id="year"
          className={inputClass}
          value={values.year}
          onChange={(e) => update("year", e.target.value)}
          placeholder="2017–2020"
        />
      </div>

      <div>
        <label className={labelClass} htmlFor="description">
          Description (optional)
        </label>
        <textarea
          id="description"
          rows={3}
          className={inputClass}
          value={values.description}
          onChange={(e) => update("description", e.target.value)}
          placeholder="Short note about condition, fitment, or anything customers should know."
        />
      </div>

      {error && (
        <p className="rounded-md bg-out-stock-bg px-3 py-2 text-sm font-medium text-out-stock">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={submitting}
        className="mt-2 rounded-md bg-ink px-4 py-3.5 text-base font-semibold text-canvas-raised disabled:opacity-50"
      >
        {submitting ? "Saving…" : "Save Product"}
      </button>
    </form>
  );
}
