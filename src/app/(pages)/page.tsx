import { HeroCarousel } from "@/components/HeroCarousel";
import { MoviesByCategory } from "@/components/MoviesByCategory";

export default function Home() {
  return (
    <div>
      <HeroCarousel />
      <div>
        <div className="max-w-7xl mx-auto px-2 py-12">
          <div className="space-y-8">
            <MoviesByCategory category="popular" />
            <MoviesByCategory category="upcoming" />
            <MoviesByCategory category="top-rated" />
          </div>
        </div>
      </div>
    </div>
  );
}
