"use client";

import { memo, useState, useRef, useEffect } from "react";
import { useSearchParams, usePathname } from "next/navigation";
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
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const urlQuery = searchParams.get("q") || "";
  const isOnSearchPage = pathname === "/search";

  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const searchRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Show input if manually opened OR on search page with query
  const showInput = isOpen || (isOnSearchPage && urlQuery);

  // Sync with URL when on search page
  useEffect(() => {
    if (isOnSearchPage && urlQuery) {
      setIsOpen(true);
      setQuery(urlQuery);
    } else if (!isOnSearchPage) {
      setIsOpen(false);
      setQuery("");
    }
  }, [isOnSearchPage, urlQuery]);

  // Debounced search
  const triggerSearch = (searchQuery: string) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    timeoutRef.current = setTimeout(() => {
      if (searchQuery.trim().length >= 2) {
        onSearch?.(searchQuery.trim());
      }
    }, 300);
  };

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    triggerSearch(value);
  };

  // Handle form submit (immediate search)
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    if (query.trim()) {
      onSearch?.(query.trim());
    }
  };

  // Toggle search input
  const toggleSearch = () => {
    if (isOnSearchPage && urlQuery) return; // Don't close on search page
    setIsOpen(!isOpen);
    if (!isOpen) setQuery("");
  };

  // Click outside to close
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        if (isOnSearchPage && urlQuery) return; // Don't close on search page
        setIsOpen(false);
        setQuery("");
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [isOpen, isOnSearchPage, urlQuery]);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  return (
    <div ref={searchRef}>
      {showInput ? (
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={query}
            onChange={handleChange}
            placeholder="Search movies..."
            className="px-4 h-9 border rounded-lg text-sm bg-gray-100 focus:outline-none focus:border-transparent md:w-64"
            autoFocus={!isOnSearchPage}
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
