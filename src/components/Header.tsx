"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { memo, useMemo } from "react";

// Navigation items configuration
const NAV_ITEMS = [
  { href: "/", label: "Home", match: (pathname: string) => pathname === "/" },
  { href: "/movies", label: "Movies", match: (pathname: string) => pathname.startsWith("/movie") },
] as const;

// Reusable navigation link component
const NavLink = memo(
  ({ href, label, isActive }: { href: string; label: string; isActive: boolean }) => (
    <Link
      href={href}
      className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
        isActive
          ? "text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20"
          : "text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-50 dark:hover:bg-gray-800"
      }`}
      aria-current={isActive ? "page" : undefined}
    >
      {label}
    </Link>
  ),
);

NavLink.displayName = "NavLink";

// Mobile menu button component
const MobileMenuButton = memo(() => (
  <button
    type="button"
    className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900 p-2 rounded-md transition-colors duration-200"
    aria-label="Open mobile menu"
    aria-expanded="false"
  >
    <svg
      className="h-6 w-6"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M4 6h16M4 12h16M4 18h16"
      />
    </svg>
  </button>
));

MobileMenuButton.displayName = "MobileMenuButton";

export const Header = memo(() => {
  const pathname = usePathname();

  // Memoize navigation items to prevent unnecessary re-renders
  const navigationItems = useMemo(
    () =>
      NAV_ITEMS.map((item) => ({
        ...item,
        isActive: item.match(pathname),
      })),
    [pathname],
  );

  return (
    <header className="bg-white dark:bg-gray-900 shadow-sm border-b border-gray-200 dark:border-gray-700 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo/Brand */}
          <div className="flex-shrink-0">
            <Link
              href="/"
              className="text-2xl font-bold text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900 rounded-md"
              aria-label="BingeBuddy - Go to homepage"
            >
              BingeBuddy
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-1" role="navigation" aria-label="Main navigation">
            {navigationItems.map((item) => (
              <NavLink
                key={item.href}
                href={item.href}
                label={item.label}
                isActive={item.isActive}
              />
            ))}
          </nav>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <MobileMenuButton />
          </div>
        </div>
      </div>
    </header>
  );
});

Header.displayName = "Header";
