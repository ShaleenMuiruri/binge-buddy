import { MovieGrid } from "@/components/MovieGrid";

export default function Home() {
  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          Welcome to BingeBuddy
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Discover and track movies you will love. Find your next favorite film with our curated
          recommendations.
        </p>
      </div>

      <div>
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
          Popular Movies
        </h2>
        <MovieGrid />
      </div>
    </div>
  );
}
