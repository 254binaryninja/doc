import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export function AdminHeader() {
  return (
    <header className="border-b bg-card">
      <div className="container flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-4">
          <Link href="/admin" className="font-semibold text-lg flex items-center">
            <span className="bg-amber-500 text-white px-2 py-1 rounded mr-2">Admin</span>
            <span>Dashboard</span>
          </Link>
        </div>
        <div className="flex items-center gap-2">
          <Link href="/">
            <Button variant="ghost" size="sm">Back to Site</Button>
          </Link>
          <ModeToggle />
        </div>
      </div>
    </header>
  );
}
