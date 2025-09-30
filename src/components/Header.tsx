"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useMemo, useState } from "react";
import { SearchInput } from "./header/SearchInput";
import { Navigation } from "./header/Navigation";
import { MobileMenu } from "./header/MobileMenu";
import { AuthButton } from "./auth/AuthButton";

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
          <div className="flex items-center gap-2">
            <SearchInput onSearch={handleSearch} />
            <AuthButton />
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
