// lib/utils/helpers.ts
const TMDB_IMAGE_BASE_URL = process.env.TMDB_IMAGE_BASE_URL || "https://image.tmdb.org/t/p";

// Image URL helpers
export function getImageUrl(
  path: string | null,
  size: "w92" | "w154" | "w185" | "w342" | "w500" | "w780" | "original" = "w500",
): string {
  if (!path) {
    return "/placeholder-movie.jpg"; // Fallback image
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
    return "/placeholder-movie.jpg"; // Fallback image
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
