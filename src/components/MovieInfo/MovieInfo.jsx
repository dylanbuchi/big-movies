import { useDispatch } from 'react-redux';
import { Link, useParams } from 'react-router-dom';

import { Box, Grid, Rating, Typography } from '@mui/material';

import { useGetMovieInfoQuery } from '../../services/the_movie_database_api';
import { MoviePoster, StyledGrid } from './styles';

import LoadingIcon from '../LoadingIcon/LoadingIcon';
import { selectMovieCategoryOrGenre } from '../../features/movie_category_or_genre';

const MovieInfo = () => {
  const movieImageUrl = 'https://image.tmdb.org/t/p/w500/';

  const { id: movieId } = useParams();
  const { data, isFetching, isError } = useGetMovieInfoQuery(movieId);

  if (isError) {
    return <Box>Error</Box>;
  }

  if (isFetching) {
    return <LoadingIcon />;
  }

  const dispatch = useDispatch();

  const movieInfo = {
    title: data?.title,
    poster: data?.poster_path,
    releaseYear: data?.release_date.split('-')[0],

    tagLine: data?.tagline,
    description: data?.overview,
    rating: parseFloat((data.vote_average / 1.75).toFixed(1)),

    runtime: data?.runtime,
    languages: data?.spoken_languages.map((item) => item.name),

    genres: data?.genres,
  };

  return (
    <StyledGrid container>
      <Grid item sm={12} lg={4} sx={{ display: 'flex', marginBottom: '30px' }}>
        <MoviePoster
          src={`${movieImageUrl}${movieInfo.poster}`}
          alt={movieInfo.title}
        />
      </Grid>

      <Grid item container direction="column" lg={7}>
        <Typography gutterBottom variant="h3" align="center">
          {movieInfo.title} ({movieInfo.releaseYear})
        </Typography>
        <Typography gutterBottom variant="h5" align="center">
          {movieInfo.tagLine}
        </Typography>
        <StyledGrid item>
          <Box mt="20px" display="flex" justifyContent="center">
            <Rating readOnly value={movieInfo.rating} />

            <Typography
              gutterBottom
              variant="subtitle1"
              sx={{
                fontWeight: 'bolder',
                ml: '10px',
              }}
            >
              {movieInfo.rating} / 10
            </Typography>
          </Box>
          <Typography align="center" gutterBottom variant="h6" mt="20px">
            {movieInfo.runtime} min
          </Typography>
        </StyledGrid>

        <Grid
          item
          sx={{
            display: 'flex',
            justifyContent: 'space-around',
            flexWrap: 'wrap',
          }}
        >
          {movieInfo.genres?.map((genre) => (
            <Link
              key={genre.name}
              to="/"
              onClick={() => dispatch(selectMovieCategoryOrGenre(genre.id))}
              style={{
                textDecoration: 'underline',
                color: 'black',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                margin: '10px',
              }}
            >
              <Typography
                sx={{
                  display: 'flex',
                  justifyContent: 'space-around',
                  alignContent: 'center',
                }}
                variant="subtitle1"
                color="textPrimary"
              >
                {genre.name}
              </Typography>
            </Link>
          ))}
        </Grid>
      </Grid>
    </StyledGrid>
  );
};

export default MovieInfo;
