"use client";

import { useState } from "react";
import { useMoviesByGenre, useMovieGenres } from "@/hooks/useMovies";
import { MovieCard } from "./shared/MovieCard";
import { MovieCardSkeleton } from "./shared/MovieCardSkeleton";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";

export const MoviesByGenre = () => {
  const [selectedGenreId, setSelectedGenreId] = useState<number | null>(35); //Comedy as default
  const { data: genresData } = useMovieGenres();
  const { data: moviesData, isLoading, error } = useMoviesByGenre(selectedGenreId || 35);

  const genres = genresData?.genres || [];
  const movies = moviesData?.results || [];

  const handleAddToList = (movieId: number) => {
    console.log("Add to list:", movieId);
  };

  const selectedGenre = genres.find((genre) => genre.id === selectedGenreId);

  return (
    <div className="container mx-auto">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Movies</h1>

        {/* Genre Filter */}
        <div className="w-48">
          <Select
            value={selectedGenreId?.toString() || ""}
            onValueChange={(value) => setSelectedGenreId(parseInt(value))}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Genre" />
            </SelectTrigger>
            <SelectContent>
              {genres.map((genre) => (
                <SelectItem key={genre.id} value={genre.id.toString()}>
                  {genre.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Movies Display */}
      {selectedGenre && (
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">{selectedGenre.name} Movies</h2>
          {error ? (
            <div className="text-red-500">Error loading movies: {error.message}</div>
          ) : isLoading ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
              {Array.from({ length: 5 }).map((_, index) => (
                <MovieCardSkeleton key={index} index={index} />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
              {movies.map((movie) => (
                <MovieCard
                  key={movie.id}
                  movie={movie}
                  genres={genres}
                  onAddToList={handleAddToList}
                />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
