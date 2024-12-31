import {GenresProps, TrendingProps} from "@/components/Home/type";
import Poster from "@/components/UI/Poster/Poster";
import {useMemo} from "react";
import {Link} from "@/i18n/routing";
import styles from "./trending-movies-card.module.css";

interface Props {
  props: TrendingProps;
  movieGenres: GenresProps[]
}

export default function TrendingMoviesCard({props, movieGenres}: Props) {
  const {title, release_date, backdrop_path, vote_average, id} = props;

  const results = useMemo(() => {
    const genresArr = movieGenres?.filter(({id}) => id === props?.genre_ids[0])

    const genre = genresArr[0].name;
    const date = release_date?.slice(0, 4) || "N/A";
    const rating = vote_average?.toFixed(1) || "N/A";

    return [genre, date, rating];
  }, [vote_average, release_date, props, movieGenres]);

  return (
    <Link href={`${id}`} className={styles.card}>
      <Poster poster={backdrop_path} title={title} size={1280} />

      <div className={styles.body}>
        <h2>{title}</h2>

        <ul className={styles.list}>
          {results?.map((el: string, i: number) => <li key={i}>{el}</li> )}
        </ul>
      </div>
    </Link>
  )
}