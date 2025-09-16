"use client";

import { useTrendingMovies } from "@/hooks/useMovies";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { Hero } from "./shared/Hero";
import { HeroSkeleton } from "./shared/HeroSkeleton";

export const HeroCarousel = () => {
  const { data: moviesData, isLoading, error } = useTrendingMovies("week", 1);

  // Get top 5 trending movies
  const movies = moviesData?.results?.slice(0, 5) || [];

  const handleAddToList = (movieId: number) => {
    // TODO: Implement add to list functionality
    console.log("Adding movie to list:", movieId);
  };

  if (isLoading) {
    return <HeroSkeleton height="h-[500px]" showContent={true} contentPosition="end" />;
  }

  if (error || movies.length === 0) {
    return (
      <div className="h-[500px] bg-gray-900 flex items-center justify-center rounded-lg">
        <div className="text-white text-xl">Error loading trending movies</div>
      </div>
    );
  }

  return (
    <div className="relative h-[500px] rounded-lg overflow-hidden">
      <Carousel
        plugins={[
          Autoplay({
            delay: 7000,
          }),
        ]}
        opts={{
          align: "start",
          loop: true,
        }}
        className="w-full h-full"
      >
        <CarouselContent className="h-[500px] -ml-0">
          {movies.map((movie, index) => (
            <CarouselItem key={movie.id} className="h-full pl-0 basis-full">
              {movie.backdrop_path && (
                <Hero
                  backdropPath={movie.backdrop_path}
                  alt={movie.title}
                  height="h-[500px]"
                  priority={index === 0}
                  gradientDirection="to-r"
                  gradientOpacity="from-black/70 via-black/50 to-transparent"
                  contentPosition="end"
                  contentAlignment="start"
                  movie={movie}
                  showOverview={true}
                  onAddToList={handleAddToList}
                />
              )}
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="left-4 bg-black/50 hover:opacity-40 text-white border-none" />
        <CarouselNext className="right-4 bg-black/50 hover:opacity-40 text-white border-none" />
      </Carousel>
    </div>
  );
};
