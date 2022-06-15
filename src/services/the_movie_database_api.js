import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const theMovieDatabaseApiKey = process.env.REACT_APP_THE_MOVIE_DATABASE_API_KEY;

const theMovieDatabaseApiBaseUrl = 'https://api.themoviedb.org/3/';
const page = 1;

export const theMovieDatabaseApi = createApi({
  reducerPath: 'theMovieDatabaseApi',

  baseQuery: fetchBaseQuery({ baseUrl: theMovieDatabaseApiBaseUrl }),
  endpoints: (builder) => ({
    getPopularMovies: builder.query({
      query: () =>
        `movie/popular?api_key=${theMovieDatabaseApiKey}&page=${page}`,
    }),

    getMovieGenres: builder.query({
      query: () =>
        `genre/movie/list?api_key=${theMovieDatabaseApiKey}&page=${page}`,
    }),
  }),
});

export const { useGetPopularMoviesQuery, useGetMovieGenresQuery } =
  theMovieDatabaseApi;
