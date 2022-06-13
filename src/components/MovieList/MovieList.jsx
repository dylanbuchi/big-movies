import { Grid } from '@mui/material';

import { Movie } from '../Movie/Movie';

const MovieList = ({ movies }) => (
  <Grid container spacing={2}>
    {movies.results.map((movie, i) => (
      <Movie key={i} movie={movie} />
    ))}
  </Grid>
);

export default MovieList;
