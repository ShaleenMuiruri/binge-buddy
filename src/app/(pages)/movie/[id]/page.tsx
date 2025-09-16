import { notFound } from "next/navigation";
import { MovieDetails } from "@/components/MovieDetails";
import { PageProps } from "@/types";
import tmdbClient from "@/lib/api/tmdb";
import { TMDBResponse, Movie } from "@/types/tmdb";

// Generate static params for popular movies to enable static export
export async function generateStaticParams() {
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
  } catch (error) {
    // Return empty array if API call fails to prevent build failure
    return [];
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
