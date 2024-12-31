"use client";

import { Swiper, SwiperSlide } from 'swiper/react'
import {TrendingProps, GenresProps} from "@/components/Home/type";
import TrendingMoviesCard from "@/components/Home/TrendingMovies/TrendingMoviesCard/TrendingMoviesCard";
import styles from './trending-movies.module.css'
import 'swiper/css'

interface Props {
  trendingMovie: TrendingProps[];
  movieGenres: GenresProps[];
}

export default function TrendingMovies({trendingMovie, movieGenres}: Props) {

	return (
		<div className={styles.trending_movie}>
			<Swiper spaceBetween={10} slidesPerView={1}>
        {trendingMovie?.map((props: TrendingProps, i: number) => (
          <SwiperSlide key={i}>
            <TrendingMoviesCard props={props} movieGenres={movieGenres} />
          </SwiperSlide>
        ))}
			</Swiper>
		</div>
	)
}
