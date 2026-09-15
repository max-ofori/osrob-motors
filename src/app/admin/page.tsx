import { redirect } from "next/navigation";
import { isAdminAuthenticated } from "@/lib/auth";
import { LoginForm } from "@/components/admin/LoginForm";

export default async function AdminLoginPage() {
  if (await isAdminAuthenticated()) {
    redirect("/admin/dashboard");
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-ink px-4">
      <div className="w-full max-w-sm rounded-lg bg-canvas-raised p-6 shadow-lg">
        <h1 className="font-display text-xl font-extrabold text-ink">Welcome MoG!</h1>
        <p className="mt-1 mb-6 text-sm text-steel">
          Enter code to manage inventory.
        </p>
        <LoginForm />
      </div>
    </div>
  );
}
