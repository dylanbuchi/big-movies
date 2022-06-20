import { Box, Typography } from '@mui/material';
import { useState } from 'react';
import { useSelector } from 'react-redux';

import { useGetMoviesQuery } from '../../services/the_movie_database_api';

import LoadingIcon from '../LoadingIcon/LoadingIcon';
import { MovieList } from '..';

const Movies = () => {
  const [page, setPage] = useState(1);

  const { movieCategoryOrGenreId } = useSelector(
    (state) => state.movieCategoryOrGenre,
  );

  const { data, isError, isFetching } = useGetMoviesQuery({
    movieCategoryOrGenreId,
    page,
  });

  if (isError) {
    return <Box>Error!</Box>;
  }

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

  return (
    <Box>
      <MovieList movies={data} />
    </Box>
  );
};

export default Movies;
