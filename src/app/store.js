import { configureStore } from '@reduxjs/toolkit';
import { theMovieDatabaseApi } from '../services/the_movie_database_api';

import movieCategoryOrGenreSlice_ from '../features/movie_category_or_genre';
import searchMovieSlice_ from '../features/search_movie';

export default configureStore({
  reducer: {
    [theMovieDatabaseApi.reducerPath]: theMovieDatabaseApi.reducer,
    movieCategoryOrGenre: movieCategoryOrGenreSlice_,
    searchMovie: searchMovieSlice_,
  },
});
