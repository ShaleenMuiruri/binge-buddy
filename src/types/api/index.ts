import { TMDBResponse, Movie, MovieDetails, Genre } from "../tmdb";

// API Client types
export interface TMDBClientConfig {
  baseURL: string;
  timeout?: number;
  headers?: Record<string, string>;
}

// API Response types
export type PopularMoviesResponse = TMDBResponse<Movie>;

export type TrendingMoviesResponse = TMDBResponse<Movie>;

export type UpcomingMoviesResponse = TMDBResponse<Movie>;

export type TopRatedMoviesResponse = TMDBResponse<Movie>;

export type SearchMoviesResponse = TMDBResponse<Movie>;

export type MoviesByGenreResponse = TMDBResponse<Movie>;

export type MovieDetailsResponse = MovieDetails;

export interface MovieGenresResponse {
  genres: Genre[];
}

// API Request parameter types
export interface PopularMoviesParams {
  page?: number;
}

export interface TrendingMoviesParams {
  timeWindow?: "day" | "week";
  page?: number;
}

export interface UpcomingMoviesParams {
  page?: number;
}

export interface TopRatedMoviesParams {
  page?: number;
}

export interface SearchMoviesParams {
  query: string;
  page?: number;
}

export interface MoviesByGenreParams {
  genreId: number;
  page?: number;
  sortBy?: string;
}

export interface MovieDetailsParams {
  movieId: number;
}

export interface MovieGenresParams {
  language?: string;
}
