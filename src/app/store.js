import { configureStore } from '@reduxjs/toolkit';
import { theMovieDatabaseApi } from '../services/the_movie_database_api';

import movieCategoryOrGenreReducer from '../features/movie_category_or_genre';

export default configureStore({
  reducer: {
    [theMovieDatabaseApi.reducerPath]: theMovieDatabaseApi.reducer,
    movieCategoryOrGenre: movieCategoryOrGenreReducer,
  },
});
