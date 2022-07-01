import { Box, Typography, Card, CardMedia, CardContent } from '@mui/material';
import { Link } from 'react-router-dom';

const FeaturedMovie = ({ movie }) => {
  if (!movie) return null;

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        textDecoration: 'none',
        height: '500px',
        mb: '20px',
      }}
      component={Link}
      to={`movies/${movie.id}`}
    >
      <Card
        sx={(theme) => ({
          width: '100%',
          mr: '120px',
          mb: '2rem',
          display: 'flex',
          justifyContent: 'flex-end',
          flexDirection: 'column',
          borderRadius: '25px',
          [theme.breakpoints.down('md')]: { m: '20px' },
          '&.MuiCard-root': {
            position: 'relative',
          },
        })}
      >
        <CardMedia
          image={`https://image.tmdb.org/t/p/original/${movie?.backdrop_path}`}
          sx={(theme) => ({
            position: 'absolute',
            width: '100%',
            height: '100%',
            top: 0,
            right: 0,
            [theme.breakpoints.down('sm')]: {
              paddingRight: '450px',
            },
            borderRadius: '25px',
            backgroundColor: 'rgba(0,0,0,0.150)',
            backgroundBlendMode: 'darken',
          })}
        />

        <Box padding="20px">
          <CardContent
            sx={(theme) => ({
              color: 'white',
              width: '50%',
              [theme.breakpoints.down('md')]: {
                width: '100%',
              },
              '&.MuiCardContent-root': {
                position: 'relative',
                backgroundColor: 'rgba(0,0,0,0.500)',
                borderRadius: '25px',
              },
            })}
          >
            <Typography variant="h5" gutterBottom>
              {movie.title}
            </Typography>
            <Typography variant="body2">{movie.overview}</Typography>
          </CardContent>
        </Box>
      </Card>
    </Box>
  );
};

export default FeaturedMovie;
