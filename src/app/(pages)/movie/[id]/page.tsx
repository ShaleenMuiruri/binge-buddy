import { notFound } from "next/navigation";
import { MovieDetails } from "@/components/MovieDetails";
import { PageProps } from "@/types";

// Generate static params for popular movies to enable static export
export async function generateStaticParams() {
  // Return an empty array for now - this allows the build to succeed
  // In a real app, you might want to pre-generate pages for popular movies
  return [];
}

export default async function MovieDetailPage(props: PageProps) {
  const { id } = await props.params;
  const movieId = parseInt(id);

  if (isNaN(movieId)) {
    return notFound();
  }

  return <MovieDetails movieId={movieId} />;
}
