import { useSelector } from 'react-redux';

import { ExitToApp } from '@mui/icons-material';
import { Box, Button, Typography } from '@mui/material';
import { useEffect } from 'react';
import { useGetUserMovieListQuery } from '../../services/the_movie_database_api';
import UserMovies from '../UserMovies/UserMovies';
import { RootState } from '../../app/store';

const Profile = () => {
  const { user } = useSelector((state: RootState) => state.userAuthentication);

  const favoritesResponse = useGetUserMovieListQuery({
    listName: 'favorite/movies',
    accountId: user.id,
    sessionId: localStorage.getItem('session_id') ?? '',
    page: 1,
  });

  const watchListResponse = useGetUserMovieListQuery({
    listName: 'watchlist/movies',
    accountId: user.id,
    sessionId: localStorage.getItem('session_id') ?? '',
    page: 1,
  });

  useEffect(() => {
    favoritesResponse.refetch();
    watchListResponse.refetch();
  }, [watchListResponse, favoritesResponse]);

  const logout = () => {
    localStorage.clear();
    window.location.href = '/';
  };

  return (
    <Box>
      <Box display="flex" justifyContent="space-between" marginLeft="20px">
        <Typography gutterBottom variant="h4" />
        <Button
          variant="contained"
          size="small"
          color="primary"
          sx={{
            borderRadius: '20px',
            textTransform: 'none',
            fontSize: '16px',
            mr: '10px',
            mb: '25px',
            p: '8px',
          }}
          onClick={logout}
        >
          Logout &nbsp; <ExitToApp />
        </Button>
      </Box>
      {favoritesResponse?.data?.results.length ||
      watchListResponse?.data?.results.length ? (
        <>
          <Box>
            {favoritesResponse?.data?.results.length ? (
              <UserMovies
                title="My favorite movies"
                moviesData={favoritesResponse?.data}
              />
            ) : (
              <Typography gutterBottom variant="h5">
                Add movies to your favorites
              </Typography>
            )}
          </Box>
          <Box marginTop="4rem">
            {watchListResponse?.data?.results.length ? (
              <UserMovies
                title="My watchlist"
                moviesData={watchListResponse?.data}
              />
            ) : (
              <Typography gutterBottom variant="h5">
                Add movies to your watchlist
              </Typography>
            )}
          </Box>
        </>
      ) : (
        <Typography gutterBottom variant="h5">
          Add movies to your favorites and watchlist
        </Typography>
      )}
    </Box>
  );
};

export default Profile;
