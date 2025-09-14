"use client";
import Image from "next/image";
import { useMovieDetails } from "@/hooks/useMovies";
import { getPosterUrl, getBackdropUrl, formatReleaseYear, formatRating } from "@/lib/utils/helpers";
import { MovieDetailsProps } from "@/types";

export function MovieDetails({ movieId }: MovieDetailsProps) {
  const { data: movie, isLoading, error } = useMovieDetails(movieId);

  if (isLoading) {
    return (
      <div style={{ padding: 24, textAlign: "center" }}>
        <h1>Loading movie details...</h1>
      </div>
    );
  }

  if (error || !movie) {
    return (
      <div style={{ padding: 24, textAlign: "center" }}>
        <h1>Movie not found</h1>
      </div>
    );
  }

  return (
    <main style={{ padding: 24 }}>
      {/* Backdrop Image */}
      {movie.backdrop_path && (
        <div
          style={{
            position: "relative",
            height: "400px",
            backgroundImage: `url(${getBackdropUrl(movie.backdrop_path)})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            marginBottom: 24,
            borderRadius: 8,
            overflow: "hidden",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: "linear-gradient(to bottom, rgba(0,0,0,0.3), rgba(0,0,0,0.7))",
            }}
          />
          <div
            style={{
              position: "relative",
              zIndex: 1,
              padding: 24,
              height: "100%",
              display: "flex",
              alignItems: "flex-end",
            }}
          >
            <div style={{ color: "white" }}>
              <h1 style={{ fontSize: 48, fontWeight: 700, marginBottom: 8 }}>{movie.title}</h1>
              <p style={{ fontSize: 18, opacity: 0.9 }}>
                {formatReleaseYear(movie.release_date)} • {formatRating(movie.vote_average)}/10
              </p>
            </div>
          </div>
        </div>
      )}

      <div style={{ display: "flex", gap: 24 }}>
        {/* Poster */}
        <div style={{ flexShrink: 0 }}>
          <Image
            src={getPosterUrl(movie.poster_path, "w500")}
            alt={movie.title}
            style={{
              width: 300,
              height: 450,
              objectFit: "cover",
              borderRadius: 8,
            }}
          />
        </div>

        {/* Movie Info */}
        <div style={{ flex: 1 }}>
          <h2 style={{ fontSize: 24, fontWeight: 600, marginBottom: 16 }}>{movie.title}</h2>

          <div style={{ marginBottom: 16 }}>
            <p style={{ fontSize: 16, lineHeight: 1.6, color: "#374151" }}>{movie.overview}</p>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(2, 1fr)",
              gap: 16,
              marginBottom: 24,
            }}
          >
            <div>
              <strong>Release Year:</strong> {formatReleaseYear(movie.release_date)}
            </div>
            <div>
              <strong>Rating:</strong> ⭐ {formatRating(movie.vote_average)}/10
            </div>
            <div>
              <strong>Runtime:</strong> {movie.runtime ? `${movie.runtime} minutes` : "N/A"}
            </div>
            <div>
              <strong>Status:</strong> {movie.status}
            </div>
          </div>

          {movie.genres && movie.genres.length > 0 && (
            <div style={{ marginBottom: 16 }}>
              <strong>Genres:</strong> {movie.genres.map((genre) => genre.name).join(", ")}
            </div>
          )}

          {movie.production_companies && movie.production_companies.length > 0 && (
            <div>
              <strong>Production:</strong>{" "}
              {movie.production_companies.map((company) => company.name).join(", ")}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
