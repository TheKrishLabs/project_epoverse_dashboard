"use client";

import Link from "next/link";
import { ModeToggle } from "./mode-toggle";
import { AuthButtons } from "./auth-buttons";
import { MobileNav } from "./mobile-nav";

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur-xs supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center justify-between mx-auto px-4">
        <div className="flex items-center">
            <MobileNav />
            <Link href="/" className="mr-6 flex items-center space-x-2 md:ml-0 ml-2">
                <span className="font-bold sm:inline-block">
                Epoverse
                </span>
            </Link>
        </div>
        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <div className="w-full flex-1 md:w-auto md:flex-none">
            {/* Add search or other nav items later */}
          </div>
          <nav className="flex items-center gap-2">
            <AuthButtons />
            <ModeToggle />
          </nav>
        </div>
      </div>
    </header>
  );
}
