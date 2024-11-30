import React from "react";
import styles from "./movies.module.css";

type Movie = {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
};

type Props = {
  movies: Movie[];
  category: string;
  page: string;
};

const Movies: React.FC<Props> = ({ movies, category, page }) => {
  return (
    <div className={styles.main}>
      {movies.map((movie) => (
        <div key={movie.id}>
          <h3>{movie.title}</h3>
        </div>
      ))}
    </div>
  )
}

export default Movies;