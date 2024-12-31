export interface TrendingProps {
  backdrop_path: string;
	id: number;
	media_type: string;
	title: string;
	release_date: string;
	genre_ids: number[];
  vote_average: number;
}

export interface GenresProps {
  id: number;
  name: string;
}