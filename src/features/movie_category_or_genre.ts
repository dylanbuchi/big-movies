import { createSlice } from '@reduxjs/toolkit';

export const movieCategoryOrGenreSlice = createSlice({
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

export const { selectMovieCategoryOrGenre } = movieCategoryOrGenreSlice.actions;

export default movieCategoryOrGenreSlice.reducer;
