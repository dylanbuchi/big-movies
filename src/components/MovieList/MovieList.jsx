import { Grid } from '@mui/material';

import { Movie } from '..';

const MovieList = ({ movies, length, startIndex }) => (
  <Grid
    marginLeft={{ sm: '5px', md: '-40px', lg: '-60px' }}
    container
    spacing={{ xs: 1, md: 7, lg: 2 }}
    justifyContent={{ xs: 'center', sm: 'left' }}
  >
    {movies.results.slice(startIndex, length).map((movie, i) => (
      <Movie key={i} index={i} movie={movie} margin="0px" />
    ))}
  </Grid>
);

export default MovieList;
