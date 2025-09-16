"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useMemo, useState } from "react";
import { SearchInput } from "./header/SearchInput";
import { Navigation } from "./header/Navigation";
import { MobileMenu } from "./header/MobileMenu";

// Navigation items configuration
const NAV_ITEMS = [
  { href: "/movies", label: "Movies", match: (pathname: string) => pathname.startsWith("/movies") },
  {
    href: "/my-list",
    label: "My List",
    match: (pathname: string) => pathname.startsWith("/my-list"),
  },
] as const;

export const Header = () => {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Memoize navigation items to prevent unnecessary re-renders
  const navigationItems = useMemo(
    () =>
      NAV_ITEMS.map((item) => ({
        ...item,
        isActive: item.match(pathname),
      })),
    [pathname],
  );

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleSearch = (query: string) => {
    // Handle search functionality here
    console.log("Searching for:", query);
  };

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-12">
            {/* Logo/Brand */}
            <div className="flex-shrink-0 flex items-center space-x-2">
              <Link
                href="/"
                className="text-2xl font-bold text-gray-900 hover:text-gray-700 transition-colors duration-200 focus:outline-none"
                aria-label="BingeBuddy - Go to homepage"
              >
                BingeBuddy
              </Link>
            </div>

            {/* Desktop Navigation */}
            <Navigation items={navigationItems} />
          </div>

          {/* Right side actions */}
          <div className="flex items-center space-x-4">
            <SearchInput onSearch={handleSearch} />
            <button
              type="button"
              className="focus:outline-none rounded-full cursor-pointer"
              aria-label="User profile"
            >
              <div className="h-8 w-8 bg-gray-200 rounded-full flex items-center justify-center hover:bg-gray-300 transition-colors duration-200">
                <svg
                  className="h-5 w-5 text-gray-600"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                </svg>
              </div>
            </button>
            <MobileMenu onClick={toggleMobileMenu} isOpen={isMobileMenuOpen} />
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden">
            <Navigation
              items={navigationItems}
              variant="mobile"
              onItemClick={() => setIsMobileMenuOpen(false)}
            />
          </div>
        )}
      </div>
    </header>
  );
};
