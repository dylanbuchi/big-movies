import { useDispatch, useSelector } from 'react-redux';
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

import { useCallback, useEffect, useState } from 'react';

import axios from 'axios';

import {
  useGetMovieInfoQuery,
  useGetMovieRecommendationsQuery,
  useGetUserMovieListQuery,
} from '../../services/the_movie_database_api';
import { MoviePoster, StyledGrid, StyledIFrame } from './styles';

import { selectMovieCategoryOrGenre } from '../../features/movie_category_or_genre';
import LoadingIcon from '../LoadingIcon/LoadingIcon';
import MovieList from '../MovieList/MovieList';
import Pagination from '../Pagination/Pagination';
import { RootState } from '../../app/store';
import {
  MovieCast,
  MovieData,
  MovieGenre,
  MovieDataInfo,
  MovieLanguage,
  MovieVideoData,
} from '../../interfaces/movies';
import { Theme } from '@mui/system';

const MovieInfo = () => {
  const [isMovieInWatchList, setIsMovieInWatchList] = useState(false);
  const [isMovieInFavorites, setIsMovieInFavorites] = useState(false);

  const [page, setPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { user } = useSelector((state: RootState) => state.userAuthentication);

  const dispatch = useDispatch();
  const { id: movieId = '' } = useParams();

  const { data, isFetching, isError } = useGetMovieInfoQuery(movieId);

  const movieRecommendationQueryResponse = useGetMovieRecommendationsQuery({
    movieId,
    list: '/recommendations',
    page,
  });

  const { data: favoritesData, refetch: refetchFavorites } =
    useGetUserMovieListQuery({
      listName: 'favorite/movies',
      accountId: user.id,
      sessionId: localStorage.getItem('session_id') ?? '',
    });

  const { data: watchListData, refetch: refetchWatchList } =
    useGetUserMovieListQuery({
      listName: 'watchlist/movies',
      accountId: user.id,
      sessionId: localStorage.getItem('session_id') ?? '',
    });

  const checkMovieId = useCallback(
    (movies: MovieData[]) => movies?.find((movie) => movie?.id === data?.id),
    [data?.id],
  );

  useEffect(() => {
    refetchWatchList();
    refetchFavorites();
  }, [data, refetchFavorites, refetchWatchList]);

  useEffect(() => {
    setIsMovieInWatchList(Boolean(checkMovieId(watchListData?.results)));
  }, [data, watchListData, setIsMovieInWatchList, checkMovieId]);

  useEffect(() => {
    setIsMovieInFavorites(Boolean(checkMovieId(favoritesData?.results)));
  }, [data, favoritesData, setIsMovieInFavorites, checkMovieId]);

  const movieImageUrl = 'https://image.tmdb.org/t/p/w500/';

  if (isError) {
    return <Box>Error</Box>;
  }

  if (isFetching) {
    return <LoadingIcon />;
  }

  const movieInfo: MovieDataInfo = {
    title: data?.title,
    poster: data?.poster_path,
    releaseYear: data?.release_date.split('-')[0],

    tagLine: data?.tagline,
    overview: data?.overview,

    description: data?.overview,
    rating: parseFloat((data.vote_average / 1.8).toFixed(1)),

    runtime: data?.runtime,
    languages: data?.spoken_languages.map((item: MovieLanguage) => item.name),

    genres: data?.genres,
    castList: data?.credits?.cast.filter(
      (cast: MovieCast) => cast?.profile_path,
    ),
    topCast: data?.credits?.cast
      .filter((cast: MovieCast) => cast?.profile_path)
      .slice(0, 6),

    website: data?.homepage,
    imdb: `https://imdb.com/title/${data?.imdb_id}`,
    trailer: data?.videos?.results
      .filter((item: MovieVideoData) => item?.name.includes('Trailer'))
      .slice(0, 1)[0],
  };

  const addMovieToFavorites = async () => {
    const url = ` https://api.themoviedb.org/3/account/${
      user.id
    }/favorite?api_key=${
      process.env.REACT_APP_THE_MOVIE_DATABASE_API_KEY
    }&session_id=${localStorage.getItem('session_id')}`;

    await axios.post(url, {
      headers: {
        'Content-Type': 'application/json',
      },
      media_type: 'movie',
      media_id: movieId,
      favorite: !isMovieInFavorites,
    });

    setIsMovieInFavorites((prev) => !prev);
  };
  const addMovieToWatchList = async () => {
    const url = `https://api.themoviedb.org/3/account/${
      user.id
    }/watchlist?api_key=${
      process.env.REACT_APP_THE_MOVIE_DATABASE_API_KEY
    }&session_id=${localStorage.getItem('session_id')}`;

    await axios.post(url, {
      headers: {
        'Content-Type': 'application/json',
      },
      media_type: 'movie',
      media_id: movieId,
      watchlist: !isMovieInWatchList,
    });

    setIsMovieInWatchList((prev) => !prev);
  };

  const displayButtonStyles = (theme: Theme) => ({
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%',
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
    },
  });

  const handleCastCharacterName = (name: string) => {
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
          {movieInfo.genres?.map((genre: MovieGenre) => (
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
          {movieInfo.topCast.map((cast: MovieCast) => (
            <Grid
              key={`${cast.name.toLocaleLowerCase()}-${cast.character.toLocaleLowerCase()}`}
              item
              xs={4}
              md={2}
              component={Link}
              sx={(theme) => ({
                textDecoration: 'none',
                color: theme.palette.mode === 'dark' ? 'white' : 'black',
                '&:hover': {
                  cursor: 'pointer',
                  textShadow: '0.1px 0.1px',
                  filter: 'brightness(1.10)',
                  transform: 'scale(1.01)',
                },
              })}
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
                  {isMovieInFavorites ? <Favorite /> : <FavoriteBorder />}
                </Button>
                <Button
                  onClick={addMovieToWatchList}
                  endIcon={isMovieInWatchList ? <Remove /> : <PlusOne />}
                >
                  {isMovieInWatchList ? 'Remove' : 'Add'}
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
        {movieRecommendationQueryResponse?.data?.total_pages ? (
          <Typography variant="h4" align="left" gutterBottom>
            More Like This
          </Typography>
        ) : (
          ''
        )}
        <Typography />

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
                movies={movieRecommendationQueryResponse?.data}
                length={6}
              />
            </Box>
          ) : (
            's'
          )}
        </Box>
        <Pagination
          page={page}
          setPage={setPage}
          totalPages={movieRecommendationQueryResponse?.data?.total_pages}
        />
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
