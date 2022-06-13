import { Typography, Grid } from '@mui/material';

export const Movie = ({ movie }) => (
  <Grid
    item
    xs={12}
    sm={6}
    md={4}
    lg={3}
    xl={2}
    padding="20px"
    sx={{ ml: { xs: '60px', sm: 0 } }}
  >
    <Typography
      variant="h5"
      sx={{
        color: 'primary',
        textOverflow: 'ellipsis',
        textAlign: 'center',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        width: '190px',
        marginTop: '10px',
        marginBottom: '0',
      }}
    >
      {movie.title}
    </Typography>
  </Grid>
);

export default Movie;
