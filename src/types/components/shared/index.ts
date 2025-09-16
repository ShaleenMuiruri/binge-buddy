import { Movie } from "../../tmdb";

// Hero component types
export interface HeroProps {
  backdropPath: string;
  alt: string;
  height?: string;
  className?: string;
  children?: React.ReactNode;
  priority?: boolean;
  gradientDirection?: "to-r" | "to-b" | "to-l" | "to-t";
  gradientOpacity?: string;
  contentPosition?: "start" | "center" | "end";
  contentAlignment?: "start" | "center" | "end";
  // Movie-specific props
  movie?: Movie;
  showOverview?: boolean;
  showInfoButton?: boolean;
  onAddToList?: (movieId: number) => void;
}

// Hero Skeleton types
export interface HeroSkeletonProps {
  height?: string;
  className?: string;
  showContent?: boolean;
  contentPosition?: "start" | "center" | "end";
}

// Movie Card types
export interface MovieCardProps {
  movie: Movie;
  genres: Array<{ id: number; name: string }>;
  onAddToList: (movieId: number) => void;
}

// Movie Card Skeleton types
export interface SkeletonCardProps {
  index: number;
}
