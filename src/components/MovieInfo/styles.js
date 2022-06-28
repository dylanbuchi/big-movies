import { Grid } from '@mui/material';
import { styled } from '@mui/material/styles';

export const MoviePoster = styled('img')(({ theme }) => ({
  borderRadius: '25px',
  boxShadow: '0.5em 0.5em 0.5em grey',
  width: '90%',
  height: '700px',

  [theme.breakpoints.down('lg')]: {
    margin: '0 auto',
    width: '280px',
    height: '400px',
  },

  [theme.breakpoints.down('md')]: {
    width: '50%',
    height: '550px',
  },

  [theme.breakpoints.down('sm')]: {
    width: '65%',
    height: '355px',
    marginBottom: '30px',
  },
}));

export const StyledGrid = styled(Grid)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-around',

  [theme.breakpoints.down('md')]: {
    flexDirection: 'column',
    flexWrap: 'wrap',
    marginLeft: '12px',
    paddingRight: '12px',
  },
}));

export const StyledIFrame = styled('iframe')(({ theme }) => ({
  width: '70%',
  height: '70%',
  justifyContent: 'center',

  [theme.breakpoints.down('sm')]: {
    width: '100%',
    height: '40%',
  },
}));
