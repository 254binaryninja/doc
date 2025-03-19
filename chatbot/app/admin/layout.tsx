import { AdminHeader } from "@/components/admin/admin-header";
import { isAdmin } from "../(auth)/auth";
import { redirect } from "next/navigation";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Check if user is admin
  const userIsAdmin = await isAdmin();
  
  // If not admin, redirect to homepage
  if (!userIsAdmin) {
    redirect('/');
  }

  return (
    <div className="flex min-h-screen flex-col">
      <AdminHeader />
      <div className="flex-1 container py-6">
        {children}
      </div>
    </div>
  );
}
