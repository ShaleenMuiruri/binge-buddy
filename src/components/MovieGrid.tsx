"use client";

import Link from "next/link";
import Image from "next/image";
import { usePopularMovies } from "@/hooks/useMovies";
import { getPosterUrl, formatReleaseYear, formatRating } from "@/lib/utils/helpers";
import { MovieGridProps } from "@/types";

export function MovieGrid({ page = 1 }: MovieGridProps) {
  const { data: moviesData, isLoading, error } = usePopularMovies(page);

  if (isLoading) {
    return <div>Loading popular movies...</div>;
  }

  if (error) {
    return <div style={{ color: "red" }}>Error loading movies: {error.message}</div>;
  }

  const movies = moviesData?.results || [];

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
        gap: 16,
      }}
    >
      {movies.slice(0, 12).map((movie) => (
        <div
          key={movie.id}
          style={{
            border: "1px solid #e5e7eb",
            borderRadius: 8,
            overflow: "hidden",
            backgroundColor: "white",
          }}
        >
          <Image
            src={getPosterUrl(movie.poster_path, "w342")}
            alt={movie.title}
            style={{
              width: "100%",
              height: 300,
              objectFit: "cover",
            }}
          />
          <div style={{ padding: 12 }}>
            <h3
              style={{
                fontSize: 14,
                fontWeight: 600,
                marginBottom: 4,
                lineHeight: 1.2,
                height: "2.4em",
                overflow: "hidden",
                display: "-webkit-box",
                WebkitLineClamp: 2,
                WebkitBoxOrient: "vertical",
              }}
            >
              <Link
                href={`/movie/${movie.id}`}
                style={{ color: "#1f2937", textDecoration: "none" }}
              >
                {movie.title}
              </Link>
            </h3>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                fontSize: 12,
                color: "#6b7280",
              }}
            >
              <span>{formatReleaseYear(movie.release_date)}</span>
              <span>⭐ {formatRating(movie.vote_average)}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
