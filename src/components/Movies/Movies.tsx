import { Box, Typography } from '@mui/material';

import { useSelector } from 'react-redux';

import { useState } from 'react';
import { useGetMoviesQuery } from '../../services/the_movie_database_api';

import { FeaturedMovie, MovieList, Pagination } from '..';

import LoadingIcon from '../LoadingIcon/LoadingIcon';
import { RootState } from '../../app/store';

const Movies = () => {
  const [page, setPage] = useState(1);

  const { movieCategoryOrGenreId } = useSelector(
    (state: RootState) => state.movieCategoryOrGenre,
  );

  const { searchMovie } = useSelector((state: RootState) => state.searchMovie);

  const { data, isError, isFetching } = useGetMoviesQuery({
    movieCategoryOrGenreId,
    page,
    searchMovie,
  });

  if (isError) {
    return <Box>Error!</Box>;
  }

  if (isFetching) {
    return <LoadingIcon />;
  }

  if (!data.results.length) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        width="100%"
        marginTop="200px"
      >
        <Typography variant="h5">
          No movies found... <br />
        </Typography>
      </Box>
    );
  }

  return (
    <Box>
      <FeaturedMovie movie={data?.results[0]} />
      <MovieList movies={data} length={data.results.length} startIndex={1} />

      <Pagination
        page={page}
        setPage={setPage}
        totalPages={data?.total_pages}
      />
    </Box>
  );
};

export default Movies;
