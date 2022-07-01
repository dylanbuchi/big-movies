import { Box, Typography } from '@mui/material';
import { useState } from 'react';
import { useSelector } from 'react-redux';

import { useGetMoviesQuery } from '../../services/the_movie_database_api';

import LoadingIcon from '../LoadingIcon/LoadingIcon';
import { FeaturedMovie, MovieList, Pagination } from '..';

const Movies = () => {
  const [page, setPage] = useState(1);

  const { movieCategoryOrGenreId } = useSelector(
    (state) => state.movieCategoryOrGenre,
  );

  const { searchMovie } = useSelector((state) => state.searchMovie);

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
