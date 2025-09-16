"use client";

import { MovieCarousel } from "./MovieCarousel";
import { MoviesByCategoryProps } from "@/types/components";
import {
  usePopularMovies,
  useTrendingMovies,
  useUpcomingMovies,
  useTopRatedMovies,
} from "@/hooks/useMovies";

export const MoviesByCategory = ({ category, title }: MoviesByCategoryProps) => {
  // Call all hooks at the top level
  const popularMovies = usePopularMovies(1);
  const trendingMovies = useTrendingMovies("week", 1);
  const upcomingMovies = useUpcomingMovies(1);
  const topRatedMovies = useTopRatedMovies(1);

  // Get the appropriate data based on category
  const getCategoryData = () => {
    switch (category) {
      case "popular":
        return { data: popularMovies, title: "Popular Movies" };
      case "trending":
        return { data: trendingMovies, title: "Trending Movies" };
      case "upcoming":
        return { data: upcomingMovies, title: "Upcoming Movies" };
      case "top-rated":
        return { data: topRatedMovies, title: "Top Rated Movies" };
      default:
        return { data: popularMovies, title: "Popular Movies" };
    }
  };

  const { data, title: defaultTitle } = getCategoryData();
  const displayTitle = title || defaultTitle;

  return (
    <MovieCarousel
      title={displayTitle}
      movies={data?.data?.results || []}
      isLoading={data?.isLoading}
      error={data?.error}
    />
  );
};
