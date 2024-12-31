// /app/[locale]/page.tsx
import Home from "@/components/Home/Home";

interface TrendingProps {
  backdrop_path: string;
  id: number;
  media_type: string;
  title: string;
  release_date: string;
  genre_ids: number[];
  vote_average: number;
}

interface GenresProps {
  id: number;
  name: string;
}

export default async function HomePage({ params }: { params: { locale: string } }) {
	const { locale } = await params;

	const baseUrl = process.env.NEXT_APP_BASE_URL;
  const trendingMovieUrl = `${baseUrl}/api/data?url=trending/movie/day&page=1&locale=${locale}`;
  const movieGenresUrl = `${baseUrl}/api/genres?media=movie&locale=${locale}`;

	const trendingMovie: TrendingProps[] = await fetch(trendingMovieUrl, {
		next: { revalidate: 60 },
	})
		.then(res => res.json())
		.catch(error => console.error(error))

  const movieGenres: GenresProps[] = await fetch(movieGenresUrl, {
    next: { revalidate: 60 },
  })
    .then(res => res.json())
    .catch(error => console.error(error))

	return <Home trendingMovie={trendingMovie} movieGenres={movieGenres} />
}