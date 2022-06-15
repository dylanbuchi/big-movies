import { styled } from '@mui/material/styles';

export const DivRoot = styled('div')(() => ({
  display: 'flex',
  height: '100%',
  overflowX: 'hidden',
}));

export const DivToolbar = styled('div')(() => ({
  height: '70px',
}));

export const MainContent = styled('main')(({ theme }) => ({
  flexGrow: '1',
  paddingTop: '2.5em',

  [theme.breakpoints.up('lg')]: {
    paddingLeft: '22em',
  },

  [theme.breakpoints.only('sm')]: { paddingLeft: '14.5em' },
  [theme.breakpoints.only('md')]: { paddingLeft: '17em' },
}));
