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
    <Grid item lg={3} xl={2} marginBottom="50px">
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
