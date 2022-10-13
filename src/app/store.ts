import { configureStore } from '@reduxjs/toolkit';
import { theMovieDatabaseApi } from '../services/the_movie_database_api';

import movieCategoryOrGenreSlice_ from '../features/movie_category_or_genre';
import searchMovieSlice_ from '../features/search_movie';
import authenticationSlice_ from '../features/user_authentication';

const store = configureStore({
  reducer: {
    [theMovieDatabaseApi.reducerPath]: theMovieDatabaseApi.reducer,
    movieCategoryOrGenre: movieCategoryOrGenreSlice_,
    searchMovie: searchMovieSlice_,
    userAuthentication: authenticationSlice_,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
