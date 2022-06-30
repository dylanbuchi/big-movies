import { Box, Typography } from '@mui/material';
import { Movie } from '..';

const UserMovies = ({ title, data }) => (
  <Box>
    <Typography
      sx={(theme) => ({
        m: '25px ',
        [theme.breakpoints.down('md')]: {
          textAlign: 'center',
        },
      })}
      variant="h5"
      align="left"
      gutterBottom
    >
      {title}
    </Typography>

    <Box>
      <Box
        display="flex"
        flexWrap="wrap"
        sx={(theme) => ({
          m: '15px ',
          [theme.breakpoints.down('md')]: {
            alignContent: 'center',
            justifyContent: 'center',
          },
        })}
      >
        {data?.results.map((movie, index) => (
          <Movie key={movie.id} movie={movie} index={index} margin="10px" />
        ))}
      </Box>
    </Box>
  </Box>
);

export default UserMovies;
