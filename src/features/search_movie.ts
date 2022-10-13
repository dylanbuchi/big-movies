import { createSlice } from '@reduxjs/toolkit';

export const searchMovieSlice = createSlice({
  name: 'searchMovie',
  initialState: {
    searchMovie: '',
  },
  reducers: {
    searchMovie: (state, action) => {
      state.searchMovie = action.payload;
    },
  },
});

export const { searchMovie } = searchMovieSlice.actions;

export default searchMovieSlice.reducer;
