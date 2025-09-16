"use client";

import Link from "next/link";
import Image from "next/image";
import { MovieCardProps } from "@/types/components/shared";
import { getPosterUrl, formatReleaseYear, formatRating, getGenreName } from "@/lib/utils/helpers";
import { Card, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export const MovieCard = ({ movie, genres, onAddToList }: MovieCardProps) => (
  <Link href={`/movie/${movie.id}`} className="block">
    <Card className="flex-shrink-0 group cursor-pointer overflow-hidden h-[430px] flex flex-col hover:shadow-xl transition-shadow duration-300">
      <div className="relative overflow-hidden h-[320px] w-full">
        <Image
          src={getPosterUrl(movie.poster_path, "w342")}
          alt={movie.title}
          width={342}
          height={513}
          className="w-full h-[320px] object-cover group-hover:scale-110 transition-transform duration-500 ease-out"
        />
        <div className="absolute top-2 right-2 bg-black/70 rounded-full px-2 py-1 text-white text-sm flex items-center">
          <span className="text-sm mr-1">⭐</span>
          {formatRating(movie.vote_average)}
        </div>
      </div>
      <CardHeader className="pt-3 px-3 flex-1">
        <div className="flex justify-between gap-4">
          <div>
            <CardTitle className="line-clamp-2 text-gray-800">{movie.title}</CardTitle>
            <CardDescription className="text-sm">
              {formatReleaseYear(movie.release_date)}
            </CardDescription>
          </div>
          <Button
            size="icon"
            variant="secondary"
            className="bg-gray-800 text-primary-foreground hover:bg-gray-700 text-white"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onAddToList(movie.id);
            }}
          >
            +
          </Button>
        </div>
      </CardHeader>
      <CardFooter className="p-3 pt-0 mt-auto">
        <Badge variant="secondary" className="text-xs">
          {getGenreName(movie.genre_ids[0], genres)}
        </Badge>
      </CardFooter>
    </Card>
  </Link>
);
