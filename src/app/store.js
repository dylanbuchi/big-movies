import { configureStore } from '@reduxjs/toolkit';
import { theMovieDatabaseApi } from '../services/the_movie_database_api';

export default configureStore({
  reducer: {
    [theMovieDatabaseApi.reducerPath]: theMovieDatabaseApi.reducer,
  },
});
