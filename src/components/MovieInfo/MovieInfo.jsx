import { useDispatch } from 'react-redux';
import { Link, useParams } from 'react-router-dom';

import {
  Box,
  Button,
  ButtonGroup,
  Grid,
  Modal,
  Rating,
  Typography,
} from '@mui/material';

import {
  ArrowBack,
  Favorite,
  FavoriteBorder,
  Language,
  Movie,
  PlusOne,
  Remove,
  Theaters,
} from '@mui/icons-material';

import { useState } from 'react';
import {
  useGetMovieInfoQuery,
  useGetMovieRecommendationsQuery,
} from '../../services/the_movie_database_api';
import { MoviePoster, StyledGrid, StyledIFrame } from './styles';

import LoadingIcon from '../LoadingIcon/LoadingIcon';
import { selectMovieCategoryOrGenre } from '../../features/movie_category_or_genre';
import MovieList from '../MovieList/MovieList';

const MovieInfo = () => {
  const dispatch = useDispatch();
  const { id: movieId } = useParams();

  const { data, isFetching, isError } = useGetMovieInfoQuery(movieId);
  const movieRecommendationQueryResponse = useGetMovieRecommendationsQuery({
    movieId,
    list: '/recommendations',
  });

  const [isModalOpen, setIsModalOpen] = useState(false);

  const movieImageUrl = 'https://image.tmdb.org/t/p/w500/';

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
    rating: parseFloat((data.vote_average / 1.6).toFixed(1)),

    runtime: data?.runtime,
    languages: data?.spoken_languages.map((item) => item.name),

    genres: data?.genres,
    castList: data?.credits?.cast.filter((cast) => cast?.profile_path),
    topCast: data?.credits?.cast
      .filter((cast) => cast?.profile_path)
      .slice(0, 6),

    website: data?.homepage,
    imdb: `https://imdb.com/title/${data?.imdb_id}`,
    trailer: data?.videos?.results
      .filter((item) => item?.name.includes('Trailer'))
      .slice(0, 1)[0],
  };

  const isMovieInWatchList = false;
  const isMovieInFavorites = false;

  const addMovieToFavorites = () => {};
  const addMovieToWatchList = () => {};

  const displayButtonStyles = (theme) => ({
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%',
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
    },
  });

  const handleCastCharacterName = (name) => {
    const result = name.includes('/') ? name.split('/')[0] : name;
    return result ? `(${result})` : '';
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
              {movieInfo.rating} / 5
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
              sx={{
                textDecoration: 'none',
                color: 'black',
                '&:hover': {
                  cursor: 'pointer',
                  textShadow: '0.1px 0.1px',
                  filter: 'brightness(1.10)',
                  transform: 'scale(1.01)',
                },
              }}
              to={`/actors/${cast.id}`}
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
              <Typography sx={{ color: 'textPrimary', fontSize: 'small' }}>
                {handleCastCharacterName(cast.character)}
              </Typography>
            </Grid>
          ))}
        </Grid>
        <Grid item container style={{ marginTop: '2rem' }}>
          <Box sx={displayButtonStyles}>
            <Grid item xs={12} sm={6} sx={displayButtonStyles}>
              <ButtonGroup size="small" variant="outlined">
                <Button
                  target="_blank"
                  rel="noopener noreferrer"
                  endIcon={<Language />}
                  href={movieInfo.website}
                >
                  Website
                </Button>
                <Button
                  target="_blank"
                  rel="noopener noreferrer"
                  endIcon={<Movie />}
                  href={movieInfo.imdb}
                >
                  IMDB
                </Button>

                {movieInfo.trailer && (
                  <Button
                    onClick={() => setIsModalOpen(true)}
                    endIcon={<Theaters />}
                    href="#"
                  >
                    Trailer
                  </Button>
                )}
              </ButtonGroup>
            </Grid>
            <Grid item xs={12} sm={6} sx={displayButtonStyles}>
              <ButtonGroup size="small" variant="outlined">
                <Button onClick={addMovieToFavorites}>
                  {isMovieInFavorites ? <FavoriteBorder /> : <Favorite />}
                </Button>
                <Button
                  onClick={addMovieToWatchList}
                  endIcon={isMovieInWatchList ? <Remove /> : <PlusOne />}
                >
                  WatchList
                </Button>
                <Button href="/" endIcon={<ArrowBack />}>
                  Back
                </Button>
              </ButtonGroup>
            </Grid>
          </Box>
        </Grid>
      </Grid>
      <Box width="100%" marginTop="5rem">
        <Typography variant="h4" align="left" gutterBottom>
          More Like This
        </Typography>
        <Box
          sx={(theme) => ({
            [theme.breakpoints.up('lg')]: {
              ml: '45px',
            },
          })}
        >
          {movieRecommendationQueryResponse?.data ? (
            <Box marginTop="50px">
              <MovieList
                movies={movieRecommendationQueryResponse.data}
                length={6}
              />
            </Box>
          ) : (
            ''
          )}
        </Box>
      </Box>

      {movieInfo.trailer && (
        <Modal
          open={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          closeAfterTransition
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <StyledIFrame
            allowFullScreen
            title="Trailer"
            src={`https://www.youtube.com/embed/${movieInfo.trailer.key}?autoplay=1&vq=hd1280`}
            allow="autoplay"
          />
        </Modal>
      )}
    </StyledGrid>
  );
};

export default MovieInfo;
