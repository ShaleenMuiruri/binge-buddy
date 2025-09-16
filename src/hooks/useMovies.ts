import { useQuery } from "@tanstack/react-query";
import tmdbClient from "@/lib/api/tmdb";
import { Movie, MovieDetails, TMDBResponse, Genre } from "@/types";

// Query keys for consistent caching
export const movieKeys = {
  all: ["movies"] as const,
  lists: () => [...movieKeys.all, "list"] as const,
  list: (filters: string) => [...movieKeys.lists(), { filters }] as const,
  details: () => [...movieKeys.all, "detail"] as const,
  detail: (id: number) => [...movieKeys.details(), id] as const,
  genres: () => [...movieKeys.all, "genres"] as const,
};

// Fetching popular movies
export function usePopularMovies(page: number = 1) {
  return useQuery({
    queryKey: movieKeys.list(`popular-${page}`),
    queryFn: async (): Promise<TMDBResponse<Movie>> => {
      const response = await tmdbClient.get("/movie/popular", {
        params: { page },
      });
      return response.data;
    },
    staleTime: 5 * 60 * 1000,
  });
}

// Fetching trending movies
export function useTrendingMovies(timeWindow: "day" | "week" = "week", page: number = 1) {
  return useQuery({
    queryKey: movieKeys.list(`trending-${timeWindow}-${page}`),
    queryFn: async (): Promise<TMDBResponse<Movie>> => {
      const response = await tmdbClient.get(`/trending/movie/${timeWindow}`, {
        params: { page },
      });
      return response.data;
    },
    staleTime: 5 * 60 * 1000,
  });
}

// Fetching movie details
export function useMovieDetails(movieId: number) {
  return useQuery({
    queryKey: movieKeys.detail(movieId),
    queryFn: async (): Promise<MovieDetails> => {
      const response = await tmdbClient.get(`/movie/${movieId}`);
      return response.data;
    },
    enabled: !!movieId, // Only run query if movieId exists
    staleTime: 10 * 60 * 1000,
  });
}

// Searching movies
export function useSearchMovies(query: string, page: number = 1) {
  return useQuery({
    queryKey: movieKeys.list(`search-${query}-${page}`),
    queryFn: async (): Promise<TMDBResponse<Movie>> => {
      const response = await tmdbClient.get("/search/movie", {
        params: { query, page },
      });
      return response.data;
    },
    enabled: !!query && query.length >= 2, // Only search if query is at least 2 characters
    staleTime: 2 * 60 * 1000,
  });
}

// Fetching upcoming movies
export function useUpcomingMovies(page: number = 1) {
  return useQuery({
    queryKey: movieKeys.list(`upcoming-${page}`),
    queryFn: async (): Promise<TMDBResponse<Movie>> => {
      const response = await tmdbClient.get("/movie/upcoming", {
        params: { page },
      });
      return response.data;
    },
    staleTime: 5 * 60 * 1000,
  });
}

// Fetching top rated movies
export function useTopRatedMovies(page: number = 1) {
  return useQuery({
    queryKey: movieKeys.list(`top-rated-${page}`),
    queryFn: async (): Promise<TMDBResponse<Movie>> => {
      const response = await tmdbClient.get("/movie/top_rated", {
        params: { page },
      });
      return response.data;
    },
    staleTime: 5 * 60 * 1000,
  });
}

// Fetching movie genres
export function useMovieGenres() {
  return useQuery({
    queryKey: movieKeys.genres(),
    queryFn: async (): Promise<{ genres: Genre[] }> => {
      const response = await tmdbClient.get("/genre/movie/list", {
        params: { language: "en" },
      });
      return response.data;
    },
    staleTime: 24 * 60 * 60 * 1000, // Cache for 24 hours since genres don't change often
  });
}

// Fetching movies by genre
export function useMoviesByGenre(genreId: number, page: number = 1) {
  return useQuery({
    queryKey: movieKeys.list(`genre-${genreId}-${page}`),
    queryFn: async (): Promise<TMDBResponse<Movie>> => {
      const response = await tmdbClient.get("/discover/movie", {
        params: {
          with_genres: genreId,
          page,
          sort_by: "popularity.desc",
        },
      });
      return response.data;
    },
    staleTime: 5 * 60 * 1000, // Cache for 5 minutes
  });
}
