import { Typography, Grid, Grow } from '@mui/material';
import { StyledLink, MoviePoster, typographyStyle } from './styles';

export const Movie = ({ movie, index }) => {
  const movieImageUrl = 'https://image.tmdb.org/t/p/w500/';
  const noImageUrL =
    'https://upload.wikimedia.org/wikipedia/commons/a/ac/No_image_available.svg';

  const checkMovieTitleLength = (movieTitle, maxLength) =>
    movieTitle.length < maxLength
      ? movieTitle
      : `${movieTitle.split('').splice(0, 18).join('')}...`;

  return (
    <Grid
      item
      xs={12}
      sm={6}
      md={4}
      lg={3}
      xl={2}
      sx={{
        ml: { xs: '20%', sm: 0 },
      }}
    >
      <Grow in key={index} timeout={(index + 1) * 225}>
        <StyledLink to={`/movies/${movie.id}`}>
          <MoviePoster
            src={
              movie.poster_path
                ? `${movieImageUrl}${movie.poster_path}`
                : `${noImageUrL}`
            }
            alt={movie.title}
          />

          <Typography variant="h6" sx={typographyStyle}>
            {checkMovieTitleLength(movie.title, 22)}
          </Typography>
        </StyledLink>
      </Grow>
    </Grid>
  );
};

export default Movie;
