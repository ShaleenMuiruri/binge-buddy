"use client";

import Link from "next/link";
import { memo } from "react";
import { NavigationItem, NavigationProps } from "@/types/components/header";

// Reusable navigation link component
const NavLink = memo(
  ({
    href,
    label,
    isActive,
    variant = "desktop",
    onClick,
  }: NavigationItem & { variant?: "desktop" | "mobile"; onClick?: () => void }) => {
    const baseClasses = "transition-colors duration-200";
    const activeClasses = "text-gray-900 bg-gray-200 font-bold";
    const inactiveClasses = "text-gray-700 hover:text-gray-900 hover:bg-gray-100";

    if (variant === "mobile") {
      return (
        <Link
          href={href}
          className={`block px-3 py-2 rounded-md text-base font-medium ${baseClasses} ${
            isActive ? activeClasses : inactiveClasses
          }`}
          onClick={onClick}
          aria-current={isActive ? "page" : undefined}
        >
          {label}
        </Link>
      );
    }

    return (
      <Link
        href={href}
        className={`px-4 py-2 rounded-lg text-sm font-medium ${baseClasses} ${
          isActive ? activeClasses : inactiveClasses
        }`}
        aria-current={isActive ? "page" : undefined}
      >
        {label}
      </Link>
    );
  },
);

NavLink.displayName = "NavLink";

export const Navigation = memo(({ items, variant = "desktop", onItemClick }: NavigationProps) => {
  if (variant === "mobile") {
    return (
      <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t border-gray-200">
        {items.map((item) => (
          <NavLink
            key={item.href}
            href={item.href}
            label={item.label}
            isActive={item.isActive}
            variant="mobile"
            onClick={onItemClick}
          />
        ))}
      </div>
    );
  }

  return (
    <nav className="hidden md:flex space-x-1" role="navigation" aria-label="Main navigation">
      {items.map((item) => (
        <NavLink
          key={item.href}
          href={item.href}
          label={item.label}
          isActive={item.isActive}
          variant="desktop"
        />
      ))}
    </nav>
  );
});

Navigation.displayName = "Navigation";
