import { notFound } from "next/navigation";
import { MovieDetails } from "@/components/MovieDetails";
import { PageProps } from "@/types";

export default async function MovieDetailPage(props: PageProps) {
  const { id } = await props.params;
  const movieId = parseInt(id);

  if (isNaN(movieId)) {
    return notFound();
  }

  return <MovieDetails movieId={movieId} />;
}
