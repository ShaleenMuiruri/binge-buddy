"use client";

import { memo, useState, useRef, useEffect } from "react";
import { SearchInputProps } from "@/types/components/header";

// Search icon component
const SearchIcon = memo(() => (
  <svg
    className="h-5 w-5 text-gray-600 hover:text-gray-900 transition-colors duration-200"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    aria-hidden="true"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
    />
  </svg>
));

SearchIcon.displayName = "SearchIcon";

export const SearchInput = memo(({ onSearch }: SearchInputProps) => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const searchRef = useRef<HTMLDivElement>(null);

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
    if (!isSearchOpen) {
      setSearchQuery("");
    }
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      onSearch?.(searchQuery);
      setIsSearchOpen(false);
      setSearchQuery("");
    }
  };

  // Click outside to close search
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsSearchOpen(false);
        setSearchQuery("");
      }
    };

    if (isSearchOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isSearchOpen]);

  return (
    <div ref={searchRef}>
      {isSearchOpen ? (
        <form onSubmit={handleSearchSubmit}>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search movies..."
            className="px-4 h-9 border rounded-lg text-sm bg-gray-100 focus:outline-none focus:border-transparent md:w-64"
            autoFocus
          />
        </form>
      ) : (
        <button
          type="button"
          onClick={toggleSearch}
          className="p-2 rounded-md hover:bg-gray-100 transition-colors duration-200 focus:outline-none cursor-pointer"
          aria-label="Search"
        >
          <SearchIcon />
        </button>
      )}
    </div>
  );
});

SearchInput.displayName = "SearchInput";
