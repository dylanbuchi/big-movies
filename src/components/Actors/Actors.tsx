import { ArrowBack } from '@mui/icons-material';
import { Box, Button, Grid, Typography } from '@mui/material';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ActorInfo } from '../../interfaces/actors';
import {
  useGetActorInfoQuery,
  useGetMoviesByActorQuery,
} from '../../services/the_movie_database_api';
import LoadingIcon from '../LoadingIcon/LoadingIcon';
import MovieList from '../MovieList/MovieList';
import Pagination from '../Pagination/Pagination';

const Actors = () => {
  const [page, setPage] = useState(1);
  const navigation = useNavigate();
  const { id: actorId = '' } = useParams();
  const { data, isFetching } = useGetActorInfoQuery(actorId);

  const moviesByActorResponse = useGetMoviesByActorQuery({
    actorId,
    page,
  });

  if (isFetching) {
    return <LoadingIcon />;
  }

  const actorInfo: ActorInfo = {
    name: data?.name,
    profileImagePath: data?.profile_path,

    birthday: new Date(data?.birthday).toDateString(),
    biography: data?.biography,
    imdbPage: `https://imdb.com/name/${data?.imdb_id}`,
  };

  return (
    <Box>
      <Grid container>
        <Grid
          item
          xl={4}
          lg={5}
          md={5}
          mb={2}
          sx={(theme) => ({
            [theme.breakpoints.down('md')]: {
              display: 'flex',
              justifyContent: 'center',
            },
          })}
        >
          <img
            src={`https://image.tmdb.org/t/p/w780${actorInfo.profileImagePath}`}
            alt={actorInfo.name}
            style={{
              width: '75%',

              borderRadius: '25px',
              objectFit: 'cover',
              boxShadow: '0.25em 0.25em 0.5em grey',
            }}
          />
        </Grid>
        <Grid item xl={8} md={7} p={1}>
          <Typography
            sx={(theme) => ({
              [theme.breakpoints.down('md')]: { textAlign: 'center' },
            })}
            variant="h3"
            gutterBottom
          >
            {actorInfo.name}
          </Typography>
          <Typography
            sx={(theme) => ({
              [theme.breakpoints.down('md')]: { textAlign: 'center' },
            })}
            variant="h5"
            gutterBottom
          >
            Born: {actorInfo.birthday}
          </Typography>
          <Typography
            variant="body1"
            gutterBottom
            align="justify"
            paragraph
            sx={(theme) => ({
              mr: '10px',

              [theme.breakpoints.up('lg')]: { mr: '200px' },
              [theme.breakpoints.down('md')]: {
                ml: '0',
                p: '20px',
              },
            })}
          >
            {actorInfo.biography
              ? actorInfo.biography
              : 'Sorry, there is no biography for this actor yet.'}
          </Typography>
          <Box
            justifyContent="space-between"
            display="flex"
            marginTop="2rem"
            mr="0.64rem"
          >
            <Button
              href={actorInfo.imdbPage}
              target="_blank"
              rel="noopener noreferrer"
              variant="contained"
              sx={(theme) => ({
                [theme.breakpoints.down('md')]: { ml: '50px' },
              })}
            >
              IMDB
            </Button>
            <Button
              sx={(theme) => ({
                [theme.breakpoints.up('lg')]: { mr: '200px' },
                [theme.breakpoints.down('md')]: { mr: '50px' },
              })}
              endIcon={<ArrowBack />}
              onClick={() => navigation(-1)}
            >
              Back
            </Button>
          </Box>
        </Grid>
      </Grid>
      <Typography
        sx={(theme) => ({
          mt: '2rem',
          [theme.breakpoints.down('lg')]: {
            textAlign: 'center',
          },
        })}
        variant="h4"
        gutterBottom
        align="left"
      >
        Movies
      </Typography>
      <Box
        sx={(theme) => ({
          [theme.breakpoints.up('lg')]: {
            ml: '45px',
          },
        })}
        margin="2rem"
      >
        {moviesByActorResponse?.data && (
          <MovieList movies={moviesByActorResponse?.data} length={6} />
        )}
      </Box>
      <Pagination
        page={page}
        setPage={setPage}
        totalPages={moviesByActorResponse?.data?.total_pages}
      />
    </Box>
  );
};

export default Actors;
