// Main component types
import { Movie } from "../tmdb";

// Hero Carousel types
export type HeroCarouselProps = Record<string, never>;

// Movie Carousel types
export interface MovieCarouselProps {
  title: string;
  movies: Movie[];
  isLoading?: boolean;
  error?: Error | null;
}

// Movie Details types
export interface MovieDetailsProps {
  movieId: number;
}

// Movies by Category types
export interface MoviesByCategoryProps {
  category: "popular" | "trending" | "upcoming" | "top-rated";
  title?: string;
}

// Movies by Genre types
export type MoviesByGenreProps = Record<string, never>;

// Re-export all component types
export * from "./header";
export * from "./shared";
export * from "./ui";
