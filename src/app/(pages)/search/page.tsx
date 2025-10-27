"use client";

import { useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import { useSearchMovies, useMovieGenres } from "@/hooks/useMovies";
import { MovieCard } from "@/components/shared/MovieCard";
import { MovieCardSkeleton } from "@/components/shared/MovieCardSkeleton";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";

export default function SearchPage() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q") || "";
  const [currentPage, setCurrentPage] = useState(1);

  const { data: searchResults, isLoading, isError, error } = useSearchMovies(query, currentPage);

  const { data: genresData } = useMovieGenres();
  const genres = genresData?.genres || [];

  // Reset page when query changes
  useEffect(() => {
    setCurrentPage(1);
  }, [query]);

  const handleLoadMore = () => {
    setCurrentPage((prev) => prev + 1);
  };

  const handleAddToList = (movieId: number) => {
    // TODO: Implement add to list functionality
    console.log("Adding movie to list:", movieId);
  };

  const hasMorePages = searchResults && currentPage < searchResults.total_pages;

  if (!query) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="text-center">
          <Search className="mx-auto h-12 w-12 text-gray-400" />
          <h1 className="mt-4 text-2xl font-bold text-gray-900">Search Movies</h1>
          <p className="mt-2 text-gray-600">
            Use the search bar in the header to find your favorite movies
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div>
        {/* Search Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">
            Search Results for &ldquo;{query}&rdquo;
          </h1>
        </div>

        {/* Error State */}
        {isError && <div className="text-red-500">Error loading movies: {error.message}</div>}

        {/* Loading State */}
        {isLoading && (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {Array.from({ length: 5 }).map((_, index) => (
              <MovieCardSkeleton key={index} index={index} />
            ))}
          </div>
        )}

        {/* Search Results */}
        {searchResults && !isLoading && !isError && (
          <>
            {searchResults.results.length === 0 ? (
              <div className="text-center py-12">
                <Search className="mx-auto h-12 w-12 text-gray-400" />
                <h3 className="mt-4 text-lg font-medium text-gray-900">No movies found</h3>
                <p className="mt-2 text-gray-600">Try searching with different keywords</p>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                  {searchResults.results.map((movie) => (
                    <MovieCard
                      key={movie.id}
                      movie={movie}
                      genres={genres}
                      onAddToList={handleAddToList}
                    />
                  ))}
                </div>

                {/* Load More Button */}
                {hasMorePages && (
                  <div className="mt-8 text-center">
                    <Button onClick={handleLoadMore} disabled={isLoading} className="px-8 py-2">
                      {isLoading ? "Loading..." : "Load More"}
                    </Button>
                  </div>
                )}
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
}
