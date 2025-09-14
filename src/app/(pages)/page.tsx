import { MovieGrid } from "@/components/MovieGrid";

export default function Home() {
  return (
    <main style={{ padding: 24 }}>
      <h1 style={{ fontSize: 28, fontWeight: 700, marginBottom: 12 }}>BingeBuddy</h1>
      <p style={{ marginBottom: 16 }}>Discover and track movies you will love.</p>
      <h2 style={{ fontSize: 20, fontWeight: 600, marginBottom: 16 }}>Popular Movies</h2>
      <MovieGrid />
    </main>
  );
}
