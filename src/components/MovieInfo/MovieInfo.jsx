import { useDispatch } from 'react-redux';
import { Link, useParams } from 'react-router-dom';

import { Box, Grid, Rating, Typography } from '@mui/material';

import { useGetMovieInfoQuery } from '../../services/the_movie_database_api';
import { MoviePoster, StyledGrid } from './styles';

import LoadingIcon from '../LoadingIcon/LoadingIcon';
import { selectMovieCategoryOrGenre } from '../../features/movie_category_or_genre';

const MovieInfo = () => {
  const dispatch = useDispatch();
  const { id: movieId } = useParams();

  const { data, isFetching, isError } = useGetMovieInfoQuery(movieId);

  const movieImageUrl = 'https://image.tmdb.org/t/p/w500/';
  console.log(data);
  if (isError) {
    return <Box>Error</Box>;
  }

  if (isFetching) {
    return <LoadingIcon />;
  }

  const movieInfo = {
    title: data?.title,
    poster: data?.poster_path,
    releaseYear: data?.release_date.split('-')[0],

    tagLine: data?.tagline,
    overview: data?.overview,

    description: data?.overview,
    rating: parseFloat((data.vote_average / 1.75).toFixed(1)),

    runtime: data?.runtime,
    languages: data?.spoken_languages.map((item) => item.name),

    genres: data?.genres,
    castList: data?.credits?.cast.filter((cast) => cast?.profile_path),
    topCast: data?.credits?.cast
      .filter((cast) => cast?.profile_path)
      .slice(0, 6),
  };

  return (
    <StyledGrid container>
      <Grid
        item
        sm={12}
        lg={4}
        sx={{
          display: 'flex',
          marginBottom: '30px',
        }}
      >
        <MoviePoster
          src={`${movieImageUrl}${movieInfo.poster}`}
          alt={movieInfo.title}
        />
      </Grid>
      <Grid item container direction="column" lg={7} paddingRight="10px">
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
        <Typography variant="h5" gutterBottom marginTop="10px">
          Overview
        </Typography>
        <Typography
          sx={{ textAlign: 'center', padding: '10px' }}
          variant="h5"
          gutterBottom
          marginBottom="2rem"
        >
          {movieInfo.overview}
        </Typography>
        <Typography variant="h5" gutterBottom>
          Top Cast
        </Typography>
        <Grid item container spacing={2}>
          {movieInfo.topCast.map((cast) => (
            <Grid
              key={`${cast.name.toLocaleLowerCase()}-${cast.character.toLocaleLowerCase()}`}
              item
              xs={4}
              md={2}
              component={Link}
              sx={{ textDecoration: 'none', color: 'black' }}
              to="/actors/"
            >
              <img
                src={`${movieImageUrl}${cast.profile_path}`}
                alt={cast.name}
                style={{
                  width: '100%',
                  maxWidth: '7em',
                  objectFit: 'cover',
                  borderRadius: '15px',
                }}
              />
              <Typography sx={{ color: 'textPrimary', fontWeight: 'bolder' }}>
                {cast.name}
              </Typography>
              <Typography sx={{ color: 'textPrimary', fontSize: 's' }}>
                (
                {cast.character.includes('/')
                  ? cast.character.split('/')[0]
                  : cast.character}
                )
              </Typography>
            </Grid>
          ))}
        </Grid>
      </Grid>
    </StyledGrid>
  );
};

export default MovieInfo;
