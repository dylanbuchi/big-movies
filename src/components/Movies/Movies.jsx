import { Box, Typography } from '@mui/material';

import { useGetPopularMoviesQuery } from '../../services/the_movie_database_api';

import LoadingIcon from '../LoadingIcon/LoadingIcon';
import MovieList from '../MovieList/MovieList';

const Movies = () => {
  const { data, isError, isFetching } = useGetPopularMoviesQuery();

  if (isFetching) {
    return <LoadingIcon />;
  }

  if (!data.results.length) {
    return (
      <Box display="flex" alignItems="center" mt="20px">
        <Typography variant="h4">No movies found</Typography>
      </Box>
    );
  }

  if (isError) {
    return <Box>Error!</Box>;
  }

  return (
    <Box>
      <MovieList movies={data} />
    </Box>
  );
};

export default Movies;
