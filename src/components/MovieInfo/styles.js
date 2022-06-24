import { Grid } from '@mui/material';
import { styled } from '@mui/material/styles';

export const MoviePoster = styled('img')(({ theme }) => ({
  borderRadius: '25px',
  boxShadow: '0.5em 0.5em 0.5em grey',
  width: '80%',

  [theme.breakpoints.down('md')]: {
    margin: '0 auto',
    width: '50%',
    height: '350px',
  },

  [theme.breakpoints.down('sm')]: {
    margin: '0 auto',
    width: '60%',
    height: '350px',
    marginBottom: '30px',
  },
}));

export const StyledGrid = styled(Grid)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-around',
  my: '10px',

  [theme.breakpoints.down('sm')]: {
    flexDirection: 'column',
    flexWrap: 'wrap',
  },
}));
