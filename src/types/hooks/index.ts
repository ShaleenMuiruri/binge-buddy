import { Movie, MovieDetails, TMDBResponse, Genre } from "../tmdb";

// Hook return types
export interface UseMoviesReturn<T> {
  data: T | undefined;
  isLoading: boolean;
  error: Error | null;
  refetch: () => void;
}

// Specific hook types
export type UsePopularMoviesReturn = UseMoviesReturn<TMDBResponse<Movie>>;

export type UseTrendingMoviesReturn = UseMoviesReturn<TMDBResponse<Movie>>;

export type UseUpcomingMoviesReturn = UseMoviesReturn<TMDBResponse<Movie>>;

export type UseTopRatedMoviesReturn = UseMoviesReturn<TMDBResponse<Movie>>;

export type UseMovieDetailsReturn = UseMoviesReturn<MovieDetails>;

export type UseSearchMoviesReturn = UseMoviesReturn<TMDBResponse<Movie>>;

export type UseMovieGenresReturn = UseMoviesReturn<{ genres: Genre[] }>;

export type UseMoviesByGenreReturn = UseMoviesReturn<TMDBResponse<Movie>>;

// Hook parameter types
export interface UseMoviesByGenreParams {
  genreId: number;
  page?: number;
}

export interface UseSearchMoviesParams {
  query: string;
  page?: number;
}

export interface UseMovieDetailsParams {
  movieId: number;
}
