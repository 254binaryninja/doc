'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { ShieldCheck } from '@/components/icons';

interface SiteHeaderProps {
  isAuthenticated: boolean;
  isAdmin?: boolean;
}

export function SiteHeader({ isAuthenticated, isAdmin = false }: SiteHeaderProps) {
  const pathname = usePathname();
  
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background">
      <div className="container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
        <div className="flex gap-6 md:gap-10">
          <Link href="/" className="flex items-center space-x-2">
            <span className="inline-block font-bold">MyDoctor</span>
          </Link>
          <nav className="hidden gap-6 md:flex">
            {pathname !== '/' && (
              <Link
                href="/"
                className={cn(
                  'flex items-center text-sm font-medium text-muted-foreground transition-colors hover:text-primary',
                  pathname === '/' && 'text-foreground'
                )}
              >
                Home
              </Link>
            )}
          </nav>
        </div>
        <div className="flex flex-1 items-center justify-end space-x-4">
          <nav className="flex items-center space-x-2">
            {/* <ThemeToggle /> */}
            {isAdmin && (
              <Link href="/admin/chats">
                <Button variant="outline" size="sm" className="gap-1.5">
                  <ShieldCheck className="h-4 w-4" />
                  Admin
                </Button>
              </Link>
            )}
            {isAuthenticated ? (
              <Link href="/admin/chats">
                <Button variant="outline" size="sm">
                  Dashboard
                </Button>
              </Link>
            ) : (
              <Link href="/login">
                <Button variant="outline" size="sm">
                  Login
                </Button>
              </Link>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
}
