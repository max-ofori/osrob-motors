"use client";

import { useState } from "react";
import Image from "next/image";

export function ImageUploader({
  value,
  onChange,
}: {
  value: string | null;
  onChange: (url: string | null) => void;
}) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleFile(file: File | undefined) {
    if (!file) return;
    setError(null);
    setUploading(true);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/upload", { method: "POST", body: formData });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? "Upload failed.");
      } else {
        onChange(data.url);
      }
    } catch {
      setError("Upload failed. Check your connection and try again.");
    } finally {
      setUploading(false);
    }
  }

  return (
    <div>
      <label className="mb-1.5 block text-sm font-medium text-ink">Product Image</label>

      {value ? (
        <div className="relative mb-2 aspect-square w-40 overflow-hidden rounded-md border border-line">
          <Image src={value} alt="Product" fill className="object-cover" />
          <button
            type="button"
            onClick={() => onChange(null)}
            className="absolute right-1.5 top-1.5 rounded-full bg-ink/80 px-2 py-1 text-xs font-medium text-white"
          >
            Remove
          </button>
        </div>
      ) : null}

      <label className="inline-flex cursor-pointer items-center gap-2 rounded-md border border-line bg-canvas-raised px-4 py-2.5 text-sm font-medium text-ink">
        {uploading ? "Uploading…" : value ? "Replace Image" : "Upload Image"}
        <input
          type="file"
          accept="image/jpeg,image/png,image/webp,image/gif,image/avif"
          className="hidden"
          disabled={uploading}
          onChange={(e) => handleFile(e.target.files?.[0])}
        />
      </label>

      {error && <p className="mt-1.5 text-sm font-medium text-out-stock">{error}</p>}
    </div>
  );
}
