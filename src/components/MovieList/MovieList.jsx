import { Grid } from '@mui/material';

import { Movie } from '..';

const MovieList = ({ movies }) => (
  <Grid
    marginLeft={{ sm: '5px', md: '-40px', lg: '-60px' }}
    container
    spacing={{ xs: 1, md: 7, lg: 2 }}
    justifyContent={{ xs: 'center', sm: 'left' }}
  >
    {movies.results.map((movie, i) => (
      <Movie key={i} index={i} movie={movie} />
    ))}
  </Grid>
);

export default MovieList;
