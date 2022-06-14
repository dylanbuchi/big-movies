import { Grid } from '@mui/material';

import { Movie } from '../Movie/Movie';

const MovieList = ({ movies }) => (
  <Grid container spacing={0}>
    {movies.results.map((movie, i) => (
      <Movie index={i} movie={movie} />
    ))}
  </Grid>
);

export default MovieList;
