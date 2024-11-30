import Movies from "@/components/Movies/Movies";

export async function MoviePageServer({ params }: { params: { category: string; page: string; locale: string } }) {
  const { category, page, locale } = await params;

  const res = await fetch(`http://localhost:3000/api/movies?category=${category}&page=${page}&locale=${locale}`);

  if (!res.ok) {
    return <div>Error fetching movies</div>;
  }

  const movies = await res.json();

  return <Movies page={page} movies={movies} category={category} />;
}

export default MoviePageServer;
