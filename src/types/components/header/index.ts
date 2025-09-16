// Header component types
export type HeaderProps = Record<string, never>;

// Navigation types
export interface NavigationItem {
  href: string;
  label: string;
  isActive: boolean;
}

export interface NavigationProps {
  items: NavigationItem[];
  variant?: "desktop" | "mobile";
  onItemClick?: () => void;
}

// Mobile Menu types
export interface MobileMenuProps {
  onClick: () => void;
  isOpen: boolean;
}

// Search Input types
export interface SearchInputProps {
  onSearch?: (query: string) => void;
}
