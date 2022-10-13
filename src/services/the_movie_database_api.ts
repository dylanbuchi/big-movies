import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const theMovieDatabaseApiKey = process.env.REACT_APP_THE_MOVIE_DATABASE_API_KEY;

const theMovieDatabaseApiBaseUrl = 'https://api.themoviedb.org/3/';
const apiKeyUrl = `api_key=${theMovieDatabaseApiKey}`;

interface GetMovieProps {
  movieCategoryOrGenreId: string | number;
  page: number;
  searchMovie: string;
}

interface GetMovieRecommendationsProps {
  movieId: string;
  list: string;
  page: number;
}

interface GetMoviesByActorProps {
  actorId: string;
  page: number;
}

interface GetMovieProps {
  movieCategoryOrGenreId: string | number;
  page: number;
  searchMovie: string;
}

interface GetUserMovieListProps {
  listName: string;
  accountId: string;
  sessionId: string;
  page?: number;
}

export const theMovieDatabaseApi = createApi({
  reducerPath: 'theMovieDatabaseApi',

  baseQuery: fetchBaseQuery({ baseUrl: theMovieDatabaseApiBaseUrl }),
  endpoints: (builder) => ({
    getMovies: builder.query({
      query: ({ movieCategoryOrGenreId, page, searchMovie }: GetMovieProps) => {
        // get movies by search
        if (searchMovie) {
          return `search/movie?query=${searchMovie}&${apiKeyUrl}&page=${page}`;
        }
        // get movies by category
        if (
          movieCategoryOrGenreId &&
          typeof movieCategoryOrGenreId === 'string'
        ) {
          // get trending movies
          if (movieCategoryOrGenreId === 'trending') {
            return `${movieCategoryOrGenreId}/movie/day?${apiKeyUrl}`;
          }

          return `movie/${movieCategoryOrGenreId}?${apiKeyUrl}&page=${page}`;
        }
        // get movies by genre
        if (
          movieCategoryOrGenreId &&
          typeof movieCategoryOrGenreId === 'number'
        ) {
          return `discover/movie?with_genres=${movieCategoryOrGenreId}&api_key=${theMovieDatabaseApiKey}&page=${page}`;
        }
        // get popular movies by default

        return `movie/popular?${apiKeyUrl}&page=${page}`;
      },
    }),

    getMovieGenres: builder.query({
      // get movie genre titles
      query: () => `genre/movie/list?${apiKeyUrl}`,
    }),

    getMovieInfo: builder.query({
      query: (movieId: string) =>
        `/movie/${movieId}?${apiKeyUrl}&append_to_response=videos,credits`,
    }),

    getMovieRecommendations: builder.query({
      query: ({ movieId, list, page }: GetMovieRecommendationsProps) =>
        `/movie/${movieId}/${list}?${apiKeyUrl}&page=${page}`,
    }),

    getActorInfo: builder.query({
      query: (actorId: string) => `/person/${actorId}?${apiKeyUrl}`,
    }),

    getMoviesByActor: builder.query({
      query: ({ actorId, page }: GetMoviesByActorProps) =>
        `/discover/movie?with_cast=${actorId}&page=${page}&${apiKeyUrl}`,
    }),

    getUserMovieList: builder.query({
      query: ({ listName, accountId, sessionId }: GetUserMovieListProps) =>
        `/account/${accountId}/${listName}?${apiKeyUrl}&session_id=${sessionId}`,
    }),
  }),
});

export const {
  useGetMoviesQuery,
  useGetMovieGenresQuery,
  useGetMovieInfoQuery,
  useGetMovieRecommendationsQuery,
  useGetActorInfoQuery,
  useGetMoviesByActorQuery,
  useGetUserMovieListQuery,
} = theMovieDatabaseApi;
