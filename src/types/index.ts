// Main types export file
export * from "./tmdb";
export * from "./components";
export * from "./hooks";
export * from "./api";

// App-level types
export interface PageProps {
  params: Promise<{ id: string }>;
}

export interface ProvidersProps {
  children: React.ReactNode;
}
