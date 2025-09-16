"use client";

import { MovieCarouselProps } from "@/types/components";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { MovieCard } from "./shared/MovieCard";
import { MovieCardSkeleton } from "./shared/MovieCardSkeleton";
import { useMovieGenres } from "@/hooks/useMovies";

const SKELETON_COUNT = 5;

export const MovieCarousel = ({ title, movies, isLoading }: MovieCarouselProps) => {
  const { data: genresData } = useMovieGenres();
  const genres = genresData?.genres || [];

  const handleAddToList = (movieId: number) => {
    console.log("Add to list:", movieId);
  };

  if (isLoading) return <Loading title={title} />;

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
        className="w-full"
      >
        <CarouselContent className="-ml-2 md:-ml-4">
          {movies.map((movie) => (
            <CarouselItem
              key={movie.id}
              className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3 xl:basis-1/5"
            >
              <MovieCard movie={movie} genres={genres} onAddToList={handleAddToList} />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="left-2" />
        <CarouselNext className="right-2" />
      </Carousel>
    </div>
  );
};

const Loading = ({ title }: { title: string }) => (
  <div className="space-y-4">
    <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
      {Array.from({ length: SKELETON_COUNT }).map((_, index) => (
        <MovieCardSkeleton key={index} index={index} />
      ))}
    </div>
  </div>
);
