"use client";

import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { SkeletonCardProps } from "@/types/components/shared";

// Constants
const CARD_HEIGHT = 430;
const IMAGE_HEIGHT = 320;

export const MovieCardSkeleton = ({ index }: SkeletonCardProps) => (
  <Card key={index} className={`h-[${CARD_HEIGHT}px] flex flex-col`}>
    <Skeleton className={`h-[${IMAGE_HEIGHT}px] w-full rounded-t-lg`} />
    <div className="p-3 space-y-2">
      <Skeleton className="h-4 w-3/4" />
      <Skeleton className="h-3 w-1/4" />
      <div className="flex justify-between items-center">
        <Skeleton className="h-3 w-1/3" />
        <Skeleton className="h-6 w-16 rounded-full" />
      </div>
    </div>
    <div className="p-3 pt-0 mt-auto">
      <Skeleton className="h-5 w-20 rounded-full" />
    </div>
  </Card>
);
