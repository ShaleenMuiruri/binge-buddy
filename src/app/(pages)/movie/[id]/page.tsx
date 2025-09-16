import { notFound } from "next/navigation";
import { MovieDetails } from "@/components/MovieDetails";
import { PageProps } from "@/types";
import tmdbClient from "@/lib/api/tmdb";
import { TMDBResponse, Movie } from "@/types/tmdb";

// Generate static params for popular movies to enable static export
export async function generateStaticParams() {
  // Check if TMDB token is available
  if (!process.env.TMDB_BEARER_TOKEN) {
    console.warn("TMDB_BEARER_TOKEN not found, using fallback static params");
    // Return a fallback parameter to satisfy static export requirements
    return [{ id: "550" }]; // Fight Club as a fallback
  }

  try {
    // Fetch popular movies to generate static pages for the most popular ones
    const response = await tmdbClient.get<TMDBResponse<Movie>>("/movie/popular", {
      params: { page: 1 },
    });

    const movies = response.data.results;

    // Generate static params for the first 20 popular movies
    // This limits the build time while still providing good coverage
    return movies.slice(0, 20).map((movie) => ({
      id: movie.id.toString(),
    }));
  } catch {
    console.error("Failed to fetch popular movies for static generation");
    // Return fallback parameter if API call fails to prevent build failure
    return [{ id: "550" }]; // Fight Club as a fallback
  }
}

export default async function MovieDetailPage(props: PageProps) {
  const { id } = await props.params;
  const movieId = parseInt(id);

  if (isNaN(movieId)) {
    return notFound();
  }

  return <MovieDetails movieId={movieId} />;
}
