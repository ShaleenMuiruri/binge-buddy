// Main types export file
export * from "./tmdb";

// App-level types
export interface PageProps {
  params: Promise<{ id: string }>;
}

export interface ProvidersProps {
  children: React.ReactNode;
}

// Component prop types
export interface MovieDetailsProps {
  movieId: number;
}

export interface MovieGridProps {
  page?: number;
}
