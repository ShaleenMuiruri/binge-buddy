"use client";
import Image from "next/image";
import { useMovieDetails } from "@/hooks/useMovies";
import {
  getPosterUrl,
  formatBudget,
  formatRevenue,
  formatRuntime,
  formatLanguages,
  formatReleaseDate,
} from "@/lib/utils/helpers";
import { MovieDetailsProps } from "@/types";
import { Hero } from "./shared/Hero";
import { HeroSkeleton } from "./shared/HeroSkeleton";
import { Badge } from "./ui/badge";
import { Calendar, DollarSign, Clock, Users, Globe } from "lucide-react";

export const MovieDetail = ({ movieId }: MovieDetailsProps) => {
  const { data: movie, isLoading, error } = useMovieDetails(movieId);
  const handleAddToList = (movieId: number) => {
    // TODO: Implement add to list functionality
    console.log("Adding movie to list:", movieId);
  };

  // Metadata items configuration
  const metadataItems = [
    {
      icon: Calendar,
      label: "Release Date",
      value: formatReleaseDate(movie?.release_date || ""),
    },
    {
      icon: DollarSign,
      label: "Budget",
      value: formatBudget(movie?.budget || 0),
    },
    {
      icon: Clock,
      label: "Runtime",
      value: formatRuntime(movie?.runtime || 0),
    },
    {
      icon: DollarSign,
      label: "Box Office",
      value: formatRevenue(movie?.revenue || 0),
    },
    {
      icon: Users,
      label: "Director",
      value: movie?.production_companies?.[0]?.name || "N/A",
    },
    {
      icon: Globe,
      label: "Languages",
      value: formatLanguages(movie?.spoken_languages || []),
    },
  ];

  if (isLoading) {
    return (
      <main className="p-6">
        <HeroSkeleton height="h-96" className="mb-6" showContent={true} contentPosition="end" />
      </main>
    );
  }

  if (error || !movie) {
    return (
      <div className="p-6 text-center">
        <h1 className="text-xl font-semibold text-red-600">Movie not found</h1>
      </div>
    );
  }

  return (
    <main>
      {/* Backdrop Image */}
      {movie.backdrop_path && (
        <Hero
          backdropPath={movie.backdrop_path}
          alt={movie.title}
          height="h-96"
          className="mb-6"
          gradientDirection="to-b"
          gradientOpacity="from-black/30 to-black/70"
          contentPosition="end"
          contentAlignment="start"
          movie={movie}
          showOverview={false}
          showInfoButton={false}
          onAddToList={handleAddToList}
        />
      )}

      <div className="bg-gray-50 min-h-screen">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Poster */}
          <div className="lg:block hidden flex-shrink-0 mx-auto lg:mx-0">
            <Image
              src={getPosterUrl(movie.poster_path, "w500")}
              alt={movie.title}
              width={500}
              height={750}
              className="w-72 h-[450px] object-cover rounded-lg shadow-lg"
            />
          </div>

          {/* Movie Info */}
          <div className="flex-1">
            <div className="bg-white rounded-lg shadow-sm border p-6">
              {/* Overview Section */}
              <div className="mb-6">
                <h2 className="text-lg font-bold text-gray-900 mb-1">Overview</h2>
                <p className="text-base leading-relaxed text-gray-700 mb-4">{movie.overview}</p>

                {/* Divider */}
                <hr className="border-gray-200 mb-4" />

                {/* Metadata Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {metadataItems.map((item, index) => {
                    const IconComponent = item.icon;
                    return (
                      <div key={index} className="flex items-center gap-2">
                        <IconComponent className="h-4 w-4 text-gray-500" />
                        <div>
                          <span className="text-sm text-gray-600">{item.label}: &nbsp;</span>
                          <span className="text-sm font-semibold text-gray-900">{item.value}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Divider */}
              <hr className="border-gray-200 mb-6" />

              {/* Genres Section */}
              {movie.genres && movie.genres.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-1">Genres</h3>
                  <div className="flex flex-wrap gap-2">
                    {movie.genres.map((genre) => (
                      <Badge
                        key={genre.id}
                        variant="secondary"
                        className="bg-gray-100 text-gray-700 border border-gray-200"
                      >
                        {genre.name}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              {/* Writers Section */}
              {movie.production_companies && movie.production_companies.length > 0 && (
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-1">Writers</h3>
                  <p className="text-gray-700">
                    {movie.production_companies.map((company) => company.name).join(", ")}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
