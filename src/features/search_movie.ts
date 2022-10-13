import { createSlice } from '@reduxjs/toolkit';

export const searchMovieSlice = createSlice({
  name: 'searchMovie',
  initialState: {
    searchMovie: '',
    searchInputField: '',
  },
  reducers: {
    searchMovie: (state, action) => {
      state.searchMovie = action.payload;
    },
    setInputField: (state, action) => {
      state.searchInputField = action.payload;
    },
  },
});

export const { searchMovie, setInputField } = searchMovieSlice.actions;

export default searchMovieSlice.reducer;
