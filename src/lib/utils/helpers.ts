// lib/utils/helpers.ts
import { Genre } from "@/types";

const TMDB_IMAGE_BASE_URL = process.env.TMDB_IMAGE_BASE_URL || "https://image.tmdb.org/t/p";

// Image URL helpers
export function getImageUrl(
  path: string | null,
  size: "w92" | "w154" | "w185" | "w342" | "w500" | "w780" | "original" = "w500",
): string {
  if (!path) {
    return "/placeholder-movie.svg"; // Fallback image
  }
  return `${TMDB_IMAGE_BASE_URL}/${size}${path}`;
}

export function getPosterUrl(
  path: string | null,
  size: "w92" | "w154" | "w185" | "w342" | "w500" | "w780" | "original" = "w500",
): string {
  return getImageUrl(path, size);
}

export function getBackdropUrl(
  path: string | null,
  size: "w300" | "w780" | "w1280" | "original" = "w1280",
): string {
  if (!path) {
    return "/placeholder-movie.svg"; // Fallback image
  }
  return `${TMDB_IMAGE_BASE_URL}/${size}${path}`;
}

// Formatting helpers
export function formatReleaseYear(releaseDate: string): string {
  if (!releaseDate) return "N/A";
  return new Date(releaseDate).getFullYear().toString();
}

export function formatRating(voteAverage: number): string {
  return voteAverage.toFixed(1);
}

// Genre helpers
export function getGenreName(genreId: number, genres: Genre[]): string {
  const genre = genres.find((g) => g.id === genreId);
  return genre ? genre.name : "Unknown";
}

export function getGenreNames(genreIds: number[], genres: Genre[]): string[] {
  return genreIds.map((id) => getGenreName(id, genres));
}

export function getFirstGenreName(genreIds: number[], genres: Genre[]): string {
  if (genreIds.length === 0) return "Movie";
  return getGenreName(genreIds[0], genres);
}

// Movie detail formatting helpers
export function formatBudget(budget: number): string {
  if (budget === 0) return "N/A";
  return `$${(budget / 1000000).toFixed(0)}M`;
}

export function formatRevenue(revenue: number): string {
  if (revenue === 0) return "N/A";
  return `$${(revenue / 1000000).toFixed(0)}M`;
}

export function formatRuntime(runtime: number): string {
  if (!runtime) return "N/A";
  const hours = Math.floor(runtime / 60);
  const minutes = runtime % 60;
  return `${hours}h ${minutes}min`;
}

export function formatLanguages(languages: Array<{ name: string; english_name: string }>): string {
  if (!languages || languages.length === 0) return "N/A";
  return languages.map((lang) => lang.english_name || lang.name).join(", ");
}

export function formatReleaseDate(releaseDate: string): string {
  if (!releaseDate) return "N/A";
  return new Date(releaseDate).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
