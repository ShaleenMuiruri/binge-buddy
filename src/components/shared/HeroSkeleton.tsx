"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { HeroSkeletonProps } from "@/types/components/shared";

export function HeroSkeleton({
  height = "h-96",
  className = "",
  showContent = true,
  contentPosition = "end",
}: HeroSkeletonProps) {
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

  return (
    <div className={`relative ${height} rounded-lg overflow-hidden ${className}`}>
      {/* Background skeleton */}
      <Skeleton className="w-full h-full" />

      {/* Gradient overlay skeleton */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-black/10 to-transparent" />

      {/* Content skeleton */}
      {showContent && (
        <div
          className={`absolute inset-0 z-10 flex ${getContentPositionClass()} justify-start p-6`}
        >
          <div className="max-w-2xl space-y-4">
            {/* Title skeleton */}
            <Skeleton className="h-12 w-3/4 bg-white/20" />

            {/* Description skeleton */}
            <Skeleton className="h-6 w-full bg-white/15" />
            <Skeleton className="h-6 w-2/3 bg-white/15" />

            {/* Action buttons skeleton */}
            <div className="flex items-center gap-4 mt-6">
              <Skeleton className="h-10 w-32 bg-white/20" />
              <Skeleton className="h-10 w-10 bg-white/20 rounded-full" />
              <Skeleton className="h-6 w-16 bg-white/15" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
