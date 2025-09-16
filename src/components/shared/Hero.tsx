"use client";

import Image from "next/image";
import Link from "next/link";
import { getBackdropUrl, formatReleaseYear, formatRating } from "@/lib/utils/helpers";
import { HeroProps } from "@/types/components/shared";
import { Button } from "../ui/button";
import { Info } from "lucide-react";

export function Hero({
  backdropPath,
  alt,
  height = "h-96",
  className = "",
  children,
  priority = false,
  gradientDirection = "to-r",
  gradientOpacity = "from-black/70 via-black/50 to-transparent",
  contentPosition = "end",
  contentAlignment = "start",
  // Movie-specific props
  movie,
  showOverview = true,
  showInfoButton = true,
  onAddToList,
}: HeroProps) {
  const getGradientClass = () => {
    const baseGradient = `bg-gradient-${gradientDirection}`;
    return `${baseGradient} ${gradientOpacity}`;
  };

  const getContentPositionClass = () => {
    switch (contentPosition) {
      case "start":
        return "items-start";
      case "center":
        return "items-center";
      case "end":
        return "items-end";
      default:
        return "items-end";
    }
  };

  const getContentAlignmentClass = () => {
    switch (contentAlignment) {
      case "start":
        return "justify-start";
      case "center":
        return "justify-center";
      case "end":
        return "justify-end";
      default:
        return "justify-start";
    }
  };

  return (
    <div className={`relative ${height} rounded-lg overflow-hidden ${className}`}>
      <Image
        src={getBackdropUrl(backdropPath, "original")}
        alt={alt}
        fill
        className="object-cover"
        priority={priority}
      />
      <div className={`absolute inset-0 ${getGradientClass()}`} />

      <div
        className={`relative z-10 h-full flex ${getContentPositionClass()} ${getContentAlignmentClass()}`}
      >
        {children ? (
          children
        ) : movie ? (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 w-full">
            <div className="max-w-2xl">
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-3 leading-tight">
                {movie.title}
              </h1>

              {showOverview && movie.overview && (
                <p className="text-md md:text-lg text-gray-200 mb-4 leading-relaxed">
                  {movie.overview}
                </p>
              )}

              <div className="flex items-center gap-4 mb-8">
                {movie.vote_average && (
                  <>
                    <span className="font-semibold text-white text-md">
                      ⭐ {formatRating(movie.vote_average)}
                    </span>
                    {showInfoButton && movie.release_date && (
                      <span className="text-white text-md"> • </span>
                    )}
                  </>
                )}

                {showInfoButton && movie.release_date && (
                  <span className="text-white text-md">
                    {formatReleaseYear(movie.release_date)}
                  </span>
                )}
                {showInfoButton && movie.id && (
                  <Link href={`/movie/${movie.id}`}>
                    <Button
                      size="icon"
                      variant="secondary"
                      className="bg-gray-800 hover:opacity-40 text-white"
                    >
                      <Info className="h-3 w-3" />
                    </Button>
                  </Link>
                )}
                {onAddToList && movie.id && (
                  <Button size="default" variant="secondary" onClick={() => onAddToList(movie.id)}>
                    + Add to list
                  </Button>
                )}
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}
