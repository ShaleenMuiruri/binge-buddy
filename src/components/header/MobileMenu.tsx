"use client";

import { memo } from "react";
import { MobileMenuProps } from "@/types/components/header";

export const MobileMenu = memo(({ onClick, isOpen }: MobileMenuProps) => (
  <button
    type="button"
    className="md:hidden text-gray-700 hover:text-gray-900 hover:bg-gray-100 focus:outline-none p-2 rounded-md transition-colors duration-200 cursor-pointer"
    aria-label="Open mobile menu"
    aria-expanded={isOpen}
    onClick={onClick}
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

MobileMenu.displayName = "MobileMenuButton";
