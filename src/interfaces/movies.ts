export interface MovieData {
  title: string;
  backdrop_path: string;
  overview: string;
  id: string;
  poster_path: string;
}

export interface MoviesData {
  page: number;
  total_pages: number;
  results: MovieData[];
}

export interface MovieGenre {
  name: string;
  id: string;
}

export interface MovieDataInfo {
  title: string;
  poster: string;
  releaseYear: string;

  tagLine: string;
  overview: string;

  rating: number;
  description: string;
  runtime: string;
  languages: string[];
  genres: MovieGenre[];
  castList: string[];
  topCast: MovieCast[];

  website: string;
  imdb: string;
  trailer: MovieTrailer;
}

export interface MovieLanguage {
  name: string;
}

export interface MovieCast {
  profile_path: string;
  name: string;
  character: string;
  id: string;
}

export interface MovieVideoData {
  name: 'Trailer';
}

export interface MovieTrailer {
  key: string;
}
