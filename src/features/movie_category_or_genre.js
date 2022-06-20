import { createSlice } from '@reduxjs/toolkit';

export const movieCategoryOrGenre = createSlice({
  name: 'movieCategoryOrGenre',
  initialState: {
    movieCategoryOrGenreId: '',
    page: 1,
  },
  reducers: {
    selectMovieCategoryOrGenre: (state, action) => {
      state.movieCategoryOrGenreId = action.payload;
    },
  },
});

export const { selectMovieCategoryOrGenre } = movieCategoryOrGenre.actions;

export default movieCategoryOrGenre.reducer;
