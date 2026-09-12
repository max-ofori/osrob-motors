"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export function LoginForm() {
  const router = useRouter();
  const [code, setCode] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setSubmitting(true);

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setError(data.error ?? "Incorrect code. Please try again.");
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

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div>
        <label htmlFor="code" className="mb-1.5 block text-sm font-medium text-ink">
          Secret Code
        </label>
        <input
          id="code"
          type="password"
          inputMode="numeric"
          autoFocus
          value={code}
          onChange={(e) => setCode(e.target.value)}
          className="w-full rounded-md border border-line bg-canvas-raised px-4 py-3.5 text-lg tracking-widest text-ink focus:outline-none focus:ring-2 focus:ring-amber"
          placeholder="••••••"
        />
      </div>

      {error && <p className="text-sm font-medium text-out-stock">{error}</p>}

      <button
        type="submit"
        disabled={submitting || code.length === 0}
        className="rounded-md bg-ink px-4 py-3.5 text-base font-semibold text-canvas-raised disabled:opacity-50"
      >
        {submitting ? "Checking…" : "Continue"}
      </button>
    </form>
  );
}
