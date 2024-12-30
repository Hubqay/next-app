import Movies from "@/components/Movies/Movies";

type MediaTypes = {
  category: string;
  page: string;
  locale: string
}

export async function MoviePageServer({ params }: { params: MediaTypes }) {
  const { category, page, locale } = await params;

  const res = await fetch(`http://localhost:3000/api/media?media=movie&category=${category}&page=${page}&locale=${locale}`,
  { cache: "no-store" }
  );

  if (!res.ok) {
    return <div>Error fetching movies</div>;
  }

  const movies = await res.json();

  return <Movies page={page} movies={movies} category={category} />;
}

export default MoviePageServer;
