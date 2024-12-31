import TrendingMovies from './TrendingMovies/TrendingMovies';
import {TrendingProps, GenresProps} from './type';
import styles from './home.module.css';

interface Props {
  trendingMovie: TrendingProps[];
  movieGenres: GenresProps[];
}

export default async function Home({ trendingMovie, movieGenres }: Props) {
	return (
		<section className={styles.home}>
			<TrendingMovies trendingMovie={trendingMovie} movieGenres={movieGenres}/>
		</section>
	)
}